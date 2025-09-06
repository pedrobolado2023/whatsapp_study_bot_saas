import React from 'react';
import Icon from '../../../components/AppIcon';

const AdminBranding = () => {
  return (
    <div className="text-center space-y-4">
      {/* Logo */}
      <div className="flex items-center justify-center space-x-3">
        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-soft">
          <Icon name="MessageSquare" size={24} color="white" />
        </div>
        <div className="text-left">
          <h1 className="text-2xl font-bold text-foreground">
            WhatsApp Study Bot
          </h1>
          <p className="text-sm text-muted-foreground">
            Painel Administrativo
          </p>
        </div>
      </div>

      {/* Welcome Message */}
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-foreground">
          Acesso Administrativo
        </h2>
        <p className="text-muted-foreground">
          Entre com suas credenciais para gerenciar o sistema
        </p>
      </div>

      {/* Admin Badge */}
      <div className="inline-flex items-center space-x-2 px-3 py-1 bg-primary/10 border border-primary/20 rounded-full">
        <Icon name="Shield" size={14} className="text-primary" />
        <span className="text-sm font-medium text-primary">
          Área Restrita
        </span>
      </div>
    </div>
  );
};

export default AdminBranding;