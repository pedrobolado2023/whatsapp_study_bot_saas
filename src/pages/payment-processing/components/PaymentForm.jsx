import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const PaymentForm = ({ onPaymentSubmit }) => {
  const [paymentMethod, setPaymentMethod] = useState('pix');
  const [isProcessing, setIsProcessing] = useState(false);
  const [formData, setFormData] = useState({
    // Card data
    cardNumber: '',
    expiryDate: '',
    cvv: '',
    cardholderName: '',
    // Billing address
    fullName: '',
    email: '',
    phone: '',
    cpf: '',
    zipCode: '',
    address: '',
    number: '',
    complement: '',
    neighborhood: '',
    city: '',
    state: ''
  });

  const paymentMethods = [
    { 
      id: 'pix', 
      name: 'PIX', 
      icon: 'Smartphone', 
      description: 'Pagamento instantâneo',
      processingTime: 'Aprovação imediata'
    },
    { 
      id: 'card', 
      name: 'Cartão de Crédito', 
      icon: 'CreditCard', 
      description: 'Visa, Mastercard, Elo',
      processingTime: 'Aprovação em segundos'
    },
    { 
      id: 'boleto', 
      name: 'Boleto Bancário', 
      icon: 'FileText', 
      description: 'Vencimento em 3 dias úteis',
      processingTime: 'Aprovação em até 2 dias úteis'
    }
  ];

  const stateOptions = [
    { value: 'AC', label: 'Acre' },
    { value: 'AL', label: 'Alagoas' },
    { value: 'AP', label: 'Amapá' },
    { value: 'AM', label: 'Amazonas' },
    { value: 'BA', label: 'Bahia' },
    { value: 'CE', label: 'Ceará' },
    { value: 'DF', label: 'Distrito Federal' },
    { value: 'ES', label: 'Espírito Santo' },
    { value: 'GO', label: 'Goiás' },
    { value: 'MA', label: 'Maranhão' },
    { value: 'MT', label: 'Mato Grosso' },
    { value: 'MS', label: 'Mato Grosso do Sul' },
    { value: 'MG', label: 'Minas Gerais' },
    { value: 'PA', label: 'Pará' },
    { value: 'PB', label: 'Paraíba' },
    { value: 'PR', label: 'Paraná' },
    { value: 'PE', label: 'Pernambuco' },
    { value: 'PI', label: 'Piauí' },
    { value: 'RJ', label: 'Rio de Janeiro' },
    { value: 'RN', label: 'Rio Grande do Norte' },
    { value: 'RS', label: 'Rio Grande do Sul' },
    { value: 'RO', label: 'Rondônia' },
    { value: 'RR', label: 'Roraima' },
    { value: 'SC', label: 'Santa Catarina' },
    { value: 'SP', label: 'São Paulo' },
    { value: 'SE', label: 'Sergipe' },
    { value: 'TO', label: 'Tocantins' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCardNumber = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    const matches = v?.match(/\d{4,16}/g);
    const match = matches && matches?.[0] || '';
    const parts = [];
    for (let i = 0, len = match?.length; i < len; i += 4) {
      parts?.push(match?.substring(i, i + 4));
    }
    if (parts?.length) {
      return parts?.join(' ');
    } else {
      return v;
    }
  };

  const formatExpiryDate = (value) => {
    const v = value?.replace(/\s+/g, '')?.replace(/[^0-9]/gi, '');
    if (v?.length >= 2) {
      return v?.substring(0, 2) + '/' + v?.substring(2, 4);
    }
    return v;
  };

  const formatCPF = (value) => {
    const v = value?.replace(/\D/g, '');
    return v?.replace(/(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$4');
  };

  const formatZipCode = (value) => {
    const v = value?.replace(/\D/g, '');
    return v?.replace(/(\d{5})(\d{3})/, '$1-$2');
  };

  const handleSubmit = async (e) => {
    e?.preventDefault();
    setIsProcessing(true);
    
    // Simulate payment processing
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentSubmit?.(paymentMethod, formData);
    }, 3000);
  };

  const renderPixPayment = () => (
    <div className="space-y-6">
      <div className="text-center p-6 bg-muted rounded-lg">
        <div className="w-32 h-32 bg-foreground mx-auto mb-4 rounded-lg flex items-center justify-center">
          <div className="text-background text-xs font-mono">
            QR CODE<br/>PIX
          </div>
        </div>
        <p className="text-sm text-muted-foreground mb-4">
          Escaneie o código QR com o app do seu banco ou copie a chave PIX
        </p>
        <div className="flex items-center space-x-2 p-3 bg-card border border-border rounded-md">
          <code className="flex-1 text-xs font-mono text-foreground break-all">
            00020126580014br.gov.bcb.pix013636c4c91e-4b5a-4d1a-8b2a-1234567890ab5204000053039865802BR5925WhatsApp Study Bot SaaS6009SAO PAULO62070503***6304ABCD
          </code>
          <Button variant="outline" size="sm" iconName="Copy">
            Copiar
          </Button>
        </div>
      </div>
      <div className="flex items-center space-x-2 text-sm text-success">
        <Icon name="Clock" size={16} />
        <span>Pagamento processado instantaneamente após confirmação</span>
      </div>
    </div>
  );

  const renderCardPayment = () => (
    <div className="space-y-4">
      <div className="grid grid-cols-1 gap-4">
        <Input
          label="Número do Cartão"
          type="text"
          placeholder="1234 5678 9012 3456"
          value={formData?.cardNumber}
          onChange={(e) => handleInputChange('cardNumber', formatCardNumber(e?.target?.value))}
          maxLength={19}
          required
        />
        <div className="grid grid-cols-2 gap-4">
          <Input
            label="Validade"
            type="text"
            placeholder="MM/AA"
            value={formData?.expiryDate}
            onChange={(e) => handleInputChange('expiryDate', formatExpiryDate(e?.target?.value))}
            maxLength={5}
            required
          />
          <Input
            label="CVV"
            type="text"
            placeholder="123"
            value={formData?.cvv}
            onChange={(e) => handleInputChange('cvv', e?.target?.value?.replace(/\D/g, '')?.substring(0, 4))}
            maxLength={4}
            required
          />
        </div>
        <Input
          label="Nome no Cartão"
          type="text"
          placeholder="Nome como impresso no cartão"
          value={formData?.cardholderName}
          onChange={(e) => handleInputChange('cardholderName', e?.target?.value)}
          required
        />
      </div>
      
      {/* Security Badges */}
      <div className="flex items-center justify-center space-x-4 py-4 border-t border-border">
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Shield" size={16} className="text-success" />
          <span>SSL Seguro</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="Lock" size={16} className="text-success" />
          <span>Criptografado</span>
        </div>
        <div className="flex items-center space-x-2 text-sm text-muted-foreground">
          <Icon name="CheckCircle" size={16} className="text-success" />
          <span>PCI Compliant</span>
        </div>
      </div>
    </div>
  );

  const renderBoletoPayment = () => (
    <div className="space-y-4">
      <div className="p-4 bg-warning/10 border border-warning/20 rounded-lg">
        <div className="flex items-start space-x-3">
          <Icon name="AlertCircle" size={20} className="text-warning flex-shrink-0 mt-0.5" />
          <div>
            <h4 className="font-medium text-warning">Instruções do Boleto</h4>
            <ul className="mt-2 text-sm text-muted-foreground space-y-1">
              <li>• O boleto será enviado para seu e-mail após a confirmação</li>
              <li>• Prazo de vencimento: 3 dias úteis</li>
              <li>• Pagamento pode ser feito em qualquer banco ou lotérica</li>
              <li>• Acesso liberado em até 2 dias úteis após confirmação</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="space-y-6">
      {/* Payment Method Selection */}
      <div>
        <h3 className="text-lg font-semibold text-foreground mb-4">Método de Pagamento</h3>
        <div className="grid grid-cols-1 gap-3">
          {paymentMethods?.map((method) => (
            <button
              key={method?.id}
              onClick={() => setPaymentMethod(method?.id)}
              className={`p-4 border rounded-lg text-left transition-all duration-200 ${
                paymentMethod === method?.id
                  ? 'border-primary bg-primary/5 ring-2 ring-primary/20' :'border-border hover:border-primary/50 hover:bg-muted/50'
              }`}
            >
              <div className="flex items-center space-x-3">
                <Icon 
                  name={method?.icon} 
                  size={24} 
                  className={paymentMethod === method?.id ? 'text-primary' : 'text-muted-foreground'} 
                />
                <div className="flex-1">
                  <div className={`font-medium ${
                    paymentMethod === method?.id ? 'text-primary' : 'text-foreground'
                  }`}>
                    {method?.name}
                  </div>
                  <div className="text-sm text-muted-foreground">{method?.description}</div>
                  <div className="text-xs text-muted-foreground mt-1">
                    {method?.processingTime}
                  </div>
                </div>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                  paymentMethod === method?.id
                    ? 'border-primary bg-primary' :'border-border'
                }`}>
                  {paymentMethod === method?.id && (
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  )}
                </div>
              </div>
            </button>
          ))}
        </div>
      </div>
      {/* Payment Form */}
      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Payment Method Content */}
        <div>
          {paymentMethod === 'pix' && renderPixPayment()}
          {paymentMethod === 'card' && renderCardPayment()}
          {paymentMethod === 'boleto' && renderBoletoPayment()}
        </div>

        {/* Billing Information */}
        <div>
          <h3 className="text-lg font-semibold text-foreground mb-4">Dados de Cobrança</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Input
              label="Nome Completo"
              type="text"
              placeholder="Seu nome completo"
              value={formData?.fullName}
              onChange={(e) => handleInputChange('fullName', e?.target?.value)}
              required
            />
            <Input
              label="E-mail"
              type="email"
              placeholder="seu@email.com"
              value={formData?.email}
              onChange={(e) => handleInputChange('email', e?.target?.value)}
              required
            />
            <Input
              label="Telefone"
              type="tel"
              placeholder="(11) 99999-9999"
              value={formData?.phone}
              onChange={(e) => handleInputChange('phone', e?.target?.value)}
              required
            />
            <Input
              label="CPF"
              type="text"
              placeholder="000.000.000-00"
              value={formData?.cpf}
              onChange={(e) => handleInputChange('cpf', formatCPF(e?.target?.value))}
              maxLength={14}
              required
            />
            <Input
              label="CEP"
              type="text"
              placeholder="00000-000"
              value={formData?.zipCode}
              onChange={(e) => handleInputChange('zipCode', formatZipCode(e?.target?.value))}
              maxLength={9}
              required
            />
            <Input
              label="Endereço"
              type="text"
              placeholder="Rua, Avenida, etc."
              value={formData?.address}
              onChange={(e) => handleInputChange('address', e?.target?.value)}
              required
            />
            <Input
              label="Número"
              type="text"
              placeholder="123"
              value={formData?.number}
              onChange={(e) => handleInputChange('number', e?.target?.value)}
              required
            />
            <Input
              label="Complemento"
              type="text"
              placeholder="Apto, Bloco, etc. (opcional)"
              value={formData?.complement}
              onChange={(e) => handleInputChange('complement', e?.target?.value)}
            />
            <Input
              label="Bairro"
              type="text"
              placeholder="Nome do bairro"
              value={formData?.neighborhood}
              onChange={(e) => handleInputChange('neighborhood', e?.target?.value)}
              required
            />
            <Input
              label="Cidade"
              type="text"
              placeholder="Nome da cidade"
              value={formData?.city}
              onChange={(e) => handleInputChange('city', e?.target?.value)}
              required
            />
            <Select
              label="Estado"
              placeholder="Selecione o estado"
              options={stateOptions}
              value={formData?.state}
              onChange={(value) => handleInputChange('state', value)}
              required
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-6 border-t border-border">
          <Button
            type="submit"
            variant="default"
            size="lg"
            fullWidth
            loading={isProcessing}
            iconName={paymentMethod === 'pix' ? 'Smartphone' : paymentMethod === 'card' ? 'CreditCard' : 'FileText'}
            iconPosition="left"
            disabled={isProcessing}
          >
            {isProcessing 
              ? 'Processando Pagamento...' 
              : paymentMethod === 'pix' ?'Confirmar Pagamento PIX' 
                : paymentMethod === 'card' ?'Finalizar Pagamento' :'Gerar Boleto'
            }
          </Button>
          
          <p className="text-xs text-muted-foreground text-center mt-3">
            Ao finalizar o pagamento, você concorda com nossos{' '}
            <a href="#" className="text-primary hover:underline">Termos de Uso</a> e{' '}
            <a href="#" className="text-primary hover:underline">Política de Privacidade</a>
          </p>
        </div>
      </form>
    </div>
  );
};

export default PaymentForm;