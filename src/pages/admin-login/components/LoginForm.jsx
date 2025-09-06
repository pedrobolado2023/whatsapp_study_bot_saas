import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const LoginForm = ({ onSubmit, loading = false, error = null }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
  });
  const [showPassword, setShowPassword] = useState(false);
  const [validationErrors, setValidationErrors] = useState({});

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear validation error when user starts typing
    if (validationErrors?.[field]) {
      setValidationErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateForm = () => {
    const errors = {};
    
    if (!formData?.email) {
      errors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/?.test(formData?.email)) {
      errors.email = 'Email inválido';
    }
    
    if (!formData?.password) {
      errors.password = 'Senha é obrigatória';
    } else if (formData?.password?.length < 6) {
      errors.password = 'Senha deve ter pelo menos 6 caracteres';
    }
    
    setValidationErrors(errors);
    return Object.keys(errors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      onSubmit(formData);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Email Field */}
      <Input
        label="Email Administrativo"
        type="email"
        placeholder="admin@whatsappstudybot.com"
        value={formData?.email}
        onChange={(e) => handleInputChange('email', e?.target?.value)}
        error={validationErrors?.email}
        required
        disabled={loading}
      />
      {/* Password Field */}
      <div className="relative">
        <Input
          label="Senha"
          type={showPassword ? 'text' : 'password'}
          placeholder="Digite sua senha"
          value={formData?.password}
          onChange={(e) => handleInputChange('password', e?.target?.value)}
          error={validationErrors?.password}
          required
          disabled={loading}
        />
        <button
          type="button"
          onClick={() => setShowPassword(!showPassword)}
          className="absolute right-3 top-9 text-muted-foreground hover:text-foreground transition-colors"
          disabled={loading}
        >
          <Icon name={showPassword ? 'EyeOff' : 'Eye'} size={20} />
        </button>
      </div>
      {/* Remember Me */}
      <div className="flex items-center justify-between">
        <Checkbox
          label="Lembrar de mim"
          checked={formData?.rememberMe}
          onChange={(e) => handleInputChange('rememberMe', e?.target?.checked)}
          disabled={loading}
        />
        <button
          type="button"
          className="text-sm text-primary hover:text-primary/80 transition-colors"
          disabled={loading}
        >
          Esqueceu a senha?
        </button>
      </div>
      {/* Error Message */}
      {error && (
        <div className="p-3 bg-error/10 border border-error/20 rounded-md">
          <div className="flex items-center space-x-2">
            <Icon name="AlertCircle" size={16} className="text-error" />
            <span className="text-sm text-error">{error}</span>
          </div>
        </div>
      )}
      {/* Submit Button */}
      <Button
        type="submit"
        variant="default"
        size="lg"
        fullWidth
        loading={loading}
        iconName="LogIn"
        iconPosition="right"
        disabled={loading}
      >
        {loading ? 'Entrando...' : 'Entrar no Painel'}
      </Button>
    </form>
  );
};

export default LoginForm;