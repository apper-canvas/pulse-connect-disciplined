import { motion } from "framer-motion";
import Button from "@/components/atoms/Button";
import ApperIcon from "@/components/ApperIcon";
import React from "react";

const Error = ({ 
  message = "Something went wrong", 
  onRetry,
  type = "general"
}) => {
  const getErrorContent = () => {
    switch (type) {
case 'network':
        return {
          icon: 'Wifi',
          title: 'Connection Problem',
          description: 'Please check your internet connection and try again.',
          action: 'Retry Connection'
        };
      case 'notfound':
        return {
          icon: 'Search',
          title: 'Not Found',
          description: 'The content you're looking for doesn't exist.',
          action: 'Go Back'
        };
      case 'server':
        return {
          icon: 'Server',
          title: 'Server Error',
          description: 'Our servers are having trouble. Please try again in a moment.',
          action: 'Try Again'
        };
      default:
        return {
          icon: 'AlertCircle',
          title: 'Oops!',
          description: message,
          action: 'Try Again'
        };
    }
}

  const errorContent = getErrorContent();

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="flex flex-col items-center justify-center p-8 text-center"
    >
      <div className="w-16 h-16 bg-gradient-to-br from-error/10 to-error/20 rounded-full flex items-center justify-center mb-4">
        <ApperIcon 
          name={errorContent.icon} 
          className="w-8 h-8 text-error" 
        />
      </div>
      
      <h3 className="text-xl font-semibold text-gray-900 mb-2">
        {errorContent.title}
      </h3>
      
      <p className="text-gray-600 mb-6 max-w-md">
        {errorContent.description}
      </p>
      
      {onRetry && (
        <Button 
          onClick={onRetry}
          variant="primary"
          className="min-w-32"
        >
          <ApperIcon name="RotateCcw" className="w-4 h-4 mr-2" />
          {errorContent.action}
        </Button>
      )}
</motion.div>
  );
};

export default Error;