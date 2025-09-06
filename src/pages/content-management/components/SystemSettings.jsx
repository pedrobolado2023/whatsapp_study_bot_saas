import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SystemSettings = () => {
  const [settings, setSettings] = useState({
    botName: 'WhatsApp Study Bot',
    welcomeMessage: `Olá! 👋 Bem-vindo ao WhatsApp Study Bot!\n\nEu sou seu assistente de estudos personalizado. Posso ajudar você com:\n\n📚 Perguntas de múltiplas matérias\n🎯 Exercícios por nível de dificuldade\n💡 Explicações detalhadas\n📊 Acompanhamento do seu progresso\n\nDigite 'começar' para iniciar seus estudos!`,
    helpMessage: `🆘 Como posso ajudar:\n\n• Digite 'começar' - Iniciar sessão de estudos\n• Digite 'matérias' - Ver matérias disponíveis\n• Digite 'progresso' - Ver seu desempenho\n• Digite 'ajuda' - Ver esta mensagem\n• Digite 'parar' - Encerrar sessão\n\nEstou aqui para tornar seus estudos mais eficientes! 🚀`,
    errorMessage: 'Desculpe, não entendi sua mensagem. Digite "ajuda" para ver os comandos disponíveis.',
    sessionEndMessage: 'Sessão de estudos encerrada! 📚\n\nObrigado por estudar comigo hoje. Continue praticando para alcançar seus objetivos!\n\nDigite "começar" quando quiser retomar os estudos.',
    dailyQuestionLimit: '50',
    sessionTimeout: '30',
    autoResponseDelay: '2'
  });

  const [activeTab, setActiveTab] = useState('messages');
  const [hasChanges, setHasChanges] = useState(false);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    setHasChanges(true);
  };

  const handleSave = () => {
    // Simulate save operation
    setTimeout(() => {
      setHasChanges(false);
      // Show success message
    }, 1000);
  };

  const handleReset = () => {
    // Reset to default values
    setHasChanges(false);
  };

  const tabs = [
    { id: 'messages', label: 'Mensagens', icon: 'MessageSquare' },
    { id: 'behavior', label: 'Comportamento', icon: 'Settings' },
    { id: 'limits', label: 'Limites', icon: 'Shield' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border">
      {/* Header */}
      <div className="flex items-center justify-between p-6 border-b border-border">
        <div>
          <h2 className="text-xl font-semibold text-foreground">Configurações do Sistema</h2>
          <p className="text-muted-foreground mt-1">
            Configure mensagens e comportamento do bot WhatsApp
          </p>
        </div>
        
        {hasChanges && (
          <div className="flex space-x-2">
            <Button variant="outline" onClick={handleReset}>
              Descartar
            </Button>
            <Button variant="default" onClick={handleSave}>
              Salvar Alterações
            </Button>
          </div>
        )}
      </div>
      {/* Tabs */}
      <div className="border-b border-border">
        <nav className="flex space-x-8 px-6">
          {tabs?.map((tab) => (
            <button
              key={tab?.id}
              onClick={() => setActiveTab(tab?.id)}
              className={`flex items-center space-x-2 py-4 border-b-2 font-medium text-sm transition-colors ${
                activeTab === tab?.id
                  ? 'border-primary text-primary' :'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon name={tab?.icon} size={16} />
              <span>{tab?.label}</span>
            </button>
          ))}
        </nav>
      </div>
      {/* Content */}
      <div className="p-6">
        {activeTab === 'messages' && (
          <div className="space-y-6">
            <Input
              label="Nome do Bot"
              value={settings?.botName}
              onChange={(e) => handleSettingChange('botName', e?.target?.value)}
              description="Nome que aparecerá nas conversas"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mensagem de Boas-vindas
              </label>
              <textarea
                value={settings?.welcomeMessage}
                onChange={(e) => handleSettingChange('welcomeMessage', e?.target?.value)}
                className="w-full min-h-[120px] p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                placeholder="Mensagem enviada quando o usuário inicia uma conversa..."
              />
              <p className="text-xs text-muted-foreground mt-1">
                Use \n para quebras de linha
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mensagem de Ajuda
              </label>
              <textarea
                value={settings?.helpMessage}
                onChange={(e) => handleSettingChange('helpMessage', e?.target?.value)}
                className="w-full min-h-[100px] p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                placeholder="Mensagem enviada quando o usuário pede ajuda..."
              />
            </div>

            <Input
              label="Mensagem de Erro"
              value={settings?.errorMessage}
              onChange={(e) => handleSettingChange('errorMessage', e?.target?.value)}
              description="Mensagem enviada quando o bot não entende o comando"
            />

            <div>
              <label className="block text-sm font-medium text-foreground mb-2">
                Mensagem de Encerramento
              </label>
              <textarea
                value={settings?.sessionEndMessage}
                onChange={(e) => handleSettingChange('sessionEndMessage', e?.target?.value)}
                className="w-full min-h-[80px] p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
                placeholder="Mensagem enviada quando a sessão é encerrada..."
              />
            </div>
          </div>
        )}

        {activeTab === 'behavior' && (
          <div className="space-y-6">
            <Input
              label="Delay de Resposta Automática (segundos)"
              type="number"
              value={settings?.autoResponseDelay}
              onChange={(e) => handleSettingChange('autoResponseDelay', e?.target?.value)}
              description="Tempo que o bot espera antes de enviar uma resposta"
              min="1"
              max="10"
            />

            <Input
              label="Timeout de Sessão (minutos)"
              type="number"
              value={settings?.sessionTimeout}
              onChange={(e) => handleSettingChange('sessionTimeout', e?.target?.value)}
              description="Tempo limite para inatividade antes de encerrar a sessão"
              min="5"
              max="120"
            />

            <div className="bg-muted rounded-lg p-4">
              <h3 className="font-medium text-foreground mb-3">Comandos Disponíveis</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-sm">
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">começar</code>
                  <span className="text-muted-foreground">Iniciar estudos</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">matérias</code>
                  <span className="text-muted-foreground">Listar matérias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">progresso</code>
                  <span className="text-muted-foreground">Ver desempenho</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">ajuda</code>
                  <span className="text-muted-foreground">Mostrar ajuda</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">parar</code>
                  <span className="text-muted-foreground">Encerrar sessão</span>
                </div>
                <div className="flex items-center space-x-2">
                  <code className="px-2 py-1 bg-card rounded text-primary">próxima</code>
                  <span className="text-muted-foreground">Próxima pergunta</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'limits' && (
          <div className="space-y-6">
            <Input
              label="Limite Diário de Perguntas por Usuário"
              type="number"
              value={settings?.dailyQuestionLimit}
              onChange={(e) => handleSettingChange('dailyQuestionLimit', e?.target?.value)}
              description="Número máximo de perguntas que um usuário pode receber por dia"
              min="10"
              max="200"
            />

            <div className="bg-warning/10 border border-warning/20 rounded-lg p-4">
              <div className="flex items-start space-x-3">
                <Icon name="AlertTriangle" size={20} className="text-warning mt-0.5" />
                <div>
                  <h3 className="font-medium text-foreground mb-1">Configurações de Limite</h3>
                  <p className="text-sm text-muted-foreground">
                    Os limites ajudam a controlar o uso do sistema e evitar spam. 
                    Usuários que atingirem o limite diário receberão uma mensagem informativa 
                    e poderão continuar no dia seguinte.
                  </p>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-primary mb-1">24h</div>
                <div className="text-sm text-muted-foreground">Reset diário</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-success mb-1">∞</div>
                <div className="text-sm text-muted-foreground">Usuários simultâneos</div>
              </div>
              <div className="bg-card border border-border rounded-lg p-4 text-center">
                <div className="text-2xl font-bold text-warning mb-1">5s</div>
                <div className="text-sm text-muted-foreground">Rate limit</div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SystemSettings;