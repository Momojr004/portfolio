// Utilitaires pour la gestion des fichiers uploadés
export interface FileValidationResult {
    valid: boolean;
    error?: string;
    warnings?: string[];
}

// Types de fichiers autorisés
export const ALLOWED_FILE_TYPES = {
    'application/pdf': '.pdf',
    'application/msword': '.doc',
    'application/vnd.openxmlformats-officedocument.wordprocessingml.document': '.docx',
    'text/plain': '.txt',
    'image/jpeg': '.jpg',
    'image/png': '.png'
};

// Taille maximale par fichier (5MB)
const MAX_FILE_SIZE = 5 * 1024 * 1024;

// Nombre maximum de fichiers
const MAX_FILES_COUNT = 3;

export const validateFile = (file: File): FileValidationResult => {
    // Vérifier le type de fichier
    if (!Object.keys(ALLOWED_FILE_TYPES).includes(file.type)) {
        return {
            valid: false,
            error: `Type de fichier non autorisé: ${file.name}. Types acceptés: PDF, Word, TXT, JPG, PNG`
        };
    }

    // Vérifier la taille
    if (file.size > MAX_FILE_SIZE) {
        return {
            valid: false,
            error: `Fichier trop volumineux: ${file.name}. Taille maximum: 5MB`
        };
    }

    // Vérifier le nom de fichier
    if (file.name.length > 100) {
        return {
            valid: false,
            error: `Nom de fichier trop long: ${file.name}`
        };
    }

    return { valid: true };
};

export const validateFiles = (files: File[]): FileValidationResult => {
    // Vérifier le nombre de fichiers
    if (files.length > MAX_FILES_COUNT) {
        return {
            valid: false,
            error: `Trop de fichiers sélectionnés. Maximum autorisé: ${MAX_FILES_COUNT}`
        };
    }

    // Vérifier chaque fichier
    for (const file of files) {
        const validation = validateFile(file);
        if (!validation.valid) {
            return validation;
        }
    }

    // Vérifier la taille totale
    const totalSize = files.reduce((sum, file) => sum + file.size, 0);
    if (totalSize > MAX_FILE_SIZE * 2) {
        return {
            valid: false,
            error: 'Taille totale des fichiers trop importante (max 10MB au total)'
        };
    }

    return { valid: true };
};

export const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
};

export const getFileIcon = (fileType: string): string => {
    if (fileType.includes('pdf')) return '📄';
    if (fileType.includes('word') || fileType.includes('document')) return '📝';
    if (fileType.includes('text')) return '📄';
    if (fileType.includes('image')) return '🖼️';
    return '📎';
};