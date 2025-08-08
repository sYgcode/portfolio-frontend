import React from 'react';
import { Calendar, MapPin, User, Camera, Ruler, FileImage, Clock } from 'lucide-react';

const PhotoMetadataCard = ({ photo }) => {
  const formatFileSize = (kb) => {
    if (!kb) return null;
    if (kb < 1024) return `${kb.toFixed(1)} KB`;
    return `${(kb / 1024).toFixed(1)} MB`;
  };

  const formatDate = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return null;
    }
  };

  const formatDateTime = (dateString) => {
    if (!dateString) return null;
    try {
      return new Date(dateString).toLocaleString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
      });
    } catch {
      return null;
    }
  };

  const metadata = photo.metadata || {};

  // Group metadata by category
  const basicInfo = [
    {
      icon: Calendar,
      label: 'Uploaded',
      value: formatDateTime(photo.createdAt),
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: 'Date Taken',
      value: formatDate(metadata.dateTaken),
      color: 'text-green-500'
    },
    {
      icon: User,
      label: 'Photographer',
      value: metadata.photographer,
      color: 'text-purple-500'
    },
    {
      icon: MapPin,
      label: 'Location',
      value: metadata.location,
      color: 'text-red-500'
    }
  ].filter(item => item.value);

  const technicalInfo = [
    {
      icon: Ruler,
      label: 'Dimensions',
      value: metadata.originalWidth && metadata.originalHeight 
        ? `${metadata.originalWidth} × ${metadata.originalHeight} px`
        : null,
      color: 'text-indigo-500'
    },
    {
      icon: Ruler,
      label: 'Display Size',
      value: metadata.width && metadata.height && 
             (metadata.width !== metadata.originalWidth || metadata.height !== metadata.originalHeight)
        ? `${metadata.width} × ${metadata.height} px`
        : null,
      color: 'text-cyan-500'
    },
    {
      icon: FileImage,
      label: 'Original Size',
      value: formatFileSize(metadata.originalSizeKB),
      color: 'text-orange-500'
    },
    {
      icon: FileImage,
      label: 'File Size',
      value: formatFileSize(metadata.sizeKB),
      color: 'text-teal-500'
    },
    {
      icon: Camera,
      label: 'Format',
      value: metadata.format ? metadata.format.replace('image/', '').toUpperCase() : null,
      color: 'text-pink-500'
    }
  ].filter(item => item.value);

  const compressionRatio = metadata.originalSizeKB && metadata.sizeKB 
    ? ((metadata.originalSizeKB - metadata.sizeKB) / metadata.originalSizeKB * 100).toFixed(1)
    : null;

  return (
    <div className="space-y-6">
      {/* Basic Information */}
      {basicInfo.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
            Photo Information
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {basicInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center text-slate-600">
                  <IconComponent className={`h-4 w-4 mr-3 ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}

      {/* Technical Information */}
      {technicalInfo.length > 0 && (
        <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
          <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
            <div className="w-2 h-2 bg-gradient-to-r from-green-500 to-blue-500 rounded-full mr-3"></div>
            Technical Details
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {technicalInfo.map((item, index) => {
              const IconComponent = item.icon;
              return (
                <div key={index} className="flex items-center text-slate-600">
                  <IconComponent className={`h-4 w-4 mr-3 ${item.color}`} />
                  <div>
                    <div className="text-sm font-medium">{item.label}</div>
                    <div className="text-xs text-slate-500">{item.value}</div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Compression Info */}
          {compressionRatio && compressionRatio > 0 && (
            <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="flex items-center text-blue-700">
                <FileImage className="h-4 w-4 mr-2" />
                <span className="text-sm font-medium">
                  Compressed by {compressionRatio}% for web optimization
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default PhotoMetadataCard;