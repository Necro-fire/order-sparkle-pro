export type OrderStatus = 'pendente' | 'em_manutencao' | 'finalizado';

export interface ServiceOrder {
  id: string;
  codigo: string;
  cliente: string;
  telefone: string;
  aparelho: string;
  marca: string;
  modelo: string;
  problema: string;
  observacoes: string;
  valor: number;
  status: OrderStatus;
  dataEntrada: string;
  horaInicio: string | null;
  horaFinal: string | null;
  tecnico: string;
}

export const mockOrders: ServiceOrder[] = [
  {
    id: '1', codigo: 'OS-0001', cliente: 'Carlos Silva', telefone: '(11) 99876-5432',
    aparelho: 'Notebook', marca: 'Dell', modelo: 'Inspiron 15', problema: 'Tela piscando intermitentemente',
    observacoes: 'Cliente relatou que começou após atualização', valor: 350,
    status: 'finalizado', dataEntrada: '2026-03-01', horaInicio: '09:30', horaFinal: '14:15', tecnico: 'João Santos'
  },
  {
    id: '2', codigo: 'OS-0002', cliente: 'Ana Oliveira', telefone: '(21) 98765-1234',
    aparelho: 'Smartphone', marca: 'Samsung', modelo: 'Galaxy S24', problema: 'Bateria descarregando rápido',
    observacoes: 'Verificar saúde da bateria', valor: 180,
    status: 'em_manutencao', dataEntrada: '2026-03-05', horaInicio: '10:00', horaFinal: null, tecnico: 'Maria Costa'
  },
  {
    id: '3', codigo: 'OS-0003', cliente: 'Roberto Mendes', telefone: '(31) 97654-3210',
    aparelho: 'Tablet', marca: 'Apple', modelo: 'iPad Air', problema: 'Tela trincada',
    observacoes: 'Necessário troca completa do display', valor: 890,
    status: 'pendente', dataEntrada: '2026-03-08', horaInicio: null, horaFinal: null, tecnico: 'João Santos'
  },
  {
    id: '4', codigo: 'OS-0004', cliente: 'Lucia Ferreira', telefone: '(41) 96543-2109',
    aparelho: 'Notebook', marca: 'Lenovo', modelo: 'ThinkPad T14', problema: 'Não liga',
    observacoes: 'Possível problema na placa-mãe', valor: 650,
    status: 'pendente', dataEntrada: '2026-03-10', horaInicio: null, horaFinal: null, tecnico: 'Maria Costa'
  },
  {
    id: '5', codigo: 'OS-0005', cliente: 'Pedro Almeida', telefone: '(51) 95432-1098',
    aparelho: 'Desktop', marca: 'Custom', modelo: 'PC Gamer', problema: 'Superaquecimento durante jogos',
    observacoes: 'Limpar cooler e trocar pasta térmica', valor: 120,
    status: 'finalizado', dataEntrada: '2026-03-02', horaInicio: '08:00', horaFinal: '10:30', tecnico: 'João Santos'
  },
  {
    id: '6', codigo: 'OS-0006', cliente: 'Fernanda Lima', telefone: '(61) 94321-0987',
    aparelho: 'Smartphone', marca: 'Apple', modelo: 'iPhone 15', problema: 'Alto-falante não funciona',
    observacoes: '', valor: 250,
    status: 'em_manutencao', dataEntrada: '2026-03-09', horaInicio: '14:00', horaFinal: null, tecnico: 'João Santos'
  },
  {
    id: '7', codigo: 'OS-0007', cliente: 'Marcos Souza', telefone: '(71) 93210-9876',
    aparelho: 'Impressora', marca: 'HP', modelo: 'LaserJet Pro', problema: 'Atolamento de papel constante',
    observacoes: 'Verificar rolos de alimentação', valor: 200,
    status: 'finalizado', dataEntrada: '2026-03-03', horaInicio: '11:00', horaFinal: '13:00', tecnico: 'Maria Costa'
  },
  {
    id: '8', codigo: 'OS-0008', cliente: 'Julia Rodrigues', telefone: '(81) 92109-8765',
    aparelho: 'Monitor', marca: 'LG', modelo: 'UltraWide 34"', problema: 'Pixels mortos no canto inferior',
    observacoes: 'Garantia expirada', valor: 420,
    status: 'pendente', dataEntrada: '2026-03-12', horaInicio: null, horaFinal: null, tecnico: 'João Santos'
  },
];

export const monthlyRevenue = [
  { month: 'Out', valor: 4200 },
  { month: 'Nov', valor: 5800 },
  { month: 'Dez', valor: 4900 },
  { month: 'Jan', valor: 6200 },
  { month: 'Fev', valor: 7100 },
  { month: 'Mar', valor: 3060 },
];

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
