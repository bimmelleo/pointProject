import { useState } from 'react';
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Building2, CalendarCheck, CalendarDays, Check, ClipboardCheck,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Download, Ellipsis,
  Eye, EyeOff, FileClock, Fingerprint, LayoutDashboard, LockKeyhole, LogOut,
  Mail, Menu, MoreHorizontal, Plus, Search, Settings2, ShieldCheck, Users,
  X
} from 'lucide-react';

const initialPeople = [
  { name: 'Ana Carolina Souza', role: 'Analista contábil', initials: 'AS', color: 'pink', status: 'Em dia', hours: '08h 12m', last: '17:42' },
  { name: 'Bruno Martins Lima', role: 'Assistente fiscal', initials: 'BL', color: 'blue', status: 'Em dia', hours: '08h 04m', last: '17:35' },
  { name: 'Camila Rodrigues', role: 'Departamento pessoal', initials: 'CR', color: 'peach', status: 'Atraso', hours: '07h 21m', last: '17:18' },
  { name: 'Diego Almeida Costa', role: 'Analista contábil', initials: 'DC', color: 'lavender', status: 'Em dia', hours: '08h 30m', last: '17:46' },
  { name: 'Eduarda Freitas Melo', role: 'Assistente fiscal', initials: 'EM', color: 'mint', status: 'Pendente', hours: '—', last: '—' },
];

function Brand({ light = false }) { return <div className={`brand ${light ? 'brand-light' : ''}`}><span className="brand-mark"><Fingerprint size={20} strokeWidth={2.2}/></span><span>ponto<span className="brand-weight">claro</span></span></div>; }

function Login({ onLogin }) {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  async function submit(e) {
    e.preventDefault(); setError(''); setLoading(true);
    try {
      const response = await fetch('http://localhost:3001/api/auth/login', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ email, password }) });
      const data = await response.json(); if (!response.ok) throw new Error(data.error || 'Não foi possível entrar.');
      onLogin(data.user);
    } catch (err) { setError(err.message === 'Failed to fetch' ? 'Não foi possível conectar ao servidor. Tente novamente.' : err.message); }
    finally { setLoading(false); }
  }
  return <main className="login-page">
    <section className="login-visual">
      <div className="visual-top"><Brand light/><span className="secure-note"><ShieldCheck size={15}/> Seus dados protegidos</span></div>
      <div className="visual-copy"><h1>O tempo da sua equipe<br/>bem cuidado</h1></div>
      <div className="visual-art" aria-hidden="true"><div className="art-orbit orbit-one"/><div className="art-orbit orbit-two"/><div className="art-clock"><Clock3 size={82} strokeWidth={1}/><span className="clock-center"/></div><span className="spark spark-one">✳</span><span className="spark spark-two">✳</span></div>
      <div className="visual-footer"><span>Um jeito mais humano de cuidar do tempo.</span><span>© 2026 PontoClaro</span></div>
    </section>
    <section className="login-panel"><div className="login-mobile-brand login-brand-top"><Brand/></div><div className="login-box"><h2>Bem-vindo</h2><p className="login-subtitle">Entre na sua conta</p>
      <form onSubmit={submit} className="login-form"><label htmlFor="email">E-mail</label><div className="input-wrap"><Mail size={18}/><input id="email" type="email" placeholder="voce@escritorio.com.br" value={email} onChange={e=>setEmail(e.target.value)} required autoComplete="username"/></div>
      <div className="label-row"><label htmlFor="password">Senha</label></div><div className="input-wrap"><LockKeyhole size={18}/><input id="password" type={show?'text':'password'} placeholder="Sua senha" value={password} onChange={e=>setPassword(e.target.value)} required autoComplete="current-password"/><button className="icon-button reveal" type="button" aria-label={show?'Ocultar senha':'Mostrar senha'} onClick={()=>setShow(!show)}>{show?<EyeOff size={18}/>:<Eye size={18}/>}</button></div><div className="forgot-row"><button type="button" className="text-button" onClick={()=>setError('Entre em contato com o administrador do seu escritório para redefinir sua senha.')}>Esqueceu sua senha?</button></div>
      {error && <p className="form-error" role="alert">{error}</p>}<button className="primary-button login-submit" disabled={loading}>{loading?'Entrando…':'Entrar'}</button></form>
      <div className="login-help"><CircleHelp size={16}/><span>Precisa de ajuda? <a href="mailto:suporte@pontoclaro.com.br">Fale com o suporte</a></span></div></div><div className="login-bottom"><span>© 2026 PontoClaro. Todos os direitos reservados.</span><span><a href="#termos">Termos de uso</a><a href="#privacidade">Política de privacidade</a></span></div></section>
  </main>;
}

function Sidebar({ active, setActive, onLogout, user, mobileOpen, closeMobile }) {
  const items = [{ label: 'Visão geral', icon: LayoutDashboard }, { label: 'Empresas Ativas', icon: Users }, { label: 'Relatórios', icon: Activity }];
  const displayName = user?.name || 'Leonardo Bimmel';
  const initials = displayName.split(/\s+/).filter(Boolean).slice(0, 2).map(part => part[0]).join('').toUpperCase();
  return <><div className={`sidebar-scrim ${mobileOpen?'show':''}`} onClick={closeMobile}/><aside className={`sidebar ${mobileOpen?'sidebar-open':''}`}><div className="sidebar-brand"><Brand/><button className="icon-button close-menu" aria-label="Fechar menu" onClick={closeMobile}><X size={18}/></button></div><span className="nav-caption">MENU PRINCIPAL</span><nav className="side-nav">{items.map(item=><button key={item.label} className={`nav-item ${active===item.label?'active':''}`} onClick={()=>{setActive(item.label);closeMobile();}}><item.icon size={18}/><span>{item.label}</span></button>)}</nav><div className="sidebar-bottom"><button className={`nav-item sidebar-settings ${active==='Configurações'?'active':''}`} onClick={()=>{setActive('Configurações');closeMobile();}}><Settings2 size={18}/><span>Configurações</span></button><button className="profile-row"><div className="profile-avatar">{initials}</div><span><b>{displayName}</b><small>Administradora</small></span><MoreHorizontal size={19}/></button><button className="logout-link" onClick={onLogout}><LogOut size={15}/> Sair da conta</button></div></aside></>;
}

function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState('Visão geral'); const [mobileOpen, setMobileOpen] = useState(false);
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} onLogout={onLogout} user={user} mobileOpen={mobileOpen} closeMobile={()=>setMobileOpen(false)}/><main className="main-area"><header className="topbar dashboard-topbar"><button className="icon-button menu-toggle" aria-label="Abrir menu" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button><h1>Bom dia, {user?.name?.split(' ')[0] || 'Leonardo'} <span className="wave">✳</span></h1></header>
      <div className="content">
      <section className="metric-grid">
        <article className="metric-card"><div className="metric-top"><span>Empresas Ativas</span><span className="metric-icon icon-green"><Building2 size={18}/></span></div><div className="metric-value">03</div><div className="metric-decoration bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Lançamentos Completos</span><span className="metric-icon icon-blue"><ClipboardCheck size={18}/></span></div><div className="metric-value">18 <small>/ 24</small></div><div className="metric-foot"><span className="tiny-dot green"/> <b>75%</b> concluídos neste período</div><div className="progress-track"><span/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Registros Pendentes de Revisão</span><span className="metric-icon icon-amber"><FileClock size={18}/></span></div><div className="metric-value">04</div><div className="pending-dots"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Jornadas com Divergência</span><span className="metric-icon icon-rose"><AlertTriangle size={18}/></span></div><div className="metric-value">02</div><div className="metric-decoration bars bars-rose"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Ponto de Atenção</span><span className="metric-icon icon-violet"><Activity size={18}/></span></div><div className="metric-value">03</div><div className="metric-decoration bars bars-violet"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Períodos de Fechamento</span><span className="metric-icon icon-teal"><CalendarCheck size={18}/></span></div><div className="metric-value">02</div></article>
      </section>
      </div></main></div>;
}

export default function App() { const [user, setUser] = useState(()=>{ try { return JSON.parse(sessionStorage.getItem('pc-user')); } catch { return null; } }); function login(data){sessionStorage.setItem('pc-user',JSON.stringify(data));setUser(data);} function logout(){sessionStorage.removeItem('pc-user');setUser(null);} return user?<Dashboard user={user} onLogout={logout}/>:<Login onLogin={login}/>; }
