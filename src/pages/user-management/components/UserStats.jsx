import React from 'react';
import Icon from '../../../components/AppIcon';

const UserStats = ({ stats = {} }) => {
  const defaultStats = {
    totalUsers: 2847,
    activeUsers: 2156,
    newUsersThisMonth: 234,
    churnRate: 3.2,
    monthlyRevenue: 85430.50,
    quarterlyRevenue: 245670.80,
    averageLifetimeValue: 187.90,
    conversionRate: 12.8
  };

  const currentStats = { ...defaultStats, ...stats };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const formatPercentage = (value) => {
    return `${value?.toFixed(1)}%`;
  };

  const statCards = [
    {
      title: 'Total de Usuários',
      value: currentStats?.totalUsers?.toLocaleString('pt-BR'),
      icon: 'Users',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+12.5%',
      changeType: 'positive'
    },
    {
      title: 'Usuários Ativos',
      value: currentStats?.activeUsers?.toLocaleString('pt-BR'),
      icon: 'UserCheck',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+8.3%',
      changeType: 'positive'
    },
    {
      title: 'Novos Este Mês',
      value: currentStats?.newUsersThisMonth?.toLocaleString('pt-BR'),
      icon: 'UserPlus',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+15.7%',
      changeType: 'positive'
    },
    {
      title: 'Taxa de Churn',
      value: formatPercentage(currentStats?.churnRate),
      icon: 'UserMinus',
      color: 'text-error',
      bgColor: 'bg-error/10',
      change: '-2.1%',
      changeType: 'negative'
    },
    {
      title: 'Receita Mensal',
      value: formatCurrency(currentStats?.monthlyRevenue),
      icon: 'DollarSign',
      color: 'text-success',
      bgColor: 'bg-success/10',
      change: '+18.2%',
      changeType: 'positive'
    },
    {
      title: 'Receita Trimestral',
      value: formatCurrency(currentStats?.quarterlyRevenue),
      icon: 'TrendingUp',
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      change: '+22.4%',
      changeType: 'positive'
    },
    {
      title: 'LTV Médio',
      value: formatCurrency(currentStats?.averageLifetimeValue),
      icon: 'Target',
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      change: '+5.8%',
      changeType: 'positive'
    },
    {
      title: 'Taxa de Conversão',
      value: formatPercentage(currentStats?.conversionRate),
      icon: 'Zap',
      color: 'text-warning',
      bgColor: 'bg-warning/10',
      change: '+3.2%',
      changeType: 'positive'
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statCards?.map((stat, index) => (
        <div
          key={index}
          className="bg-card border border-border rounded-lg p-6 shadow-soft hover:shadow-modal transition-shadow"
        >
          <div className="flex items-center justify-between mb-4">
            <div className={`w-12 h-12 rounded-lg ${stat?.bgColor} flex items-center justify-center`}>
              <Icon name={stat?.icon} size={24} className={stat?.color} />
            </div>
            <div className={`flex items-center space-x-1 text-sm font-medium ${
              stat?.changeType === 'positive' ? 'text-success' : 'text-error'
            }`}>
              <Icon 
                name={stat?.changeType === 'positive' ? 'TrendingUp' : 'TrendingDown'} 
                size={14} 
              />
              <span>{stat?.change}</span>
            </div>
          </div>
          
          <div className="space-y-1">
            <h3 className="text-2xl font-bold text-foreground">{stat?.value}</h3>
            <p className="text-sm text-muted-foreground">{stat?.title}</p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default UserStats;