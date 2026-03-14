import { ClipboardList, Clock, CheckCircle, DollarSign, AlertCircle } from 'lucide-react';
import { useOrders } from '@/contexts/OrdersContext';
import { StatusBadge } from '@/components/StatusBadge';
import { monthlyRevenue } from '@/lib/mock-data';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const cardVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.08, duration: 0.35, ease: [0.2, 0, 0, 1] }
  }),
};

export default function Dashboard() {
  const { orders } = useOrders();
  const navigate = useNavigate();

  const total = orders.length;
  const pendentes = orders.filter(o => o.status === 'pendente').length;
  const manutencao = orders.filter(o => o.status === 'em_manutencao').length;
  const finalizados = orders.filter(o => o.status === 'finalizado').length;
  const receita = orders.filter(o => o.status === 'finalizado').reduce((s, o) => s + o.valor, 0);

  const stats = [
    { label: 'Total de OS', value: total, icon: ClipboardList, color: 'text-foreground' },
    { label: 'Pendentes', value: pendentes, icon: AlertCircle, color: 'text-status-pending' },
    { label: 'Em Manutenção', value: manutencao, icon: Clock, color: 'text-primary' },
    { label: 'Finalizados', value: finalizados, icon: CheckCircle, color: 'text-status-completed' },
    { label: 'Receita Total', value: `R$ ${receita.toLocaleString('pt-BR')}`, icon: DollarSign, color: 'text-primary' },
  ];

  const statusData = [
    { name: 'Pendente', value: pendentes },
    { name: 'Manutenção', value: manutencao },
    { name: 'Finalizado', value: finalizados },
  ];

  const recentOrders = orders.slice(0, 5);

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">Controle total da sua assistência.</p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat, i) => (
          <motion.div
            key={stat.label}
            className="surface-card rounded-lg p-4"
            variants={cardVariants}
            initial="hidden"
            animate="visible"
            custom={i}
          >
            <div className="flex items-center gap-2 mb-3">
              <stat.icon className={`w-4 h-4 ${stat.color}`} strokeWidth={1.5} />
              <span className="text-xs text-muted-foreground">{stat.label}</span>
            </div>
            <p className="text-2xl font-semibold tabular-nums">{stat.value}</p>
          </motion.div>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <motion.div
          className="surface-card rounded-lg p-5 lg:col-span-2"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          <h3 className="text-sm font-medium mb-4">Receita Mensal</h3>
          <ResponsiveContainer width="100%" height={240}>
            <AreaChart data={monthlyRevenue}>
              <defs>
                <linearGradient id="revenueGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity={0.3} />
                  <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
              <XAxis dataKey="month" tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v/1000}k`} />
              <Tooltip
                contentStyle={{
                  background: 'hsl(240,10%,9%)',
                  border: 'none',
                  borderRadius: 8,
                  boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)',
                  fontSize: 12,
                }}
                formatter={(value: number) => [`R$ ${value.toLocaleString('pt-BR')}`, 'Receita']}
              />
              <Area type="monotone" dataKey="valor" stroke="hsl(var(--primary))" strokeWidth={2} fill="url(#revenueGradient)" />
            </AreaChart>
          </ResponsiveContainer>
        </motion.div>

        <motion.div
          className="surface-card rounded-lg p-5"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.35, ease: [0.2, 0, 0, 1] }}
        >
          <h3 className="text-sm font-medium mb-4">OS por Status</h3>
          <ResponsiveContainer width="100%" height={240}>
            <BarChart data={statusData} layout="vertical">
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" horizontal={false} />
              <XAxis type="number" tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} />
              <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: 'hsl(240,5%,65%)' }} axisLine={false} tickLine={false} width={90} />
              <Bar dataKey="value" fill="hsl(var(--primary))" radius={[0, 4, 4, 0]} barSize={24} />
            </BarChart>
          </ResponsiveContainer>
        </motion.div>
      </div>

      {/* Recent Orders */}
      <motion.div
        className="surface-card rounded-lg"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.35, ease: [0.2, 0, 0, 1] }}
      >
        <div className="p-5 flex items-center justify-between">
          <h3 className="text-sm font-medium">Ordens Recentes</h3>
          <button onClick={() => navigate('/ordens')} className="text-xs text-primary hover:underline">Ver todas</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="text-xs text-muted-foreground" style={{ boxShadow: 'inset 0 -1px 0 0 rgba(255,255,255,0.06)' }}>
                <th className="text-left font-medium px-5 py-3">Código</th>
                <th className="text-left font-medium px-5 py-3">Cliente</th>
                <th className="text-left font-medium px-5 py-3">Aparelho</th>
                <th className="text-left font-medium px-5 py-3">Status</th>
                <th className="text-left font-medium px-5 py-3">Entrada</th>
                <th className="text-right font-medium px-5 py-3">Valor</th>
              </tr>
            </thead>
            <tbody>
              {recentOrders.map(order => (
                <tr
                  key={order.id}
                  className="surface-interactive cursor-pointer"
                  onClick={() => navigate(`/ordens/${order.id}`)}
                >
                  <td className="px-5 py-3 tabular-nums font-medium text-primary">{order.codigo}</td>
                  <td className="px-5 py-3">{order.cliente}</td>
                  <td className="px-5 py-3 text-muted-foreground">{order.marca} {order.modelo}</td>
                  <td className="px-5 py-3"><StatusBadge status={order.status} /></td>
                  <td className="px-5 py-3 tabular-nums text-muted-foreground">{new Date(order.dataEntrada).toLocaleDateString('pt-BR')}</td>
                  <td className="px-5 py-3 text-right tabular-nums">R$ {order.valor.toLocaleString('pt-BR')}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </motion.div>
    </div>
  );
}
