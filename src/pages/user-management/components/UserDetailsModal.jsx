import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const UserDetailsModal = ({ user, isOpen, onClose, onSave }) => {
  const [activeTab, setActiveTab] = useState('details');
  const [editMode, setEditMode] = useState(false);
  const [formData, setFormData] = useState(user || {});

  if (!isOpen || !user) return null;

  const tabs = [
    { id: 'details', label: 'Detalhes', icon: 'User' },
    { id: 'subscription', label: 'Assinatura', icon: 'CreditCard' },
    { id: 'activity', label: 'Atividade', icon: 'Activity' },
    { id: 'support', label: 'Suporte', icon: 'MessageCircle' }
  ];

  const paymentHistory = [
    {
      id: 1,
      date: '2024-01-15',
      amount: 29.90,
      status: 'paid',
      method: 'pix',
      plan: 'monthly'
    },
    {
      id: 2,
      date: '2024-02-15',
      amount: 29.90,
      status: 'paid',
      method: 'card',
      plan: 'monthly'
    },
    {
      id: 3,
      date: '2024-03-15',
      amount: 79.90,
      status: 'pending',
      method: 'pix',
      plan: 'quarterly'
    }
  ];

  const activityStats = {
    totalQuestions: 1247,
    questionsThisMonth: 89,
    averageDaily: 12,
    lastActivity: '2024-01-06',
    favoriteSubjects: ['Matemática', 'Português', 'História']
  };

  const supportTickets = [
    {
      id: 1,
      subject: 'Problema com pagamento',
      status: 'resolved',
      date: '2024-01-05',
      priority: 'high'
    },
    {
      id: 2,
      subject: 'Dúvida sobre funcionalidades',
      status: 'open',
      date: '2024-01-06',
      priority: 'medium'
    }
  ];

  const subscriptionOptions = [
    { value: 'monthly', label: 'Mensal - R$ 29,90' },
    { value: 'quarterly', label: 'Trimestral - R$ 79,90' }
  ];

  const statusOptions = [
    { value: 'active', label: 'Ativo' },
    { value: 'pending', label: 'Pendente' },
    { value: 'expired', label: 'Expirado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const handleSave = () => {
    onSave(formData);
    setEditMode(false);
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR');
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success', label: 'Ativo' },
      pending: { color: 'bg-warning/10 text-warning', label: 'Pendente' },
      expired: { color: 'bg-error/10 text-error', label: 'Expirado' },
      cancelled: { color: 'bg-muted text-muted-foreground', label: 'Cancelado' },
      paid: { color: 'bg-success/10 text-success', label: 'Pago' },
      resolved: { color: 'bg-success/10 text-success', label: 'Resolvido' },
      open: { color: 'bg-warning/10 text-warning', label: 'Aberto' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card border border-border rounded-lg shadow-modal w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-primary rounded-full flex items-center justify-center">
              <span className="text-lg font-medium text-primary-foreground">
                {user?.name?.charAt(0)?.toUpperCase()}
              </span>
            </div>
            <div>
              <h2 className="text-xl font-semibold text-foreground">{user?.name}</h2>
              <p className="text-muted-foreground">{user?.email}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {!editMode ? (
              <Button
                variant="outline"
                iconName="Edit"
                onClick={() => setEditMode(true)}
              >
                Editar
              </Button>
            ) : (
              <>
                <Button
                  variant="outline"
                  onClick={() => {
                    setEditMode(false);
                    setFormData(user);
                  }}
                >
                  Cancelar
                </Button>
                <Button
                  variant="default"
                  iconName="Save"
                  onClick={handleSave}
                >
                  Salvar
                </Button>
              </>
            )}
            <Button
              variant="ghost"
              size="icon"
              iconName="X"
              onClick={onClose}
            />
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b border-border">
          <div className="flex space-x-0">
            {tabs?.map((tab) => (
              <button
                key={tab?.id}
                onClick={() => setActiveTab(tab?.id)}
                className={`flex items-center space-x-2 px-6 py-3 border-b-2 transition-colors ${
                  activeTab === tab?.id
                    ? 'border-primary text-primary bg-primary/5' :'border-transparent text-muted-foreground hover:text-foreground hover:bg-muted/50'
                }`}
              >
                <Icon name={tab?.icon} size={16} />
                <span className="font-medium">{tab?.label}</span>
              </button>
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-6 overflow-y-auto max-h-[60vh]">
          {/* Details Tab */}
          {activeTab === 'details' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Input
                  label="Nome Completo"
                  value={editMode ? formData?.name : user?.name}
                  onChange={(e) => setFormData({...formData, name: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="Email"
                  type="email"
                  value={editMode ? formData?.email : user?.email}
                  onChange={(e) => setFormData({...formData, email: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="WhatsApp"
                  value={editMode ? formData?.whatsapp : user?.whatsapp}
                  onChange={(e) => setFormData({...formData, whatsapp: e?.target?.value})}
                  disabled={!editMode}
                />
                <Input
                  label="Data de Cadastro"
                  value={formatDate(user?.registrationDate)}
                  disabled
                />
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 p-4 bg-muted rounded-lg">
                <div className="text-center">
                  <div className="text-2xl font-bold text-primary">{activityStats?.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Total de Questões</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-success">{activityStats?.questionsThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Este Mês</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-accent">{activityStats?.averageDaily}</div>
                  <div className="text-sm text-muted-foreground">Média Diária</div>
                </div>
              </div>
            </div>
          )}

          {/* Subscription Tab */}
          {activeTab === 'subscription' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Select
                  label="Tipo de Assinatura"
                  options={subscriptionOptions}
                  value={editMode ? formData?.subscriptionType : user?.subscriptionType}
                  onChange={(value) => setFormData({...formData, subscriptionType: value})}
                  disabled={!editMode}
                />
                <Select
                  label="Status do Pagamento"
                  options={statusOptions}
                  value={editMode ? formData?.paymentStatus : user?.paymentStatus}
                  onChange={(value) => setFormData({...formData, paymentStatus: value})}
                  disabled={!editMode}
                />
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Histórico de Pagamentos</h4>
                <div className="space-y-3">
                  {paymentHistory?.map((payment) => (
                    <div key={payment?.id} className="flex items-center justify-between p-4 border border-border rounded-lg">
                      <div className="flex items-center space-x-4">
                        <Icon name="CreditCard" size={20} className="text-muted-foreground" />
                        <div>
                          <div className="font-medium text-foreground">
                            {formatCurrency(payment?.amount)}
                          </div>
                          <div className="text-sm text-muted-foreground">
                            {formatDate(payment?.date)} • {payment?.method?.toUpperCase()}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center space-x-2">
                        {getStatusBadge(payment?.status)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tab */}
          {activeTab === 'activity' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{activityStats?.totalQuestions}</div>
                  <div className="text-sm text-muted-foreground">Total de Questões</div>
                </div>
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{activityStats?.questionsThisMonth}</div>
                  <div className="text-sm text-muted-foreground">Este Mês</div>
                </div>
                <div className="p-4 bg-accent/10 rounded-lg">
                  <div className="text-2xl font-bold text-accent">{activityStats?.averageDaily}</div>
                  <div className="text-sm text-muted-foreground">Média Diária</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-sm font-medium text-foreground">Última Atividade</div>
                  <div className="text-sm text-muted-foreground">{formatDate(activityStats?.lastActivity)}</div>
                </div>
              </div>

              <div>
                <h4 className="font-medium text-foreground mb-4">Matérias Favoritas</h4>
                <div className="flex flex-wrap gap-2">
                  {activityStats?.favoriteSubjects?.map((subject, index) => (
                    <span
                      key={index}
                      className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm font-medium"
                    >
                      {subject}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Support Tab */}
          {activeTab === 'support' && (
            <div className="space-y-6">
              <div className="flex items-center justify-between">
                <h4 className="font-medium text-foreground">Tickets de Suporte</h4>
                <Button
                  variant="outline"
                  iconName="Plus"
                  size="sm"
                >
                  Novo Ticket
                </Button>
              </div>

              <div className="space-y-3">
                {supportTickets?.map((ticket) => (
                  <div key={ticket?.id} className="p-4 border border-border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <h5 className="font-medium text-foreground">{ticket?.subject}</h5>
                      <div className="flex items-center space-x-2">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          ticket?.priority === 'high' ? 'bg-error/10 text-error' :
                          ticket?.priority === 'medium'? 'bg-warning/10 text-warning' : 'bg-muted text-muted-foreground'
                        }`}>
                          {ticket?.priority === 'high' ? 'Alta' : ticket?.priority === 'medium' ? 'Média' : 'Baixa'}
                        </span>
                        {getStatusBadge(ticket?.status)}
                      </div>
                    </div>
                    <div className="text-sm text-muted-foreground">
                      Criado em {formatDate(ticket?.date)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserDetailsModal;