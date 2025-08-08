import React from 'react';
import { Calendar, ImageIcon, Clock, User } from 'lucide-react';

const AlbumMetadataCard = ({ album }) => {
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

  const basicInfo = [
    {
      icon: Calendar,
      label: 'Created',
      value: formatDateTime(album.createdAt),
      color: 'text-blue-500'
    },
    {
      icon: Clock,
      label: 'Last Updated',
      value: formatDateTime(album.updatedAt),
      color: 'text-green-500'
    },
    {
      icon: ImageIcon,
      label: 'Photos',
      value: `${album.photos?.length || 0} photo${album.photos?.length !== 1 ? 's' : ''}`,
      color: 'text-purple-500'
    },
    {
      icon: User,
      label: 'Created By',
      value: album.metadata?.createdBy || 'Unknown',
      color: 'text-orange-500'
    }
  ].filter(item => item.value);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
      <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
        <div className="w-2 h-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full mr-3"></div>
        Album Information
      </h3>
      <div className="grid grid-cols-1 gap-4">
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
  );
};

export default AlbumMetadataCard;