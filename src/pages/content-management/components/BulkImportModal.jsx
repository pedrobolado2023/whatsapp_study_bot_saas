import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const BulkImportModal = ({ isOpen, onClose, onImport }) => {
  const [dragActive, setDragActive] = useState(false);
  const [file, setFile] = useState(null);
  const [importing, setImporting] = useState(false);
  const [importResults, setImportResults] = useState(null);

  const handleDrag = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    if (e?.type === "dragenter" || e?.type === "dragover") {
      setDragActive(true);
    } else if (e?.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e) => {
    e?.preventDefault();
    e?.stopPropagation();
    setDragActive(false);
    
    if (e?.dataTransfer?.files && e?.dataTransfer?.files?.[0]) {
      const droppedFile = e?.dataTransfer?.files?.[0];
      if (droppedFile?.type === 'text/csv' || droppedFile?.name?.endsWith('.csv')) {
        setFile(droppedFile);
      }
    }
  };

  const handleFileSelect = (e) => {
    if (e?.target?.files && e?.target?.files?.[0]) {
      setFile(e?.target?.files?.[0]);
    }
  };

  const handleImport = async () => {
    if (!file) return;

    setImporting(true);
    
    // Simulate import process
    setTimeout(() => {
      const mockResults = {
        total: 150,
        success: 142,
        errors: 8,
        warnings: 3,
        errorDetails: [
          { row: 15, error: 'Matéria inválida: "Matemática Avançada"' },
          { row: 23, error: 'Pergunta muito longa (máximo 500 caracteres)' },
          { row: 45, error: 'Opção de resposta vazia' },
          { row: 67, error: 'Resposta correta não especificada' },
          { row: 89, error: 'Dificuldade inválida: "Muito Fácil"' }
        ]
      };
      
      setImportResults(mockResults);
      setImporting(false);
      
      if (mockResults?.success > 0) {
        onImport(mockResults);
      }
    }, 3000);
  };

  const downloadTemplate = () => {
    const csvContent = `pergunta,materia,dificuldade,opcao_a,opcao_b,opcao_c,opcao_d,resposta_correta,explicacao
"Qual é a capital do Brasil?",geografia,facil,"São Paulo","Rio de Janeiro","Brasília","Salvador",C,"Brasília é a capital federal do Brasil desde 1960."
"Quanto é 2 + 2?",matematica,facil,"3","4","5","6",B,"A soma de 2 + 2 é igual a 4."`;
    
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL?.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'template_perguntas.csv';
    a?.click();
    window.URL?.revokeObjectURL(url);
  };

  const resetModal = () => {
    setFile(null);
    setImportResults(null);
    setImporting(false);
    setDragActive(false);
  };

  const handleClose = () => {
    resetModal();
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">Importação em Lote</h2>
          <Button variant="ghost" size="icon" onClick={handleClose}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Content */}
        <div className="p-6">
          {!importResults ? (
            <>
              {/* Instructions */}
              <div className="mb-6">
                <h3 className="font-medium text-foreground mb-2">Como importar perguntas:</h3>
                <ol className="list-decimal list-inside space-y-1 text-sm text-muted-foreground">
                  <li>Baixe o template CSV clicando no botão abaixo</li>
                  <li>Preencha o arquivo com suas perguntas seguindo o formato</li>
                  <li>Faça upload do arquivo preenchido</li>
                  <li>Revise os resultados da importação</li>
                </ol>
              </div>

              {/* Template Download */}
              <div className="mb-6">
                <Button
                  variant="outline"
                  onClick={downloadTemplate}
                  iconName="Download"
                  iconPosition="left"
                >
                  Baixar Template CSV
                </Button>
              </div>

              {/* File Upload */}
              <div className="mb-6">
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
                    dragActive
                      ? 'border-primary bg-primary/5'
                      : file
                      ? 'border-success bg-success/5' :'border-border hover:border-primary/50'
                  }`}
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                >
                  {file ? (
                    <div className="space-y-2">
                      <Icon name="FileCheck" size={48} className="mx-auto text-success" />
                      <div className="font-medium text-foreground">{file?.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {(file?.size / 1024)?.toFixed(1)} KB
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => setFile(null)}
                        iconName="X"
                        iconPosition="left"
                      >
                        Remover arquivo
                      </Button>
                    </div>
                  ) : (
                    <div className="space-y-4">
                      <Icon name="Upload" size={48} className="mx-auto text-muted-foreground" />
                      <div>
                        <div className="font-medium text-foreground mb-1">
                          Arraste seu arquivo CSV aqui
                        </div>
                        <div className="text-sm text-muted-foreground mb-4">
                          ou clique para selecionar
                        </div>
                        <input
                          type="file"
                          accept=".csv"
                          onChange={handleFileSelect}
                          className="hidden"
                          id="csv-upload"
                        />
                        <label htmlFor="csv-upload">
                          <Button variant="outline" asChild>
                            <span>Selecionar Arquivo</span>
                          </Button>
                        </label>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              {/* Format Requirements */}
              <div className="bg-muted rounded-lg p-4 mb-6">
                <h4 className="font-medium text-foreground mb-2">Formato do CSV:</h4>
                <div className="text-sm text-muted-foreground space-y-1">
                  <div><strong>pergunta:</strong> Texto da pergunta (máximo 500 caracteres)</div>
                  <div><strong>materia:</strong> matematica, portugues, historia, geografia, ciencias, fisica, quimica, biologia</div>
                  <div><strong>dificuldade:</strong> facil, medio, dificil</div>
                  <div><strong>opcao_a, opcao_b, opcao_c, opcao_d:</strong> Opções de resposta</div>
                  <div><strong>resposta_correta:</strong> A, B, C ou D</div>
                  <div><strong>explicacao:</strong> Explicação da resposta (opcional)</div>
                </div>
              </div>
            </>
          ) : (
            /* Import Results */
            (<div className="space-y-6">
              <div className="text-center">
                <Icon 
                  name={importResults?.errors > 0 ? "AlertTriangle" : "CheckCircle"} 
                  size={48} 
                  className={`mx-auto mb-4 ${importResults?.errors > 0 ? 'text-warning' : 'text-success'}`} 
                />
                <h3 className="text-lg font-semibold text-foreground mb-2">
                  Importação Concluída
                </h3>
              </div>
              {/* Results Summary */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="text-center p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold text-foreground">{importResults?.total}</div>
                  <div className="text-sm text-muted-foreground">Total</div>
                </div>
                <div className="text-center p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{importResults?.success}</div>
                  <div className="text-sm text-muted-foreground">Sucesso</div>
                </div>
                <div className="text-center p-4 bg-error/10 rounded-lg">
                  <div className="text-2xl font-bold text-error">{importResults?.errors}</div>
                  <div className="text-sm text-muted-foreground">Erros</div>
                </div>
                <div className="text-center p-4 bg-warning/10 rounded-lg">
                  <div className="text-2xl font-bold text-warning">{importResults?.warnings}</div>
                  <div className="text-sm text-muted-foreground">Avisos</div>
                </div>
              </div>
              {/* Error Details */}
              {importResults?.errorDetails && importResults?.errorDetails?.length > 0 && (
                <div>
                  <h4 className="font-medium text-foreground mb-3">Detalhes dos Erros:</h4>
                  <div className="space-y-2 max-h-40 overflow-y-auto">
                    {importResults?.errorDetails?.map((error, index) => (
                      <div key={index} className="flex items-start space-x-2 p-2 bg-error/5 rounded text-sm">
                        <Icon name="AlertCircle" size={16} className="text-error mt-0.5 shrink-0" />
                        <div>
                          <span className="font-medium">Linha {error?.row}:</span> {error?.error}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>)
          )}
        </div>

        {/* Footer */}
        <div className="flex justify-end space-x-3 p-6 border-t border-border">
          {!importResults ? (
            <>
              <Button variant="outline" onClick={handleClose}>
                Cancelar
              </Button>
              <Button
                variant="default"
                onClick={handleImport}
                disabled={!file || importing}
                loading={importing}
                iconName="Upload"
                iconPosition="left"
              >
                {importing ? 'Importando...' : 'Importar Perguntas'}
              </Button>
            </>
          ) : (
            <Button variant="default" onClick={handleClose}>
              Fechar
            </Button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BulkImportModal;