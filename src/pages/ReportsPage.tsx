import { motion } from 'framer-motion';
import { BarChart3 } from 'lucide-react';

export default function ReportsPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Relatórios</h1>
        <p className="text-sm text-muted-foreground mt-1">Gere e exporte relatórios de serviço.</p>
      </div>

      <motion.div
        className="surface-card rounded-lg p-12 flex flex-col items-center justify-center text-center"
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] }}
      >
        {/* Ghost UI — empty state */}
        <div className="w-12 h-12 rounded-lg bg-surface-2 flex items-center justify-center mb-4">
          <BarChart3 className="w-6 h-6 text-muted-foreground" strokeWidth={1.5} />
        </div>
        <h3 className="text-sm font-medium mb-1">Relatórios disponíveis em breve</h3>
        <p className="text-xs text-muted-foreground max-w-sm">
          Acesse relatórios individuais na página de detalhes de cada ordem de serviço. Exportação em PDF será disponibilizada com o backend.
        </p>
      </motion.div>
    </div>
  );
}
