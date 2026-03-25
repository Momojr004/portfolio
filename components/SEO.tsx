import React from 'react';
import { Helmet } from 'react-helmet-async';

interface SEOProps {
    title?: string;
    description?: string;
    keywords?: string;
    image?: string;
    url?: string;
    type?: 'website' | 'article' | 'profile';
    author?: string;
}

const SEO: React.FC<SEOProps> = ({
    title = 'Mouhamed Pouye - Développeur Full-Stack | Portfolio',
    description = 'Développeur Full-Stack passionné créant des solutions web innovantes. Spécialisé en React, Node.js, TypeScript. Disponible pour vos projets.',
    keywords = 'développeur full-stack, react, node.js, typescript, javascript, web development, portfolio, mouhamed pouye, freelance développeur',
    image = '/gallerie/photos/seo-preview.jpg',
    url = 'https://mohamedpouye.dev',
    type = 'website',
    author = 'Mouhamed Pouye'
}) => {
    const siteTitle = 'Mouhamed Pouye - Développeur Full-Stack';
    const fullTitle = title.includes(siteTitle) ? title : `${title} | ${siteTitle}`;

    return (
        <Helmet>
            {/* Basic Meta Tags */}
            <title>{fullTitle}</title>
            <meta name="description" content={description} />
            <meta name="keywords" content={keywords} />
            <meta name="author" content={author} />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta name="robots" content="index, follow" />
            <link rel="canonical" href={url} />

            {/* Open Graph / Facebook */}
            <meta property="og:type" content={type} />
            <meta property="og:url" content={url} />
            <meta property="og:title" content={fullTitle} />
            <meta property="og:description" content={description} />
            <meta property="og:image" content={image} />
            <meta property="og:image:alt" content={title} />
            <meta property="og:site_name" content={siteTitle} />
            <meta property="og:locale" content="fr_FR" />

            {/* Twitter Card */}
            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:url" content={url} />
            <meta name="twitter:title" content={fullTitle} />
            <meta name="twitter:description" content={description} />
            <meta name="twitter:image" content={image} />
            <meta name="twitter:image:alt" content={title} />
            <meta name="twitter:creator" content="@guilganee" />

            {/* Additional SEO Tags */}
            <meta name="theme-color" content="#CCFF00" />
            <meta name="msapplication-TileColor" content="#CCFF00" />

            {/* Schema.org structured data */}
            <script type="application/ld+json">
                {JSON.stringify({
                    "@context": "https://schema.org",
                    "@type": "Person",
                    "name": "Mouhamed Pouye",
                    "url": url,
                    "image": image,
                    "description": description,
                    "jobTitle": "Développeur Full-Stack",
                    "worksFor": {
                        "@type": "Organization",
                        "name": "Freelance"
                    },
                    "sameAs": [
                        "https://github.com/Momojr004",
                        "https://www.linkedin.com/in/mouhamed-pouye-753462271/",
                        "https://www.instagram.com/guilganee"
                    ],
                    "knowsAbout": [
                        "JavaScript",
                        "TypeScript",
                        "React",
                        "Node.js",
                        "Full-Stack Development",
                        "Web Development"
                    ],
                    "email": "guilganee@gmail.com"
                })}
            </script>
        </Helmet>
    );
};

export default SEO;