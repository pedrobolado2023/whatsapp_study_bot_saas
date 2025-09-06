import React from 'react';
import Icon from '../../../components/AppIcon';

const SystemStatus = ({ status = {} }) => {
  const statusItems = [
    {
      id: 'bot',
      label: 'WhatsApp Bot',
      status: status?.bot || 'online',
      description: 'Serviço de mensagens ativo',
      icon: 'MessageSquare'
    },
    {
      id: 'api',
      label: 'API Response',
      status: status?.api || 'good',
      description: 'Tempo médio: 120ms',
      icon: 'Zap'
    },
    {
      id: 'database',
      label: 'Base de Dados',
      status: status?.database || 'online',
      description: 'Conexão estável',
      icon: 'Database'
    },
    {
      id: 'payments',
      label: 'Pagamentos',
      status: status?.payments || 'online',
      description: 'Gateway funcionando',
      icon: 'CreditCard'
    }
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case 'online': case'good':
        return 'text-success';
      case 'warning': case'slow':
        return 'text-warning';
      case 'offline': case'error':
        return 'text-error';
      default:
        return 'text-muted-foreground';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'online': case'good':
        return 'CheckCircle';
      case 'warning': case'slow':
        return 'AlertTriangle';
      case 'offline': case'error':
        return 'XCircle';
      default:
        return 'Circle';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'online': return 'Online';
      case 'good': return 'Bom';
      case 'warning': return 'Atenção';
      case 'slow': return 'Lento';
      case 'offline': return 'Offline';
      case 'error': return 'Erro';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Status do Sistema</h3>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Todos os Serviços Ativos</span>
        </div>
      </div>
      <div className="space-y-4">
        {statusItems?.map((item) => (
          <div key={item?.id} className="flex items-center justify-between p-3 bg-muted rounded-md">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-background rounded-full flex items-center justify-center">
                <Icon name={item?.icon} size={16} className="text-muted-foreground" />
              </div>
              <div>
                <div className="font-medium text-foreground">{item?.label}</div>
                <div className="text-sm text-muted-foreground">{item?.description}</div>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Icon 
                name={getStatusIcon(item?.status)} 
                size={16} 
                className={getStatusColor(item?.status)} 
              />
              <span className={`text-sm font-medium ${getStatusColor(item?.status)}`}>
                {getStatusText(item?.status)}
              </span>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-sm">
          <span className="text-muted-foreground">Última verificação:</span>
          <span className="text-foreground font-medium">
            {new Date()?.toLocaleString('pt-BR')}
          </span>
        </div>
      </div>
    </div>
  );
};

export default SystemStatus;