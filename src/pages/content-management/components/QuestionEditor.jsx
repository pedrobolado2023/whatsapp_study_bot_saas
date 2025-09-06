import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';

const QuestionEditor = ({ question, onSave, onCancel, isOpen }) => {
  const [formData, setFormData] = useState({
    question: '',
    type: 'multiple_choice',
    subject: '',
    difficulty: 'medio',
    options: ['', '', '', ''],
    correctAnswer: 0,
    explanation: '',
    status: 'draft'
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (question) {
      setFormData({
        question: question?.question || '',
        type: question?.type || 'multiple_choice',
        subject: question?.subject || '',
        difficulty: question?.difficulty || 'medio',
        options: question?.options || ['', '', '', ''],
        correctAnswer: question?.correctAnswer || 0,
        explanation: question?.explanation || '',
        status: question?.status || 'draft'
      });
    } else {
      setFormData({
        question: '',
        type: 'multiple_choice',
        subject: '',
        difficulty: 'medio',
        options: ['', '', '', ''],
        correctAnswer: 0,
        explanation: '',
        status: 'draft'
      });
    }
    setErrors({});
  }, [question, isOpen]);

  const subjectOptions = [
    { value: 'matematica', label: 'Matemática' },
    { value: 'portugues', label: 'Português' },
    { value: 'historia', label: 'História' },
    { value: 'geografia', label: 'Geografia' },
    { value: 'ciencias', label: 'Ciências' },
    { value: 'fisica', label: 'Física' },
    { value: 'quimica', label: 'Química' },
    { value: 'biologia', label: 'Biologia' }
  ];

  const difficultyOptions = [
    { value: 'facil', label: 'Fácil' },
    { value: 'medio', label: 'Médio' },
    { value: 'dificil', label: 'Difícil' }
  ];

  const statusOptions = [
    { value: 'draft', label: 'Rascunho' },
    { value: 'review', label: 'Em Revisão' },
    { value: 'published', label: 'Publicado' }
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors?.[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleOptionChange = (index, value) => {
    const newOptions = [...formData?.options];
    newOptions[index] = value;
    setFormData(prev => ({ ...prev, options: newOptions }));
  };

  const addOption = () => {
    if (formData?.options?.length < 6) {
      setFormData(prev => ({
        ...prev,
        options: [...prev?.options, '']
      }));
    }
  };

  const removeOption = (index) => {
    if (formData?.options?.length > 2) {
      const newOptions = formData?.options?.filter((_, i) => i !== index);
      setFormData(prev => ({
        ...prev,
        options: newOptions,
        correctAnswer: prev?.correctAnswer >= index ? Math.max(0, prev?.correctAnswer - 1) : prev?.correctAnswer
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData?.question?.trim()) {
      newErrors.question = 'Pergunta é obrigatória';
    }

    if (!formData?.subject) {
      newErrors.subject = 'Matéria é obrigatória';
    }

    if (formData?.type === 'multiple_choice') {
      const validOptions = formData?.options?.filter(opt => opt?.trim());
      if (validOptions?.length < 2) {
        newErrors.options = 'Pelo menos 2 opções são obrigatórias';
      }

      if (!formData?.options?.[formData?.correctAnswer]?.trim()) {
        newErrors.correctAnswer = 'Resposta correta deve ser uma opção válida';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors)?.length === 0;
  };

  const handleSubmit = (e) => {
    e?.preventDefault();
    if (validateForm()) {
      const questionData = {
        ...formData,
        id: question?.id || Date.now(),
        updatedAt: new Date()?.toISOString(),
        createdAt: question?.createdAt || new Date()?.toISOString()
      };
      onSave(questionData);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-card rounded-lg shadow-modal max-w-4xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-border">
          <h2 className="text-xl font-semibold text-foreground">
            {question ? 'Editar Pergunta' : 'Nova Pergunta'}
          </h2>
          <Button variant="ghost" size="icon" onClick={onCancel}>
            <Icon name="X" size={20} />
          </Button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Basic Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Select
              label="Matéria"
              options={subjectOptions}
              value={formData?.subject}
              onChange={(value) => handleInputChange('subject', value)}
              error={errors?.subject}
              required
            />
            
            <Select
              label="Dificuldade"
              options={difficultyOptions}
              value={formData?.difficulty}
              onChange={(value) => handleInputChange('difficulty', value)}
              required
            />
          </div>

          {/* Question */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Pergunta *
            </label>
            <textarea
              value={formData?.question}
              onChange={(e) => handleInputChange('question', e?.target?.value)}
              className="w-full min-h-[100px] p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              placeholder="Digite a pergunta aqui..."
            />
            {errors?.question && (
              <p className="text-error text-sm mt-1">{errors?.question}</p>
            )}
          </div>

          {/* Options for Multiple Choice */}
          {formData?.type === 'multiple_choice' && (
            <div>
              <div className="flex items-center justify-between mb-3">
                <label className="text-sm font-medium text-foreground">
                  Opções de Resposta *
                </label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={addOption}
                  disabled={formData?.options?.length >= 6}
                  iconName="Plus"
                  iconPosition="left"
                >
                  Adicionar Opção
                </Button>
              </div>
              
              <div className="space-y-3">
                {formData?.options?.map((option, index) => (
                  <div key={index} className="flex items-center space-x-3">
                    <input
                      type="radio"
                      name="correctAnswer"
                      checked={formData?.correctAnswer === index}
                      onChange={() => handleInputChange('correctAnswer', index)}
                      className="w-4 h-4 text-primary"
                    />
                    <div className="flex-1">
                      <Input
                        value={option}
                        onChange={(e) => handleOptionChange(index, e?.target?.value)}
                        placeholder={`Opção ${String.fromCharCode(65 + index)}`}
                      />
                    </div>
                    {formData?.options?.length > 2 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeOption(index)}
                        className="text-error hover:text-error"
                      >
                        <Icon name="Trash2" size={16} />
                      </Button>
                    )}
                  </div>
                ))}
              </div>
              
              {errors?.options && (
                <p className="text-error text-sm mt-1">{errors?.options}</p>
              )}
              {errors?.correctAnswer && (
                <p className="text-error text-sm mt-1">{errors?.correctAnswer}</p>
              )}
            </div>
          )}

          {/* Explanation */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Explicação da Resposta
            </label>
            <textarea
              value={formData?.explanation}
              onChange={(e) => handleInputChange('explanation', e?.target?.value)}
              className="w-full min-h-[80px] p-3 border border-border rounded-md focus:ring-2 focus:ring-primary focus:border-transparent resize-vertical"
              placeholder="Explicação detalhada da resposta correta..."
            />
          </div>

          {/* Status */}
          <Select
            label="Status"
            options={statusOptions}
            value={formData?.status}
            onChange={(value) => handleInputChange('status', value)}
            required
          />

          {/* Actions */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border">
            <Button type="button" variant="outline" onClick={onCancel}>
              Cancelar
            </Button>
            <Button type="submit" variant="default">
              {question ? 'Atualizar' : 'Criar'} Pergunta
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default QuestionEditor;