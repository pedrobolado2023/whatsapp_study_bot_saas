import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';


const QuickActions = () => {
  const navigate = useNavigate();

  const actions = [
    {
      id: 'users',
      title: 'Gerenciar Usuários',
      description: 'Visualizar e administrar contas de usuários',
      icon: 'Users',
      color: 'primary',
      path: '/user-management'
    },
    {
      id: 'content',
      title: 'Gerenciar Conteúdo',
      description: 'Atualizar perguntas e respostas do bot',
      icon: 'FileText',
      color: 'success',
      path: '/content-management'
    },
    {
      id: 'export',
      title: 'Exportar Dados',
      description: 'Baixar relatórios de vendas e usuários',
      icon: 'Download',
      color: 'warning',
      action: 'export'
    },
    {
      id: 'settings',
      title: 'Configurações',
      description: 'Ajustar configurações do sistema',
      icon: 'Settings',
      color: 'secondary',
      action: 'settings'
    }
  ];

  const handleAction = (action) => {
    if (action?.path) {
      navigate(action?.path);
    } else if (action?.action === 'export') {
      // Mock export functionality
      const exportData = {
        sales: 'dados_vendas_' + new Date()?.toISOString()?.split('T')?.[0] + '.csv',
        users: 'dados_usuarios_' + new Date()?.toISOString()?.split('T')?.[0] + '.csv'
      };
      alert(`Exportando dados:\n- ${exportData?.sales}\n- ${exportData?.users}`);
    } else if (action?.action === 'settings') {
      alert('Funcionalidade de configurações em desenvolvimento');
    }
  };

  const getColorClasses = (color) => {
    const colors = {
      primary: 'bg-primary/10 text-primary hover:bg-primary/20',
      success: 'bg-success/10 text-success hover:bg-success/20',
      warning: 'bg-warning/10 text-warning hover:bg-warning/20',
      secondary: 'bg-secondary/10 text-secondary hover:bg-secondary/20'
    };
    return colors?.[color] || colors?.primary;
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">Ações Rápidas</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {actions?.map((action) => (
          <button
            key={action?.id}
            onClick={() => handleAction(action)}
            className={`p-4 rounded-lg border border-border transition-all duration-200 hover:shadow-soft text-left ${
              getColorClasses(action?.color)
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                getColorClasses(action?.color)
              }`}>
                <Icon name={action?.icon} size={20} />
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="font-medium text-foreground mb-1">
                  {action?.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {action?.description}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;