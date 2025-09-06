import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const RecentTransactions = ({ transactions = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayTransactions = showAll ? transactions : transactions?.slice(0, 8);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  const formatDate = (date) => {
    return new Date(date)?.toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'aprovado': return 'text-success bg-success/10';
      case 'pendente': return 'text-warning bg-warning/10';
      case 'cancelado': return 'text-error bg-error/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getPaymentMethodIcon = (method) => {
    switch (method) {
      case 'pix': return 'Smartphone';
      case 'cartao': return 'CreditCard';
      case 'boleto': return 'FileText';
      default: return 'DollarSign';
    }
  };

  const getPaymentMethodLabel = (method) => {
    switch (method) {
      case 'pix': return 'PIX';
      case 'cartao': return 'Cartão';
      case 'boleto': return 'Boleto';
      default: return method;
    }
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Transações Recentes</h3>
        <Button variant="ghost" size="sm">
          <Icon name="ExternalLink" size={16} />
          Ver Todas
        </Button>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-border">
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Cliente
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Plano
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Valor
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Método
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Status
              </th>
              <th className="text-left py-3 px-2 text-sm font-medium text-muted-foreground">
                Data
              </th>
            </tr>
          </thead>
          <tbody>
            {displayTransactions?.map((transaction) => (
              <tr key={transaction?.id} className="border-b border-border hover:bg-muted/50">
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                      <Icon name="User" size={14} className="text-primary" />
                    </div>
                    <div>
                      <div className="font-medium text-foreground text-sm">
                        {transaction?.customerName}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {transaction?.customerEmail}
                      </div>
                    </div>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm font-medium text-foreground">
                    {transaction?.plan}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm font-bold text-foreground">
                    {formatCurrency(transaction?.amount)}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <div className="flex items-center space-x-2">
                    <Icon 
                      name={getPaymentMethodIcon(transaction?.paymentMethod)} 
                      size={14} 
                      className="text-muted-foreground" 
                    />
                    <span className="text-sm text-foreground">
                      {getPaymentMethodLabel(transaction?.paymentMethod)}
                    </span>
                  </div>
                </td>
                <td className="py-3 px-2">
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                    getStatusColor(transaction?.status)
                  }`}>
                    {transaction?.status}
                  </span>
                </td>
                <td className="py-3 px-2">
                  <span className="text-sm text-muted-foreground">
                    {formatDate(transaction?.date)}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {transactions?.length > 8 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            fullWidth
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Mostrar Menos' : `Ver Todas (${transactions?.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default RecentTransactions;