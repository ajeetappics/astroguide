'use client';

import React, { useState } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import { FiPhone, FiMail, FiMapPin, FiArrowRight } from 'react-icons/fi';

interface FormData {
  name: string;
  phone: string;
  email: string;
  subject: string; // Add this line
  message: string;
}

interface FormErrors {
  name?: string;
  phone?: string;
  email?: string;
  subject?: string; // Add this line
  message?: string;
}

export default function ContactUsPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    email: '',
    subject: '', // Add this line
    message: '',
  });

  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined,
      }));
    }
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Name is required';
    }

    if (!formData.phone.trim()) {
      newErrors.phone = 'Phone is required';
    } else if (!/^\d{10}$/.test(formData.phone.replace(/\D/g, ''))) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email address';
    }

    if (!formData.subject.trim()) { // Add this block
      newErrors.subject = 'Subject is required'; // Add this line
    }

    if (!formData.message.trim()) {
      newErrors.message = 'Message is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const API_URL = process.env.NEXT_PUBLIC_API_URL;
    if (!validateForm()) {
      toast.error('Please fill all required fields correctly');
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await axios.post(
        `${API_URL}/user/customerSupport`,
        {
          name: formData.name,
          email: formData.email,
          mobile: formData.phone,
          subject: formData.subject, // Add this line
          description: formData.message,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        toast.success('Message sent successfully! We will contact you soon.');
        // Reset form
        setFormData({
          name: '',
          phone: '',
          email: '',
          subject: '', // Add this line
          message: '',
        });
        // Clear any errors
        setErrors({});
      }
    } catch (error: unknown) {
      console.error('Error submitting form:', error);
      const message = error instanceof Error ? error.message : 'Something went wrong';
      toast.error(message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#E5DDD5] pt-24 pb-20 px-2">
      {/* Header Section */}
      <div className="pt-8 pb-8 text-center text-[#7B3F3F]">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">Contact Us</h1>
        <div className="flex items-center justify-center gap-2 text-lg text-gray-600">
          <span className="hover:underline cursor-pointer">Home</span>
          <span>/</span>
          <span>Contact Us</span>
        </div>
      </div>

      {/* Main Content Section */}
      <div className="container mx-auto px-4 pb-20">
        <div className="w-3/4 mx-auto">
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            <div className="flex justify-center">
              {/* Contact Form */}
              <div className="p-8 md:p-12 w-full">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name and Phone Row */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div>
                      <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Name"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.name ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-[#7B3F3F] transition-all text-black placeholder:text-gray-500`}
                      />
                      {errors.name && (
                        <p className="text-red-500 text-sm mt-1">{errors.name}</p>
                      )}
                    </div>

                    {/* Phone Field */}
                    <div>
                      <input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="Phone"
                        className={`w-full px-4 py-3 rounded-lg border ${errors.phone ? 'border-red-500' : 'border-gray-300'
                          } focus:outline-none focus:ring-2 focus:ring-[#7B3F3F] transition-all text-black placeholder:text-gray-500`}
                      />
                      {errors.phone && (
                        <p className="text-red-500 text-sm mt-1">{errors.phone}</p>
                      )}
                    </div>
                  </div>

                  {/* Email Field */}
                  <div>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder="Email"
                      className={`w-full px-4 py-3 rounded-lg border ${errors.email ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#7B3F3F] transition-all text-black placeholder:text-gray-500`}
                    />
                    {errors.email && (
                      <p className="text-red-500 text-sm mt-1">{errors.email}</p>
                    )}
                  </div>

                  {/* Subject Field */}
                  <div>
                    <input
                      type="text"
                      name="subject"
                      value={formData.subject} // Add this line
                      onChange={handleChange}
                      placeholder="Subject" // Add this line
                      className={`w-full px-4 py-3 rounded-lg border ${errors.subject ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#7B3F3F] transition-all text-black placeholder:text-gray-500`}
                    />
                    {errors.subject && ( // Add this line
                      <p className="text-red-500 text-sm mt-1">{errors.subject}</p> // Add this line
                    )}
                  </div>

                  {/* Message Field */}
                  <div>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      placeholder="Message"
                      rows={6}
                      className={`w-full px-4 py-3 rounded-lg border ${errors.message ? 'border-red-500' : 'border-gray-300'
                        } focus:outline-none focus:ring-2 focus:ring-[#7B3F3F] transition-all resize-none text-black placeholder:text-gray-500`}
                    />
                    {errors.message && (
                      <p className="text-red-500 text-sm mt-1">{errors.message}</p>
                    )}
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-gradient-to-r from-[#8B4F4F] to-[#7B3F3F] text-white px-8 py-3 rounded-lg font-semibold hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Sending...' : 'Send your Message'}
                    <FiArrowRight className="w-5 h-5" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}