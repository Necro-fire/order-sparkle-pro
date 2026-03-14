import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Wrench, Eye, EyeOff } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { motion } from 'framer-motion';
import { toast } from 'sonner';

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn } = useAuth();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) { toast.error('Preencha todos os campos.'); return; }
    setLoading(true);
    const { error } = await signIn(email, password);
    setLoading(false);
    if (error) { toast.error('Email ou senha inválidos.'); return; }
    navigate('/');
    toast.success('Login realizado com sucesso.');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-4">
      <motion.div className="w-full max-w-sm surface-card rounded-lg p-8" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.35, ease: [0.2, 0, 0, 1] as [number, number, number, number] }}>
        <div className="flex items-center gap-3 mb-8">
          <div className="w-9 h-9 rounded-md bg-primary flex items-center justify-center">
            <Wrench className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
          </div>
          <span className="text-lg font-semibold tracking-tight">TechAssist</span>
        </div>
        <h2 className="text-sm font-medium mb-1">Entrar</h2>
        <p className="text-xs text-muted-foreground mb-6">Acesse o sistema de gestão.</p>
        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <Label className="text-xs text-muted-foreground">Email</Label>
            <Input type="email" value={email} onChange={e => setEmail(e.target.value)} className="mt-1 bg-surface-2 border-0" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} placeholder="seu@email.com" />
          </div>
          <div>
            <Label className="text-xs text-muted-foreground">Senha</Label>
            <div className="relative">
              <Input type={showPassword ? 'text' : 'password'} value={password} onChange={e => setPassword(e.target.value)} className="mt-1 bg-surface-2 border-0 pr-10" style={{ boxShadow: 'inset 0 0 0 1px rgba(255,255,255,0.08)' }} placeholder="••••••••" />
              <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground mt-0.5">
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
          <Button type="submit" className="w-full accent-glow" disabled={loading}>{loading ? 'Entrando...' : 'Entrar'}</Button>
        </form>
        <p className="text-xs text-muted-foreground text-center mt-6">
          Não tem conta? <Link to="/registro" className="text-primary hover:underline">Criar conta</Link>
        </p>
      </motion.div>
    </div>
  );
}
