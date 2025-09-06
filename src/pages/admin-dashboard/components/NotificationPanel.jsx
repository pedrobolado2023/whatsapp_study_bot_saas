import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const NotificationPanel = ({ notifications = [] }) => {
  const [showAll, setShowAll] = useState(false);
  const displayNotifications = showAll ? notifications : notifications?.slice(0, 5);

  const getNotificationIcon = (type) => {
    switch (type) {
      case 'sale': return 'DollarSign';
      case 'user': return 'UserPlus';
      case 'system': return 'Settings';
      case 'payment': return 'CreditCard';
      default: return 'Bell';
    }
  };

  const getNotificationColor = (type) => {
    switch (type) {
      case 'sale': return 'text-success';
      case 'user': return 'text-primary';
      case 'system': return 'text-warning';
      case 'payment': return 'text-error';
      default: return 'text-muted-foreground';
    }
  };

  const formatTime = (timestamp) => {
    const now = new Date();
    const time = new Date(timestamp);
    const diffInMinutes = Math.floor((now - time) / (1000 * 60));
    
    if (diffInMinutes < 1) return 'Agora';
    if (diffInMinutes < 60) return `${diffInMinutes} min atrás`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)} h atrás`;
    return time?.toLocaleDateString('pt-BR');
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-foreground">Notificações</h3>
        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            {notifications?.filter(n => n?.unread)?.length} não lidas
          </span>
          <Button variant="ghost" size="sm">
            <Icon name="MoreHorizontal" size={16} />
          </Button>
        </div>
      </div>
      <div className="space-y-3">
        {displayNotifications?.map((notification) => (
          <div 
            key={notification?.id}
            className={`flex items-start space-x-3 p-3 rounded-md transition-colors hover:bg-muted ${
              notification?.unread ? 'bg-primary/5 border-l-2 border-l-primary' : ''
            }`}
          >
            <div className={`w-8 h-8 rounded-full flex items-center justify-center bg-muted ${
              getNotificationColor(notification?.type)
            }`}>
              <Icon name={getNotificationIcon(notification?.type)} size={16} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground">
                {notification?.title}
              </p>
              <p className="text-sm text-muted-foreground mt-1">
                {notification?.message}
              </p>
              <p className="text-xs text-muted-foreground mt-2">
                {formatTime(notification?.timestamp)}
              </p>
            </div>
            {notification?.unread && (
              <div className="w-2 h-2 bg-primary rounded-full mt-2"></div>
            )}
          </div>
        ))}
      </div>
      {notifications?.length > 5 && (
        <div className="mt-4 pt-4 border-t border-border">
          <Button 
            variant="ghost" 
            size="sm" 
            fullWidth
            onClick={() => setShowAll(!showAll)}
          >
            {showAll ? 'Mostrar Menos' : `Ver Todas (${notifications?.length})`}
          </Button>
        </div>
      )}
    </div>
  );
};

export default NotificationPanel;