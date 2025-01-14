"use client";

import { Inter } from 'next/font/google';
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import "../app/globals.css"; 
import { cn } from "@/lib/utils";

const inter = Inter({ 
  subsets: ['latin'], 
  weight: ['400', '500', '600', '700'],
  display: 'swap',
  variable: '--font-inter'
});

const defaultMetadata = {
  title: "Tenapedia - Professional Medical Learning Platform",
  description: "A comprehensive, cutting-edge learning management system designed for medical professionals in Ethiopia",
  keywords: "Professional Medical Education, Ethiopian Healthcare Training, Medical LMS, Continuous Professional Development",
  author: "Tenapedia Innovation Labs",
  company: "Tenapedia Technologies",
  openGraph: {
    title: "Tenapedia - Professional Medical Learning Platform",
    description: "Empowering medical professionals through advanced digital learning solutions",
    type: "website",
    locale: "en_ET",
    url: "https://tenapedia.com",
    siteName: "Tenapedia Medical Learning Platform"
  },
  robots: "index, follow",
  themeColor: "#1a80b6"
};

export default function RootLayout({ children, pageMetadata = {} }) {
  const metadata = { ...defaultMetadata, ...pageMetadata };

  return (
    <html 
      lang="en" 
      className="scroll-smooth"
    >
      <head>
        <meta charSet="UTF-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta 
          name="viewport" 
          content="width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no" 
        />
        
        <meta name="description" content={metadata.description} />
        <meta name="keywords" content={metadata.keywords} />
        <meta name="author" content={metadata.author} />
        <meta name="company" content={metadata.company} />
        <meta name="robots" content={metadata.robots} />
        <meta name="theme-color" content={metadata.themeColor} />

        <meta property="og:title" content={metadata.openGraph.title} />
        <meta property="og:description" content={metadata.openGraph.description} />
        <meta property="og:type" content={metadata.openGraph.type} />
        <meta property="og:locale" content={metadata.openGraph.locale} />
        <meta property="og:url" content={metadata.openGraph.url} />
        <meta property="og:site_name" content={metadata.openGraph.siteName} />
        
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:creator" content="@TenapediaLMS" />
        
        <title>{metadata.title}</title>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <link rel="canonical" href={metadata.openGraph.url} />
        
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
      </head>
      <body
        className={cn(
          "min-h-screen w-full overflow-x-hidden",
          inter.variable
        )}
        suppressHydrationWarning={true}
      >
        <a 
          href="#main-content" 
          className="
            fixed 
            top-4 
            left-4 
            bg-[#1a80b6] 
            text-white 
            px-4 py-2 
            z-50 
            opacity-0 
            pointer-events-none
            focus:opacity-100 
            focus:pointer-events-auto
            transition-all
            rounded-md
            shadow-md
            hover:bg-[#2196f3]
          "
        >
          Skip to Main Content
        </a>

        <div className="flex flex-col min-h-screen">
          <Header className="sticky top-0 z-40 shadow-md backdrop-blur-md bg-white/80" />
          
          <main
            id="main-content"
            className="min-h-screen w-full"
          >
            {children}
          </main>
          
          <Footer className="mt-auto" />
        </div>
      </body>
    </html>
  );
}