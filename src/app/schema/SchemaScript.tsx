import React from 'react';

interface SchemaScriptProps {
  schema: object | object[];
}

// Helper function to validate schema structure and prevent prototype pollution
const isValidSchemaObject = (obj: any): boolean => {
  // Check if it's a plain object
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj)) {
    return false;
  }

  // Check for prototype pollution attempts
  if (obj.constructor !== Object && obj.constructor !== undefined) {
    return false;
  }

  // Check for dangerous keys directly on the object (not in prototype chain)
  const dangerousKeys = ['__proto__', 'constructor', 'prototype'];
  if (dangerousKeys.some(key => Object.prototype.hasOwnProperty.call(obj, key))) {
    return false;
  }

  // Recursively check nested objects
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];
      if (typeof value === 'function') {
        return false; // Functions are not allowed
      }
      if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          // Validate array elements
          for (const item of value) {
            if (typeof item === 'object' && item !== null && !isValidSchemaObject(item)) {
              return false;
            }
          }
        } else {
          // Recursively validate nested objects
          if (!isValidSchemaObject(value)) {
            return false;
          }
        }
      }
    }
  }

  return true;
};

// Sanitize JSON string to prevent XSS in JSON-LD
const sanitizeJsonString = (jsonString: string): string => {
  // Remove any potential script tags or javascript: protocols
  return jsonString
    .replace(/<script/gi, '')
    .replace(/<\/script>/gi, '')
    .replace(/javascript:/gi, '')
    .replace(/on\w+\s*=/gi, ''); // Remove event handlers
};

export default function SchemaScript({ schema }: SchemaScriptProps) {
  const schemas = Array.isArray(schema) ? schema : [schema];

  return (
    <>
      {schemas.map((schemaData, index) => {
        // Enhanced validation: Check if schemaData is valid and safe
        if (!isValidSchemaObject(schemaData)) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Invalid or unsafe schema data:', schemaData);
          }
          return null;
        }

        try {
          // Safely stringify the schema
          const jsonString = JSON.stringify(schemaData, null, 2);
          
          // Additional sanitization layer
          const sanitizedJson = sanitizeJsonString(jsonString);
          
          // Validate that the JSON is still valid after sanitization
          JSON.parse(sanitizedJson);
          
          return (
            <script
              key={index}
              type="application/ld+json"
              dangerouslySetInnerHTML={{
                __html: sanitizedJson,
              }}
            />
          );
        } catch (error) {
          if (process.env.NODE_ENV === 'development') {
            console.error('Error processing schema:', error);
          }
          return null;
        }
      })}
    </>
  );
}

