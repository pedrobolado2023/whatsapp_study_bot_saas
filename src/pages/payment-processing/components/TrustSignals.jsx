import React from 'react';
import Icon from '../../../components/AppIcon';

const TrustSignals = () => {
  const securityFeatures = [
    {
      icon: 'Shield',
      title: 'Pagamento Seguro',
      description: 'Certificação SSL 256-bits'
    },
    {
      icon: 'Lock',
      title: 'Dados Protegidos',
      description: 'Criptografia de ponta a ponta'
    },
    {
      icon: 'CheckCircle',
      title: 'PCI Compliant',
      description: 'Padrão internacional de segurança'
    }
  ];

  const paymentLogos = [
    { name: 'Visa', color: 'text-blue-600' },
    { name: 'Mastercard', color: 'text-red-500' },
    { name: 'Elo', color: 'text-yellow-500' },
    { name: 'PIX', color: 'text-green-600' }
  ];

  const testimonials = [
    {
      name: 'Maria Silva',
      role: 'Estudante de Medicina',
      content: `O bot me ajudou muito na preparação para o ENEM. As questões são bem elaboradas e o suporte é excelente!`,
      rating: 5,
      verified: true
    },
    {
      name: 'João Santos',
      role: 'Concurseiro',
      content: `Aprovado no concurso da Polícia Civil! O WhatsApp Study Bot foi fundamental na minha preparação.`,
      rating: 5,
      verified: true
    },
    {
      name: 'Ana Costa',
      role: 'Estudante de Direito',
      content: `Prático e eficiente. Consigo estudar em qualquer lugar usando apenas o WhatsApp. Recomendo!`,
      rating: 5,
      verified: true
    }
  ];

  return (
    <div className="space-y-8">
      {/* Security Features */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Pagamento 100% Seguro
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {securityFeatures?.map((feature, index) => (
            <div key={index} className="flex items-center space-x-3 p-3 bg-muted rounded-md">
              <Icon name={feature?.icon} size={20} className="text-success" />
              <div>
                <div className="font-medium text-foreground text-sm">{feature?.title}</div>
                <div className="text-xs text-muted-foreground">{feature?.description}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Payment Methods */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Métodos de Pagamento Aceitos
        </h3>
        <div className="flex items-center justify-center space-x-6">
          {paymentLogos?.map((logo, index) => (
            <div key={index} className="flex items-center space-x-2">
              <Icon name="CreditCard" size={24} className={logo?.color} />
              <span className="font-medium text-foreground">{logo?.name}</span>
            </div>
          ))}
        </div>
        <div className="mt-4 text-center">
          <div className="inline-flex items-center space-x-2 px-3 py-1 bg-success/10 text-success rounded-full text-sm">
            <Icon name="Smartphone" size={16} />
            <span>PIX - Pagamento Instantâneo</span>
          </div>
        </div>
      </div>
      {/* Customer Testimonials */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          O que nossos alunos dizem
        </h3>
        <div className="space-y-4">
          {testimonials?.map((testimonial, index) => (
            <div key={index} className="p-4 bg-muted rounded-md">
              <div className="flex items-start space-x-3">
                <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Icon name="User" size={16} color="white" />
                </div>
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-2">
                    <span className="font-medium text-foreground">{testimonial?.name}</span>
                    {testimonial?.verified && (
                      <Icon name="CheckCircle" size={14} className="text-success" />
                    )}
                    <span className="text-sm text-muted-foreground">•</span>
                    <span className="text-sm text-muted-foreground">{testimonial?.role}</span>
                  </div>
                  <p className="text-sm text-muted-foreground mb-2">{testimonial?.content}</p>
                  <div className="flex items-center space-x-1">
                    {[...Array(testimonial?.rating)]?.map((_, i) => (
                      <Icon key={i} name="Star" size={14} className="text-yellow-500 fill-current" />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* Statistics */}
      <div className="bg-card border border-border rounded-lg p-6">
        <h3 className="text-lg font-semibold text-foreground mb-4 text-center">
          Números que Comprovam nossa Qualidade
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-primary">10.000+</div>
            <div className="text-sm text-muted-foreground">Estudantes Ativos</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success">95%</div>
            <div className="text-sm text-muted-foreground">Taxa de Aprovação</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning">50.000+</div>
            <div className="text-sm text-muted-foreground">Questões Disponíveis</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-accent">4.9/5</div>
            <div className="text-sm text-muted-foreground">Avaliação Média</div>
          </div>
        </div>
      </div>
      {/* Money Back Guarantee */}
      <div className="bg-gradient-to-r from-success/10 to-success/5 border border-success/20 rounded-lg p-6">
        <div className="flex items-center justify-center space-x-3 mb-3">
          <Icon name="Shield" size={32} className="text-success" />
          <h3 className="text-xl font-bold text-success">Garantia de 7 Dias</h3>
        </div>
        <p className="text-center text-muted-foreground">
          Se você não ficar completamente satisfeito com nosso serviço, devolvemos 100% do seu dinheiro. 
          Sem perguntas, sem complicações.
        </p>
        <div className="mt-4 flex items-center justify-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="Clock" size={14} />
            <span>Reembolso em até 24h</span>
          </div>
          <div className="flex items-center space-x-1">
            <Icon name="CheckCircle" size={14} />
            <span>Processo simples</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrustSignals;