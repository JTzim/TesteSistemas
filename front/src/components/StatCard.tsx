import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { User, Bug, CheckCircle, Clock, ClipboardCheck, ListChecks } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number;
  icon?: 'users' | 'bugs' | 'success' | 'pending' | 'avaliacoes' | 'criterios';
  description?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon, description }) => {
  const getIcon = () => {
    switch (icon) {
      case 'users':
        return <User className="h-4 w-4 text-muted-foreground" />;
      case 'bugs':
        return <Bug className="h-4 w-4 text-muted-foreground" />;
      case 'success':
        return <CheckCircle className="h-4 w-4 text-muted-foreground" />;
      case 'pending':
        return <Clock className="h-4 w-4 text-muted-foreground" />;
      case 'avaliacoes':
        return <ClipboardCheck className="h-4 w-4 text-muted-foreground" />;
      case 'criterios':
        return <ListChecks className="h-4 w-4 text-muted-foreground" />;
      default:
        return null;
    }
  };

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {getIcon()}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {description && (
          <p className="text-xs text-muted-foreground">{description}</p>
        )}
      </CardContent>
    </Card>
  );
};

export default StatCard;