import React from 'react';
import { Link } from 'react-router-dom';
import Icon from '../../../components/AppIcon';

const Footer = () => {
  const currentYear = new Date()?.getFullYear();

  const footerLinks = {
    product: [
      { name: 'Como Funciona', href: '#como-funciona' },
      { name: 'Preços', href: '#precos' },
      { name: 'Depoimentos', href: '#depoimentos' },
      { name: 'FAQ', href: '#faq' }
    ],
    support: [
      { name: 'Central de Ajuda', href: '#ajuda' },
      { name: 'Contato', href: '#contato' },
      { name: 'WhatsApp Suporte', href: 'https://wa.me/5511999999999' },
      { name: 'Status do Sistema', href: '#status' }
    ],
    legal: [
      { name: 'Termos de Uso', href: '#termos' },
      { name: 'Política de Privacidade', href: '#privacidade' },
      { name: 'Política de Reembolso', href: '#reembolso' },
      { name: 'LGPD', href: '#lgpd' }
    ]
  };

  const paymentMethods = [
    { name: 'PIX', icon: 'Smartphone' },
    { name: 'Cartão', icon: 'CreditCard' },
    { name: 'Boleto', icon: 'FileText' }
  ];

  const socialLinks = [
    { name: 'Instagram', icon: 'Instagram', href: '#instagram' },
    { name: 'YouTube', icon: 'Youtube', href: '#youtube' },
    { name: 'LinkedIn', icon: 'Linkedin', href: '#linkedin' },
    { name: 'Telegram', icon: 'Send', href: '#telegram' }
  ];

  return (
    <footer className="bg-card border-t border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Footer Content */}
        <div className="py-16">
          <div className="grid lg:grid-cols-4 gap-8">
            {/* Brand Section */}
            <div className="lg:col-span-1">
              <Link to="/landing-page" className="flex items-center space-x-2 mb-6">
                <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                  <Icon name="MessageSquare" size={24} color="white" />
                </div>
                <span className="text-xl font-bold text-foreground">
                  StudyBot
                </span>
              </Link>
              
              <p className="text-muted-foreground mb-6 leading-relaxed">
                A plataforma mais eficiente para preparação de concursos públicos via WhatsApp. 
                Mais de 10.000 aprovados confiam em nossa metodologia.
              </p>
              
              {/* Social Links */}
              <div className="flex space-x-4">
                {socialLinks?.map((social) => (
                  <a
                    key={social?.name}
                    href={social?.href}
                    className="w-10 h-10 bg-muted rounded-lg flex items-center justify-center hover:bg-primary hover:text-primary-foreground transition-colors"
                    aria-label={social?.name}
                  >
                    <Icon name={social?.icon} size={18} />
                  </a>
                ))}
              </div>
            </div>

            {/* Links Sections */}
            <div className="lg:col-span-3 grid md:grid-cols-3 gap-8">
              {/* Product Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Produto</h3>
                <ul className="space-y-3">
                  {footerLinks?.product?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Suporte</h3>
                <ul className="space-y-3">
                  {footerLinks?.support?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Legal Links */}
              <div>
                <h3 className="font-semibold text-foreground mb-4">Legal</h3>
                <ul className="space-y-3">
                  {footerLinks?.legal?.map((link) => (
                    <li key={link?.name}>
                      <a
                        href={link?.href}
                        className="text-muted-foreground hover:text-foreground transition-colors"
                      >
                        {link?.name}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        {/* Payment Methods & Trust Signals */}
        <div className="py-8 border-t border-border">
          <div className="flex flex-col lg:flex-row items-center justify-between space-y-6 lg:space-y-0">
            {/* Payment Methods */}
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-foreground">
                Formas de Pagamento:
              </span>
              <div className="flex items-center space-x-4">
                {paymentMethods?.map((method) => (
                  <div
                    key={method?.name}
                    className="flex items-center space-x-2 bg-muted rounded-lg px-3 py-2"
                  >
                    <Icon name={method?.icon} size={16} className="text-muted-foreground" />
                    <span className="text-sm text-muted-foreground">{method?.name}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Trust Signals */}
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <div className="flex items-center space-x-2">
                <Icon name="Shield" size={16} className="text-success" />
                <span>Pagamento Seguro</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="Lock" size={16} className="text-success" />
                <span>SSL Certificado</span>
              </div>
              <div className="flex items-center space-x-2">
                <Icon name="CheckCircle" size={16} className="text-success" />
                <span>LGPD Compliant</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="py-6 border-t border-border">
          <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0">
            <div className="text-sm text-muted-foreground">
              © {currentYear} StudyBot - WhatsApp Study Assistant. Todos os direitos reservados.
            </div>
            
            <div className="flex items-center space-x-6 text-sm text-muted-foreground">
              <span>CNPJ: 12.345.678/0001-90</span>
              <span>•</span>
              <span>São Paulo, Brasil</span>
            </div>
          </div>
        </div>

        {/* Disclaimer */}
        <div className="py-4 border-t border-border">
          <p className="text-xs text-muted-foreground text-center leading-relaxed">
            * A garantia de aprovação se refere ao compromisso com a qualidade do conteúdo e metodologia. 
            O sucesso em concursos públicos depende do esforço individual, dedicação aos estudos e outros fatores externos. 
            StudyBot é uma ferramenta de apoio aos estudos e não garante aprovação automática.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;