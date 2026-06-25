import React, { useState } from "react";
import { useLocation } from "wouter";

export default function Login() {
  const [, setLocation] = useLocation();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [mostrar, setMostrar] = useState(false);
  const [erro, setErro] = useState("");
  const [mostrarImportar, setMostrarImportar] = useState(false);
  const [codigoImport, setCodigoImport] = useState("");
  const [msgImport, setMsgImport] = useState("");

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setErro("");
    const raw = localStorage.getItem("lack_usuario");
    if (raw) {
      const u = JSON.parse(raw);
      if (u.email === email.trim().toLowerCase() && u.senha === senha) {
        localStorage.setItem("lack_sessao_ativa", "true");
        setLocation("/home");
        return;
      }
    }
    setErro("E-mail ou senha incorretos. Se cadastrou em outro aparelho, use 'Importar dados' abaixo.");
  };

  const handleImportar = () => {
    try {
      const dados = JSON.parse(atob(codigoImport.trim()));
      if (!dados.lack_usuario) { setMsgImport("Código inválido."); return; }
      Object.keys(dados).forEach(k => localStorage.setItem(k, JSON.stringify(dados[k])));
      localStorage.setItem("lack_sessao_ativa", "true");
      setLocation("/home");
    } catch {
      setMsgImport("Código inválido. Verifique e tente novamente.");
    }
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm px-6 py-10 flex flex-col items-center gap-8">

        <div className="flex flex-col items-center gap-2">
          <svg width="72" height="72" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="3"/>
            <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
            <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
            <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
            <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
          </svg>
          <div className="text-center">
            <p className="text-xl font-black text-gray-900 tracking-wide">LACK</p>
            <p className="text-xs font-black tracking-[6px]" style={{color:"#1FAA6B"}}>CONTROL</p>
          </div>
        </div>

        <form onSubmit={handleLogin} className="w-full flex flex-col gap-4">
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">✉</span>
            <input type="email" required placeholder="E-mail" value={email} onChange={e => setEmail(e.target.value)}
              className="w-full pl-10 pr-4 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-green-400"/>
          </div>
          <div className="relative">
            <span className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">🔒</span>
            <input type={mostrar ? "text" : "password"} required placeholder="Senha" value={senha} onChange={e => setSenha(e.target.value)}
              className="w-full pl-10 pr-10 py-3 border-2 border-gray-200 rounded-xl text-sm bg-gray-50 focus:outline-none focus:border-green-400"/>
            <button type="button" onClick={() => setMostrar(!mostrar)}
              className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-sm">
              {mostrar ? "🙈" : "👁"}
            </button>
          </div>

          {erro && <p className="text-red-500 text-xs text-center bg-red-50 border border-red-200 rounded-xl p-2">{erro}</p>}

          <button type="submit" className="w-full py-4 rounded-xl text-white font-semibold text-sm transition-all" style={{background:"#1FAA6B"}}>
            Entrar
          </button>

          <div className="flex items-center gap-3">
            <div className="flex-1 h-px bg-gray-200"/>
            <span className="text-xs text-gray-400">ou</span>
            <div className="flex-1 h-px bg-gray-200"/>
          </div>

          <button type="button" onClick={() => setLocation("/cadastro")}
            className="w-full py-4 rounded-xl font-black text-sm tracking-widest transition-all border-2 border-red-500 text-red-500 hover:bg-red-50">
            CADASTRAR
          </button>

          <button type="button" onClick={() => setMostrarImportar(!mostrarImportar)}
            className="w-full py-2 text-xs text-gray-400 underline text-center">
            Cadastrei em outro aparelho → Importar dados
          </button>

          {mostrarImportar && (
            <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl bg-gray-50">
              <p className="text-xs text-gray-500 text-center">Cole o código gerado na tela de Perfil do outro aparelho</p>
              <textarea
                value={codigoImport}
                onChange={e => setCodigoImport(e.target.value)}
                placeholder="Cole o código aqui..."
                className="w-full border border-gray-200 rounded-xl p-3 text-xs focus:outline-none focus:border-green-400 bg-white resize-none h-20"
              />
              {msgImport && <p className="text-xs text-red-500 text-center">{msgImport}</p>}
              <button type="button" onClick={handleImportar}
                className="w-full py-2 rounded-xl text-white text-sm font-semibold" style={{background:"#1FAA6B"}}>
                Importar e Entrar
              </button>
            </div>
          )}
        </form>
      </div>
    </div>
  );
}
