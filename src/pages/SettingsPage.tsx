import { useAccentColor, type AccentColor, accentColors } from '@/contexts/AccentColorContext';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';

export default function SettingsPage() {
  const { accentColor, setAccentColor } = useAccentColor();
  const colorEntries = Object.entries(accentColors) as [AccentColor, typeof accentColors[AccentColor]][];

  return (
    <div className="space-y-6 max-w-2xl">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">Configurações</h1>
        <p className="text-sm text-muted-foreground mt-1">Personalize o sistema.</p>
      </div>
      <motion.div className="surface-card rounded-lg p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.35 }}>
        <h3 className="text-sm font-medium mb-1">Cor de Acento</h3>
        <p className="text-xs text-muted-foreground mb-4">Escolha a cor secundária que será usada em todo o sistema.</p>
        <div className="flex gap-3">
          {colorEntries.map(([key, color]) => (
            <button
              key={key}
              onClick={() => setAccentColor(key)}
              className={cn('w-10 h-10 rounded-md flex items-center justify-center transition-transform hover:scale-110', accentColor === key && 'ring-2 ring-offset-2 ring-offset-background')}
              style={{ backgroundColor: `hsl(${color.h}, ${color.s}, ${color.l})`, ...(accentColor === key ? { boxShadow: `0 0 0 2px hsl(${color.h}, ${color.s}, ${color.l})` } : {}) }}
              title={color.label}
            >
              {accentColor === key && <Check className="w-4 h-4 text-primary-foreground" strokeWidth={2} />}
            </button>
          ))}
        </div>
      </motion.div>
      <motion.div className="surface-card rounded-lg p-5" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
        <h3 className="text-sm font-medium mb-1">Dados Pessoais</h3>
        <p className="text-xs text-muted-foreground">Gerencie suas informações de conta nas configurações do perfil.</p>
      </motion.div>
    </div>
  );
}
