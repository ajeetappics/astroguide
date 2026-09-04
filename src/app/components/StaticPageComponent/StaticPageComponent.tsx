'use client';

import { mainLogo } from "@/assets/images";

import commonService, { StaticPage, StaticPageSlug } from '@/services/comman/comman';
import Image from 'next/image';
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from 'react';
import DOMPurify from 'dompurify';
// Define the props for our reusable component
interface StaticPageComponentProps {
    slug: StaticPageSlug;
    defaultTitle: string; // A fallback title to show while loading
}

export default function StaticPageComponent({ slug, defaultTitle }: StaticPageComponentProps) {
    const [pageContent, setPageContent] = useState<StaticPage | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);
    const [error, setError] = useState<string>('');
    const router = useRouter();

    useEffect(() => {
        const loadPageContent = async () => {
            setIsLoading(true);
            setError('');
            try {
                // Call the service function with the slug passed via props
                const response = await commonService.fetchStaticPage(slug);
                setPageContent(response.data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setIsLoading(false);
            }
        };

        loadPageContent();
    }, [slug]); // Re-run the effect if the slug changes

    const renderContent = () => {
        if (isLoading) {
            return <div className="text-center text-[#5C5C5C]">Loading...</div>;
        }

        if (error) {
            return <div className="text-center text-red-500">Error: {error}</div>;
        }

        if (!pageContent) {
            return <div className="text-center text-[#5C5C5C]">No content found.</div>;
        }

        // Sanitize HTML content before rendering to prevent XSS attacks (React2Shell protection)
        const sanitizedContent = DOMPurify.sanitize(pageContent.content, {
            ALLOWED_TAGS: ['p', 'br', 'strong', 'em', 'u', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'ul', 'ol', 'li', 'a', 'span', 'div'],
            ALLOWED_ATTR: ['href', 'target', 'rel', 'class', 'id'],
            ALLOW_DATA_ATTR: false,
        });

        return <div dangerouslySetInnerHTML={{ __html: sanitizedContent }} />;
    };

    return (
        <main className="bg-[#EEE3D9] min-h-screen pt-40 pb-20 px-2">
            <div className="max-w-4xl mx-auto bg-white/50 p-6 sm:p-10 rounded-lg shadow-md">

                <div className="relative mb-10">
                    {/* Botón de retroceso */}
                    {/* <button
                        onClick={() => router.back()}
                        className="absolute top-0 left-0 bg-white rounded-full p-2 w-10 h-10 flex items-center justify-center shadow-md hover:bg-gray-100 transition-colors"
                        aria-label="Go back"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                        </svg>
                    </button> */}

                    {/* Contenedor para el logo y el título */}
                    <div className="text-center">
                        {/* Logo */}
                        <div className="flex justify-center mb-4">
                            <Image
                                src={mainLogo} // <-- ¡IMPORTANTE! Reemplaza esto con la ruta a tu logo
                                alt="AstroVani Logo"
                                width={60} // Ajusta el tamaño según sea necesario
                                height={60} // Ajusta el tamaño según sea necesario
                                className="rounded-lg"
                            />
                        </div>
                    </div>
                </div>

                <h1 className="text-3xl sm:text-4xl md:text-5xl font-inria text-[#72271E] text-center mb-10">
                    {/* Show API title if available, otherwise show the default title */}
                    {pageContent?.pageName || defaultTitle}
                </h1>

                <div className="space-y-8 font-helvetica text-[#5C5C5C] leading-relaxed">
                    {renderContent()}
                </div>

            </div>
        </main>
    );
}
