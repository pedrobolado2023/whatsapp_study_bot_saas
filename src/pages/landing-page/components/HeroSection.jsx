import React from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const HeroSection = () => {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    navigate('/payment-processing');
  };

  return (
    <section className="bg-gradient-to-br from-primary/5 via-background to-accent/5 py-20 lg:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Content */}
          <div className="text-center lg:text-left">
            <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
              <Icon name="Zap" size={16} />
              <span>Aprovação Garantida em 90 Dias</span>
            </div>
            
            <h1 className="text-4xl lg:text-6xl font-bold text-foreground mb-6 leading-tight">
              Prepare-se para
              <span className="text-primary block">Concursos Públicos</span>
              via WhatsApp
            </h1>
            
            <p className="text-xl text-muted-foreground mb-8 max-w-2xl">
              Receba questões personalizadas, simulados automáticos e acompanhamento de desempenho 
              direto no seu WhatsApp. Mais de 10.000 estudantes já foram aprovados.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8">
              <Button 
                size="lg" 
                onClick={handleGetStarted}
                iconName="MessageSquare"
                iconPosition="left"
                className="text-lg px-8 py-4"
              >
                Começar Agora - R$ 29,90/mês
              </Button>
              
              <Button 
                variant="outline" 
                size="lg"
                className="text-lg px-8 py-4"
              >
                <Icon name="Play" size={20} className="mr-2" />
                Ver Demonstração
              </Button>
            </div>
            
            {/* Trust Indicators */}
            <div className="flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Users" size={16} />
                <span>+10.000 aprovados</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Star" size={16} className="text-warning fill-current" />
                <span>4.9/5 avaliação</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} />
                <span>Garantia de 7 dias</span>
              </div>
            </div>
          </div>
          
          {/* Visual */}
          <div className="relative">
            <div className="bg-card rounded-2xl shadow-modal p-6 border border-border">
              {/* WhatsApp Interface Mockup */}
              <div className="bg-success rounded-t-xl p-4 text-success-foreground">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-success-foreground/20 rounded-full flex items-center justify-center">
                    <Icon name="Bot" size={20} />
                  </div>
                  <div>
                    <div className="font-medium">StudyBot Concursos</div>
                    <div className="text-sm opacity-80">online agora</div>
                  </div>
                </div>
              </div>
              
              <div className="bg-muted p-4 space-y-4 min-h-[300px]">
                {/* Bot Message */}
                <div className="flex justify-start">
                  <div className="bg-card rounded-lg p-3 max-w-xs shadow-soft">
                    <p className="text-sm text-foreground">
                      Olá! Vou enviar sua questão diária de Direito Constitucional 📚
                    </p>
                    <div className="text-xs text-muted-foreground mt-1">09:00</div>
                  </div>
                </div>
                
                {/* Question */}
                <div className="flex justify-start">
                  <div className="bg-card rounded-lg p-3 max-w-sm shadow-soft">
                    <p className="text-sm text-foreground font-medium mb-2">
                      Questão 1/5 - TRF 2023
                    </p>
                    <p className="text-sm text-foreground">
                      Sobre os direitos fundamentais, é correto afirmar que:
                    </p>
                    <div className="mt-2 space-y-1 text-xs">
                      <div>A) São absolutos</div>
                      <div>B) São relativos</div>
                      <div>C) Não podem ser limitados</div>
                    </div>
                    <div className="text-xs text-muted-foreground mt-2">09:01</div>
                  </div>
                </div>
                
                {/* User Response */}
                <div className="flex justify-end">
                  <div className="bg-primary text-primary-foreground rounded-lg p-3 max-w-xs">
                    <p className="text-sm">B</p>
                    <div className="text-xs opacity-80 mt-1">09:02</div>
                  </div>
                </div>
                
                {/* Bot Feedback */}
                <div className="flex justify-start">
                  <div className="bg-success/10 border border-success/20 rounded-lg p-3 max-w-sm">
                    <p className="text-sm text-success font-medium">✅ Correto!</p>
                    <p className="text-xs text-foreground mt-1">
                      Explicação: Os direitos fundamentais são relativos e podem sofrer limitações...
                    </p>
                    <div className="text-xs text-muted-foreground mt-2">09:03</div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Floating Elements */}
            <div className="absolute -top-4 -right-4 bg-success text-success-foreground rounded-full p-3 shadow-modal">
              <Icon name="CheckCircle" size={24} />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-primary text-primary-foreground rounded-full p-3 shadow-modal">
              <Icon name="MessageSquare" size={24} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;