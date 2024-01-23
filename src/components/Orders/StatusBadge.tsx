import React from 'react';
interface statusProps {
  status: string;
}

const StatusBadge: React.FC<statusProps> = ({ status }) => {
  const getStatusStyles = () => {
    switch (status) {
      case 'for delivery':
        return 'border border-gray-800 text-gray-800 dark:border-gray-200 dark:text-white';
      case 'delivered':
        return 'border border-teal-500 text-teal-500';
      case 'confirmed':
        return 'border border-blue-600 text-blue-600 dark:text-blue-500 dark:text-blue-500';
      case 'rejected':
        return 'border border-red-500 text-red-500';
      case 'pending':
        return 'border border-yellow-500 text-yellow-500';
      default:
        return 'border border-white text-white';
    }
  };

  return (
    <span className={`inline-flex items-center gap-x-1.5 py-1.5 px-3 rounded-full text-xs font-medium ${getStatusStyles()}`}>
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </span>
  );
};

export default StatusBadge;
