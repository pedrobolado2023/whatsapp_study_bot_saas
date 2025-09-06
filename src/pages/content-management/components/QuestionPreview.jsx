import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionPreview = ({ question, isOpen, onClose }) => {
  if (!isOpen || !question) return null;

  const getStatusColor = (status) => {
    switch (status) {
      case 'published': return 'text-success bg-success/10';
      case 'draft': return 'text-warning bg-warning/10';
      case 'review': return 'text-primary bg-primary/10';
      default: return 'text-muted-foreground bg-muted';
    }
  };

  const getStatusLabel = (status) => {
    switch (status) {
      case 'published': return 'Publicado';
      case 'draft': return 'Rascunho';
      case 'review': return 'Em Revisão';
      default: return 'Desconhecido';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <div className="flex items-center space-x-3">
            <h2 className="text-xl font-semibold text-foreground">Preview da Pergunta</h2>
            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question?.status)}`}>
              {getStatusLabel(question?.status)}
            </span>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Question Info */}
          <div className="mb-6">
            <div className="flex items-center space-x-4 text-sm text-muted-foreground mb-3">
              <div className="flex items-center space-x-1">
                <Icon name="BookOpen" size={14} />
                <span>{question?.subject}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Target" size={14} />
                <span className="capitalize">{question?.difficulty}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Icon name="Hash" size={14} />
                <span>ID: {question?.id}</span>
              </div>
            </div>
          </div>

          {/* WhatsApp Bot Preview */}
          <div className="bg-muted rounded-lg p-4 mb-6">
            <div className="flex items-center space-x-2 mb-4">
              <div className="w-8 h-8 bg-success rounded-full flex items-center justify-center">
                <Icon name="MessageSquare" size={16} color="white" />
              </div>
              <div>
                <div className="font-medium text-foreground">WhatsApp Study Bot</div>
                <div className="text-xs text-muted-foreground">Online</div>
              </div>
            </div>

            {/* Bot Message */}
            <div className="bg-card rounded-lg p-4 shadow-soft">
              <div className="mb-3">
                <div className="text-sm font-medium text-primary mb-2">
                  📚 {question?.subject} - Nível {question?.difficulty}
                </div>
                <div className="text-foreground leading-relaxed">
                  {question?.question}
                </div>
              </div>

              {/* Options */}
              {question?.type === 'multiple_choice' && question?.options && (
                <div className="space-y-2">
                  {question?.options?.map((option, index) => (
                    <div
                      key={index}
                      className={`p-2 rounded border transition-colors ${
                        index === question?.correctAnswer
                          ? 'bg-success/10 border-success text-success' :'bg-muted border-border'
                      }`}
                    >
                      <div className="flex items-center space-x-2">
                        <span className="font-medium">
                          {String.fromCharCode(65 + index)})
                        </span>
                        <span>{option}</span>
                        {index === question?.correctAnswer && (
                          <Icon name="Check" size={16} className="text-success ml-auto" />
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Explanation */}
              {question?.explanation && (
                <div className="mt-4 p-3 bg-primary/5 border-l-4 border-primary rounded">
                  <div className="text-sm font-medium text-primary mb-1">
                    💡 Explicação:
                  </div>
                  <div className="text-sm text-foreground">
                    {question?.explanation}
                  </div>
                </div>
              )}

              {/* Bot Footer */}
              <div className="mt-4 pt-3 border-t border-border text-xs text-muted-foreground">
                <div className="flex items-center justify-between">
                  <span>Digite 'próxima' para continuar</span>
                  <span>{new Date()?.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' })}</span>
                </div>
              </div>
            </div>
          </div>

          {/* Metadata */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div>
              <div className="font-medium text-foreground mb-2">Informações da Pergunta</div>
              <div className="space-y-1 text-muted-foreground">
                <div>Tipo: {question?.type === 'multiple_choice' ? 'Múltipla Escolha' : 'Dissertativa'}</div>
                <div>Opções: {question?.options?.length || 0}</div>
                <div>Resposta Correta: Opção {String.fromCharCode(65 + (question?.correctAnswer || 0))}</div>
              </div>
            </div>
            <div>
              <div className="font-medium text-foreground mb-2">Histórico</div>
              <div className="space-y-1 text-muted-foreground">
                <div>Criado: {new Date(question.createdAt || Date.now())?.toLocaleDateString('pt-BR')}</div>
                <div>Atualizado: {new Date(question.updatedAt || Date.now())?.toLocaleDateString('pt-BR')}</div>
                <div>Status: {getStatusLabel(question?.status)}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex justify-end p-6 border-t border-border">
          <Button variant="default" onClick={onClose}>
            Fechar Preview
          </Button>
        </div>
      </div>
    </div>
  );
};

export default QuestionPreview;