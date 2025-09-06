import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const OrderSummary = ({ isCollapsed = false, onToggle }) => {
  const orderData = {
    plan: "Plano Trimestral",
    duration: "3 meses",
    originalPrice: 89.97,
    discount: 20.00,
    subtotal: 69.97,
    taxes: 6.30,
    total: 76.27,
    features: [
      "Acesso ilimitado ao bot WhatsApp",
      "Questões personalizadas por matéria",
      "Relatórios de desempenho",
      "Suporte prioritário",
      "Atualizações automáticas"
    ]
  };

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    })?.format(value);
  };

  return (
    <div className={`bg-card border border-border rounded-lg shadow-soft transition-all duration-300 ${
      isCollapsed ? 'mb-6' : ''
    }`}>
      {/* Mobile Toggle Header */}
      <div className="md:hidden">
        <button
          onClick={onToggle}
          className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-colors"
        >
          <div className="flex items-center space-x-3">
            <Icon name="ShoppingCart" size={20} className="text-primary" />
            <div>
              <div className="font-semibold text-foreground">Resumo do Pedido</div>
              <div className="text-sm text-muted-foreground">{formatCurrency(orderData?.total)}</div>
            </div>
          </div>
          <Icon 
            name={isCollapsed ? "ChevronDown" : "ChevronUp"} 
            size={20} 
            className="text-muted-foreground" 
          />
        </button>
      </div>
      {/* Order Content */}
      <div className={`${isCollapsed ? 'hidden md:block' : 'block'}`}>
        {/* Desktop Header */}
        <div className="hidden md:block p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <Icon name="ShoppingCart" size={24} className="text-primary" />
            <h2 className="text-xl font-semibold text-foreground">Resumo do Pedido</h2>
          </div>
        </div>

        {/* Plan Details */}
        <div className="p-6 space-y-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <h3 className="font-semibold text-foreground text-lg">{orderData?.plan}</h3>
              <p className="text-muted-foreground">{orderData?.duration} de acesso completo</p>
              <div className="mt-2 flex items-center space-x-2">
                <span className="px-2 py-1 bg-success/10 text-success text-xs font-medium rounded-full">
                  Mais Popular
                </span>
                <span className="px-2 py-1 bg-warning/10 text-warning text-xs font-medium rounded-full">
                  22% OFF
                </span>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm text-muted-foreground line-through">
                {formatCurrency(orderData?.originalPrice)}
              </div>
              <div className="font-semibold text-foreground">
                {formatCurrency(orderData?.subtotal)}
              </div>
            </div>
          </div>

          {/* Features List */}
          <div className="space-y-2">
            <h4 className="font-medium text-foreground">Incluído no plano:</h4>
            <ul className="space-y-2">
              {orderData?.features?.map((feature, index) => (
                <li key={index} className="flex items-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Check" size={16} className="text-success flex-shrink-0" />
                  <span>{feature}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Pricing Breakdown */}
          <div className="space-y-3 pt-4 border-t border-border">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Subtotal</span>
              <span className="text-foreground">{formatCurrency(orderData?.subtotal)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Desconto</span>
              <span className="text-success">-{formatCurrency(orderData?.discount)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Impostos (9%)</span>
              <span className="text-foreground">{formatCurrency(orderData?.taxes)}</span>
            </div>
            <div className="flex justify-between text-lg font-semibold pt-2 border-t border-border">
              <span className="text-foreground">Total</span>
              <span className="text-primary">{formatCurrency(orderData?.total)}</span>
            </div>
          </div>

          {/* Money Back Guarantee */}
          <div className="flex items-center space-x-3 p-3 bg-success/5 rounded-md">
            <Icon name="Shield" size={20} className="text-success" />
            <div>
              <div className="text-sm font-medium text-success">Garantia de 7 dias</div>
              <div className="text-xs text-muted-foreground">
                100% do seu dinheiro de volta se não ficar satisfeito
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderSummary;