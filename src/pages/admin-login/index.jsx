import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import LoginForm from './components/LoginForm';
import SecurityFeatures from './components/SecurityFeatures';
import AdminBranding from './components/AdminBranding';
import SupportLinks from './components/SupportLinks';

const AdminLogin = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Mock admin credentials
  const mockCredentials = {
    email: 'admin@whatsappstudybot.com',
    password: 'admin123'
  };

  useEffect(() => {
    // Check if admin is already logged in
    const adminToken = localStorage.getItem('adminToken');
    if (adminToken) {
      navigate('/admin-dashboard');
    }
  }, [navigate]);

  const handleLogin = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      // Simulate API call delay
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Validate credentials
      if (
        formData?.email === mockCredentials?.email &&
        formData?.password === mockCredentials?.password
      ) {
        // Store authentication token
        const token = `admin_token_${Date.now()}`;
        localStorage.setItem('adminToken', token);
        
        // Store remember me preference
        if (formData?.rememberMe) {
          localStorage.setItem('adminRememberMe', 'true');
        }

        // Store last login timestamp
        localStorage.setItem('adminLastLogin', new Date()?.toISOString());

        // Navigate to admin dashboard
        navigate('/admin-dashboard');
      } else {
        setError('Email ou senha incorretos. Use: admin@whatsappstudybot.com / admin123');
      }
    } catch (err) {
      setError('Erro interno do servidor. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Login Administrativo - WhatsApp Study Bot</title>
        <meta name="description" content="Acesso seguro ao painel administrativo do WhatsApp Study Bot" />
        <meta name="robots" content="noindex, nofollow" />
      </Helmet>
      <div className="min-h-screen bg-background">
        {/* Main Container */}
        <div className="flex min-h-screen">
          {/* Left Side - Login Form */}
          <div className="flex-1 flex items-center justify-center px-4 sm:px-6 lg:px-8">
            <div className="w-full max-w-md space-y-8">
              {/* Branding */}
              <AdminBranding />

              {/* Login Form */}
              <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
                <LoginForm
                  onSubmit={handleLogin}
                  loading={loading}
                  error={error}
                />
              </div>

              {/* Support Links */}
              <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
                <SupportLinks />
              </div>
            </div>
          </div>

          {/* Right Side - Security Features (Desktop Only) */}
          <div className="hidden lg:flex lg:w-96 bg-muted/30 border-l border-border">
            <div className="flex items-center justify-center p-8">
              <div className="w-full max-w-sm">
                <SecurityFeatures />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Security Features */}
        <div className="lg:hidden px-4 pb-8">
          <div className="bg-card border border-border rounded-lg p-4 shadow-soft">
            <SecurityFeatures />
          </div>
        </div>

        {/* Footer */}
        <footer className="bg-card border-t border-border py-4">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
              <div className="text-sm text-muted-foreground">
                © {new Date()?.getFullYear()} WhatsApp Study Bot. Todos os direitos reservados.
              </div>
              <div className="flex items-center space-x-4 text-sm text-muted-foreground">
                <span>Versão 1.0.0</span>
                <span>•</span>
                <span>Última atualização: 06/01/2025</span>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
};

export default AdminLogin;