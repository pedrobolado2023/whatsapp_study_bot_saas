import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import { Checkbox } from '../../../components/ui/Checkbox';

const UserTable = ({ users = [], onUserSelect, onBulkAction, selectedUsers = [] }) => {
  const [sortConfig, setSortConfig] = useState({ key: 'registrationDate', direction: 'desc' });

  const getStatusBadge = (status) => {
    const statusConfig = {
      active: { color: 'bg-success/10 text-success border-success/20', label: 'Ativo' },
      pending: { color: 'bg-warning/10 text-warning border-warning/20', label: 'Pendente' },
      expired: { color: 'bg-error/10 text-error border-error/20', label: 'Expirado' },
      cancelled: { color: 'bg-muted text-muted-foreground border-border', label: 'Cancelado' }
    };

    const config = statusConfig?.[status] || statusConfig?.pending;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const getPlanBadge = (plan) => {
    const planConfig = {
      monthly: { color: 'bg-primary/10 text-primary border-primary/20', label: 'Mensal' },
      quarterly: { color: 'bg-accent/10 text-accent border-accent/20', label: 'Trimestral' }
    };

    const config = planConfig?.[plan] || planConfig?.monthly;
    return (
      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${config?.color}`}>
        {config?.label}
      </span>
    );
  };

  const formatDate = (dateString) => {
    return new Date(dateString)?.toLocaleDateString('pt-BR');
  };

  const formatWhatsApp = (number) => {
    return number?.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3');
  };

  const handleSort = (key) => {
    setSortConfig(prev => ({
      key,
      direction: prev?.key === key && prev?.direction === 'asc' ? 'desc' : 'asc'
    }));
  };

  const handleSelectAll = (checked) => {
    if (checked) {
      onUserSelect(users?.map(user => user?.id));
    } else {
      onUserSelect([]);
    }
  };

  const handleSelectUser = (userId, checked) => {
    if (checked) {
      onUserSelect([...selectedUsers, userId]);
    } else {
      onUserSelect(selectedUsers?.filter(id => id !== userId));
    }
  };

  const isAllSelected = users?.length > 0 && selectedUsers?.length === users?.length;
  const isIndeterminate = selectedUsers?.length > 0 && selectedUsers?.length < users?.length;

  return (
    <div className="bg-card border border-border rounded-lg shadow-soft overflow-hidden">
      {/* Table Header */}
      <div className="p-4 border-b border-border bg-muted/30">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Checkbox
              checked={isAllSelected}
              indeterminate={isIndeterminate}
              onChange={(e) => handleSelectAll(e?.target?.checked)}
            />
            <span className="text-sm font-medium text-foreground">
              {selectedUsers?.length > 0 ? `${selectedUsers?.length} selecionados` : 'Selecionar todos'}
            </span>
          </div>
          
          {selectedUsers?.length > 0 && (
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                iconName="UserCheck"
                onClick={() => onBulkAction('activate')}
              >
                Ativar
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="UserX"
                onClick={() => onBulkAction('deactivate')}
              >
                Desativar
              </Button>
              <Button
                variant="outline"
                size="sm"
                iconName="Download"
                onClick={() => onBulkAction('export')}
              >
                Exportar
              </Button>
            </div>
          )}
        </div>
      </div>
      {/* Desktop Table */}
      <div className="hidden lg:block overflow-x-auto">
        <table className="w-full">
          <thead className="bg-muted/20">
            <tr>
              <th className="w-12 p-4"></th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('name')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Nome</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('email')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Email</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">WhatsApp</th>
              <th className="text-left p-4 font-medium text-foreground">Plano</th>
              <th className="text-left p-4 font-medium text-foreground">Status</th>
              <th className="text-left p-4 font-medium text-foreground">
                <button
                  onClick={() => handleSort('registrationDate')}
                  className="flex items-center space-x-1 hover:text-primary transition-colors"
                >
                  <span>Cadastro</span>
                  <Icon name="ArrowUpDown" size={14} />
                </button>
              </th>
              <th className="text-left p-4 font-medium text-foreground">Ações</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user) => (
              <tr key={user?.id} className="border-b border-border hover:bg-muted/30 transition-colors">
                <td className="p-4">
                  <Checkbox
                    checked={selectedUsers?.includes(user?.id)}
                    onChange={(e) => handleSelectUser(user?.id, e?.target?.checked)}
                  />
                </td>
                <td className="p-4">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
                      <span className="text-sm font-medium text-primary-foreground">
                        {user?.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <span className="font-medium text-foreground">{user?.name}</span>
                  </div>
                </td>
                <td className="p-4 text-muted-foreground">{user?.email}</td>
                <td className="p-4 text-muted-foreground">{formatWhatsApp(user?.whatsapp)}</td>
                <td className="p-4">{getPlanBadge(user?.subscriptionType)}</td>
                <td className="p-4">{getStatusBadge(user?.paymentStatus)}</td>
                <td className="p-4 text-muted-foreground">{formatDate(user?.registrationDate)}</td>
                <td className="p-4">
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Eye"
                      onClick={() => onUserSelect([user?.id], 'view')}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="Edit"
                      onClick={() => onUserSelect([user?.id], 'edit')}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      iconName="MoreHorizontal"
                      onClick={() => onUserSelect([user?.id], 'menu')}
                    />
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {/* Mobile Cards */}
      <div className="lg:hidden space-y-4 p-4">
        {users?.map((user) => (
          <div key={user?.id} className="border border-border rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <Checkbox
                  checked={selectedUsers?.includes(user?.id)}
                  onChange={(e) => handleSelectUser(user?.id, e?.target?.checked)}
                />
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium text-primary-foreground">
                    {user?.name?.charAt(0)?.toUpperCase()}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-foreground">{user?.name}</div>
                  <div className="text-sm text-muted-foreground">{user?.email}</div>
                </div>
              </div>
              <Button
                variant="ghost"
                size="sm"
                iconName="MoreVertical"
                onClick={() => onUserSelect([user?.id], 'menu')}
              />
            </div>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div>
                <span className="text-muted-foreground">WhatsApp:</span>
                <div className="font-medium">{formatWhatsApp(user?.whatsapp)}</div>
              </div>
              <div>
                <span className="text-muted-foreground">Cadastro:</span>
                <div className="font-medium">{formatDate(user?.registrationDate)}</div>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                {getPlanBadge(user?.subscriptionType)}
                {getStatusBadge(user?.paymentStatus)}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Eye"
                  onClick={() => onUserSelect([user?.id], 'view')}
                >
                  Ver
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  iconName="Edit"
                  onClick={() => onUserSelect([user?.id], 'edit')}
                >
                  Editar
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {/* Empty State */}
      {users?.length === 0 && (
        <div className="p-12 text-center">
          <Icon name="Users" size={48} className="text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium text-foreground mb-2">Nenhum usuário encontrado</h3>
          <p className="text-muted-foreground">Tente ajustar os filtros ou aguarde novos cadastros.</p>
        </div>
      )}
    </div>
  );
};

export default UserTable;