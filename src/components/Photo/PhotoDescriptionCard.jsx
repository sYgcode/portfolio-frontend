import React from 'react';
import { FileText } from 'lucide-react';

const PhotoDescriptionCard = ({ description }) => {
  if (!description || description.trim() === '') {
    return null;
  }

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-xl p-6 border border-white/50 shadow-lg">
      <h3 className="text-lg font-medium text-slate-800 mb-3 flex items-center">
        <FileText className="h-5 w-5 mr-3 text-blue-500" />
        Description
      </h3>
      <p className="text-slate-600 leading-relaxed whitespace-pre-wrap">
        {description}
      </p>
    </div>
  );
};

export default PhotoDescriptionCard;