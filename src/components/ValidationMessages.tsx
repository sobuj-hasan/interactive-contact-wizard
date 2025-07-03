
import React from 'react';
import { AlertCircle } from 'lucide-react';

interface ValidationMessagesProps {
  error?: string;
}

const ValidationMessages: React.FC<ValidationMessagesProps> = ({ error }) => {
  if (!error) return null;

  return (
    <div className="flex items-center space-x-2 text-red-600 text-sm animate-fade-in">
      <AlertCircle className="w-4 h-4 flex-shrink-0" />
      <span>{error}</span>
    </div>
  );
};

export default ValidationMessages;
