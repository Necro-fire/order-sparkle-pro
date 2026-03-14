import { useOrders } from '@/contexts/OrdersContext';
import { monthlyRevenue } from '@/lib/mock-data';
import { DollarSign, TrendingUp, CheckCircle, BarChart3 } from 'lucide-react';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';

export default function FinancialPage() {
  const { orders } = useOrders();

  const finalizados = orders.filter(o => o.status === 'finalizado');
  const receitaTotal = finalizados.reduce((s, o) => s + o.valor, 0);
  const ticketMedio = finalizados.length > 0 ? receitaTotal / finalizados.length : 0;
  const receitaMes = monthlyRevenue[monthlyRevenue.length - 1]?.valor || 0;

  const stats = [
    { label: 'Receita Total', value: `R$ ${receitaTotal.toLocaleString('pt-BR')}`, icon: DollarSign },
    { label: 'Receita do Mês', value: `R$ ${receitaMes.toLocaleString('pt-BR')}`, icon: TrendingUp },
    { label: 'Serviços Concluídos', value: finalizados.length, icon: CheckCircle },
    { label: 'Ticket Médio', value: `R$ ${ticketMedio.toFixed(0)}`, icon: BarChart3 },
  ];

  const ordersByMonth = monthlyRevenue.map((m, i) => ({
    ...m,
    ordens: Math.floor(m.valor / 350) + i,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Financeiro</h1>
        <p className="text-sm text-muted-foreground mt-1">Visão geral financeira da assistência.</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="surface-card rounded-lg p-4"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.08, duration: 0.35, ease: [0.2, 0, 0, 1] }}
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className="w-4 h-4 text-primary" strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <motion.div className="surface-card rounded-lg p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }}>
          <h3 className="text-sm font-medium mb-4">Receita por Mês</h3>
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="finGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${v/1000}k`} />
              <Tooltip
                contentStyle={{ background: 'hsl(240,10%,9%)', border: 'none', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)', fontSize: 12 }}
                formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
              />
              <Area type="monotone" dataKey="valor" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#finGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div className="surface-card rounded-lg p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}>
          <h3 className="text-sm font-medium mb-4">Ordens Finalizadas por Mês</h3>
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={ordersByMonth}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={{ background: 'hsl(240,10%,9%)', border: 'none', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)', fontSize: 12 }} />
              <Bar dataKey="ordens" fill="hsl(var(--primary))" radius={[4, 4, 0, 0]} barSize={32} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>
    </div>
  );
}
