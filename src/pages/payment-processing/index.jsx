import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CustomerFlowNavigation from '../../components/ui/CustomerFlowNavigation';
import PaymentProgressIndicator from '../../components/ui/PaymentProgressIndicator';
import OrderSummary from './components/OrderSummary';
import PaymentForm from './components/PaymentForm';
import TrustSignals from './components/TrustSignals';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const PaymentProcessing = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(false);
  const [isOrderSummaryCollapsed, setIsOrderSummaryCollapsed] = useState(true);
  const [paymentStatus, setPaymentStatus] = useState('form'); // form, processing, success, error
  const [paymentMethod, setPaymentMethod] = useState('pix');

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
      if (window.innerWidth >= 768) {
        setIsOrderSummaryCollapsed(false);
      }
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const handlePaymentSubmit = (method, formData) => {
    setPaymentMethod(method);
    setPaymentStatus('processing');
    
    // Simulate payment processing
    setTimeout(() => {
      // Simulate success (90% success rate)
      if (Math.random() > 0.1) {
        setPaymentStatus('success');
        // Redirect to onboarding after success
        setTimeout(() => {
          navigate('/landing-page', { 
            state: { 
              paymentSuccess: true, 
              plan: 'trimestral',
              method: method 
            } 
          });
        }, 3000);
      } else {
        setPaymentStatus('error');
      }
    }, 3000);
  };

  const handleRetryPayment = () => {
    setPaymentStatus('form');
  };

  const renderPaymentStatus = () => {
    if (paymentStatus === 'processing') {
      return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Processando Pagamento
            </h3>
            <p className="text-muted-foreground mb-4">
              {paymentMethod === 'pix' ?'Aguardando confirmação do PIX...'
                : paymentMethod === 'card' ?'Validando dados do cartão...' :'Gerando boleto bancário...'
              }
            </p>
            <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} className="text-success" />
              <span>Transação segura e criptografada</span>
            </div>
          </div>
        </div>
      );
    }

    if (paymentStatus === 'success') {
      return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircle" size={32} className="text-success" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Pagamento Aprovado!
            </h3>
            <p className="text-muted-foreground mb-6">
              Seu acesso ao WhatsApp Study Bot foi liberado com sucesso. 
              Você será redirecionado em instantes.
            </p>
            <div className="space-y-3">
              <div className="flex items-center justify-center space-x-2 text-sm text-success">
                <Icon name="Smartphone" size={16} />
                <span>Acesso via WhatsApp liberado</span>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm text-success">
                <Icon name="Mail" size={16} />
                <span>Instruções enviadas por e-mail</span>
              </div>
            </div>
          </div>
        </div>
      );
    }

    if (paymentStatus === 'error') {
      return (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 flex items-center justify-center">
          <div className="bg-card border border-border rounded-lg p-8 max-w-md w-full mx-4 text-center">
            <div className="w-16 h-16 bg-error/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="XCircle" size={32} className="text-error" />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">
              Erro no Pagamento
            </h3>
            <p className="text-muted-foreground mb-6">
              Não foi possível processar seu pagamento. Verifique os dados e tente novamente.
            </p>
            <div className="space-y-3">
              <Button
                variant="default"
                fullWidth
                onClick={handleRetryPayment}
                iconName="RefreshCw"
                iconPosition="left"
              >
                Tentar Novamente
              </Button>
              <Button
                variant="outline"
                fullWidth
                onClick={() => navigate('/landing-page')}
              >
                Voltar ao Início
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Navigation */}
      <CustomerFlowNavigation showProgress={true} />

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Progress Indicator - Mobile */}
        <div className="md:hidden mb-6">
          <PaymentProgressIndicator 
            currentStep={2} 
            paymentMethod={paymentMethod}
            showSecurity={false}
          />
        </div>

        {/* Page Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Finalize sua Assinatura
          </h1>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Você está a um passo de ter acesso completo ao WhatsApp Study Bot. 
            Escolha seu método de pagamento preferido e comece a estudar hoje mesmo.
          </p>
        </div>

        {/* Main Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Payment Form */}
          <div className="lg:col-span-2 space-y-8">
            {/* Progress Indicator - Desktop */}
            <div className="hidden md:block">
              <PaymentProgressIndicator 
                currentStep={2} 
                paymentMethod={paymentMethod}
              />
            </div>

            {/* Order Summary - Mobile */}
            <div className="md:hidden">
              <OrderSummary 
                isCollapsed={isOrderSummaryCollapsed}
                onToggle={() => setIsOrderSummaryCollapsed(!isOrderSummaryCollapsed)}
              />
            </div>

            {/* Payment Form */}
            <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
              <PaymentForm onPaymentSubmit={handlePaymentSubmit} />
            </div>

            {/* Trust Signals - Mobile */}
            <div className="md:hidden">
              <TrustSignals />
            </div>
          </div>

          {/* Right Column - Order Summary & Trust Signals */}
          <div className="space-y-8">
            {/* Order Summary - Desktop */}
            <div className="hidden md:block">
              <OrderSummary 
                isCollapsed={false}
                onToggle={() => {}}
              />
            </div>

            {/* Trust Signals - Desktop */}
            <div className="hidden md:block">
              <TrustSignals />
            </div>
          </div>
        </div>

        {/* Bottom CTA Section */}
        <div className="mt-12 text-center">
          <div className="bg-card border border-border rounded-lg p-6 max-w-2xl mx-auto">
            <h3 className="text-lg font-semibold text-foreground mb-2">
              Precisa de Ajuda?
            </h3>
            <p className="text-muted-foreground mb-4">
              Nossa equipe de suporte está disponível para ajudar você com qualquer dúvida sobre o pagamento.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center space-y-2 sm:space-y-0 sm:space-x-4">
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="MessageCircle" size={16} />
                <span>WhatsApp: (11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-sm text-muted-foreground">
                <Icon name="Mail" size={16} />
                <span>suporte@whatsappstudybot.com</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Payment Status Overlay */}
      {renderPaymentStatus()}
    </div>
  );
};

export default PaymentProcessing;