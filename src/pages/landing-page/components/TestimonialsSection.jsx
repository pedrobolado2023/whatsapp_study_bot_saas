import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const TestimonialsSection = () => {
  const [currentTestimonial, setCurrentTestimonial] = useState(0);

  const testimonials = [
    {
      id: 1,
      name: "Ana Carolina Silva",
      position: "Aprovada TRT-SP 2024",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
      content: `Estudei 6 meses usando o StudyBot e consegui minha aprovação no TRT-SP! 
      As questões personalizadas fizeram toda diferença na minha preparação. 
      O acompanhamento via WhatsApp me manteve disciplinada nos estudos.`,
      rating: 5,
      exam: "Tribunal Regional do Trabalho",
      location: "São Paulo, SP"
    },
    {
      id: 2,
      name: "Carlos Eduardo Santos",
      position: "Aprovado Polícia Civil-RJ 2024",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
      content: `Incrível como a IA consegue identificar exatamente onde eu tinha dificuldades. 
      Os simulados eram muito parecidos com a prova real. Recomendo para todos 
      que querem uma preparação eficiente e focada.`,
      rating: 5,
      exam: "Polícia Civil do Rio de Janeiro",
      location: "Rio de Janeiro, RJ"
    },
    {
      id: 3,
      name: "Mariana Oliveira",
      position: "Aprovada INSS 2024",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
      content: `Como mãe e trabalhadora, não tinha muito tempo para estudar. 
      O StudyBot me permitiu estudar nos intervalos do trabalho e até no transporte. 
      Consegui minha aprovação no INSS em apenas 4 meses!`,
      rating: 5,
      exam: "Instituto Nacional do Seguro Social",
      location: "Belo Horizonte, MG"
    },
    {
      id: 4,
      name: "Rafael Mendes",
      position: "Aprovado Receita Federal 2024",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
      content: `A qualidade das questões é excepcional. Muito similar às provas da Receita Federal. 
      O sistema de estatísticas me ajudou a focar nas matérias que mais precisava melhorar. 
      Valeu cada centavo investido!`,
      rating: 5,
      exam: "Receita Federal do Brasil",
      location: "Brasília, DF"
    },
    {
      id: 5,
      name: "Juliana Costa",
      position: "Aprovada TJ-MG 2024",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&h=150&fit=crop&crop=face",
      content: `Tentei outros cursos online, mas nada se compara à praticidade do StudyBot. 
      Receber as questões no WhatsApp me manteve sempre engajada. 
      A aprovação no TJ-MG foi o resultado de uma preparação inteligente.`,
      rating: 5,
      exam: "Tribunal de Justiça de Minas Gerais",
      location: "Belo Horizonte, MG"
    },
    {
      id: 6,
      name: "Pedro Henrique Lima",
      position: "Aprovado Banco do Brasil 2024",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
      content: `O diferencial está na personalização. O bot aprendeu meu perfil de estudos 
      e sempre enviava questões no nível certo de dificuldade. 
      Consegui minha vaga no Banco do Brasil com uma preparação muito mais eficiente.`,
      rating: 5,
      exam: "Banco do Brasil",
      location: "Salvador, BA"
    }
  ];

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials?.length);
  };

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials?.length) % testimonials?.length);
  };

  const renderStars = (rating) => {
    return Array.from({ length: 5 }, (_, index) => (
      <Icon
        key={index}
        name="Star"
        size={16}
        className={index < rating ? "text-warning fill-current" : "text-muted-foreground"}
      />
    ));
  };

  return (
    <section className="py-20 bg-background">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-success/10 text-success px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="MessageCircle" size={16} />
            <span>Depoimentos Reais</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Histórias de
            <span className="text-primary block">sucesso reais</span>
          </h2>
          
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Conheça alguns dos milhares de estudantes que já conquistaram suas aprovações 
            usando nossa plataforma de preparação via WhatsApp.
          </p>
        </div>

        {/* Main Testimonial - Desktop */}
        <div className="hidden lg:block">
          <div className="bg-card border border-border rounded-2xl p-8 shadow-soft max-w-4xl mx-auto">
            <div className="grid lg:grid-cols-3 gap-8 items-center">
              {/* Avatar and Info */}
              <div className="text-center">
                <div className="relative inline-block mb-4">
                  <Image
                    src={testimonials?.[currentTestimonial]?.avatar}
                    alt={testimonials?.[currentTestimonial]?.name}
                    className="w-24 h-24 rounded-full object-cover mx-auto"
                  />
                  <div className="absolute -bottom-2 -right-2 bg-success text-success-foreground rounded-full p-2">
                    <Icon name="CheckCircle" size={16} />
                  </div>
                </div>
                
                <h4 className="text-xl font-semibold text-foreground mb-1">
                  {testimonials?.[currentTestimonial]?.name}
                </h4>
                <p className="text-success font-medium mb-2">
                  {testimonials?.[currentTestimonial]?.position}
                </p>
                <p className="text-sm text-muted-foreground mb-3">
                  {testimonials?.[currentTestimonial]?.location}
                </p>
                
                <div className="flex justify-center space-x-1 mb-4">
                  {renderStars(testimonials?.[currentTestimonial]?.rating)}
                </div>
                
                <div className="bg-muted rounded-lg p-3">
                  <p className="text-sm font-medium text-foreground">
                    {testimonials?.[currentTestimonial]?.exam}
                  </p>
                </div>
              </div>
              
              {/* Testimonial Content */}
              <div className="lg:col-span-2">
                <div className="relative">
                  <Icon 
                    name="Quote" 
                    size={48} 
                    className="text-primary/20 absolute -top-4 -left-4" 
                  />
                  <blockquote className="text-lg text-foreground leading-relaxed pl-8">
                    "{testimonials?.[currentTestimonial]?.content}"
                  </blockquote>
                </div>
              </div>
            </div>
            
            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-border">
              <button
                onClick={prevTestimonial}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <Icon name="ChevronLeft" size={20} />
                <span>Anterior</span>
              </button>
              
              <div className="flex space-x-2">
                {testimonials?.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-2 h-2 rounded-full transition-colors ${
                      index === currentTestimonial ? 'bg-primary' : 'bg-muted-foreground/30'
                    }`}
                  />
                ))}
              </div>
              
              <button
                onClick={nextTestimonial}
                className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors"
              >
                <span>Próximo</span>
                <Icon name="ChevronRight" size={20} />
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Testimonials Grid */}
        <div className="lg:hidden grid gap-6">
          {testimonials?.slice(0, 3)?.map((testimonial) => (
            <div key={testimonial?.id} className="bg-card border border-border rounded-xl p-6 shadow-soft">
              <div className="flex items-start space-x-4 mb-4">
                <Image
                  src={testimonial?.avatar}
                  alt={testimonial?.name}
                  className="w-12 h-12 rounded-full object-cover flex-shrink-0"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-foreground">{testimonial?.name}</h4>
                  <p className="text-sm text-success font-medium">{testimonial?.position}</p>
                  <div className="flex space-x-1 mt-1">
                    {renderStars(testimonial?.rating)}
                  </div>
                </div>
              </div>
              
              <blockquote className="text-foreground leading-relaxed">
                "{testimonial?.content}"
              </blockquote>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="mt-16 grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl font-bold text-primary mb-2">10.000+</div>
            <div className="text-muted-foreground">Aprovados</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-success mb-2">4.9/5</div>
            <div className="text-muted-foreground">Avaliação</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-accent mb-2">95%</div>
            <div className="text-muted-foreground">Satisfação</div>
          </div>
          <div>
            <div className="text-3xl font-bold text-warning mb-2">24/7</div>
            <div className="text-muted-foreground">Suporte</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;