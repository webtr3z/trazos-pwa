"use client";

import React, { useState, useRef, useCallback } from "react";
import { cn } from "@/lib/utils";
import { Upload, X, File, Image as ImageIcon } from "lucide-react";

interface FileDropZoneProps {
  accept: string;
  maxSize?: number; // in MB
  onFileSelect: (file: File) => void;
  onFileRemove: () => void;
  selectedFile?: File | null;
  existingFile?: string | null; // URL or path to existing file
  type: 'image' | 'document';
  required?: boolean;
  className?: string;
}

export function FileDropZone({
  accept,
  maxSize,
  onFileSelect,
  onFileRemove,
  selectedFile,
  existingFile,
  type,
  required = false,
  className
}: FileDropZoneProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const validateFile = useCallback((file: File): string | null => {
    if (type === 'image') {
      const allowedTypes = ['image/png', 'image/jpg', 'image/jpeg', 'image/gif'];
      if (!allowedTypes.includes(file.type)) {
        return 'Solo se permiten archivos PNG, JPG, JPEG y GIF';
      }
    } else if (type === 'document') {
      if (file.type !== 'application/pdf') {
        return 'Solo se permiten archivos PDF';
      }
    }

    if (maxSize && file.size > maxSize * 1024 * 1024) {
      return `El archivo excede el tamaño máximo de ${maxSize}MB`;
    }

    return null;
  }, [type, maxSize]);

  const handleFile = useCallback((file: File) => {
    const validationError = validateFile(file);
    if (validationError) {
      setError(validationError);
      return;
    }

    setError(null);
    onFileSelect(file);
  }, [validateFile, onFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  }, []);

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const handleClick = useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      handleFile(files[0]);
    }
  }, [handleFile]);

  const getFileIcon = () => {
    if (type === 'image') {
      return selectedFile ? (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Preview"
          className="w-16 h-16 object-cover rounded-md"
        />
      ) : (
        <ImageIcon className="w-12 h-12 text-muted-foreground" />
      );
    }
    
    return <File className="w-12 h-12 text-muted-foreground" />;
  };

  const getFileInfo = () => {
    if (!selectedFile) return null;
    
    const sizeInMB = (selectedFile.size / (1024 * 1024)).toFixed(2);
    return (
      <div className="text-sm text-muted-foreground">
        {selectedFile.name} • {sizeInMB}MB
      </div>
    );
  };

  const getExistingFileIcon = () => {
    if (type === 'image') {
      return <ImageIcon className="w-12 h-12 text-muted-foreground" />;
    }
    return <File className="w-12 h-12 text-muted-foreground" />;
  };

  const getExistingFileInfo = () => {
    if (!existingFile) return null;
    
    const fileName = existingFile.split('/').pop() || 'Archivo existente';
    return (
      <div className="text-sm text-muted-foreground">
        {fileName} • Archivo existente
      </div>
    );
  };

  const getAcceptText = () => {
    if (type === 'image') {
      return `PNG, JPG, JPEG, GIF${maxSize ? ` • Máximo ${maxSize}MB` : ''}`;
    }
    return `PDF${maxSize ? ` • Máximo ${maxSize}MB` : ''}`;
  };

  if (selectedFile || existingFile) {
    return (
      <div className={cn("relative", className)}>
        <div className="border-2 border-dashed border-primary/20 rounded-lg p-6 bg-muted/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              {selectedFile ? getFileIcon() : getExistingFileIcon()}
              <div>
                <div className="font-medium">
                  {selectedFile ? selectedFile.name : existingFile?.split('/').pop() || 'Archivo existente'}
                </div>
                {selectedFile ? getFileInfo() : getExistingFileInfo()}
              </div>
            </div>
            <button
              type="button"
              onClick={onFileRemove}
              className="p-2 hover:bg-muted rounded-md transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
          {existingFile && !selectedFile && type === 'image' && (
            <div className="mt-4">
              <img 
                src={existingFile} 
                alt="Preview" 
                className="w-20 h-20 object-cover rounded-lg border"
              />
            </div>
          )}
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept={accept}
          onChange={handleFileInputChange}
          className="hidden"
        />
      </div>
    );
  }

  return (
    <div className={cn("relative", className)}>
      <div
        className={cn(
          "border-2 border-dashed rounded-lg p-8 text-center transition-all cursor-pointer",
          isDragOver
            ? "border-primary bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/20",
          error && "border-destructive bg-destructive/5"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={handleClick}
      >
        <div className="flex flex-col items-center gap-4">
          <div className="p-4 rounded-full bg-muted">
            <Upload className="w-8 h-8 text-muted-foreground" />
          </div>
          
          <div className="space-y-2">
            <div className="font-medium">
              {isDragOver ? "Suelta el archivo aquí" : "Arrastra y suelta o haz clic para seleccionar"}
            </div>
            <div className="text-sm text-muted-foreground">
              {getAcceptText()}
            </div>
          </div>
        </div>
      </div>

      {error && (
        <div className="mt-2 text-sm text-destructive text-center">
          {error}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept={accept}
        onChange={handleFileInputChange}
        className="hidden"
        required={required}
      />
    </div>
  );
}
