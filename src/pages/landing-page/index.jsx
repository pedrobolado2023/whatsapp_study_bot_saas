import React from 'react';
import { Helmet } from 'react-helmet';
import CustomerFlowNavigation from '../../components/ui/CustomerFlowNavigation';
import HeroSection from './components/HeroSection';
import FeaturesSection from './components/FeaturesSection';
import PricingSection from './components/PricingSection';
import TestimonialsSection from './components/TestimonialsSection';
import FAQSection from './components/FAQSection';
import Footer from './components/Footer';

const LandingPage = () => {
  return (
    <>
      <Helmet>
        <title>StudyBot - Preparação para Concursos via WhatsApp | Aprovação Garantida</title>
        <meta name="description" content="Prepare-se para concursos públicos com questões personalizadas via WhatsApp. Mais de 10.000 aprovados. Planos a partir de R$ 29,90/mês. Garantia de 7 dias." />
        <meta name="keywords" content="concurso público, preparação, WhatsApp, questões, simulados, aprovação, estudo" />
        <meta property="og:title" content="StudyBot - Preparação para Concursos via WhatsApp" />
        <meta property="og:description" content="A forma mais eficiente de se preparar para concursos públicos. Questões personalizadas direto no seu WhatsApp." />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="/landing-page" />
      </Helmet>

      <div className="min-h-screen bg-background">
        {/* Navigation */}
        <CustomerFlowNavigation />

        {/* Main Content */}
        <main>
          {/* Hero Section */}
          <HeroSection />

          {/* Features Section */}
          <FeaturesSection />

          {/* Pricing Section */}
          <PricingSection />

          {/* Testimonials Section */}
          <TestimonialsSection />

          {/* FAQ Section */}
          <FAQSection />
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </>
  );
};

export default LandingPage;