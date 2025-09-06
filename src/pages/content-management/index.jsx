import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebarNavigation from '../../components/ui/AdminSidebarNavigation';
import AdminHeaderBar from '../../components/ui/AdminHeaderBar';
import ContentHeader from './components/ContentHeader';
import ContentFilters from './components/ContentFilters';
import QuestionCard from './components/QuestionCard';
import QuestionEditor from './components/QuestionEditor';
import QuestionPreview from './components/QuestionPreview';
import BulkImportModal from './components/BulkImportModal';
import SystemSettings from './components/SystemSettings';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';

const ContentManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState('questions');
  const [questions, setQuestions] = useState([]);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [filters, setFilters] = useState({
    subject: 'all',
    difficulty: 'all',
    status: 'all'
  });
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedQuestion, setSelectedQuestion] = useState(null);
  const [showEditor, setShowEditor] = useState(false);
  const [showPreview, setShowPreview] = useState(false);
  const [showBulkImport, setShowBulkImport] = useState(false);
  const [loading, setLoading] = useState(true);

  // Mock data for questions
  const mockQuestions = [
    {
      id: 1,
      question: "Qual é a capital do Brasil?",
      type: "multiple_choice",
      subject: "geografia",
      difficulty: "facil",
      options: ["São Paulo", "Rio de Janeiro", "Brasília", "Salvador"],
      correctAnswer: 2,
      explanation: "Brasília é a capital federal do Brasil desde 1960, quando foi inaugurada durante o governo de Juscelino Kubitschek.",
      status: "published",
      createdAt: "2024-12-01T10:00:00Z",
      updatedAt: "2024-12-06T12:55:38Z"
    },
    {
      id: 2,
      question: "Quanto é 2 + 2 × 3?",
      type: "multiple_choice",
      subject: "matematica",
      difficulty: "medio",
      options: ["8", "12", "10", "6"],
      correctAnswer: 0,
      explanation: "Seguindo a ordem das operações matemáticas, primeiro fazemos a multiplicação: 2 × 3 = 6, depois a soma: 2 + 6 = 8.",
      status: "published",
      createdAt: "2024-12-02T14:30:00Z",
      updatedAt: "2024-12-05T16:20:00Z"
    },
    {
      id: 3,
      question: "Quem escreveu \'Dom Casmurro\'?",
      type: "multiple_choice",
      subject: "portugues",
      difficulty: "medio",
      options: ["José de Alencar", "Machado de Assis", "Clarice Lispector", "Guimarães Rosa"],
      correctAnswer: 1,
      explanation: "Dom Casmurro é um romance de Machado de Assis, publicado em 1899, considerado uma das obras-primas da literatura brasileira.",
      status: "published",
      createdAt: "2024-12-03T09:15:00Z",
      updatedAt: "2024-12-04T11:45:00Z"
    },
    {
      id: 4,
      question: "Qual é a fórmula química da água?",
      type: "multiple_choice",
      subject: "quimica",
      difficulty: "facil",
      options: ["H2O", "CO2", "NaCl", "CH4"],
      correctAnswer: 0,
      explanation: "A água é composta por dois átomos de hidrogênio (H) e um átomo de oxigênio (O), formando a molécula H2O.",
      status: "draft",
      createdAt: "2024-12-04T13:20:00Z",
      updatedAt: "2024-12-06T08:30:00Z"
    },
    {
      id: 5,
      question: "Em que ano ocorreu a Proclamação da República no Brasil?",
      type: "multiple_choice",
      subject: "historia",
      difficulty: "medio",
      options: ["1888", "1889", "1890", "1891"],
      correctAnswer: 1,
      explanation: "A Proclamação da República brasileira ocorreu em 15 de novembro de 1889, liderada pelo Marechal Deodoro da Fonseca.",
      status: "review",
      createdAt: "2024-12-05T16:45:00Z",
      updatedAt: "2024-12-06T10:15:00Z"
    },
    {
      id: 6,
      question: "Qual é a velocidade da luz no vácuo?",
      type: "multiple_choice",
      subject: "fisica",
      difficulty: "dificil",
      options: ["300.000 km/s", "299.792.458 m/s", "150.000 km/s", "500.000 km/s"],
      correctAnswer: 1,
      explanation: "A velocidade da luz no vácuo é exatamente 299.792.458 metros por segundo, uma constante física fundamental.",
      status: "published",
      createdAt: "2024-12-01T08:00:00Z",
      updatedAt: "2024-12-03T14:22:00Z"
    }
  ];

  useEffect(() => {
    // Check authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }

    // Simulate loading
    setTimeout(() => {
      setQuestions(mockQuestions);
      setFilteredQuestions(mockQuestions);
      setLoading(false);
    }, 1000);
  }, [navigate]);

  useEffect(() => {
    // Apply filters and search
    let filtered = questions;

    // Apply subject filter
    if (filters?.subject !== 'all') {
      filtered = filtered?.filter(q => q?.subject === filters?.subject);
    }

    // Apply difficulty filter
    if (filters?.difficulty !== 'all') {
      filtered = filtered?.filter(q => q?.difficulty === filters?.difficulty);
    }

    // Apply status filter
    if (filters?.status !== 'all') {
      filtered = filtered?.filter(q => q?.status === filters?.status);
    }

    // Apply search query
    if (searchQuery?.trim()) {
      const query = searchQuery?.toLowerCase();
      filtered = filtered?.filter(q => 
        q?.question?.toLowerCase()?.includes(query) ||
        q?.subject?.toLowerCase()?.includes(query) ||
        q?.explanation?.toLowerCase()?.includes(query)
      );
    }

    setFilteredQuestions(filtered);
  }, [questions, filters, searchQuery]);

  const handleFilterChange = (key, value) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const handleClearFilters = () => {
    setFilters({
      subject: 'all',
      difficulty: 'all',
      status: 'all'
    });
    setSearchQuery('');
  };

  const handleAddQuestion = () => {
    setSelectedQuestion(null);
    setShowEditor(true);
  };

  const handleEditQuestion = (question) => {
    setSelectedQuestion(question);
    setShowEditor(true);
  };

  const handleDeleteQuestion = (questionId) => {
    if (window.confirm('Tem certeza que deseja excluir esta pergunta?')) {
      setQuestions(prev => prev?.filter(q => q?.id !== questionId));
    }
  };

  const handleSaveQuestion = (questionData) => {
    if (selectedQuestion) {
      // Update existing question
      setQuestions(prev => prev?.map(q => 
        q?.id === selectedQuestion?.id ? questionData : q
      ));
    } else {
      // Add new question
      setQuestions(prev => [...prev, questionData]);
    }
    setShowEditor(false);
    setSelectedQuestion(null);
  };

  const handlePreviewQuestion = (question) => {
    setSelectedQuestion(question);
    setShowPreview(true);
  };

  const handleBulkImport = (results) => {
    // Handle bulk import results
    console.log('Import results:', results);
    setShowBulkImport(false);
    
    // Refresh questions list
    // In a real app, you would fetch updated data from the server
  };

  const publishedCount = questions?.filter(q => q?.status === 'published')?.length;

  const tabs = [
    { id: 'questions', label: 'Banco de Perguntas', icon: 'FileText' },
    { id: 'settings', label: 'Configurações do Bot', icon: 'Settings' }
  ];

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <Icon name="Loader2" size={32} className="animate-spin text-primary mx-auto mb-4" />
          <p className="text-muted-foreground">Carregando gerenciamento de conteúdo...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Sidebar */}
      <AdminSidebarNavigation 
        isCollapsed={sidebarCollapsed}
        onToggle={() => setSidebarCollapsed(!sidebarCollapsed)}
      />
      {/* Main Content */}
      <div className={`transition-all duration-300 ${sidebarCollapsed ? 'ml-16' : 'ml-64'}`}>
        {/* Header */}
        <AdminHeaderBar />

        {/* Page Content */}
        <div className="flex flex-col h-[calc(100vh-4rem)]">
          {/* Content Header */}
          <ContentHeader
            onBulkImport={() => setShowBulkImport(true)}
            onAddQuestion={handleAddQuestion}
            totalQuestions={questions?.length}
            publishedQuestions={publishedCount}
          />

          {/* Tabs */}
          <div className="border-b border-border bg-card">
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

          {/* Tab Content */}
          <div className="flex-1 overflow-hidden">
            {activeTab === 'questions' ? (
              <div className="h-full flex flex-col">
                {/* Filters */}
                <ContentFilters
                  filters={filters}
                  onFilterChange={handleFilterChange}
                  onClearFilters={handleClearFilters}
                  searchQuery={searchQuery}
                  onSearchChange={setSearchQuery}
                  onSearch={setSearchQuery}
                />

                {/* Questions List */}
                <div className="flex-1 overflow-y-auto p-6">
                  {filteredQuestions?.length === 0 ? (
                    <div className="text-center py-12">
                      <Icon name="FileText" size={48} className="mx-auto text-muted-foreground mb-4" />
                      <h3 className="text-lg font-medium text-foreground mb-2">
                        {questions?.length === 0 ? 'Nenhuma pergunta cadastrada' : 'Nenhuma pergunta encontrada'}
                      </h3>
                      <p className="text-muted-foreground mb-4">
                        {questions?.length === 0 
                          ? 'Comece adicionando sua primeira pergunta ao sistema.'
                          : 'Tente ajustar os filtros ou termo de busca.'
                        }
                      </p>
                      {questions?.length === 0 && (
                        <Button
                          variant="default"
                          onClick={handleAddQuestion}
                          iconName="Plus"
                          iconPosition="left"
                        >
                          Adicionar Primeira Pergunta
                        </Button>
                      )}
                    </div>
                  ) : (
                    <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
                      {filteredQuestions?.map((question) => (
                        <QuestionCard
                          key={question?.id}
                          question={question}
                          onEdit={handleEditQuestion}
                          onDelete={handleDeleteQuestion}
                          onPreview={handlePreviewQuestion}
                          onToggleStatus={(questionId) => {
                            setQuestions(prev => prev?.map(q => 
                              q?.id === questionId 
                                ? { ...q, status: q?.status === 'published' ? 'draft' : 'published' }
                                : q
                            ));
                          }}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ) : (
              <div className="h-full overflow-y-auto p-6">
                <SystemSettings />
              </div>
            )}
          </div>
        </div>
      </div>
      {/* Modals */}
      <QuestionEditor
        question={selectedQuestion}
        isOpen={showEditor}
        onSave={handleSaveQuestion}
        onCancel={() => {
          setShowEditor(false);
          setSelectedQuestion(null);
        }}
      />
      <QuestionPreview
        question={selectedQuestion}
        isOpen={showPreview}
        onClose={() => {
          setShowPreview(false);
          setSelectedQuestion(null);
        }}
      />
      <BulkImportModal
        isOpen={showBulkImport}
        onClose={() => setShowBulkImport(false)}
        onImport={handleBulkImport}
      />
    </div>
  );
};

export default ContentManagement;