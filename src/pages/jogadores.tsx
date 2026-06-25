import React, { useEffect, useState } from "react";
import { useLocation } from "wouter";

interface Jogador { nome: string; pix: string; cel: string; email: string; }
const EMPTY: Jogador = { nome:"", pix:"", cel:"", email:"" };

export default function Jogadores() {
  const [, setLocation] = useLocation();
  const [j1, setJ1] = useState<Jogador>(EMPTY);
  const [j2, setJ2] = useState<Jogador>(EMPTY);
  const [editJ1, setEditJ1] = useState(false);
  const [editJ2, setEditJ2] = useState(false);
  const [salvo, setSalvo] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") !== "true") { setLocation("/login"); return; }
    const raw = localStorage.getItem("lack_jogadores");
    if (raw) { const p = JSON.parse(raw); setJ1(p.j1||EMPTY); setJ2(p.j2||EMPTY); }
  }, [setLocation]);

  const salvar = () => {
    localStorage.setItem("lack_jogadores", JSON.stringify({j1, j2}));
    setEditJ1(false); setEditJ2(false); setSalvo(true);
    setTimeout(() => setSalvo(false), 2000);
  };

  const inp = "w-full py-2 bg-transparent border-b border-white/40 text-white text-sm placeholder-orange-200 focus:outline-none focus:border-white";

  const JForm = ({label, j, setJ, edit, setEdit}: {label:string; j:Jogador; setJ:(v:Jogador)=>void; edit:boolean; setEdit:(v:boolean)=>void}) => (
    <div className="bg-white/15 rounded-2xl p-4 flex flex-col gap-3">
      <p className="text-sm font-semibold text-white tracking-wide">{label}</p>
      {edit ? (
        <div className="flex flex-col gap-2">
          <input placeholder="Nome" value={j.nome} onChange={e=>setJ({...j,nome:e.target.value})} className={inp}/>
          <input placeholder="Chave Pix" value={j.pix} onChange={e=>setJ({...j,pix:e.target.value})} className={inp}/>
          <input placeholder="Celular" value={j.cel} onChange={e=>setJ({...j,cel:e.target.value})} className={inp}/>
          <input placeholder="E-mail" value={j.email} onChange={e=>setJ({...j,email:e.target.value})} className={inp}/>
        </div>
      ) : (
        <div className="text-orange-100 text-sm space-y-0.5">
          {j.nome ? <p>{j.nome}</p> : <p className="text-orange-300 text-xs italic">— não preenchido —</p>}
          {j.pix && <p className="text-xs">Pix: {j.pix}</p>}
          {j.cel && <p className="text-xs">Cel: {j.cel}</p>}
          {j.email && <p className="text-xs">{j.email}</p>}
        </div>
      )}
      <div className="flex gap-2 mt-1">
        <button onClick={() => setEdit(!edit)} className="flex-1 py-2 border-2 border-white/70 rounded-xl text-white text-sm font-semibold">Editar</button>
        <button onClick={salvar} className="flex-1 py-2 bg-white rounded-xl text-sm font-black" style={{color:"#F57C00"}}>SALVAR</button>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col" style={{background:"#F57C00"}}>
      <div className="flex-1 px-5 pt-6 pb-4 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="4"/>
              <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
              <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
              <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
              <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
            </svg>
          </div>
          <h1 className="text-white font-black text-lg tracking-widest">JOGADORES</h1>
          <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center">
            <svg width="32" height="32" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="4"/>
              <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
              <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
              <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
              <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
            </svg>
          </div>
        </div>

        <JForm label="J1 — Jogador 1" j={j1} setJ={setJ1} edit={editJ1} setEdit={setEditJ1}/>
        <div className="h-px bg-white/20"/>
        <JForm label="J2 — Jogador 2" j={j2} setJ={setJ2} edit={editJ2} setEdit={setEditJ2}/>

        <button onClick={salvar} className="w-full py-4 bg-white rounded-xl font-black text-sm tracking-widest transition-all" style={{color:"#F57C00"}}>
          {salvo ? "✓ SALVO!" : "SALVAR TUDO"}
        </button>

        <button onClick={() => setLocation("/perfil")} className="w-full py-2 text-white/70 text-sm text-center">← Voltar</button>
      </div>
    </div>
  );
}
