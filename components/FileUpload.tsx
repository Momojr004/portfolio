import React, { useCallback, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { validateFiles, formatFileSize, getFileIcon } from '../utils/fileUtils';

interface FileUploadProps {
    files: File[];
    onFilesChange: (files: File[]) => void;
    maxFiles?: number;
    acceptedTypes?: string;
    className?: string;
}

const FileUpload: React.FC<FileUploadProps> = ({
    files,
    onFilesChange,
    maxFiles = 3,
    acceptedTypes = '.pdf,.doc,.docx,.txt,.jpg,.png',
    className = ''
}) => {
    const [dragActive, setDragActive] = useState(false);
    const [error, setError] = useState<string>('');
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFiles = useCallback((newFiles: FileList) => {
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
    }, [handleFiles]);

    const removeFile = useCallback((index: number) => {
        const newFiles = files.filter((_, i) => i !== index);
        onFilesChange(newFiles);
        setError('');
    }, [files, onFilesChange]);

    const openFileDialog = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-4 ${className}`}>
            {/* Zone de Drop */}
            <motion.div
                className={`
          relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer
          ${dragActive
                        ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                        : 'border-gray-300 dark:border-gray-600 hover:border-gray-400 dark:hover:border-gray-500'
                    }
          ${error ? 'border-red-500 bg-red-50 dark:bg-red-900/20' : ''}
        `}
                onDragEnter={handleDragIn}
                onDragLeave={handleDragOut}
                onDragOver={handleDrag}
                onDrop={handleDrop}
                onClick={openFileDialog}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept={acceptedTypes}
                    onChange={handleFileInput}
                    className="hidden"
                />

                <div className="space-y-3">
                    <div className="text-4xl">
                        {dragActive ? '📂' : '📎'}
                    </div>

                    <div>
                        <p className="text-lg font-medium text-gray-900 dark:text-white">
                            {dragActive ? 'Déposez vos fichiers ici' : 'Ajoutez des documents'}
                        </p>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                            Glissez-déposez ou cliquez pour sélectionner
                        </p>
                        <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                            PDF, Word, TXT, Images • Max {maxFiles} fichiers • 5MB/fichier
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

            {/* Liste des fichiers sélectionnés */}
            <AnimatePresence>
                {files.length > 0 && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        className="space-y-2"
                    >
                        <h4 className="font-medium text-gray-900 dark:text-white">
                            📎 Fichiers sélectionnés ({files.length})
                        </h4>

                        <div className="space-y-2">
                            {files.map((file, index) => (
                                <motion.div
                                    key={`${file.name}-${index}`}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 20 }}
                                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg border"
                                >
                                    <div className="flex items-center space-x-3">
                                        <span className="text-xl">{getFileIcon(file.type)}</span>
                                        <div>
                                            <p className="text-sm font-medium text-gray-900 dark:text-white truncate max-w-[200px]">
                                                {file.name}
                                            </p>
                                            <p className="text-xs text-gray-500">{formatFileSize(file.size)}</p>
                                        </div>
                                    </div>

                                    <button
                                        type="button"
                                        onClick={() => removeFile(index)}
                                        className="text-red-500 hover:text-red-700 transition-colors p-1 rounded"
                                        title="Supprimer ce fichier"
                                    >
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
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