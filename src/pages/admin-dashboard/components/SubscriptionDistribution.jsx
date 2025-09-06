import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const SubscriptionDistribution = ({ data, title = "Distribuição de Planos" }) => {
  const COLORS = {
    'Mensal': 'var(--color-primary)',
    'Trimestral': 'var(--color-success)',
    'Cancelado': 'var(--color-error)'
  };

  const formatTooltip = (value, name) => {
    return [`${value} usuários`, name];
  };

  return (
    <div className="bg-card border border-border rounded-lg p-6 shadow-soft">
      <h3 className="text-lg font-semibold text-foreground mb-4">{title}</h3>
      <div className="h-80">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={60}
              outerRadius={100}
              paddingAngle={5}
              dataKey="value"
            >
              {data?.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS?.[entry?.name]} />
              ))}
            </Pie>
            <Tooltip 
              formatter={formatTooltip}
              contentStyle={{
                backgroundColor: 'var(--color-popover)',
                border: '1px solid var(--color-border)',
                borderRadius: '6px'
              }}
            />
            <Legend 
              wrapperStyle={{ color: 'var(--color-foreground)' }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default SubscriptionDistribution;