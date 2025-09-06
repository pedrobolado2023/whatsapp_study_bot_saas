import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import Button from '../../../components/ui/Button';

const UserFilters = ({ onFiltersChange, totalUsers = 0 }) => {
  const [filters, setFilters] = useState({
    search: '',
    subscriptionType: '',
    paymentStatus: '',
    registrationDateFrom: '',
    registrationDateTo: '',
    activityLevel: ''
  });

  const subscriptionOptions = [
    { value: '', label: 'Todos os Planos' },
    { value: 'monthly', label: 'Mensal - R$ 29,90' },
    { value: 'quarterly', label: 'Trimestral - R$ 79,90' }
  ];

  const paymentStatusOptions = [
    { value: '', label: 'Todos os Status' },
    { value: 'active', label: 'Ativo' },
    { value: 'pending', label: 'Pendente' },
    { value: 'expired', label: 'Expirado' },
    { value: 'cancelled', label: 'Cancelado' }
  ];

  const activityLevelOptions = [
    { value: '', label: 'Todos os Níveis' },
    { value: 'high', label: 'Alta Atividade' },
    { value: 'medium', label: 'Média Atividade' },
    { value: 'low', label: 'Baixa Atividade' },
    { value: 'inactive', label: 'Inativo' }
  ];

  const handleFilterChange = (key, value) => {
    const newFilters = { ...filters, [key]: value };
    setFilters(newFilters);
    onFiltersChange(newFilters);
  };

  const clearFilters = () => {
    const clearedFilters = {
      search: '',
      subscriptionType: '',
      paymentStatus: '',
      registrationDateFrom: '',
      registrationDateTo: '',
      activityLevel: ''
    };
    setFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  const hasActiveFilters = Object.values(filters)?.some(value => value !== '');

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <Icon name="Filter" size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-foreground">Filtros de Usuários</h3>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Users" size={16} />
          <span>{totalUsers?.toLocaleString('pt-BR')} usuários encontrados</span>
        </div>
      </div>
      {/* Search Bar */}
      <div className="mb-6">
        <Input
          type="search"
          placeholder="Buscar por nome, email ou WhatsApp..."
          value={filters?.search}
          onChange={(e) => handleFilterChange('search', e?.target?.value)}
          className="w-full"
        />
      </div>
      {/* Filter Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-6">
        <Select
          label="Tipo de Assinatura"
          options={subscriptionOptions}
          value={filters?.subscriptionType}
          onChange={(value) => handleFilterChange('subscriptionType', value)}
        />

        <Select
          label="Status do Pagamento"
          options={paymentStatusOptions}
          value={filters?.paymentStatus}
          onChange={(value) => handleFilterChange('paymentStatus', value)}
        />

        <Input
          type="date"
          label="Data Inicial"
          value={filters?.registrationDateFrom}
          onChange={(e) => handleFilterChange('registrationDateFrom', e?.target?.value)}
        />

        <Input
          type="date"
          label="Data Final"
          value={filters?.registrationDateTo}
          onChange={(e) => handleFilterChange('registrationDateTo', e?.target?.value)}
        />

        <Select
          label="Nível de Atividade"
          options={activityLevelOptions}
          value={filters?.activityLevel}
          onChange={(value) => handleFilterChange('activityLevel', value)}
        />
      </div>
      {/* Action Buttons */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          {hasActiveFilters && (
            <Button
              variant="outline"
              onClick={clearFilters}
              iconName="X"
              iconPosition="left"
            >
              Limpar Filtros
            </Button>
          )}
        </div>

        <div className="flex items-center space-x-2">
          <Button
            variant="outline"
            iconName="Download"
            iconPosition="left"
          >
            Exportar
          </Button>
          <Button
            variant="default"
            iconName="RefreshCw"
            iconPosition="left"
          >
            Atualizar
          </Button>
        </div>
      </div>
    </div>
  );
};

export default UserFilters;