import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import BottomNav from "@/pages/bottom-nav";

export default function Perfil() {
  const [, setLocation] = useLocation();
  const [mostrarForm, setMostrarForm] = useState(false);
  const [senhaAtual, setSenhaAtual] = useState("");
  const [novaSenha, setNovaSenha] = useState("");
  const [msg, setMsg] = useState("");
  const [nomeUsuario, setNomeUsuario] = useState("Usuário");
  const [codigoExport, setCodigoExport] = useState("");
  const [mostrarExport, setMostrarExport] = useState(false);
  const [copiado, setCopiado] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") !== "true") { setLocation("/login"); return; }
    const raw = localStorage.getItem("lack_usuario");
    if (raw) { const u = JSON.parse(raw); if (u.nome) setNomeUsuario(u.nome); }
  }, [setLocation]);

  const handleExportar = () => {
    const dados: Record<string, unknown> = {};
    ["lack_usuario", "lack_indicadores", "lack_historico"].forEach(k => {
      const val = localStorage.getItem(k);
      if (val) dados[k] = JSON.parse(val);
    });
    const codigo = btoa(JSON.stringify(dados));
    setCodigoExport(codigo);
    setMostrarExport(true);
  };

  const handleCopiar = () => {
    navigator.clipboard.writeText(codigoExport).then(() => {
      setCopiado(true);
      setTimeout(() => setCopiado(false), 2000);
    });
  };

  const handleAlterarSenha = (e: React.FormEvent) => {
    e.preventDefault();
    const u = JSON.parse(localStorage.getItem("lack_usuario") || "{}");
    if (u.senha !== senhaAtual) { setMsg("Senha atual incorreta."); return; }
    u.senha = novaSenha;
    localStorage.setItem("lack_usuario", JSON.stringify(u));
    setMsg("Senha alterada com sucesso!");
    setSenhaAtual(""); setNovaSenha(""); setMostrarForm(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("lack_sessao_ativa");
    setLocation("/");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col gap-4 overflow-y-auto">

        <div className="flex flex-col items-center gap-3 pb-4 border-b border-gray-100">
          <div className="w-16 h-16 rounded-full flex items-center justify-center text-3xl" style={{background:"#1a1a2e"}}>
            👤
          </div>
          <div className="text-center">
            <p className="text-base font-semibold text-gray-900">{nomeUsuario}</p>
            <p className="text-xs text-gray-400 italic mt-1">Eu e minhas manias...</p>
          </div>
        </div>

        <div className="flex flex-col gap-3">
          <h3 className="text-sm font-semibold text-gray-800">Privacidade e Segurança</h3>

          <button onClick={() => setMostrarForm(!mostrarForm)}
            className="w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center gap-3 px-4 transition-all"
            style={{background:"#E53935"}}>
            🔒 Alterar Senha
          </button>

          {mostrarForm && (
            <form onSubmit={handleAlterarSenha} className="flex flex-col gap-3 p-4 border border-gray-200 rounded-xl bg-gray-50">
              <input type="password" placeholder="Senha atual" value={senhaAtual} onChange={e => setSenhaAtual(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-400 bg-white"/>
              <input type="password" placeholder="Nova senha" value={novaSenha} onChange={e => setNovaSenha(e.target.value)}
                className="w-full border border-gray-200 rounded-xl p-3 text-sm focus:outline-none focus:border-green-400 bg-white"/>
              {msg && <p className={`text-xs text-center ${msg.includes("sucesso") ? "text-green-600" : "text-red-500"}`}>{msg}</p>}
              <div className="flex gap-2">
                <button type="submit" className="flex-1 py-2 rounded-xl text-white text-sm font-semibold" style={{background:"#1FAA6B"}}>Confirmar</button>
                <button type="button" onClick={() => setMostrarForm(false)} className="flex-1 py-2 rounded-xl text-gray-500 text-sm border border-gray-200">Cancelar</button>
              </div>
            </form>
          )}
        </div>

        <button onClick={() => setLocation("/jogadores")}
          className="w-full py-4 rounded-xl text-white font-black text-sm tracking-widest flex items-center gap-3 px-4 transition-all"
          style={{background:"#F57C00"}}>
          👥 JOGADORES
        </button>

        <button onClick={handleExportar}
          className="w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center gap-3 px-4 transition-all"
          style={{background:"#1a1a2e"}}>
          📲 Transferir para outro aparelho
        </button>

        {mostrarExport && (
          <div className="flex flex-col gap-2 p-4 border border-gray-200 rounded-xl bg-gray-50">
            <p className="text-xs text-gray-500 text-center font-semibold">Cole este código no outro aparelho → Login → "Importar dados"</p>
            <textarea readOnly value={codigoExport}
              className="w-full border border-gray-200 rounded-xl p-3 text-xs bg-white resize-none h-20 break-all"
            />
            <button onClick={handleCopiar}
              className="w-full py-2 rounded-xl text-white text-sm font-semibold transition-all"
              style={{background: copiado ? "#1FAA6B" : "#1a1a2e"}}>
              {copiado ? "✓ Copiado!" : "Copiar código"}
            </button>
          </div>
        )}

        <div className="border border-gray-200 rounded-xl p-4">
          <p className="text-xs text-gray-400 text-center mb-3 tracking-widest">COMPARTILHAR</p>
          <div className="flex justify-center gap-3">
            {[
              {bg:"#E1306C", icon:"📸", label:"Instagram", url:"https://instagram.com"},
              {bg:"#1a1a2e", icon:"🎵", label:"TikTok", url:"https://tiktok.com"},
              {bg:"#E53935", icon:"📌", label:"Pinterest", url:"https://pinterest.com"},
              {bg:"#25D366", icon:"💬", label:"WhatsApp", url:"https://wa.me/"},
            ].map(s => (
              <a key={s.label} href={s.url} target="_blank" rel="noreferrer"
                className="w-11 h-11 rounded-xl flex items-center justify-center text-xl"
                style={{background:s.bg}}>
                {s.icon}
              </a>
            ))}
          </div>
        </div>

        <button onClick={() => setLocation("/sobre")}
          className="w-full py-3 rounded-xl text-sm font-semibold border flex items-center justify-center gap-2 transition-all"
          style={{color:"#1FAA6B", borderColor:"#1FAA6B"}}>
          Sobre o Aplicativo →
        </button>

        <button onClick={handleLogout} className="w-full py-2 text-gray-400 text-xs text-center">
          Sair da conta
        </button>
      </div>
      <BottomNav active="perfil" />
    </div>
  );
}
