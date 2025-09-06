import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuestionCard = ({ question, onEdit, onDelete, onToggleStatus, onPreview }) => {
  const [showFullQuestion, setShowFullQuestion] = useState(false);

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

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'facil': return 'text-success';
      case 'medio': return 'text-warning';
      case 'dificil': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const truncateText = (text, maxLength = 150) => {
    if (text?.length <= maxLength) return text;
    return text?.substring(0, maxLength) + '...';
  };

  return (
    <div className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-all duration-200">
      {/* Header */}
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center space-x-3">
          <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(question?.status)}`}>
            {getStatusLabel(question?.status)}
          </span>
          <span className="text-xs text-muted-foreground">
            ID: {question?.id}
          </span>
        </div>
        
        <div className="flex items-center space-x-1">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onPreview(question)}
          >
            <Icon name="Eye" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onEdit(question)}
          >
            <Icon name="Edit" size={16} />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => onDelete(question?.id)}
            className="text-error hover:text-error"
          >
            <Icon name="Trash2" size={16} />
          </Button>
        </div>
      </div>
      {/* Question Content */}
      <div className="mb-3">
        <h3 className="font-medium text-foreground mb-2">
          {showFullQuestion ? question?.question : truncateText(question?.question)}
        </h3>
        
        {question?.question?.length > 150 && (
          <button
            onClick={() => setShowFullQuestion(!showFullQuestion)}
            className="text-primary text-sm hover:underline"
          >
            {showFullQuestion ? 'Ver menos' : 'Ver mais'}
          </button>
        )}
      </div>
      {/* Options Preview */}
      {question?.type === 'multiple_choice' && (
        <div className="mb-3">
          <div className="text-sm text-muted-foreground mb-1">Opções:</div>
          <div className="space-y-1">
            {question?.options?.slice(0, 2)?.map((option, index) => (
              <div key={index} className="text-sm text-foreground flex items-center space-x-2">
                <span className="w-4 h-4 rounded-full bg-muted flex items-center justify-center text-xs">
                  {String.fromCharCode(65 + index)}
                </span>
                <span>{truncateText(option, 80)}</span>
                {index === question?.correctAnswer && (
                  <Icon name="Check" size={12} className="text-success" />
                )}
              </div>
            ))}
            {question?.options?.length > 2 && (
              <div className="text-xs text-muted-foreground">
                +{question?.options?.length - 2} opções adicionais
              </div>
            )}
          </div>
        </div>
      )}
      {/* Footer */}
      <div className="flex items-center justify-between pt-3 border-t border-border">
        <div className="flex items-center space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center space-x-1">
            <Icon name="BookOpen" size={14} />
            <span>{question?.subject}</span>
          </div>
          <div className={`flex items-center space-x-1 ${getDifficultyColor(question?.difficulty)}`}>
            <Icon name="Target" size={14} />
            <span className="capitalize">{question?.difficulty}</span>
          </div>
        </div>
        
        <div className="flex items-center space-x-2 text-xs text-muted-foreground">
          <Icon name="Calendar" size={12} />
          <span>{new Date(question.updatedAt)?.toLocaleDateString('pt-BR')}</span>
        </div>
      </div>
    </div>
  );
};

export default QuestionCard;