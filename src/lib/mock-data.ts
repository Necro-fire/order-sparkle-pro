export type OrderStatus = 'pendente' | 'em_manutencao' | 'finalizado';

export const statusLabels: Record<OrderStatus, string> = {
  pendente: 'Pendente',
  em_manutencao: 'Em Manutenção',
  finalizado: 'Finalizado',
};

export type AccentColor = 'blue' | 'green' | 'red' | 'yellow' | 'purple';

export const accentColors: Record<AccentColor, { h: number; s: string; l: string; label: string }> = {
  blue: { h: 217, s: '91%', l: '60%', label: 'Azul' },
  green: { h: 142, s: '71%', l: '45%', label: 'Verde' },
  red: { h: 0, s: '72%', l: '51%', label: 'Vermelho' },
  yellow: { h: 45, s: '93%', l: '47%', label: 'Amarelo' },
  purple: { h: 263, s: '70%', l: '50%', label: 'Roxo' },
};

export const monthlyRevenue = [
  { month: 'Out', valor: 4200 },
  { month: 'Nov', valor: 5800 },
  { month: 'Dez', valor: 4900 },
  { month: 'Jan', valor: 6200 },
  { month: 'Fev', valor: 7100 },
  { month: 'Mar', valor: 3060 },
];
