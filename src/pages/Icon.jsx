import React from 'react';

const Icon = ({ name, className = "w-4 h-4" }) => {
  const iconMap = {
    download: "⬇️",
    save: "💾",
    edit: "✏️",
    delete: "🗑️",
    check: "✅",
    close: "❌"
  };

  return (
    <span className={className} role="img" aria-label={name}>
      {iconMap[name] || "🔘"}
    </span>
  );
};

export default Icon;
