import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import AdminSidebarNavigation from '../../components/ui/AdminSidebarNavigation';
import AdminHeaderBar from '../../components/ui/AdminHeaderBar';
import UserStats from './components/UserStats';
import UserFilters from './components/UserFilters';
import UserTable from './components/UserTable';
import UserDetailsModal from './components/UserDetailsModal';

import Button from '../../components/ui/Button';

const UserManagement = () => {
  const navigate = useNavigate();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showUserModal, setShowUserModal] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [usersPerPage] = useState(10);

  // Mock user data
  const mockUsers = [
    {
      id: 1,
      name: "Ana Silva Santos",
      email: "ana.silva@email.com",
      whatsapp: "11987654321",
      subscriptionType: "monthly",
      paymentStatus: "active",
      registrationDate: "2024-01-15T10:30:00Z",
      lastActivity: "2024-01-06T14:20:00Z",
      totalQuestions: 1247,
      questionsThisMonth: 89
    },
    {
      id: 2,
      name: "Carlos Eduardo Lima",
      email: "carlos.lima@email.com",
      whatsapp: "11976543210",
      subscriptionType: "quarterly",
      paymentStatus: "active",
      registrationDate: "2024-01-10T09:15:00Z",
      lastActivity: "2024-01-06T16:45:00Z",
      totalQuestions: 892,
      questionsThisMonth: 67
    },
    {
      id: 3,
      name: "Mariana Costa Oliveira",
      email: "mariana.costa@email.com",
      whatsapp: "11965432109",
      subscriptionType: "monthly",
      paymentStatus: "pending",
      registrationDate: "2024-01-20T11:45:00Z",
      lastActivity: "2024-01-05T13:30:00Z",
      totalQuestions: 456,
      questionsThisMonth: 34
    },
    {
      id: 4,
      name: "João Pedro Ferreira",
      email: "joao.ferreira@email.com",
      whatsapp: "11954321098",
      subscriptionType: "quarterly",
      paymentStatus: "expired",
      registrationDate: "2023-12-05T08:20:00Z",
      lastActivity: "2024-01-04T10:15:00Z",
      totalQuestions: 2134,
      questionsThisMonth: 12
    },
    {
      id: 5,
      name: "Beatriz Almeida Rocha",
      email: "beatriz.almeida@email.com",
      whatsapp: "11943210987",
      subscriptionType: "monthly",
      paymentStatus: "active",
      registrationDate: "2024-01-25T14:10:00Z",
      lastActivity: "2024-01-06T12:00:00Z",
      totalQuestions: 678,
      questionsThisMonth: 78
    },
    {
      id: 6,
      name: "Rafael Santos Mendes",
      email: "rafael.mendes@email.com",
      whatsapp: "11932109876",
      subscriptionType: "monthly",
      paymentStatus: "cancelled",
      registrationDate: "2023-11-15T16:30:00Z",
      lastActivity: "2023-12-20T09:45:00Z",
      totalQuestions: 1567,
      questionsThisMonth: 0
    },
    {
      id: 7,
      name: "Camila Rodrigues Silva",
      email: "camila.rodrigues@email.com",
      whatsapp: "11921098765",
      subscriptionType: "quarterly",
      paymentStatus: "active",
      registrationDate: "2024-01-08T13:25:00Z",
      lastActivity: "2024-01-06T15:30:00Z",
      totalQuestions: 934,
      questionsThisMonth: 56
    },
    {
      id: 8,
      name: "Lucas Martins Costa",
      email: "lucas.martins@email.com",
      whatsapp: "11910987654",
      subscriptionType: "monthly",
      paymentStatus: "pending",
      registrationDate: "2024-01-30T10:15:00Z",
      lastActivity: "2024-01-06T11:20:00Z",
      totalQuestions: 234,
      questionsThisMonth: 45
    }
  ];

  useEffect(() => {
    // Check authentication
    const adminToken = localStorage.getItem('adminToken');
    if (!adminToken) {
      navigate('/admin-login');
      return;
    }

    // Initialize filtered users
    setFilteredUsers(mockUsers);
  }, [navigate]);

  const handleFiltersChange = (filters) => {
    let filtered = [...mockUsers];

    // Apply search filter
    if (filters?.search) {
      const searchTerm = filters?.search?.toLowerCase();
      filtered = filtered?.filter(user =>
        user?.name?.toLowerCase()?.includes(searchTerm) ||
        user?.email?.toLowerCase()?.includes(searchTerm) ||
        user?.whatsapp?.includes(searchTerm)
      );
    }

    // Apply subscription type filter
    if (filters?.subscriptionType) {
      filtered = filtered?.filter(user => user?.subscriptionType === filters?.subscriptionType);
    }

    // Apply payment status filter
    if (filters?.paymentStatus) {
      filtered = filtered?.filter(user => user?.paymentStatus === filters?.paymentStatus);
    }

    // Apply date range filters
    if (filters?.registrationDateFrom) {
      filtered = filtered?.filter(user => 
        new Date(user.registrationDate) >= new Date(filters.registrationDateFrom)
      );
    }

    if (filters?.registrationDateTo) {
      filtered = filtered?.filter(user => 
        new Date(user.registrationDate) <= new Date(filters.registrationDateTo)
      );
    }

    // Apply activity level filter
    if (filters?.activityLevel) {
      filtered = filtered?.filter(user => {
        const questionsThisMonth = user?.questionsThisMonth;
        switch (filters?.activityLevel) {
          case 'high':
            return questionsThisMonth >= 60;
          case 'medium':
            return questionsThisMonth >= 30 && questionsThisMonth < 60;
          case 'low':
            return questionsThisMonth > 0 && questionsThisMonth < 30;
          case 'inactive':
            return questionsThisMonth === 0;
          default:
            return true;
        }
      });
    }

    setFilteredUsers(filtered);
    setCurrentPage(1);
  };

  const handleUserSelect = (userIds, action = 'select') => {
    if (action === 'view' || action === 'edit') {
      const user = mockUsers?.find(u => u?.id === userIds?.[0]);
      setSelectedUser(user);
      setShowUserModal(true);
    } else {
      setSelectedUsers(userIds);
    }
  };

  const handleBulkAction = (action) => {
    switch (action) {
      case 'activate': console.log('Activating users:', selectedUsers);
        break;
      case 'deactivate': console.log('Deactivating users:', selectedUsers);
        break;
      case 'export':
        console.log('Exporting users:', selectedUsers);
        break;
      default:
        break;
    }
    setSelectedUsers([]);
  };

  const handleUserSave = (userData) => {
    console.log('Saving user data:', userData);
    setShowUserModal(false);
    setSelectedUser(null);
  };

  // Pagination
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = filteredUsers?.slice(indexOfFirstUser, indexOfLastUser);
  const totalPages = Math.ceil(filteredUsers?.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

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
        <main className="p-6 space-y-6">
          {/* Page Header */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-foreground">Gerenciamento de Usuários</h1>
              <p className="text-muted-foreground">
                Gerencie assinantes, visualize estatísticas e controle acessos
              </p>
            </div>
            <div className="flex items-center space-x-3">
              <Button
                variant="outline"
                iconName="Download"
                iconPosition="left"
              >
                Exportar Relatório
              </Button>
              <Button
                variant="default"
                iconName="UserPlus"
                iconPosition="left"
              >
                Adicionar Usuário
              </Button>
            </div>
          </div>

          {/* Statistics */}
          <UserStats />

          {/* Filters */}
          <UserFilters
            onFiltersChange={handleFiltersChange}
            totalUsers={filteredUsers?.length}
          />

          {/* User Table */}
          <UserTable
            users={currentUsers}
            onUserSelect={handleUserSelect}
            onBulkAction={handleBulkAction}
            selectedUsers={selectedUsers}
          />

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between">
              <div className="text-sm text-muted-foreground">
                Mostrando {indexOfFirstUser + 1} a {Math.min(indexOfLastUser, filteredUsers?.length)} de {filteredUsers?.length} usuários
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronLeft"
                  disabled={currentPage === 1}
                  onClick={() => handlePageChange(currentPage - 1)}
                />
                {Array.from({ length: totalPages }, (_, i) => i + 1)?.map((page) => (
                  <Button
                    key={page}
                    variant={currentPage === page ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(page)}
                  >
                    {page}
                  </Button>
                ))}
                <Button
                  variant="outline"
                  size="sm"
                  iconName="ChevronRight"
                  disabled={currentPage === totalPages}
                  onClick={() => handlePageChange(currentPage + 1)}
                />
              </div>
            </div>
          )}
        </main>
      </div>
      {/* User Details Modal */}
      <UserDetailsModal
        user={selectedUser}
        isOpen={showUserModal}
        onClose={() => {
          setShowUserModal(false);
          setSelectedUser(null);
        }}
        onSave={handleUserSave}
      />
    </div>
  );
};

export default UserManagement;