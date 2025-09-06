import React from 'react';
import Icon from '../../../components/AppIcon';

const SecurityFeatures = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Criptografia SSL',
      description: 'Conexão segura com certificado SSL/TLS'
    },
    {
      icon: 'Lock',
      title: 'Autenticação Segura',
      description: 'Proteção contra tentativas de acesso não autorizado'
    },
    {
      icon: 'Eye',
      title: 'Monitoramento',
      description: 'Registro de todas as tentativas de login'
    },
    {
      icon: 'Clock',
      title: 'Sessão Controlada',
      description: 'Logout automático por inatividade'
    }
  ];

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-semibold text-foreground mb-4">
        Recursos de Segurança
      </h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {securityFeatures?.map((feature, index) => (
          <div
            key={index}
            className="flex items-start space-x-3 p-3 bg-muted/50 rounded-md"
          >
            <div className="w-8 h-8 bg-primary/10 rounded-md flex items-center justify-center flex-shrink-0">
              <Icon name={feature?.icon} size={16} className="text-primary" />
            </div>
            <div>
              <div className="font-medium text-foreground text-sm">
                {feature?.title}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {feature?.description}
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Last Login Info */}
      <div className="mt-6 p-3 bg-success/10 border border-success/20 rounded-md">
        <div className="flex items-center space-x-2">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <div className="text-sm">
            <span className="font-medium text-success">Sistema Seguro:</span>
            <span className="text-muted-foreground ml-1">
              Último acesso em 05/01/2025 às 14:30
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityFeatures;