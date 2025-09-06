import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Icon from '../AppIcon';

const AdminSidebarNavigation = ({ isCollapsed = false, onToggle }) => {
  const location = useLocation();
  const [hoveredItem, setHoveredItem] = useState(null);

  const navigationItems = [
    {
      id: 'dashboard',
      label: 'Dashboard',
      icon: 'LayoutDashboard',
      path: '/admin-dashboard',
      description: 'Visão geral do sistema'
    },
    {
      id: 'users',
      label: 'Usuários',
      icon: 'Users',
      path: '/user-management',
      description: 'Gerenciar estudantes'
    },
    {
      id: 'content',
      label: 'Conteúdo',
      icon: 'FileText',
      path: '/content-management',
      description: 'Gerenciar materiais de estudo'
    }
  ];

  const isActive = (path) => location?.pathname === path;

  return (
    <aside className={`bg-card border-r border-border h-screen fixed left-0 top-0 z-40 transition-all duration-300 ${
      isCollapsed ? 'w-16' : 'w-64'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-border">
        {!isCollapsed && (
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="MessageSquare" size={20} color="white" />
            </div>
            <span className="text-lg font-semibold text-foreground">Admin</span>
          </div>
        )}
        <button
          onClick={onToggle}
          className="p-2 rounded-md hover:bg-muted transition-colors"
        >
          <Icon 
            name={isCollapsed ? "ChevronRight" : "ChevronLeft"} 
            size={16} 
            className="text-muted-foreground" 
          />
        </button>
      </div>
      {/* Navigation */}
      <nav className="p-4 space-y-2">
        {navigationItems?.map((item) => (
          <Link
            key={item?.id}
            to={item?.path}
            className={`flex items-center space-x-3 px-3 py-2 rounded-md transition-all duration-200 group relative ${
              isActive(item?.path)
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
            onMouseEnter={() => setHoveredItem(item?.id)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <Icon 
              name={item?.icon} 
              size={20} 
              className={isActive(item?.path) ? 'text-primary-foreground' : 'text-current'}
            />
            {!isCollapsed && (
              <span className="font-medium">{item?.label}</span>
            )}
            
            {/* Tooltip for collapsed state */}
            {isCollapsed && hoveredItem === item?.id && (
              <div className="absolute left-full ml-2 px-3 py-2 bg-popover text-popover-foreground rounded-md shadow-modal z-50 whitespace-nowrap">
                <div className="font-medium">{item?.label}</div>
                <div className="text-xs text-muted-foreground mt-1">{item?.description}</div>
              </div>
            )}
          </Link>
        ))}
      </nav>
      {/* Footer */}
      <div className="absolute bottom-4 left-4 right-4">
        <div className={`p-3 bg-muted rounded-md ${isCollapsed ? 'text-center' : ''}`}>
          {!isCollapsed ? (
            <div>
              <div className="text-sm font-medium text-foreground">Sistema Ativo</div>
              <div className="text-xs text-muted-foreground">Última atualização: hoje</div>
            </div>
          ) : (
            <div className="w-2 h-2 bg-success rounded-full mx-auto"></div>
          )}
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebarNavigation;