import React from 'react';
import Icon from '../../../components/AppIcon';

const SupportLinks = () => {
  const supportOptions = [
    {
      icon: 'FileText',
      label: 'Documentação',
      description: 'Guias e manuais do sistema',
      href: '#documentation'
    },
    {
      icon: 'HelpCircle',
      label: 'Suporte Técnico',
      description: 'Contate nossa equipe',
      href: '#support'
    },
    {
      icon: 'Phone',
      label: 'Emergência',
      description: '(11) 9999-9999',
      href: 'tel:+5511999999999'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-sm font-medium text-foreground">
        Precisa de Ajuda?
      </h3>
      <div className="space-y-2">
        {supportOptions?.map((option, index) => (
          <a
            key={index}
            href={option?.href}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors group"
          >
            <div className="w-6 h-6 flex items-center justify-center">
              <Icon 
                name={option?.icon} 
                size={16} 
                className="text-muted-foreground group-hover:text-primary transition-colors" 
              />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground group-hover:text-primary transition-colors">
                {option?.label}
              </div>
              <div className="text-xs text-muted-foreground">
                {option?.description}
              </div>
            </div>
          </a>
        ))}
      </div>
      {/* System Status */}
      <div className="mt-6 p-3 bg-card border border-border rounded-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-foreground">
              Sistema Online
            </span>
          </div>
          <span className="text-xs text-muted-foreground">
            99.9% uptime
          </span>
        </div>
      </div>
    </div>
  );
};

export default SupportLinks;