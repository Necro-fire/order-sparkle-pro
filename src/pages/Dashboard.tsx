import { ClipboardList, Clock, CheckCircle, DollarSign, AlertCircle, TrendingUp, Shield } from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { StatusBadge } from '@/components/StatusBadge';
import { monthlyRevenue, type OrderStatus } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, PieChart, Pie, Cell, Legend } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const anim = (i: number) => ({
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  transition: { delay: i * 0.06, duration: 0.3, ease: [0.2, 0, 0, 1] as [number, number, number, number] },
});

const tooltipStyle = {
  contentStyle: { background: 'hsl(240,10%,9%)', border: 'none', borderRadius: 8, boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)', fontSize: 12, color: '#e0e0e0' },
};

export default function Dashboard() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const pendentes = orders.filter(o => o.status === 'pendente').length;
  const manutencao = orders.filter(o => o.status === 'em_manutencao').length;
  const finalizados = orders.filter(o => o.status === 'finalizado').length;
  const receitaTotal = orders.filter(o => o.status === 'finalizado').reduce((s, o) => s + Number(o.valor), 0);
  const receitaMesAnterior = monthlyRevenue[monthlyRevenue.length - 2]?.valor || 1;
  const receitaMes = monthlyRevenue[monthlyRevenue.length - 1]?.valor || 0;
  const crescimento = ((receitaMes - receitaMesAnterior) / receitaMesAnterior * 100).toFixed(1);

  // Pie chart data
  const statusPieData = [
    { name: 'Pendente', value: pendentes || 1, color: 'hsl(45, 93%, 47%)' },
    { name: 'Em Manutenção', value: manutencao || 1, color: 'hsl(217, 91%, 60%)' },
    { name: 'Finalizado', value: finalizados || 1, color: 'hsl(142, 71%, 45%)' },
  ];

  // Top services mock
  const topServices = [
    { name: 'Reparo Tela', value: Math.max(finalizados * 2, 3) },
    { name: 'Bateria', value: Math.max(finalizados, 2) },
    { name: 'Placa', value: Math.max(Math.floor(finalizados * 0.5), 1) },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-lg font-semibold tracking-tight uppercase">Assistência Técnica — Controle</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Visão geral do sistema</p>
        </div>
      </div>

      {/* Row 1: Financial Summary + Operational Stats */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Financial Summary */}
        <motion.div className="lg:col-span-2 card-accent rounded-lg p-5" {...anim(0)}>
          <h3 className="section-title mb-4">Resumo Financeiro do Mês</h3>
          <div className="grid grid-cols-3 gap-6">
            <div>
              <p className="text-xs text-muted-foreground mb-1">Faturamento Total:</p>
              <p className="text-2xl font-bold tabular-nums">R$ {receitaTotal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p className="text-xs text-status-completed mt-1 tabular-nums flex items-center gap-1">
                <TrendingUp className="w-3 h-3" />+{crescimento}% vs Mês Ant.
              </p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Custos Operacionais:</p>
              <p className="text-2xl font-bold tabular-nums text-status-pending">R$ {(receitaTotal * 0.37).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
            <div>
              <p className="text-xs text-muted-foreground mb-1">Lucro Líquido:</p>
              <p className="text-2xl font-bold tabular-nums text-status-completed">R$ {(receitaTotal * 0.63).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
            </div>
          </div>
        </motion.div>

        {/* Operational Stats */}
        <motion.div className="card-accent rounded-lg p-5" {...anim(1)}>
          <h3 className="section-title mb-4">Estatísticas Operacionais</h3>
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-primary" />
              <div>
                <p className="text-xs text-muted-foreground">O.S. Criadas:</p>
                <p className="text-xl font-bold tabular-nums">{orders.length}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-pending" />
              <div>
                <p className="text-xs text-muted-foreground">O.S. Pendentes:</p>
                <p className="text-xl font-bold tabular-nums">{pendentes}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-status-completed" />
              <div>
                <p className="text-xs text-muted-foreground">O.S. Concluídas:</p>
                <p className="text-xl font-bold tabular-nums">{finalizados}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-destructive" />
              <div>
                <p className="text-xs text-muted-foreground">Reparos Garantia:</p>
                <p className="text-xl font-bold tabular-nums">0</p>
              </div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Row 2: Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Cash Flow Chart */}
        <motion.div className="lg:col-span-5 card-accent-subtle rounded-lg p-5" {...anim(2)}>
          <h3 className="section-title mb-4">Fluxo de Caixa Mensal</h3>
          <ResponsiveContainer width="100%" height={220}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="month" tick={{ fontSize: 10, fill: 'hsl(240,5%,55%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240,5%,55%)' }} axisLine={false} tickLine={false} tickFormatter={v => `R$${(v/1000).toFixed(0)}k`} />
              <Tooltip {...tooltipStyle} formatter={(v: number) => [`R$ ${v.toLocaleString('pt-BR')}`, 'Receita']} />
              <Area type="monotone" dataKey="valor" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revenueGrad)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Top Services */}
        <motion.div className="lg:col-span-3 card-accent-subtle rounded-lg p-5" {...anim(3)}>
          <h3 className="section-title mb-4">Top Serviços</h3>
          <ResponsiveContainer width="100%" height={220}>
            <BarChart data={topServices}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
              <XAxis dataKey="name" tick={{ fontSize: 9, fill: 'hsl(240,5%,55%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 10, fill: 'hsl(240,5%,55%)' }} axisLine={false} tickLine={false} />
              <Tooltip {...tooltipStyle} />
              <Bar dataKey="value" radius={[3, 3, 0, 0]} barSize={28}>
                <Cell fill="hsl(var(--primary))" />
                <Cell fill="hsl(var(--chart-2))" />
                <Cell fill="hsl(var(--chart-3))" />
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </motion.div>

        {/* Status Pie Chart */}
        <motion.div className="lg:col-span-4 card-accent-subtle rounded-lg p-5" {...anim(4)}>
          <h3 className="section-title mb-2">Status das O.S.</h3>
          <ResponsiveContainer width="100%" height={220}>
            <PieChart>
              <Pie
                data={statusPieData}
                cx="50%"
                cy="45%"
                innerRadius={50}
                outerRadius={75}
                paddingAngle={3}
                dataKey="value"
                stroke="none"
              >
                {statusPieData.map((entry, i) => (
                  <Cell key={i} fill={entry.color} />
                ))}
              </Pie>
              <Legend
                verticalAlign="bottom"
                iconType="circle"
                iconSize={8}
                wrapperStyle={{ fontSize: 10, color: 'hsl(240,5%,65%)' }}
              />
              <Tooltip {...tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Row 3: Recent Orders Table */}
      <motion.div className="card-accent-subtle rounded-lg" {...anim(5)}>
        <div className="p-4 flex items-center justify-between">
          <h3 className="section-title">Últimas Ordens de Serviço</h3>
          <button onClick={() => navigate('/ordens')} className="text-xs text-primary hover:underline">Ver todas →</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground border-b border-primary/10">
                <th className="text-left font-medium px-4 py-2.5">O.S. ID</th>
                <th className="text-left font-medium px-4 py-2.5">Cliente</th>
                <th className="text-left font-medium px-4 py-2.5 hidden md:table-cell">Aparelho</th>
                <th className="text-left font-medium px-4 py-2.5 hidden lg:table-cell">Data</th>
                <th className="text-right font-medium px-4 py-2.5">Valor</th>
                <th className="text-left font-medium px-4 py-2.5">Status</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr key={order.id} className="surface-interactive cursor-pointer border-b border-primary/5 last:border-0" onClick={() => navigate(`/ordens/${order.id}`)}>
                  <td className="px-4 py-2.5 tabular-nums font-medium text-primary">{order.codigo}</td>
                  <td className="px-4 py-2.5">{order.cliente}</td>
                  <td className="px-4 py-2.5 text-muted-foreground hidden md:table-cell">{order.aparelho}</td>
                  <td className="px-4 py-2.5 tabular-nums text-muted-foreground hidden lg:table-cell">{new Date(order.data_entrada).toLocaleDateString('pt-BR')}</td>
                  <td className="px-4 py-2.5 text-right tabular-nums">R$ {Number(order.valor).toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</td>
                  <td className="px-4 py-2.5"><StatusBadge status={order.status as OrderStatus} /></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        {recentOrders.length === 0 && (
          <div className="text-center py-12 text-muted-foreground text-sm">Nenhuma ordem cadastrada. Clique em "Nova OS" para começar.</div>
        )}
      </motion.div>
    </div>
  );
}
