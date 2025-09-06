import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import Icon from '../../../components/AppIcon';

const ContentFilters = ({ 
  filters, 
  onFilterChange, 
  onSearch, 
  onClearFilters,
  searchQuery,
  onSearchChange 
}) => {
  const subjectOptions = [
    { value: 'all', label: 'Todas as Matérias' },
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
    { value: 'all', label: 'Todas as Dificuldades' },
    { value: 'facil', label: 'Fácil' },
    { value: 'medio', label: 'Médio' },
    { value: 'dificil', label: 'Difícil' }
  ];

  const statusOptions = [
    { value: 'all', label: 'Todos os Status' },
    { value: 'published', label: 'Publicado' },
    { value: 'draft', label: 'Rascunho' },
    { value: 'review', label: 'Em Revisão' }
  ];

  return (
    <div className="bg-card border-b border-border p-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
        <div className="lg:col-span-2">
          <Input
            type="search"
            placeholder="Buscar por pergunta, palavra-chave..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e?.target?.value)}
            className="w-full"
          />
        </div>
        
        <Select
          options={subjectOptions}
          value={filters?.subject}
          onChange={(value) => onFilterChange('subject', value)}
          placeholder="Matéria"
        />
        
        <Select
          options={difficultyOptions}
          value={filters?.difficulty}
          onChange={(value) => onFilterChange('difficulty', value)}
          placeholder="Dificuldade"
        />
        
        <div className="flex gap-2">
          <Select
            options={statusOptions}
            value={filters?.status}
            onChange={(value) => onFilterChange('status', value)}
            placeholder="Status"
          />
          
          <Button
            variant="ghost"
            size="icon"
            onClick={onClearFilters}
            className="shrink-0"
          >
            <Icon name="X" size={16} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ContentFilters;