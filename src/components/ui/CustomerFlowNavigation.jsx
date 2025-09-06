import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const CustomerFlowNavigation = ({ showProgress = false }) => {
  const location = useLocation();
  const isPaymentPage = location?.pathname === '/payment-processing';

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/landing-page" className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <span className="text-xl font-semibold text-foreground">
              WhatsApp Study Bot
            </span>
          </Link>

          {/* Progress Indicator for Payment Flow */}
          {showProgress && isPaymentPage && (
            <div className="hidden sm:flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-success rounded-full flex items-center justify-center">
                  <Icon name="Check" size={14} color="white" />
                </div>
                <span className="text-sm text-muted-foreground">Plano Selecionado</span>
              </div>
              <div className="w-8 h-px bg-border"></div>
              <div className="flex items-center space-x-2">
                <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                  <span className="text-xs font-medium text-white">2</span>
                </div>
                <span className="text-sm text-foreground font-medium">Pagamento</span>
              </div>
            </div>
          )}

          {/* Trust Signals */}
          <div className="flex items-center space-x-4">
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Shield" size={16} />
              <span>Pagamento Seguro</span>
            </div>
            <div className="hidden md:flex items-center space-x-2 text-sm text-muted-foreground">
              <Icon name="Users" size={16} />
              <span>+10.000 Estudantes</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default CustomerFlowNavigation;