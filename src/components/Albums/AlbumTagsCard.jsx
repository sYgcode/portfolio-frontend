import React from 'react';
import { Tag } from 'lucide-react';

const AlbumTagsCard = ({ tags }) => {
  if (!tags || tags.length === 0) {
    return null;
  }

  // Color variations for tags
  const tagColors = [
    'from-blue-100 to-blue-200 text-blue-800',
    'from-purple-100 to-purple-200 text-purple-800',
    'from-green-100 to-green-200 text-green-800',
    'from-pink-100 to-pink-200 text-pink-800',
    'from-indigo-100 to-indigo-200 text-indigo-800',
    'from-orange-100 to-orange-200 text-orange-800',
    'from-teal-100 to-teal-200 text-teal-800',
    'from-red-100 to-red-200 text-red-800'
  ];

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
      <h3 className="text-lg font-medium text-slate-800 mb-4 flex items-center">
        <Tag className="h-5 w-5 mr-3 text-purple-500" />
        Tags
        <span className="ml-2 text-sm text-slate-500 font-normal">({tags.length})</span>
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {tags.map((tag, index) => {
          const colorClass = tagColors[index % tagColors.length];
          return (
            <span
              key={index}
              className={`inline-block bg-gradient-to-r ${colorClass} text-sm px-3 py-1.5 rounded-full font-medium transition-transform duration-200 hover:scale-105 cursor-default shadow-sm`}
            >
              {tag}
            </span>
          );
        })}
      </div>
    </div>
  );
};

export default AlbumTagsCard;