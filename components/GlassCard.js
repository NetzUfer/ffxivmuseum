import React from 'react';
import PropTypes from 'prop-types';

const GlassCard = ({ children, className, hoverEffect = true }) => {
  return (
    <div 
      className={`glass-card ${hoverEffect ? 'hover-effect' : ''} ${className || ''}`}
    >
      {children}
    </div>
  );
};

GlassCard.propTypes = {
  children: PropTypes.node.isRequired,
  className: PropTypes.string,
  hoverEffect: PropTypes.bool
};

export default GlassCard;
