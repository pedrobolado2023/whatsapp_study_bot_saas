import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

const FAQSection = () => {
  const [openFAQ, setOpenFAQ] = useState(0);

  const faqs = [
    {
      id: 1,
      question: "Como funciona o StudyBot no WhatsApp?",
      answer: `Após a assinatura, você receberá um link para adicionar nosso bot no WhatsApp. 
      O bot enviará questões personalizadas diariamente, simulados semanais e acompanhará 
      seu desempenho. Você pode interagir a qualquer momento enviando comandos como 
      "questão", "simulado" ou "relatório".`
    },
    {
      id: 2,
      question: "Posso cancelar minha assinatura a qualquer momento?",
      answer: `Sim! Você pode cancelar sua assinatura a qualquer momento através do próprio 
      WhatsApp ou entrando em contato com nosso suporte. Não há multas ou taxas de cancelamento. 
      Oferecemos também 7 dias de garantia total - se não ficar satisfeito, devolvemos 100% do valor.`
    },
    {
      id: 3,
      question: "As questões são atualizadas com frequência?",
      answer: `Nossa base de dados é atualizada semanalmente com questões de provas recentes 
      e tendências dos principais concursos. Temos uma equipe de professores especialistas 
      que analisa editais e provas para manter o conteúdo sempre atual e relevante.`
    },
    {
      id: 4,
      question: "Funciona para qualquer tipo de concurso?",
      answer: `Sim! Atendemos mais de 50 tipos de concursos diferentes, incluindo tribunais, 
      polícias, receita federal, INSS, bancos públicos, prefeituras e muito mais. 
      O sistema se adapta automaticamente ao seu concurso de interesse.`
    },
    {
      id: 5,
      question: "Preciso ter conhecimentos técnicos para usar?",
      answer: `Não! É muito simples de usar. Se você sabe usar WhatsApp, já sabe usar nosso bot. 
      A interface é intuitiva e oferecemos um tutorial completo no primeiro acesso. 
      Nosso suporte também está sempre disponível para ajudar.`
    },
    {
      id: 6,
      question: "Qual a diferença entre os planos mensal e trimestral?",
      answer: `O plano trimestral oferece economia de R$ 21,80 e inclui recursos premium como 
      questões exclusivas, simulados de bancas específicas, mentoria em grupo e material 
      complementar em PDF. É ideal para quem quer uma preparação mais completa.`
    },
    {
      id: 7,
      question: "Como é calculado meu desempenho?",
      answer: `O sistema analisa seus acertos, erros, tempo de resposta e evolução ao longo do tempo. 
      Geramos relatórios detalhados por matéria, identificamos seus pontos fracos e fortes, 
      e sugerimos planos de estudo personalizados para maximizar sua preparação.`
    },
    {
      id: 8,
      question: "Posso usar em mais de um dispositivo?",
      answer: `O bot funciona no WhatsApp, então você pode acessar de qualquer dispositivo onde 
      tenha o WhatsApp instalado (celular, WhatsApp Web, WhatsApp Desktop). 
      Seu progresso é sincronizado automaticamente em todos os dispositivos.`
    }
  ];

  const toggleFAQ = (id) => {
    setOpenFAQ(openFAQ === id ? null : id);
  };

  return (
    <section className="py-20 bg-muted/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center space-x-2 bg-primary/10 text-primary px-4 py-2 rounded-full text-sm font-medium mb-6">
            <Icon name="HelpCircle" size={16} />
            <span>Dúvidas Frequentes</span>
          </div>
          
          <h2 className="text-3xl lg:text-5xl font-bold text-foreground mb-6">
            Tire suas dúvidas sobre
            <span className="text-primary block">nossa plataforma</span>
          </h2>
          
          <p className="text-xl text-muted-foreground">
            Encontre respostas para as perguntas mais comuns sobre o StudyBot. 
            Não encontrou sua dúvida? Entre em contato conosco!
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className="space-y-4">
          {faqs?.map((faq) => (
            <div 
              key={faq?.id}
              className="bg-card border border-border rounded-xl shadow-soft overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(faq?.id)}
                className="w-full px-6 py-5 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <h3 className="text-lg font-semibold text-foreground pr-4">
                  {faq?.question}
                </h3>
                <Icon 
                  name={openFAQ === faq?.id ? "ChevronUp" : "ChevronDown"} 
                  size={20} 
                  className="text-muted-foreground flex-shrink-0 transition-transform duration-200"
                />
              </button>
              
              {openFAQ === faq?.id && (
                <div className="px-6 pb-5">
                  <div className="pt-2 border-t border-border">
                    <p className="text-muted-foreground leading-relaxed">
                      {faq?.answer}
                    </p>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support */}
        <div className="mt-16 text-center">
          <div className="bg-card border border-border rounded-xl p-8">
            <Icon name="MessageCircle" size={48} className="text-primary mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-foreground mb-3">
              Ainda tem dúvidas?
            </h3>
            <p className="text-muted-foreground mb-6">
              Nossa equipe de suporte está sempre pronta para ajudar você. 
              Entre em contato através do WhatsApp ou email.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <div className="flex items-center space-x-2 text-success">
                <Icon name="MessageSquare" size={16} />
                <span className="font-medium">(11) 99999-9999</span>
              </div>
              <div className="flex items-center space-x-2 text-primary">
                <Icon name="Mail" size={16} />
                <span className="font-medium">suporte@studybot.com.br</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FAQSection;