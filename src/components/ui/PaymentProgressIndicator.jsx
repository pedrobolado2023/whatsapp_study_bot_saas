import React from 'react';
import Icon from '../AppIcon';

const PaymentProgressIndicator = ({ 
  currentStep = 2, 
  totalSteps = 3,
  paymentMethod = 'pix',
  showSecurity = true 
}) => {
  const steps = [
    { id: 1, label: 'Plano', description: 'Seleção do plano' },
    { id: 2, label: 'Pagamento', description: 'Dados de pagamento' },
    { id: 3, label: 'Confirmação', description: 'Acesso liberado' }
  ];

  const paymentMethods = {
    pix: { icon: 'Smartphone', label: 'PIX', color: 'text-success' },
    card: { icon: 'CreditCard', label: 'Cartão', color: 'text-primary' },
    boleto: { icon: 'FileText', label: 'Boleto', color: 'text-warning' }
  };

  const currentMethod = paymentMethods?.[paymentMethod];

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      {/* Progress Steps */}
      <div className="flex items-center justify-between mb-6">
        {steps?.map((step, index) => (
          <div key={step?.id} className="flex items-center">
            <div className="flex flex-col items-center">
              {/* Step Circle */}
              <div className={`w-10 h-10 rounded-full flex items-center justify-center border-2 transition-all duration-300 ${
                step?.id < currentStep
                  ? 'bg-success border-success text-success-foreground'
                  : step?.id === currentStep
                  ? 'bg-primary border-primary text-primary-foreground'
                  : 'bg-muted border-border text-muted-foreground'
              }`}>
                {step?.id < currentStep ? (
                  <Icon name="Check" size={16} />
                ) : (
                  <span className="text-sm font-medium">{step?.id}</span>
                )}
              </div>
              
              {/* Step Label */}
              <div className="mt-2 text-center">
                <div className={`text-sm font-medium ${
                  step?.id <= currentStep ? 'text-foreground' : 'text-muted-foreground'
                }`}>
                  {step?.label}
                </div>
                <div className="text-xs text-muted-foreground hidden sm:block">
                  {step?.description}
                </div>
              </div>
            </div>
            
            {/* Connector Line */}
            {index < steps?.length - 1 && (
              <div className={`w-16 h-px mx-4 mt-[-20px] transition-all duration-300 ${
                step?.id < currentStep ? 'bg-success' : 'bg-border'
              }`}></div>
            )}
          </div>
        ))}
      </div>
      {/* Current Step Info */}
      <div className="flex items-center justify-between p-4 bg-muted rounded-md">
        <div className="flex items-center space-x-3">
          <Icon name={currentMethod?.icon} size={20} className={currentMethod?.color} />
          <div>
            <div className="font-medium text-foreground">
              Pagamento via {currentMethod?.label}
            </div>
            <div className="text-sm text-muted-foreground">
              Processamento rápido e seguro
            </div>
          </div>
        </div>
        
        {showSecurity && (
          <div className="flex items-center space-x-2 text-success">
            <Icon name="Shield" size={16} />
            <span className="text-sm font-medium">Seguro</span>
          </div>
        )}
      </div>
      {/* Security Features */}
      {showSecurity && (
        <div className="mt-4 grid grid-cols-1 sm:grid-cols-3 gap-3">
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Lock" size={14} />
            <span>Criptografia SSL</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="Shield" size={14} />
            <span>Dados Protegidos</span>
          </div>
          <div className="flex items-center space-x-2 text-sm text-muted-foreground">
            <Icon name="CheckCircle" size={14} />
            <span>Pagamento Seguro</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default PaymentProgressIndicator;