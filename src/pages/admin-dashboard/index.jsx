import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebarNavigation from '../../components/ui/AdminSidebarNavigation';
import AdminHeaderBar from '../../components/ui/AdminHeaderBar';
import MetricsCard from './components/MetricsCard';
import RevenueChart from './components/RevenueChart';
import UserGrowthChart from './components/UserGrowthChart';
import SubscriptionDistribution from './components/SubscriptionDistribution';
import NotificationPanel from './components/NotificationPanel';
import QuickActions from './components/QuickActions';
import SystemStatus from './components/SystemStatus';
import RecentTransactions from './components/RecentTransactions';

const AdminDashboard = () => {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const navigate = useNavigate();

  // Mock data for dashboard metrics
  const metricsData = [
    {
      title: "Receita Total",
      value: "R$ 45.280,00",
      change: "+12,5%",
      changeType: "positive",
      icon: "DollarSign",
      color: "success"
    },
    {
      title: "Taxa de Conversão",
      value: "8,4%",
      change: "+2,1%",
      changeType: "positive",
      icon: "TrendingUp",
      color: "primary"
    },
    {
      title: "Assinaturas Ativas",
      value: "1.247",
      change: "+89",
      changeType: "positive",
      icon: "Users",
      color: "primary"
    },
    {
      title: "Vendas Hoje",
      value: "23",
      change: "+5",
      changeType: "positive",
      icon: "ShoppingCart",
      color: "warning"
    }
  ];

  // Mock revenue data
  const revenueData = [
    { mes: 'Jan', receita: 12500 },
    { mes: 'Fev', receita: 18200 },
    { mes: 'Mar', receita: 22100 },
    { mes: 'Abr', receita: 28500 },
    { mes: 'Mai', receita: 35200 },
    { mes: 'Jun', receita: 45280 }
  ];

  // Mock user growth data
  const userGrowthData = [
    { mes: 'Jan', usuarios: 245 },
    { mes: 'Fev', usuarios: 389 },
    { mes: 'Mar', usuarios: 567 },
    { mes: 'Abr', usuarios: 789 },
    { mes: 'Mai', usuarios: 1024 },
    { mes: 'Jun', usuarios: 1247 }
  ];

  // Mock subscription distribution data
  const subscriptionData = [
    { name: 'Mensal', value: 847 },
    { name: 'Trimestral', value: 400 },
    { name: 'Cancelado', value: 89 }
  ];

  // Mock notifications data
  const notificationsData = [
    {
      id: 1,
      type: 'sale',
      title: 'Nova Venda',
      message: 'João Silva adquiriu o plano trimestral',
      timestamp: new Date(Date.now() - 300000),
      unread: true
    },
    {
      id: 2,
      type: 'payment',
      title: 'Pagamento Processado',
      message: 'PIX de R$ 89,90 confirmado para Maria Santos',
      timestamp: new Date(Date.now() - 900000),
      unread: true
    },
    {
      id: 3,
      type: 'user',
      title: 'Novo Usuário',
      message: 'Carlos Oliveira se cadastrou na plataforma',
      timestamp: new Date(Date.now() - 1800000),
      unread: false
    },
    {
      id: 4,
      type: 'system',
      title: 'Backup Concluído',
      message: 'Backup automático realizado com sucesso',
      timestamp: new Date(Date.now() - 3600000),
      unread: false
    },
    {
      id: 5,
      type: 'sale',
      title: 'Meta Atingida',
      message: 'Meta mensal de vendas foi superada em 15%',
      timestamp: new Date(Date.now() - 7200000),
      unread: false
    }
  ];

  // Mock system status
  const systemStatus = {
    bot: 'online',
    api: 'good',
    database: 'online',
    payments: 'online'
  };

  // Mock recent transactions
  const recentTransactions = [
    {
      id: 'TXN001',
      customerName: 'Ana Silva',
      customerEmail: 'ana.silva@email.com',
      plan: 'Trimestral',
      amount: 239.70,
      paymentMethod: 'pix',
      status: 'aprovado',
      date: new Date(Date.now() - 300000)
    },
    {
      id: 'TXN002',
      customerName: 'Carlos Santos',
      customerEmail: 'carlos.santos@email.com',
      plan: 'Mensal',
      amount: 89.90,
      paymentMethod: 'cartao',
      status: 'aprovado',
      date: new Date(Date.now() - 900000)
    },
    {
      id: 'TXN003',
      customerName: 'Maria Oliveira',
      customerEmail: 'maria.oliveira@email.com',
      plan: 'Trimestral',
      amount: 239.70,
      paymentMethod: 'boleto',
      status: 'pendente',
      date: new Date(Date.now() - 1800000)
    },
    {
      id: 'TXN004',
      customerName: 'João Costa',
      customerEmail: 'joao.costa@email.com',
      plan: 'Mensal',
      amount: 89.90,
      paymentMethod: 'pix',
      status: 'aprovado',
      date: new Date(Date.now() - 3600000)
    },
    {
      id: 'TXN005',
      customerName: 'Fernanda Lima',
      customerEmail: 'fernanda.lima@email.com',
      plan: 'Trimestral',
      amount: 239.70,
      paymentMethod: 'cartao',
      status: 'cancelado',
      date: new Date(Date.now() - 7200000)
    }
  ];

  // Check authentication on component mount
  useEffect(() => {
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
    }
  }, [navigate]);

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar Navigation */}
      <AdminSidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <AdminHeaderBar />

        {/* Dashboard Content */}
        <main className="p-6">
          {/* Welcome Section */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Bem-vindo ao Painel Administrativo
            </h1>
            <p className="text-muted-foreground">
              Monitore o desempenho do seu WhatsApp Study Bot e gerencie usuários
            </p>
          </div>

          {/* Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {metricsData?.map((metric, index) => (
              <MetricsCard
                key={index}
                title={metric?.title}
                value={metric?.value}
                change={metric?.change}
                changeType={metric?.changeType}
                icon={metric?.icon}
                color={metric?.color}
              />
            ))}
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <RevenueChart data={revenueData} />
            <UserGrowthChart data={userGrowthData} />
          </div>

          {/* Secondary Metrics */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <SubscriptionDistribution data={subscriptionData} />
            <div className="lg:col-span-2">
              <NotificationPanel notifications={notificationsData} />
            </div>
          </div>

          {/* Management Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <QuickActions />
            <SystemStatus status={systemStatus} />
          </div>

          {/* Recent Transactions */}
          <div className="mb-8">
            <RecentTransactions transactions={recentTransactions} />
          </div>

          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-border">
            <div className="flex flex-col sm:flex-row items-center justify-between text-sm text-muted-foreground">
              <div>
                © {new Date()?.getFullYear()} WhatsApp Study Bot. Todos os direitos reservados.
              </div>
              <div className="mt-2 sm:mt-0">
                Última atualização: {new Date()?.toLocaleString('pt-BR')}
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;