import React, { useState, useContext } from 'react';
import { ThemeContext } from '../App';

interface TechIconProps {
    name: string;
    fallbackUrl?: string;
    size?: number;
    className?: string;
}

// Mapping des couleurs par technologie
const TECH_COLORS: Record<string, string> = {
    'react': '#61DAFB',
    'typescript': '#3178C6',
    'flutter': '#02569B',
    'tailwindcss': '#06B6D4',
    'shadcnui': '#000000',
    'bootstrap': '#7952B3',
    'antdesign': '#0170FE',
    'laravel': '#FF2D20',
    'nestjs': '#E0234E',
    'nodejs': '#339933',
    'express': '#000000',
    'php': '#777BB4',
    'mysql': '#4479A1',
    'postgresql': '#4169E1',
    'sqlite': '#003B57',
    'mongodb': '#47A248',
    'aws': '#FF9900',
    'reactquery': '#FF4154',
    'vite': '#646CFF',
    'docker': '#2496ED',
    'git': '#F05032',
    'postman': '#FF6C37',
    'jsonwebtokens': '#000000',
    'swagger': '#85EA2D',
    'figma': '#F24E1E'
};

// SVG noms normalisés (remplace caractères spéciaux)
const normalizeName = (name: string): string => {
    return name
        .toLowerCase()
        .replace(/[^a-z0-9]/g, '')
        .replace('nodejs', 'nodedotjs')
        .replace('shadcnui', 'shadcnui')
        .replace('jsonwebtokens', 'jsonwebtokens');
};

const TechIcon: React.FC<TechIconProps> = ({
    name,
    fallbackUrl,
    size = 32,
    className = ''
}) => {
    const { isDark } = useContext(ThemeContext);
    const [useLocal, setUseLocal] = useState(true);
    const [imageError, setImageError] = useState(false);

    const normalizedName = normalizeName(name);
    const localIconPath = `/icons/tech/${normalizedName}.svg`;

    // Couleur adaptée au thème
    const techColor = TECH_COLORS[normalizedName];
    const iconColor = techColor === '#000000' || techColor === 'white'
        ? (isDark ? '#ffffff' : '#000000')
        : techColor;

    // Si on doit utiliser le fallback externe
    if (!useLocal || imageError) {
        return (
            <img
                src={fallbackUrl}
                alt={`${name} logo`}
                width={size}
                height={size}
                className={`transition-all duration-300 ${className}`}
                loading="lazy"
                onError={() => setImageError(true)}
            />
        );
    }

    return (
        <img
            src={localIconPath}
            alt={`${name} logo`}
            width={size}
            height={size}
            className={`transition-all duration-300 ${className}`}
            loading="lazy"
            onError={() => setUseLocal(false)}
            style={{
                filter: techColor === '#000000' && isDark ? 'invert(1)' : 'none'
            }}
        />
    );
};

export default TechIcon;