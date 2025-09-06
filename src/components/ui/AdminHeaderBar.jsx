import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../AppIcon';
import Button from './Button';

const AdminHeaderBar = ({ user = { name: 'Administrador', email: 'admin@whatsappstudybot.com' } }) => {
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [notifications] = useState([
    { id: 1, message: 'Novo usuário cadastrado', time: '5 min atrás', unread: true },
    { id: 2, message: 'Pagamento processado', time: '15 min atrás', unread: true },
    { id: 3, message: 'Backup concluído', time: '1 hora atrás', unread: false }
  ]);
  const navigate = useNavigate();

  const unreadCount = notifications?.filter(n => n?.unread)?.length;

  const handleLogout = () => {
    // Clear authentication state
    localStorage.removeItem('adminToken');
    navigate('/admin-login');
  };

  return (
    <header className="bg-card border-b border-border h-16 flex items-center justify-between px-6 sticky top-0 z-30">
      {/* Page Title */}
      <div className="flex items-center space-x-4">
        <h1 className="text-xl font-semibold text-foreground">
          Painel Administrativo
        </h1>
      </div>
      {/* Right Section */}
      <div className="flex items-center space-x-4">
        {/* System Status */}
        <div className="hidden md:flex items-center space-x-2 px-3 py-1 bg-success/10 rounded-full">
          <div className="w-2 h-2 bg-success rounded-full animate-pulse"></div>
          <span className="text-sm text-success font-medium">Sistema Online</span>
        </div>

        {/* Notifications */}
        <div className="relative">
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={() => {/* Handle notifications */}}
          >
            <Icon name="Bell" size={20} />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-5 h-5 bg-error text-error-foreground text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </Button>
        </div>

        {/* User Menu */}
        <div className="relative">
          <button
            onClick={() => setShowUserMenu(!showUserMenu)}
            className="flex items-center space-x-3 p-2 rounded-md hover:bg-muted transition-colors"
          >
            <div className="w-8 h-8 bg-primary rounded-full flex items-center justify-center">
              <Icon name="User" size={16} color="white" />
            </div>
            <div className="hidden md:block text-left">
              <div className="text-sm font-medium text-foreground">{user?.name}</div>
              <div className="text-xs text-muted-foreground">{user?.email}</div>
            </div>
            <Icon name="ChevronDown" size={16} className="text-muted-foreground" />
          </button>

          {/* User Dropdown */}
          {showUserMenu && (
            <div className="absolute right-0 mt-2 w-56 bg-popover border border-border rounded-md shadow-modal z-50">
              <div className="p-3 border-b border-border">
                <div className="font-medium text-popover-foreground">{user?.name}</div>
                <div className="text-sm text-muted-foreground">{user?.email}</div>
              </div>
              <div className="py-2">
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-muted transition-colors">
                  <Icon name="Settings" size={16} />
                  <span className="text-sm">Configurações</span>
                </button>
                <button className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-muted transition-colors">
                  <Icon name="HelpCircle" size={16} />
                  <span className="text-sm">Ajuda</span>
                </button>
                <hr className="my-2 border-border" />
                <button 
                  onClick={handleLogout}
                  className="flex items-center space-x-2 w-full px-3 py-2 text-left hover:bg-muted transition-colors text-error"
                >
                  <Icon name="LogOut" size={16} />
                  <span className="text-sm">Sair</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default AdminHeaderBar;