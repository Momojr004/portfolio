import React from 'react';
import { Helmet } from 'react-helmet-async';
import { useLocation } from 'react-router-dom';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
    publishedDate?: string;
    modifiedDate?: string;
    noindex?: boolean;
}

const BASE_URL = 'https://momo.terangadev.com';

const SEO: React.FC<SEOProps> = ({
    title = 'Mouhamed Pouye - Développeur Full-Stack & Entrepreneur Tech | Dakar',
    description = 'Développeur Full-Stack & co-fondateur TerangaDev. Spécialisé en React, Node.js, Laravel, Flutter. Digitalisation des PME africaines. Basé à Dakar, Sénégal.',
    keywords = 'développeur full-stack dakar, react developer sénégal, node.js, typescript, laravel, flutter, terangadev, digitalisation pme afrique, mouhamed pouye, freelance développeur sénégal',
    image = '/gallerie/photos/profil.webp',
    url,
    type = 'website',
    author = 'Mouhamed Pouye',
    publishedDate,
    modifiedDate,
    noindex = false
}) => {
    const location = useLocation();

    const canonicalUrl = url || `${BASE_URL}${location.pathname}`;

    const fullImageUrl = image.startsWith('http')
        ? image
        : `${BASE_URL}${image}`;

    const siteTitle = 'Mouhamed Pouye - Développeur Full-Stack';
    const fullTitle = title.includes('Mouhamed Pouye') ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="robots" content={noindex ? 'noindex, nofollow' : 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1'} />
            <link rel="canonical" href={canonicalUrl} />

            {/* Geo Tags */}
            <meta name="geo.region" content="SN-DK" />
            <meta name="geo.placename" content="Dakar" />
            <meta name="geo.position" content="14.6928;-17.4467" />
            <meta name="ICBM" content="14.6928, -17.4467" />

            {/* Language */}
            <meta httpEquiv="content-language" content="fr" />
            <link rel="alternate" hrefLang="fr" href={canonicalUrl} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={canonicalUrl} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={fullImageUrl} />
            <meta property="og:image:width" content="1200" />
            <meta property="og:image:height" content="630" />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content="Mouhamed Pouye — Portfolio" />
            <meta property="og:locale" content="fr_FR" />
            {publishedDate && <meta property="article:published_time" content={publishedDate} />}
            {modifiedDate && <meta property="article:modified_time" content={modifiedDate} />}

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={canonicalUrl} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={fullImageUrl} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:creator" content="@guilganee" />
            <meta name="twitter:site" content="@guilganee" />

            {/* Theme */}
            <meta name="theme-color" content="#F5B731" />
            <meta name="msapplication-TileColor" content="#F5B731" />

            {/* Schema.org structured data — Person */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "@id": `${BASE_URL}/#person`,
                    "name": "Mouhamed Pouye",
                    "alternateName": "Momo",
                    "url": BASE_URL,
                    "image": {
                        "@type": "ImageObject",
                        "url": `${BASE_URL}/gallerie/photos/profil.webp`,
                        "width": 800,
                        "height": 800
                    },
                    "description": "Développeur Full-Stack & Entrepreneur Tech. Co-fondateur de TerangaDev, spécialisé dans la digitalisation des PME africaines.",
                    "jobTitle": "Développeur Full-Stack & Entrepreneur",
                    "worksFor": [
                        {
                            "@type": "Organization",
                            "name": "TerangaDev",
                            "url": "https://terangadev.com",
                            "description": "Digitalisation des PME africaines"
                        },
                        {
                            "@type": "Organization",
                            "name": "EcoMed24",
                            "url": "https://ecomed24.com",
                            "description": "Écosystème de santé numérique pour l'Afrique"
                        }
                    ],
                    "address": {
                        "@type": "PostalAddress",
                        "addressLocality": "Dakar",
                        "addressCountry": "SN"
                    },
                    "sameAs": [
                        "https://github.com/Momojr004",
                        "https://www.linkedin.com/in/mouhamed-pouye-753462271/",
                        "https://www.instagram.com/guilganee"
                    ],
                    "knowsAbout": [
                        "React", "TypeScript", "Node.js", "Laravel", "Flutter",
                        "NestJS", "PostgreSQL", "MySQL", "MongoDB", "AWS",
                        "Full-Stack Development", "Digitalisation PME", "SaaS"
                    ],
                    "email": "momo@terangadev.com",
                    "knowsLanguage": ["fr", "en"]
                })}
            </script>

            {/* Schema.org — WebSite (pour Google Sitelinks Search Box) */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "WebSite",
                    "url": BASE_URL,
                    "name": "Mouhamed Pouye — Portfolio",
                    "description": "Portfolio de Mouhamed Pouye, développeur Full-Stack & entrepreneur tech basé à Dakar.",
                    "author": { "@id": `${BASE_URL}/#person` },
                    "inLanguage": "fr"
                })}
            </script>
        </Helmet>
    );
};

export default SEO;