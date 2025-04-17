import React from 'react';

const GlassCard = ({ 
  children, 
  className = '', 
  hover = true,
  onClick = null 
}) => {
  return (
    <div
      className={`
        bg-eorzea-darker/80 backdrop-blur-sm
        border border-eorzea-gold/20 rounded-lg
        ${hover ? 'hover:border-eorzea-gold/50 hover:shadow-glow transition-all duration-300' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        ${className}
      `}
      onClick={onClick}
    >
      {children}
    </div>
  );
};

export default GlassCard;
