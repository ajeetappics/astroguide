"use client"
import { useEffect } from "react"

export default function Layout({ children }: { children: React.ReactNode }) {
    useEffect(() => {
        window.scrollTo({ top: 0, left: 0, behavior: 'instant' });
        document.documentElement.scrollTop = 0;
        document.body.scrollTop = 0;
        if (typeof window !== 'undefined' && (window as any).lenis) {
            (window as any).lenis.scrollTo(0, { immediate: true });
        }
    }, [children]);
    return children;
}