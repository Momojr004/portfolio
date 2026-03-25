import React, { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateFiles, formatFileSize, getFileIcon, ALLOWED_FILE_TYPES } from '../utils/fileUtils';

interface FileUploadProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
    maxFiles?: number;
    className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    files,
    onFilesChange,
    maxFiles = 3,
    className = ''
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Construction des types acceptés avec MIME types ET extensions pour compatibilité maximale
    const allAcceptedTypes = 'application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,text/plain,image/jpeg,image/png,image/jpg,.pdf,.doc,.docx,.txt,.jpg,.jpeg,.png';
    const handleFiles = useCallback((newFiles: FileList) => {
        if (newFiles.length === 0) return;

        const fileArray = Array.from(newFiles);
        const allFiles = [...files, ...fileArray];

        // Validation
        const validation = validateFiles(allFiles);
        if (!validation.valid) {
            setError(validation.error || 'Erreur de validation des fichiers');
            return;
        }

        setError('');
        onFilesChange(allFiles);
    }, [files, onFilesChange]);

    const handleDrop = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);

        if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
            handleFiles(e.dataTransfer.files);
        }
    }, [handleFiles]);

    const handleDrag = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
    }, []);

    const handleDragIn = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(true);
    }, []);

    const handleDragOut = useCallback((e: React.DragEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setDragActive(false);
    }, []);

    const handleFileInput = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            handleFiles(e.target.files);
        }
        // Reset input pour permettre de sélectionner le même fichier à nouveau
        e.target.value = '';
    }, [handleFiles]);

    const removeFile = useCallback((index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onFilesChange(newFiles);
        setError('');
    }, [files, onFilesChange]);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    // Détection mobile pour adapter l'interface
    const isMobile = typeof window !== 'undefined' &&
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Un seul input pour tous les types */}
            <input
                ref={fileInputRef}
                type="file"
                multiple
                accept={allAcceptedTypes}
                capture="environment" // Active la caméra sur mobile pour les images
                onChange={handleFileInput}
                className="hidden"
                aria-label="Sélectionner fichiers ou prendre photo"
            />

            {/* Zone principale - Complètement cliquable */}
            <motion.div
                className={`
                    relative border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer
                    ${dragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }
                    ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
                    ${isMobile ? 'p-6' : 'p-8'}
                `}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
                whileHover={{ scale: isMobile ? 1.01 : 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <div className="text-center space-y-4">
                    <div className={`${isMobile ? 'text-4xl' : 'text-5xl'}`}>
                        {dragActive ? '📂' : '📎'}
                    </div>

                    <div>
                        <p className={`font-medium text-gray-900 dark:text-white ${isMobile ? 'text-lg' : 'text-xl'}`}>
                            {dragActive ? 'Déposez vos fichiers ici' : 'Cliquez pour sélectionner'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            {isMobile ? 'ou glissez-déposez depuis votre appareil' : 'Glissez-déposez ou cliquez n\'importe où dans cette zone'}
                        </p>
                    </div>

                    {/* Informations sur les types acceptés */}
                    <div className="space-y-1">
                        <p className={`text-gray-400 dark:text-gray-500 ${isMobile ? 'text-xs' : 'text-xs'}`}>
                            PDF, Word, TXT, Images • Max {maxFiles} fichiers • 5MB/fichier
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500">
                            {isMobile ? '📷 Inclut l\'accès caméra' : '👆 Cliquez n\'importe où dans cette zone'}
                        </p>
                    </div>
                </div>
            </motion.div>

            {/* Messages d'erreur */}
            <AnimatePresence>
                {error && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="text-red-600 text-sm bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800"
                    >
                        <p className="font-medium">❌ {error}</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Liste des fichiers sélectionnés - Optimisée mobile */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-3"
                    >
                        <h4 className="font-medium text-gray-900 dark:text-white text-sm">
                            📎 Fichiers sélectionnés ({files.length})
                        </h4>

                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <motion.div
                                    key={`${file.name}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className={`
                                        flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border
                                        ${isMobile ? 'min-h-[60px]' : 'min-h-[50px]'}
                                    `}
                                >
                                    <div className="flex items-center space-x-3 flex-1 min-w-0">
                                        <span className={`${isMobile ? 'text-xl' : 'text-lg'}`}>
                                            {getFileIcon(file.type)}
                                        </span>
                                        <div className="flex-1 min-w-0">
                                            <p className={`
                                                font-medium text-gray-900 dark:text-white truncate
                                                ${isMobile ? 'text-sm max-w-[180px]' : 'text-sm max-w-[220px]'}
                                            `}>
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">
                                                {formatFileSize(file.size)}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Bouton supprimer - Plus grande zone tactile sur mobile */}
                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className={`
                                            text-red-500 hover:text-red-700 transition-colors rounded-full
                                            focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-1
                                            ${isMobile ? 'p-2 min-w-[40px] min-h-[40px]' : 'p-1 min-w-[32px] min-h-[32px]'}
                                            flex items-center justify-center
                                        `}
                                        title="Supprimer ce fichier"
                                        aria-label={`Supprimer le fichier ${file.name}`}
                                    >
                                        <svg
                                            className={`${isMobile ? 'w-5 h-5' : 'w-4 h-4'}`}
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M6 18L18 6M6 6l12 12"
                                            />
                                        </svg>
                                    </button>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default FileUpload;