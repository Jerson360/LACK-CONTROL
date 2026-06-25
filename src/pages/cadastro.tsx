import React, { useState } from "react";
import { useLocation } from "wouter";

export default function Cadastro() {
  const [, setLocation] = useLocation();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [habito, setHabito] = useState("");
  const [detalhe, setDetalhe] = useState("");
  const [multa, setMulta] = useState<number | "">(5.00);
  const [destino, setDestino] = useState<"poupanca"|"entidade">("poupanca");

  const handleSalvar = (e: React.FormEvent) => {
    e.preventDefault();
    const multaFinal = multa === "" || multa <= 0 ? 5 : multa;
    localStorage.setItem("lack_usuario", JSON.stringify({ nome, email: email.trim().toLowerCase(), senha, habito, detalhe, multa: multaFinal, destino }));
    localStorage.setItem("lack_indicadores", JSON.stringify({
      diasSemReincidencia: 0, maiorSequencia: 0, totalDepositado: 0,
      ultimaReincidencia: new Date().toISOString()
    }));
    localStorage.setItem("lack_sessao_ativa", "true");
    setLocation("/home");
  };

  const line = "w-full py-3 border-b-2 border-gray-300 focus:border-green-500 focus:outline-none text-sm bg-transparent text-gray-800";

  return (
    <div className="min-h-screen bg-white flex items-center justify-center py-6">
      <div className="w-full max-w-sm px-6">
        <div className="border-2 border-gray-900 rounded-2xl p-6 flex flex-col gap-5">

          <div className="flex flex-col items-center gap-1">
            <svg width="56" height="56" viewBox="0 0 140 140" fill="none">
              <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="3"/>
              <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
              <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
              <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
              <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
              <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
            </svg>
            <p className="text-base font-black text-gray-900 tracking-widest">— LACK —</p>
            <p className="text-xs font-black tracking-[5px]" style={{color:"#1FAA6B"}}>CONTROL</p>
            <p className="text-xs text-gray-500 tracking-widest mt-1">CADASTRO</p>
          </div>

          <div className="h-px bg-gray-200"/>

          <form onSubmit={handleSalvar} className="flex flex-col gap-4">
            <div>
              <label className="text-xs text-gray-500">Nome</label>
              <input required value={nome} onChange={e => setNome(e.target.value)} className={line}/>
            </div>
            <div>
              <label className="text-xs text-gray-500">E-mail</label>
              <input type="email" required value={email} onChange={e => setEmail(e.target.value)} className={line}/>
            </div>
            <div>
              <label className="text-xs text-gray-500">Senha</label>
              <input type="password" required minLength={6} value={senha} onChange={e => setSenha(e.target.value)} className={line}/>
            </div>
            <div>
              <label className="text-xs text-gray-500">Hábito Negativo / Mania</label>
              <input required value={habito} onChange={e => setHabito(e.target.value)} className={line}/>
            </div>
            <div>
              <label className="text-xs text-gray-500">Descreva com mais detalhes (opcional)</label>
              <input value={detalhe} onChange={e => setDetalhe(e.target.value)} className={line}/>
            </div>
            <div>
              <label className="text-xs text-gray-500">Multa (R$) — sugestão: R$ 5,00</label>
              <div className="relative">
                <span className="absolute left-0 top-3 text-sm text-gray-500">R$</span>
                <input type="number" min="0.01" step="0.50" value={multa}
                  onChange={e => {
                    const val = e.target.value;
                    setMulta(val === "" ? "" : parseFloat(val));
                  }}
                  className="w-full pl-8 py-3 border-b-2 border-green-400 focus:outline-none text-sm bg-transparent font-semibold text-gray-800"/>
              </div>
              <p className="text-xs text-gray-400 mt-1">Você pode alterar para o valor que preferir</p>
            </div>
            <div>
              <label className="text-xs text-gray-500 block mb-2">Destino da multa</label>
              <div className="flex gap-3">
                <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${destino==="poupanca" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                  <input type="radio" name="destino" checked={destino==="poupanca"} onChange={() => setDestino("poupanca")} style={{accentColor:"#1FAA6B"}}/>
                  <span className="text-sm font-semibold text-gray-800">Poupança</span>
                </label>
                <label className={`flex-1 flex items-center gap-2 p-3 rounded-xl border-2 cursor-pointer transition-all ${destino==="entidade" ? "border-green-500 bg-green-50" : "border-gray-200"}`}>
                  <input type="radio" name="destino" checked={destino==="entidade"} onChange={() => setDestino("entidade")} style={{accentColor:"#1FAA6B"}}/>
                  <span className="text-sm text-gray-600">Entidade</span>
                </label>
              </div>
            </div>
            <button type="submit" className="w-full py-4 rounded-xl text-white font-black text-sm tracking-widest transition-all mt-1" style={{background:"#E53935"}}>
              SALVAR
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
