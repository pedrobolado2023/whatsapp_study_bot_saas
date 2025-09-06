import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ContentHeader = ({ onBulkImport, onAddQuestion, totalQuestions, publishedQuestions }) => {
  return (
    <div className="bg-card border-b border-border p-6">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Conteúdo</h1>
          <p className="text-muted-foreground mt-1">
            Gerencie perguntas, respostas e configurações do bot WhatsApp
          </p>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-3">
          <div className="flex items-center space-x-4 text-sm text-muted-foreground">
            <div className="flex items-center space-x-2">
              <Icon name="FileText" size={16} />
              <span>{totalQuestions} perguntas</span>
            </div>
            <div className="flex items-center space-x-2">
              <Icon name="CheckCircle" size={16} className="text-success" />
              <span>{publishedQuestions} publicadas</span>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button
              variant="outline"
              iconName="Upload"
              iconPosition="left"
              onClick={onBulkImport}
            >
              Importar CSV
            </Button>
            <Button
              variant="default"
              iconName="Plus"
              iconPosition="left"
              onClick={onAddQuestion}
            >
              Nova Pergunta
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContentHeader;