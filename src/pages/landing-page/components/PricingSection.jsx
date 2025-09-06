import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const PricingSection = () => {
  const navigate = useNavigate();

  const plans = [
    {
      id: 'monthly',
      name: 'Plano Mensal',
      price: 29.90,
      originalPrice: null,
      period: 'mês',
      description: 'Ideal para quem quer testar nossa plataforma',
      features: [
        'Questões ilimitadas via WhatsApp',
        'Simulados personalizados',
        'Relatórios de desempenho',
        'Suporte via chat',
        'Acesso a comunidade'
      ],
      popular: false,
      savings: null
    },
    {
      id: 'quarterly',
      name: 'Plano Trimestral',
      price: 67.90,
      originalPrice: 89.70,
      period: '3 meses',
      description: 'Melhor custo-benefício para aprovação rápida',
      features: [
        'Tudo do plano mensal',
        'Questões premium exclusivas',
        'Simulados de bancas específicas',
        'Mentoria semanal em grupo',
        'Material complementar PDF',
        'Garantia de aprovação*'
      ],
      popular: true,
      savings: 'Economize R$ 21,80'
    }
  ];

  const handleSelectPlan = (planId) => {
    navigate('/payment-processing', { state: { selectedPlan: planId } });
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-accent/10 text-accent px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="DollarSign" size={16} />
            <span>Preços Especiais</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Escolha o plano ideal
            <span className="text-primary block">para sua aprovação</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Investimento acessível com resultados comprovados. Mais de 10.000 estudantes 
            já conquistaram suas aprovações conosco.
          </p>
        </div>

        {/* Pricing Cards */}
        <div className="grid lg:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {plans?.map((plan) => (
            <div 
              key={plan?.id}
              className={`relative bg-card border rounded-2xl p-8 shadow-soft hover:shadow-modal transition-all duration-300 ${
                plan?.popular 
                  ? 'border-primary ring-2 ring-primary/20 scale-105' :'border-border hover:border-primary/50'
              }`}
            >
              {/* Popular Badge */}
              {plan?.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <div className="bg-primary text-primary-foreground px-4 py-2 rounded-full text-sm font-medium">
                    <Icon name="Star" size={14} className="inline mr-1" />
                    Mais Popular
                  </div>
                </div>
              )}

              {/* Savings Badge */}
              {plan?.savings && (
                <div className="absolute -top-2 -right-2">
                  <div className="bg-success text-success-foreground px-3 py-1 rounded-full text-xs font-medium">
                    {plan?.savings}
                  </div>
                </div>
              )}

              {/* Plan Header */}
              <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-foreground mb-2">
                  {plan?.name}
                </h3>
                <p className="text-muted-foreground mb-6">
                  {plan?.description}
                </p>
                
                <div className="flex items-center justify-center space-x-2">
                  {plan?.originalPrice && (
                    <span className="text-lg text-muted-foreground line-through">
                      R$ {plan?.originalPrice?.toFixed(2)?.replace('.', ',')}
                    </span>
                  )}
                  <div className="flex items-baseline">
                    <span className="text-4xl font-bold text-foreground">
                      R$ {plan?.price?.toFixed(2)?.replace('.', ',')}
                    </span>
                    <span className="text-muted-foreground ml-1">
                      /{plan?.period}
                    </span>
                  </div>
                </div>
              </div>

              {/* Features */}
              <div className="space-y-4 mb-8">
                {plan?.features?.map((feature, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <Icon 
                      name="CheckCircle" 
                      size={20} 
                      className="text-success flex-shrink-0 mt-0.5" 
                    />
                    <span className="text-foreground">{feature}</span>
                  </div>
                ))}
              </div>

              {/* CTA Button */}
              <Button
                variant={plan?.popular ? "default" : "outline"}
                size="lg"
                fullWidth
                onClick={() => handleSelectPlan(plan?.id)}
                iconName="ArrowRight"
                iconPosition="right"
                className="text-lg py-4"
              >
                Escolher {plan?.name}
              </Button>

              {/* Guarantee */}
              <div className="text-center mt-4">
                <div className="flex items-center justify-center space-x-2 text-sm text-muted-foreground">
                  <Icon name="Shield" size={14} />
                  <span>Garantia de 7 dias ou seu dinheiro de volta</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Info */}
        <div className="text-center mt-16">
          <div className="bg-card border border-border rounded-xl p-6 max-w-3xl mx-auto">
            <h4 className="text-lg font-semibold text-foreground mb-3">
              Por que nossos preços são tão acessíveis?
            </h4>
            <p className="text-muted-foreground">
              Acreditamos que educação de qualidade deve ser acessível a todos. 
              Nossa tecnologia automatizada nos permite oferecer o melhor custo-benefício 
              do mercado, sem comprometer a qualidade do ensino.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;