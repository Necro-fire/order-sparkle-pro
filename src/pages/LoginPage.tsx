import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { Wrench, Eye, EyeOff, Mail, Lock, User, ArrowRight, ChevronRight } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'sonner';

/* ─── Fake blurred dashboard background ─── */
function DashboardBackground() {
  return (
    <div className="fixed inset-0 z-0 overflow-hidden select-none pointer-events-none">
      <div className="absolute inset-0 bg-background/80 z-10" />
      <div className="absolute inset-0 backdrop-blur-[6px] z-10" />
      <div className="absolute inset-0 p-4 flex gap-4" style={{ filter: 'blur(4px)', opacity: 0.35 }}>
        <div className="w-56 shrink-0 rounded-lg bg-surface-1 flex flex-col gap-3 p-4">
          <div className="h-8 w-28 rounded bg-surface-2" />
          <div className="h-6 w-full rounded bg-surface-2 mt-4" />
          <div className="h-6 w-full rounded bg-surface-2" />
          <div className="h-6 w-3/4 rounded bg-surface-2" />
          <div className="h-6 w-full rounded bg-surface-2" />
          <div className="h-6 w-2/3 rounded bg-surface-2" />
          <div className="flex-1" />
          <div className="h-8 w-full rounded bg-surface-2" />
        </div>
        <div className="flex-1 flex flex-col gap-4">
          <div className="h-12 rounded-lg bg-surface-1 flex items-center px-4 gap-3">
            <div className="h-6 w-48 rounded bg-surface-2" />
            <div className="flex-1" />
            <div className="h-8 w-8 rounded-full bg-surface-2" />
          </div>
          <div className="grid grid-cols-4 gap-3">
            {[0,1,2,3].map(i => (
              <div key={i} className="rounded-lg bg-surface-1 p-4 flex flex-col gap-2">
                <div className="h-4 w-16 rounded bg-surface-2" />
                <div className="h-7 w-20 rounded bg-surface-2" />
                <div className="h-3 w-12 rounded bg-surface-2" />
              </div>
            ))}
          </div>
          <div className="flex gap-3 flex-1 min-h-0">
            <div className="flex-1 rounded-lg bg-surface-1 p-4">
              <div className="h-4 w-24 rounded bg-surface-2 mb-3" />
              <div className="h-full rounded bg-surface-2/50 flex items-end gap-1 p-2">
                {[40,65,50,80,55,70,90,60,75,85,45,95].map((h,i) => (
                  <div key={i} className="flex-1 rounded-sm" style={{ height: `${h}%`, background: 'hsl(var(--primary) / 0.3)' }} />
                ))}
              </div>
            </div>
            <div className="w-72 rounded-lg bg-surface-1 p-4 flex flex-col gap-2">
              <div className="h-4 w-20 rounded bg-surface-2 mb-2" />
              {[1,2,3,4,5].map(i => <div key={i} className="h-6 w-full rounded bg-surface-2" />)}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function BetaBadge() {
  return (
    <motion.div
      initial={{ opacity: 0, y: -12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.6, duration: 0.4 }}
      className="fixed top-5 left-5 z-50"
    >
      <div className="px-3 py-1.5 rounded-md bg-primary/15 border border-primary/25 backdrop-blur-sm shadow-lg">
        <span className="text-[11px] font-semibold tracking-widest uppercase text-primary">Versão Beta</span>
      </div>
    </motion.div>
  );
}

export default function LoginPage() {
  const navigate = useNavigate();
  const { signIn, signUp } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [remember, setRemember] = useState(false);

  const [regName, setRegName] = useState('');
  const [regEmail, setRegEmail] = useState('');
  const [regPassword, setRegPassword] = useState('');
  const [regConfirm, setRegConfirm] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!loginEmail || !loginPassword) { toast.error('Preencha todos os campos.'); return; }
    setLoading(true);
    const { error } = await signIn(loginEmail, loginPassword);
    setLoading(false);
    if (error) { toast.error('Email ou senha inválidos.'); return; }
    navigate('/');
    toast.success('Login realizado com sucesso.');
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!regName || !regEmail || !regPassword || !regConfirm) { toast.error('Preencha todos os campos.'); return; }
    if (regPassword.length < 6) { toast.error('A senha deve ter no mínimo 6 caracteres.'); return; }
    if (regPassword !== regConfirm) { toast.error('As senhas não coincidem.'); return; }
    setLoading(true);
    const { error } = await signUp(regEmail, regPassword, regName);
    setLoading(false);
    if (error) { toast.error(error.message); return; }
    toast.success('Conta criada! Verifique seu email para confirmar.');
    setIsLogin(true);
  };

  const toggle = () => { setIsLogin(prev => !prev); setShowPassword(false); };

  const inputCls = "bg-background/50 border-border/50 placeholder:text-muted-foreground/50 focus:border-primary/50 transition-colors duration-200";

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden">
      <DashboardBackground />
      <BetaBadge />

      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative z-20 w-full max-w-[860px] mx-4 rounded-2xl overflow-hidden shadow-2xl shadow-black/40"
        style={{
          background: 'hsl(var(--surface-1) / 0.7)',
          backdropFilter: 'blur(24px) saturate(1.4)',
          border: '1px solid hsl(var(--border) / 0.4)',
        }}
      >
        <div className="flex flex-col md:flex-row min-h-[520px] relative">
          {/* ─── Sliding overlay (desktop) ─── */}
          <motion.div
            className="absolute top-0 bottom-0 w-1/2 z-30 hidden md:flex flex-col items-center justify-center p-10 text-center"
            animate={{ left: isLogin ? 0 : '50%' }}
            transition={{ duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
            style={{ background: 'linear-gradient(135deg, hsl(var(--primary)), hsl(var(--primary) / 0.7))' }}
          >
            <div className="absolute inset-0 overflow-hidden opacity-10">
              {[...Array(8)].map((_, i) => (
                <div key={i} className="absolute h-px bg-white/80" style={{ top: `${15 + i * 12}%`, left: '-10%', right: '-10%', transform: `rotate(${-15 + i * 4}deg)` }} />
              ))}
              <div className="absolute w-32 h-32 rounded-full border border-white/20 top-8 -right-10" />
              <div className="absolute w-48 h-48 rounded-full border border-white/15 -bottom-12 -left-16" />
            </div>

            <AnimatePresence mode="wait">
              <motion.div
                key={isLogin ? 'lp' : 'rp'}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.3 }}
                className="relative z-10 flex flex-col items-center gap-5"
              >
                <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur flex items-center justify-center mb-2">
                  <Wrench className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <h2 className="text-2xl font-bold text-primary-foreground tracking-tight">
                  {isLogin ? 'Olá, Bem-vindo!' : 'Junte-se a nós!'}
                </h2>
                <p className="text-sm text-primary-foreground/75 max-w-[240px] leading-relaxed">
                  {isLogin
                    ? 'Gerencie suas ordens de serviço, acompanhe finanças e muito mais.'
                    : 'Crie sua conta e comece a organizar sua assistência técnica.'}
                </p>
                <Button
                  variant="outline"
                  onClick={toggle}
                  className="mt-2 border-primary-foreground/30 text-primary-foreground bg-white/10 hover:bg-white/20 hover:text-primary-foreground gap-2 transition-all duration-200"
                >
                  {isLogin ? 'Criar Conta' : 'Fazer Login'}
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </motion.div>
            </AnimatePresence>
          </motion.div>

          {/* ─── Left half: shows REGISTER when overlay slides right ─── */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-10 relative z-10">
            <AnimatePresence mode="wait">
              {!isLogin && (
                <motion.div
                  key="register-form"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2.5 mb-6 md:hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold tracking-tight">TechAssist</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">Criar Conta</h3>
                  <p className="text-sm text-muted-foreground mb-6">Registre-se para acessar o sistema.</p>
                  <form onSubmit={handleRegister} className="space-y-3.5">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Nome completo</Label>
                      <div className="relative">
                        <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input value={regName} onChange={e => setRegName(e.target.value)} className={`pl-9 ${inputCls}`} placeholder="Seu nome" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input type="email" value={regEmail} onChange={e => setRegEmail(e.target.value)} className={`pl-9 ${inputCls}`} placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input type={showPassword ? 'text' : 'password'} value={regPassword} onChange={e => setRegPassword(e.target.value)} className={`pl-9 pr-10 ${inputCls}`} placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Confirmar senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input type={showPassword ? 'text' : 'password'} value={regConfirm} onChange={e => setRegConfirm(e.target.value)} className={`pl-9 ${inputCls}`} placeholder="••••••••" />
                      </div>
                    </div>
                    <Button type="submit" className="w-full h-10 accent-glow gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
                      {loading ? 'Criando...' : 'Criar Conta'}
                      {!loading && <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-5 md:hidden">
                    Já tem conta? <button onClick={toggle} className="text-primary hover:underline">Entrar</button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* ─── Right half: shows LOGIN when overlay is on left ─── */}
          <div className="w-full md:w-1/2 flex flex-col justify-center p-8 md:p-10 relative z-10">
            <AnimatePresence mode="wait">
              {isLogin && (
                <motion.div
                  key="login-form"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.35 }}
                >
                  <div className="flex items-center gap-2.5 mb-6 md:hidden">
                    <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center">
                      <Wrench className="w-4 h-4 text-primary-foreground" strokeWidth={1.5} />
                    </div>
                    <span className="font-semibold tracking-tight">TechAssist</span>
                  </div>
                  <h3 className="text-xl font-bold tracking-tight mb-1">Login</h3>
                  <p className="text-sm text-muted-foreground mb-6">Acesse o sistema de gestão.</p>
                  <form onSubmit={handleLogin} className="space-y-4">
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Email</Label>
                      <div className="relative">
                        <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input type="email" value={loginEmail} onChange={e => setLoginEmail(e.target.value)} className={`pl-9 ${inputCls}`} placeholder="seu@email.com" />
                      </div>
                    </div>
                    <div className="space-y-1.5">
                      <Label className="text-xs text-muted-foreground">Senha</Label>
                      <div className="relative">
                        <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground/60" />
                        <Input type={showPassword ? 'text' : 'password'} value={loginPassword} onChange={e => setLoginPassword(e.target.value)} className={`pl-9 pr-10 ${inputCls}`} placeholder="••••••••" />
                        <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground/60 hover:text-foreground transition-colors">
                          {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                        </button>
                      </div>
                    </div>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Checkbox id="remember" checked={remember} onCheckedChange={(v) => setRemember(v === true)} className="h-3.5 w-3.5" />
                        <label htmlFor="remember" className="text-xs text-muted-foreground cursor-pointer">Lembrar de mim</label>
                      </div>
                      <button type="button" className="text-xs text-primary hover:underline">Esqueceu a senha?</button>
                    </div>
                    <Button type="submit" className="w-full h-10 accent-glow gap-2 transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]" disabled={loading}>
                      {loading ? 'Entrando...' : 'Entrar'}
                      {!loading && <ChevronRight className="w-4 h-4" />}
                    </Button>
                  </form>
                  <p className="text-xs text-muted-foreground text-center mt-6 md:hidden">
                    Não tem conta? <button onClick={toggle} className="text-primary hover:underline">Criar conta</button>
                  </p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
