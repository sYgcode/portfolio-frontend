import React, { useRef, useState } from 'react';
import { Upload, X, Camera, Info } from 'lucide-react';

const FileUpload = ({ selectedFile, onFileSelect, onRemoveFile, compressionProgress, isUploading }) => {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [compressionInfo, setCompressionInfo] = useState(null);
  const fileInputRef = useRef(null);

  // Enhanced image compression with better quality settings
  const compressImage = (file, quality = 0.92, maxWidth = 2560, maxHeight = 1920) => {
  return new Promise((resolve, reject) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      let { width, height } = img;
      const originalWidth = width;
      const originalHeight = height;
      
      // Only compress if image is larger than max dimensions
      if (width > maxWidth || height > maxHeight) {
        const ratio = Math.min(maxWidth / width, maxHeight / height);
        width = Math.round(width * ratio);
        height = Math.round(height * ratio);
      }
      
      canvas.width = width;
      canvas.height = height;
      
      ctx.imageSmoothingEnabled = true;
      ctx.imageSmoothingQuality = 'high';
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob((blob) => {
        if (!blob || blob.size === 0) {
          // If compression failed, return original file
          console.warn('Compression failed, using original file');
          resolve(file);
          return;
        }
        
        const compressionRatio = blob.size / file.size;
        setCompressionInfo({
          originalSize: file.size,
          compressedSize: blob.size,
          compressionRatio: compressionRatio,
          originalDimensions: `${originalWidth} × ${originalHeight}`,
          newDimensions: `${width} × ${height}`
        });
        
        // Create proper File object
        const compressedFile = new File([blob], file.name, {
          type: 'image/jpeg',
          lastModified: Date.now()
        });
        
        resolve(compressedFile);
      }, 'image/jpeg', quality);
    };
    
    img.onerror = (error) => {
      console.error('Image load error:', error);
      resolve(file); // Fallback to original
    };
    
    img.src = URL.createObjectURL(file);
  });
};

  // Extract EXIF data from image
  const extractImageMetadata = async (file) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = () => {
        const metadata = {
          originalWidth: img.naturalWidth,
          originalHeight: img.naturalHeight,
          format: file.type,
          originalSizeKB: file.size / 1024,
          dateTaken: file.lastModified ? new Date(file.lastModified) : null
        };
        
        // Try to extract EXIF data if available (basic implementation)
        // In a real app, you might want to use a library like exif-js
        resolve(metadata);
      };
      img.src = URL.createObjectURL(file);
    });
  };

  const handleFileSelect = async (file) => {
  if (!file || !file.type.startsWith('image/')) {
    alert('Please select a valid image file');
    return;
  }

  if (file.size === 0) {
    alert('File appears to be empty. Please try another file.');
    return;
  }

  if (file.size > 50 * 1024 * 1024) {
    alert('File too large. Maximum size is 50MB.');
    return;
  }

  // Create preview
  const preview = URL.createObjectURL(file);
  setPreviewUrl(preview);
  
  try {
    // Extract metadata
    const metadata = await extractImageMetadata(file);
    
    let processedFile = file;
    
    // Only compress large files (and verify compression worked)
    if (file.size > 2 * 1024 * 1024 || metadata.originalWidth > 2560 || metadata.originalHeight > 1920) {
      const compressedFile = await compressImage(file, 0.92, 2560, 1920);
      
      // Verify compression didn't break the file
      if (compressedFile && compressedFile.size > 0) {
        processedFile = compressedFile;
      } else {
        console.warn('Compression failed, using original file');
        processedFile = file;
      }
    }
    
    // Final validation
    if (processedFile.size === 0) {
      throw new Error('Processed file is empty');
    }
    
    onFileSelect({
      file: processedFile,
      originalFile: file,
      originalWidth: metadata.originalWidth,
      originalHeight: metadata.originalHeight,
      format: metadata.format,
      originalSizeKB: metadata.originalSizeKB,
      sizeKB: processedFile.size / 1024,
      dateTaken: metadata.dateTaken,
      preview
    });
  } catch (error) {
    console.error('Processing failed:', error);
    // Always fallback to original file
    const metadata = await extractImageMetadata(file);
    onFileSelect({
      file,
      originalFile: file,
      originalWidth: metadata.originalWidth,
      originalHeight: metadata.originalHeight,
      format: metadata.format,
      originalSizeKB: metadata.originalSizeKB,
      sizeKB: file.size / 1024,
      dateTaken: metadata.dateTaken,
      preview
    });
  }
};

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = Array.from(e.dataTransfer.files);
    if (files.length > 0) {
      handleFileSelect(files[0]);
    }
  };

  const removeFile = () => {
    setPreviewUrl(null);
    setCompressionInfo(null);
    onRemoveFile();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  React.useEffect(() => {
    if (selectedFile?.preview) {
      setPreviewUrl(selectedFile.preview);
    }
  }, [selectedFile]);

  const formatFileSize = (bytes) => {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium text-gray-700">Image</label>
      <div
        className={`relative border-2 border-dashed rounded-2xl p-6 sm:p-8 transition-all duration-200 ${
          isDragging
            ? 'border-blue-400 bg-blue-50/50'
            : selectedFile
            ? 'border-green-300 bg-green-50/20'
            : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50/50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        {!selectedFile ? (
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-gradient-to-br from-blue-100 to-purple-100 rounded-2xl flex items-center justify-center mb-4">
              <Upload className="h-8 w-8 text-blue-600" />
            </div>
            <p className="text-gray-900 font-medium mb-2">
              Drop your image here, or <span className="text-blue-600 cursor-pointer" onClick={() => fileInputRef.current?.click()}>browse</span>
            </p>
            <p className="text-sm text-gray-500 mb-4">
              PNG, JPG, GIF up to 50MB
            </p>
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center px-6 py-2 bg-white border border-gray-200 rounded-xl text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            >
              <Camera className="h-4 w-4 mr-2" />
              Select Image
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="h-12 w-12 bg-green-100 rounded-xl flex items-center justify-center flex-shrink-0">
                  <Camera className="h-6 w-6 text-green-600" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-gray-900 truncate">{selectedFile.file?.name || selectedFile.name}</p>
                  <p className="text-sm text-gray-500">
                    {formatFileSize(selectedFile.file?.size || selectedFile.size)}
                  </p>
                  {selectedFile.originalWidth && selectedFile.originalHeight && (
                    <p className="text-xs text-gray-400">
                      {selectedFile.originalWidth} × {selectedFile.originalHeight}
                    </p>
                  )}
                </div>
              </div>
              <button
                type="button"
                onClick={removeFile}
                className="h-8 w-8 bg-gray-100 hover:bg-red-100 rounded-lg flex items-center justify-center transition-colors group flex-shrink-0"
              >
                <X className="h-4 w-4 text-gray-500 group-hover:text-red-600" />
              </button>
            </div>
            
            {previewUrl && (
              <div className="relative">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-full h-48 sm:h-64 object-cover rounded-xl bg-gray-100"
                />
              </div>
            )}
            
            {compressionProgress > 0 && compressionProgress < 100 && (
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-gray-600">Processing image...</span>
                  <span className="text-blue-600">{compressionProgress}%</span>
                </div>
                <div className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-blue-600 to-purple-600 transition-all duration-300"
                    style={{ width: `${compressionProgress}%` }}
                  />
                </div>
              </div>
            )}

            {compressionInfo && (
              <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
                <div className="flex items-start space-x-2">
                  <Info className="h-4 w-4 text-blue-600 mt-0.5 flex-shrink-0" />
                  <div className="text-sm space-y-1">
                    <p className="font-medium text-blue-900">Processing Complete</p>
                    {compressionInfo.noCompressionNeeded ? (
                      <p className="text-blue-700">Image kept at original quality (no compression needed)</p>
                    ) : (
                      <>
                        <p className="text-blue-700">
                          Size: {formatFileSize(compressionInfo.originalSize)} → {formatFileSize(compressionInfo.compressedSize)} 
                          ({Math.round((1 - compressionInfo.compressionRatio) * 100)}% reduction)
                        </p>
                        <p className="text-blue-700">
                          Dimensions: {compressionInfo.originalDimensions} → {compressionInfo.newDimensions}
                        </p>
                      </>
                    )}
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
        
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={(e) => e.target.files?.[0] && handleFileSelect(e.target.files[0])}
          className="hidden"
        />
      </div>
    </div>
  );
};

export default FileUpload;