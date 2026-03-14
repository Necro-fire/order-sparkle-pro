import { useParams, useNavigate } from 'react-router-dom';
import { useOrders } from '@/contexts/OrdersContext';
import { StatusBadge } from '@/components/StatusBadge';
import { type OrderStatus, statusLabels } from '@/lib/mock-data';
import { ArrowLeft, Printer, FileText, Clock, User, Phone, Monitor, Wrench } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function OrderDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { orders, updateOrder } = useOrders();
  const navigate = useNavigate();
  const order = orders.find(o => o.id === id);

  if (!order) {
    return <div className="flex items-center justify-center h-64 text-muted-foreground text-sm">Ordem não encontrada.</div>;
  }

  const handleStatusChange = async (newStatus: OrderStatus) => {
    const updates: Record<string, string> = { status: newStatus };
    if (newStatus === 'em_manutencao') {
      updates.hora_inicio = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    if (newStatus === 'finalizado') {
      updates.hora_final = new Date().toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
    }
    await updateOrder(order.id, updates);
    toast.success(`Status alterado para ${statusLabels[newStatus]}.`);
  };

  const infoItems = [
    { icon: User, label: 'Cliente', value: order.cliente },
    { icon: Phone, label: 'Telefone', value: order.telefone },
    { icon: Monitor, label: 'Aparelho', value: `${order.marca} ${order.modelo} (${order.aparelho})` },
    { icon: Wrench, label: 'Técnico', value: order.tecnico },
    { icon: Clock, label: 'Entrada', value: new Date(order.data_entrada).toLocaleDateString('pt-BR') },
    { icon: Clock, label: 'Início', value: order.hora_inicio || '—' },
    { icon: Clock, label: 'Finalização', value: order.hora_final || '—' },
  ];

  return (
    <motion.div className="space-y-6 max-w-3xl" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}>
      <div className="flex items-center gap-4">
        <button onClick={() => navigate('/ordens')} className="p-2 rounded-md hover:bg-surface-2 text-muted-foreground hover:text-foreground transition-colors">
          <ArrowLeft className="w-4 h-4" strokeWidth={1.5} />
        </button>
        <div className="flex-1">
          <div className="flex items-center gap-3">
            <h1 className="text-xl font-semibold tabular-nums">{order.codigo}</h1>
            <StatusBadge status={order.status as OrderStatus} />
          </div>
          <p className="text-sm text-muted-foreground mt-0.5">{order.cliente} · {order.marca} {order.modelo}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" onClick={() => window.print()} className="border-0 bg-surface-1" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
            <Printer className="w-4 h-4 mr-1.5" strokeWidth={1.5} />Imprimir
          </Button>
          <Button variant="outline" size="sm" className="border-0 bg-surface-1" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }}>
            <FileText className="w-4 h-4 mr-1.5" strokeWidth={1.5} />Relatório
          </Button>
        </div>
      </div>

      <div className="surface-card rounded-lg p-5">
        <h3 className="text-sm font-medium mb-4">Informações</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {infoItems.map(item => (
            <div key={item.label} className="flex items-start gap-3">
              <item.icon className="w-4 h-4 text-muted-foreground mt-0.5" strokeWidth={1.5} />
              <div>
                <p className="text-xs text-muted-foreground">{item.label}</p>
                <p className="text-sm tabular-nums">{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-medium mb-2">Problema Relatado</h3>
          <p className="text-sm text-muted-foreground">{order.problema || '—'}</p>
        </div>
        <div className="surface-card rounded-lg p-5">
          <h3 className="text-sm font-medium mb-2">Observações Técnicas</h3>
          <p className="text-sm text-muted-foreground">{order.observacoes || '—'}</p>
        </div>
      </div>

      <div className="surface-card rounded-lg p-5 flex items-center justify-between">
        <div>
          <p className="text-xs text-muted-foreground">Valor do Serviço</p>
          <p className="text-2xl font-semibold tabular-nums">R$ {Number(order.valor).toLocaleString('pt-BR')}</p>
        </div>
        <div className="flex gap-2">
          {order.status === 'pendente' && (
            <Button size="sm" onClick={() => handleStatusChange('em_manutencao')} className="accent-glow">Iniciar Manutenção</Button>
          )}
          {order.status === 'em_manutencao' && (
            <Button size="sm" onClick={() => handleStatusChange('finalizado')} className="bg-status-completed hover:bg-status-completed/90 text-primary-foreground">Finalizar</Button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
