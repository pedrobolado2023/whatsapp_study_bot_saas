import React from 'react';
import Icon from '../../../components/AppIcon';

const FeaturesSection = () => {
  const features = [
    {
      id: 1,
      icon: "MessageSquare",
      title: "Direto no WhatsApp",
      description: "Receba questões e simulados diretamente no seu WhatsApp, sem precisar baixar apps ou acessar sites.",
      color: "text-success"
    },
    {
      id: 2,
      icon: "Brain",
      title: "IA Personalizada",
      description: "Algoritmo inteligente que adapta as questões ao seu nível de conhecimento e áreas de dificuldade.",
      color: "text-primary"
    },
    {
      id: 3,
      icon: "Target",
      title: "Foco no seu Concurso",
      description: "Questões específicas para o seu concurso de interesse, com base em editais e provas anteriores.",
      color: "text-accent"
    },
    {
      id: 4,
      icon: "BarChart3",
      title: "Acompanhamento Detalhado",
      description: "Relatórios de desempenho, estatísticas de acertos e identificação de pontos fracos.",
      color: "text-warning"
    },
    {
      id: 5,
      icon: "Clock",
      title: "Estudo Flexível",
      description: "Estude no seu ritmo, a qualquer hora e lugar. Questões disponíveis 24/7 no seu celular.",
      color: "text-secondary"
    },
    {
      id: 6,
      icon: "Users",
      title: "Comunidade Ativa",
      description: "Participe de grupos de estudo e tire dúvidas com outros candidatos e professores.",
      color: "text-error"
    }
  ];

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="Sparkles" size={16} />
            <span>Recursos Exclusivos</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tudo que você precisa para
            <span className="text-primary block">ser aprovado</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Nossa plataforma oferece uma experiência completa de preparação para concursos, 
            combinando tecnologia avançada com metodologia comprovada.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features?.map((feature) => (
            <div 
              key={feature?.id}
              className="bg-card border border-border rounded-xl p-6 hover:shadow-modal transition-all duration-300 group"
            >
              <div className={`w-12 h-12 rounded-lg bg-muted flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                <Icon 
                  name={feature?.icon} 
                  size={24} 
                  className={feature?.color}
                />
              </div>
              
              <h3 className="text-xl font-semibold text-foreground mb-3">
                {feature?.title}
              </h3>
              
              <p className="text-muted-foreground leading-relaxed">
                {feature?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-primary/10 via-accent/10 to-success/10 rounded-2xl p-8 border border-border">
            <h3 className="text-2xl font-bold text-foreground mb-4">
              Pronto para começar sua jornada rumo à aprovação?
            </h3>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              Junte-se a milhares de candidatos que já estão usando nossa plataforma 
              para acelerar seus estudos e conquistar a tão sonhada aprovação.
            </p>
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Sem compromisso</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Cancele quando quiser</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>Suporte 24/7</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;