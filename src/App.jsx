import { useEffect, useState } from 'react';
import {
  Activity, AlertTriangle, ArrowDownRight, ArrowRight, ArrowUpRight, Bell, Building2, CalendarCheck, CalendarDays, Check, ClipboardCheck,
  ChevronDown, ChevronLeft, ChevronRight, CircleHelp, Clock3, Download, Ellipsis,
  Eye, EyeOff, FileClock, Fingerprint, LayoutDashboard, LockKeyhole, LogOut,
  Mail, Menu, MoreHorizontal, Pencil, Phone, Plus, Search, Settings2, ShieldCheck, Trash2, Users,
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

function readCompanies() {
  try {
    const saved = JSON.parse(localStorage.getItem('pontoclaro-companies') || '[]');
    return Array.isArray(saved) ? saved : [];
  } catch { return []; }
}

function formatCnpj(value) {
  const digits = value.replace(/\D/g, '').slice(0, 14);
  return digits
    .replace(/^(\d{2})(\d)/, '$1.$2')
    .replace(/^(\d{2})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1/$2')
    .replace(/(\d{4})(\d)/, '$1-$2');
}

function formatPhone(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  if (!digits) return '';
  if (digits.length <= 2) return `(${digits}`;
  const area = digits.slice(0, 2);
  const number = digits.slice(2);
  if (number.length <= 4) return `(${area}) ${number}`;
  if (number.length <= 8) return `(${area}) ${number.slice(0, 4)}-${number.slice(4)}`;
  return `(${area}) ${number.slice(0, 5)}-${number.slice(5)}`;
}

function formatCpf(value) {
  const digits = value.replace(/\D/g, '').slice(0, 11);
  return digits
    .replace(/^(\d{3})(\d)/, '$1.$2')
    .replace(/^(\d{3})\.(\d{3})(\d)/, '$1.$2.$3')
    .replace(/\.(\d{3})(\d)/, '.$1-$2');
}

function readCompanyEmployees(companyId) {
  try {
    const saved = JSON.parse(localStorage.getItem('pontoclaro-employees') || '{}');
    return Array.isArray(saved[companyId]) ? saved[companyId] : [];
  } catch { return []; }
}

function EmployeesPage({ company }) {
  const emptyForm = { name: '', cpf: '', role: '', admissionDate: '', status: 'Ativo' };
  const [employees, setEmployees] = useState(() => readCompanyEmployees(company.id));
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');

  useEffect(() => {
    try {
      const all = JSON.parse(localStorage.getItem('pontoclaro-employees') || '{}');
      all[company.id] = employees;
      localStorage.setItem('pontoclaro-employees', JSON.stringify(all));
    } catch { /* Ignore storage failures; the current session remains usable. */ }
  }, [company.id, employees]);

  const filteredEmployees = employees.filter(employee =>
    `${employee.name} ${employee.cpf} ${employee.role}`.toLowerCase().includes(query.toLowerCase())
  );
  function openCreate() { setEditingId(null); setForm(emptyForm); setFormError(''); setModalOpen(true); }
  function openEdit(employee) { setEditingId(employee.id); setForm({ ...emptyForm, ...employee }); setFormError(''); setModalOpen(true); }
  function closeModal() { setModalOpen(false); setEditingId(null); setForm(emptyForm); setFormError(''); }
  function saveEmployee(event) {
    event.preventDefault();
    const cpfDigits = form.cpf.replace(/\D/g, '');
    if (cpfDigits.length !== 11) { setFormError('Informe um CPF com 11 dígitos.'); return; }
    const duplicate = employees.some(employee => employee.id !== editingId && employee.cpf.replace(/\D/g, '') === cpfDigits);
    if (duplicate) { setFormError('Já existe um funcionário com este CPF nesta empresa.'); return; }
    const employee = { ...form, name: form.name.trim(), cpf: formatCpf(form.cpf), role: form.role.trim(), id: editingId || crypto.randomUUID() };
    setEmployees(current => editingId ? current.map(item => item.id === editingId ? employee : item) : [employee, ...current]);
    closeModal();
  }
  function confirmDelete() {
    if (!deleteTarget) return;
    setEmployees(current => current.filter(employee => employee.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return <section className="employees-page">
    <div className="employees-heading"><div><h2>Controle de Ponto</h2></div><button className="primary-button employee-add-button" onClick={openCreate}><Plus size={20}/> Adicionar funcionário</button></div>
    <div className="employees-section-heading"><div><h3>Funcionários ({employees.length})</h3></div><label className="search-field"><Search size={18}/><input aria-label="Buscar funcionários" placeholder="Buscar por nome, CPF ou cargo" value={query} onChange={event=>setQuery(event.target.value)}/></label></div>
    <div className="employees-table-wrap"><table className="employees-table"><thead><tr><th>FUNCIONÁRIO</th><th>CPF</th><th>CARGO</th><th>ADMISSÃO</th><th>STATUS</th><th className="open-column-heading">ABRIR</th><th className="actions-heading">AÇÕES</th></tr></thead><tbody>
      {filteredEmployees.map(employee => <tr key={employee.id}><td><div className="employee-name-cell"><span>{employee.name.split(/\s+/).filter(Boolean).slice(0,2).map(part=>part[0]).join('').toUpperCase()}</span><b>{employee.name}</b></div></td><td>{employee.cpf}</td><td>{employee.role || '—'}</td><td>{employee.admissionDate ? employee.admissionDate.split('-').reverse().join('/') : '—'}</td><td><span className={`employee-status ${employee.status === 'Ativo' ? 'employee-active' : 'employee-inactive'}`}><i/>{employee.status}</span></td><td className="open-employee-cell"><button type="button" className="open-employee-button" disabled aria-disabled="true" title="Disponível em uma próxima etapa">Abrir</button></td><td><div className="company-actions"><button type="button" title="Editar funcionário" aria-label={`Editar ${employee.name}`} onClick={()=>openEdit(employee)}><Pencil size={18}/></button><button type="button" className="delete-action" title="Excluir funcionário" aria-label={`Excluir ${employee.name}`} onClick={()=>setDeleteTarget(employee)}><Trash2 size={18}/></button></div></td></tr>)}
    </tbody></table>{filteredEmployees.length === 0 && <div className="companies-empty"><span className="company-list-icon"><Users size={25}/></span><h3>{query ? 'Nenhum funcionário encontrado' : 'Nenhum funcionário cadastrado'}</h3><p>{query ? 'Tente buscar por outro nome, CPF ou cargo.' : 'Adicione funcionários para iniciar o controle de ponto desta empresa.'}</p>{!query && <button className="secondary-button" onClick={openCreate}><Plus size={19}/> Adicionar funcionário</button>}</div>}</div>
    {modalOpen && <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget) closeModal();}}><section className="company-modal employee-modal" role="dialog" aria-modal="true" aria-labelledby="employee-modal-title"><div className="modal-heading"><div><span className="eyebrow">{company.name}</span><h2 id="employee-modal-title">{editingId ? 'Editar funcionário' : 'Adicionar funcionário'}</h2><p>Informe os dados principais do cadastro.</p></div><button className="modal-close" type="button" aria-label="Fechar" onClick={closeModal}><X size={22}/></button></div><form className="company-form" onSubmit={saveEmployee}>
      <label className="form-field full-field">Nome completo<input autoFocus required maxLength={120} placeholder="Nome e sobrenome" value={form.name} onChange={event=>setForm(current=>({...current,name:event.target.value}))}/></label>
      <label className="form-field">CPF<input required inputMode="numeric" maxLength={14} placeholder="000.000.000-00" value={form.cpf} onChange={event=>setForm(current=>({...current,cpf:formatCpf(event.target.value)}))}/></label>
      <label className="form-field">Cargo<input maxLength={100} placeholder="Ex.: Analista contábil" value={form.role} onChange={event=>setForm(current=>({...current,role:event.target.value}))}/></label>
      <label className="form-field">Data de admissão<input type="date" value={form.admissionDate} onChange={event=>setForm(current=>({...current,admissionDate:event.target.value}))}/></label>
      <label className="form-field">Status<select value={form.status} onChange={event=>setForm(current=>({...current,status:event.target.value}))}><option>Ativo</option><option>Inativo</option></select></label>
      {formError && <p className="company-form-error" role="alert">{formError}</p>}
      <div className="modal-actions"><button className="secondary-button" type="button" onClick={closeModal}>Cancelar</button><button className="primary-button" type="submit">{editingId ? 'Salvar alterações' : 'Cadastrar funcionário'}</button></div>
    </form></section></div>}
    {deleteTarget && <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget) setDeleteTarget(null);}}><section className="delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-employee-title"><div className="delete-modal-icon"><AlertTriangle size={25}/></div><h2 id="delete-employee-title">Excluir funcionário?</h2><div className="delete-modal-actions"><button className="secondary-button" type="button" onClick={()=>setDeleteTarget(null)}>Cancelar</button><button className="danger-button" type="button" onClick={confirmDelete}><Trash2 size={18}/> Excluir funcionário</button></div></section></div>}
  </section>;
}

function CompaniesPage({ companies, setCompanies }) {
  const emptyForm = { name: '', cnpj: '', email: '', phone: '', status: 'Ativa' };
  const [query, setQuery] = useState('');
  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [selectedCompanyId, setSelectedCompanyId] = useState(null);
  const [activeFunction, setActiveFunction] = useState(false);
  const [deleteTarget, setDeleteTarget] = useState(null);
  const [form, setForm] = useState(emptyForm);
  const [formError, setFormError] = useState('');
  const visibleCompanies = companies.filter(company =>
    `${company.name} ${company.cnpj} ${company.email}`.toLowerCase().includes(query.toLowerCase())
  );
  const selectedCompany = companies.find(company => company.id === selectedCompanyId);

  function openCreate() {
    setEditingId(null); setForm(emptyForm); setFormError(''); setModalOpen(true);
  }
  function openEdit(company) {
    setEditingId(company.id); setForm({ ...emptyForm, ...company }); setFormError(''); setModalOpen(true);
  }
  function closeModal() {
    setModalOpen(false); setEditingId(null); setForm(emptyForm); setFormError('');
  }
  function saveCompany(event) {
    event.preventDefault();
    const digits = form.cnpj.replace(/\D/g, '');
    if (digits.length !== 14) { setFormError('Informe um CNPJ com 14 dígitos.'); return; }
    const phoneDigits = form.phone.replace(/\D/g, '');
    if (phoneDigits && phoneDigits.length !== 10 && phoneDigits.length !== 11) { setFormError('Informe o telefone com DDD e 8 ou 9 dígitos.'); return; }
    const duplicate = companies.some(company => company.id !== editingId && company.cnpj.replace(/\D/g, '') === digits);
    if (duplicate) { setFormError('Já existe uma empresa cadastrada com este CNPJ.'); return; }
    const company = { ...form, cnpj: formatCnpj(form.cnpj), name: form.name.trim(), id: editingId || crypto.randomUUID() };
    setCompanies(current => editingId ? current.map(item => item.id === editingId ? company : item) : [company, ...current]);
    closeModal();
  }
  function deleteCompany(company) {
    setDeleteTarget(company);
  }
  function confirmDelete() {
    if (!deleteTarget) return;
    if (deleteTarget.id === selectedCompanyId) { setSelectedCompanyId(null); setActiveFunction(false); }
    setCompanies(current => current.filter(item => item.id !== deleteTarget.id));
    setDeleteTarget(null);
  }

  return <section className="companies-page">
    {selectedCompany ? activeFunction ? <div className="company-function-page">
      <button className="company-back-link" onClick={()=>setActiveFunction(false)}><ChevronLeft size={19}/> Voltar para funções</button>
      <EmployeesPage key={selectedCompany.id} company={selectedCompany}/>
    </div> : <div className="company-workspace-page">
      <button className="company-back-link" onClick={()=>{setSelectedCompanyId(null);setActiveFunction(false);}}><ChevronLeft size={19}/> Voltar para Empresas Ativas</button>
      <div className="company-workspace-heading"><span className="company-detail-icon"><Building2 size={25}/></span><div><span className="eyebrow">ESPAÇO DA EMPRESA</span><h2>{selectedCompany.name}</h2><p>Selecione uma função para continuar.</p></div><span className={`company-status ${selectedCompany.status === 'Ativa' ? 'is-active' : 'is-inactive'}`}><i/>{selectedCompany.status}</span></div>
      <section className="available-functions"><div className="company-information-heading"><h3>Funções disponíveis</h3><p>Os módulos disponíveis para esta empresa.</p></div><button className="function-card" onClick={()=>setActiveFunction(true)}><span className="function-card-icon"><Clock3 size={23}/></span><span className="function-card-copy"><b>Controle de Ponto</b><small>Lançamentos, jornadas e acompanhamento de ponto.</small></span><ChevronRight className="function-card-arrow" size={22}/></button></section>
    </div> : <>
    <div className="companies-heading"><div><span className="eyebrow">CADASTRO E ORGANIZAÇÃO</span></div><button className="primary-button company-add-button" onClick={openCreate}><Plus size={17}/> Adicionar empresa</button></div>
    <div className="companies-toolbar"><label className="search-field"><Search size={17}/><input aria-label="Buscar empresas" placeholder="Buscar por nome, CNPJ ou e-mail" value={query} onChange={event=>setQuery(event.target.value)}/></label><span>{companies.length} {companies.length === 1 ? 'empresa cadastrada' : 'empresas cadastradas'}</span></div>
    <div className="companies-table-wrap"><table className="companies-table"><thead><tr><th>EMPRESA</th><th>CNPJ</th><th>CONTATO</th><th>STATUS</th><th className="actions-heading">AÇÕES</th></tr></thead><tbody>
      {visibleCompanies.map(company => <tr key={company.id}><td><button type="button" className="company-open-button" onClick={()=>{setSelectedCompanyId(company.id);setActiveFunction(false);}}><span className="company-list-icon"><Building2 size={20}/></span><span className="company-open-label"><b>{company.name}</b><small>Abrir empresa</small></span><ChevronRight className="company-open-chevron" size={19}/></button></td><td>{company.cnpj}</td><td><span>{company.email || '—'}</span>{company.phone && <small>{company.phone}</small>}</td><td><span className={`company-status ${company.status === 'Ativa' ? 'is-active' : 'is-inactive'}`}><i/>{company.status}</span></td><td><div className="company-actions"><button type="button" aria-label={`Editar ${company.name}`} title="Editar empresa" onClick={()=>openEdit(company)}><Pencil size={16}/></button><button type="button" className="delete-action" aria-label={`Excluir ${company.name}`} title="Excluir empresa" onClick={()=>deleteCompany(company)}><Trash2 size={16}/></button></div></td></tr>)}
    </tbody></table>{visibleCompanies.length === 0 && <div className="companies-empty"><span className="company-list-icon"><Building2 size={21}/></span><h3>{query ? 'Nenhuma empresa encontrada' : 'Nenhuma empresa cadastrada'}</h3><p>{query ? 'Tente buscar por outro nome, CNPJ ou e-mail.' : 'Adicione a primeira empresa para começar a organizar seus atendimentos.'}</p>{!query && <button className="secondary-button" onClick={openCreate}><Plus size={16}/> Adicionar empresa</button>}</div>}</div>
    </>}
    {modalOpen && <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget) closeModal();}}><section className="company-modal" role="dialog" aria-modal="true" aria-labelledby="company-modal-title"><div className="modal-heading"><div><span className="eyebrow">EMPRESAS ATIVAS</span><h2 id="company-modal-title">{editingId ? 'Editar empresa' : 'Adicionar empresa'}</h2><p>Preencha os dados para manter o cadastro organizado.</p></div><button className="modal-close" type="button" aria-label="Fechar" onClick={closeModal}><X size={19}/></button></div><form className="company-form" onSubmit={saveCompany}>
      <label className="form-field full-field">Razão social ou nome da empresa<input autoFocus required maxLength={120} placeholder="Ex.: Empresa Exemplo Ltda." value={form.name} onChange={event=>setForm(current=>({...current,name:event.target.value}))}/></label>
      <label className="form-field">CNPJ<input required inputMode="numeric" maxLength={18} placeholder="00.000.000/0000-00" value={form.cnpj} onChange={event=>setForm(current=>({...current,cnpj:formatCnpj(event.target.value)}))}/></label>
      <label className="form-field">Status<select value={form.status} onChange={event=>setForm(current=>({...current,status:event.target.value}))}><option>Ativa</option><option>Inativa</option></select></label>
      <label className="form-field">E-mail de contato<input type="email" maxLength={120} placeholder="contato@empresa.com.br" value={form.email} onChange={event=>setForm(current=>({...current,email:event.target.value}))}/></label>
      <label className="form-field">Telefone<input type="tel" inputMode="numeric" maxLength={15} placeholder="(00) 00000-0000" value={form.phone} onChange={event=>setForm(current=>({...current,phone:formatPhone(event.target.value)}))}/></label>
      {formError && <p className="company-form-error" role="alert">{formError}</p>}
      <div className="modal-actions"><button className="secondary-button" type="button" onClick={closeModal}>Cancelar</button><button className="primary-button" type="submit">{editingId ? 'Salvar alterações' : 'Cadastrar empresa'}</button></div>
    </form></section></div>}
    {deleteTarget && <div className="modal-backdrop" onMouseDown={event=>{if(event.target===event.currentTarget) setDeleteTarget(null);}}><section className="delete-modal" role="alertdialog" aria-modal="true" aria-labelledby="delete-company-title"><div className="delete-modal-icon"><AlertTriangle size={25}/></div><h2 id="delete-company-title">Excluir empresa?</h2><div className="delete-modal-actions"><button className="secondary-button" type="button" onClick={()=>setDeleteTarget(null)}>Cancelar</button><button className="danger-button" type="button" onClick={confirmDelete}><Trash2 size={17}/> Excluir empresa</button></div></section></div>}
  </section>;
}

function Dashboard({ user, onLogout }) {
  const [active, setActive] = useState('Visão geral'); const [mobileOpen, setMobileOpen] = useState(false);
  const [companies, setCompanies] = useState(readCompanies);
  useEffect(() => { localStorage.setItem('pontoclaro-companies', JSON.stringify(companies)); }, [companies]);
  const greeting = active === 'Visão geral';
  return <div className="app-shell"><Sidebar active={active} setActive={setActive} onLogout={onLogout} user={user} mobileOpen={mobileOpen} closeMobile={()=>setMobileOpen(false)}/><main className="main-area"><header className="topbar dashboard-topbar"><button className="icon-button menu-toggle" aria-label="Abrir menu" onClick={()=>setMobileOpen(true)}><Menu size={20}/></button><h1>{greeting ? <>Bom dia, {user?.name?.split(' ')[0] || 'Leonardo'} <span className="wave">✳</span></> : active}</h1></header>
      <div className="content">{active === 'Empresas Ativas' ? <CompaniesPage companies={companies} setCompanies={setCompanies}/> : <section className="metric-grid">
        <article className="metric-card"><div className="metric-top"><span>Empresas Ativas</span><span className="metric-icon icon-green"><Building2 size={18}/></span></div><div className="metric-value">{String(companies.filter(company => company.status === 'Ativa').length).padStart(2, '0')}</div><div className="metric-decoration bars"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Lançamentos Completos</span><span className="metric-icon icon-blue"><ClipboardCheck size={18}/></span></div><div className="metric-value">18 <small>/ 24</small></div><div className="metric-foot"><span className="tiny-dot green"/> <b>75%</b> concluídos neste período</div><div className="progress-track"><span/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Registros Pendentes de Revisão</span><span className="metric-icon icon-amber"><FileClock size={18}/></span></div><div className="metric-value">04</div><div className="pending-dots"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Jornadas com Divergência</span><span className="metric-icon icon-rose"><AlertTriangle size={18}/></span></div><div className="metric-value">02</div><div className="metric-decoration bars bars-rose"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Ponto de Atenção</span><span className="metric-icon icon-violet"><Activity size={18}/></span></div><div className="metric-value">03</div><div className="metric-decoration bars bars-violet"><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/><i/></div></article>
        <article className="metric-card"><div className="metric-top"><span>Períodos de Fechamento</span><span className="metric-icon icon-teal"><CalendarCheck size={18}/></span></div><div className="metric-value">02</div></article>
      </section>}</div></main></div>;
}

export default function App() { const [user, setUser] = useState(()=>{ try { return JSON.parse(sessionStorage.getItem('pc-user')); } catch { return null; } }); function login(data){sessionStorage.setItem('pc-user',JSON.stringify(data));setUser(data);} function logout(){sessionStorage.removeItem('pc-user');setUser(null);} return user?<Dashboard user={user} onLogout={logout}/>:<Login onLogin={login}/>; }
