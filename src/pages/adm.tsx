import { useState, useEffect } from "react";
import { useLocation } from "wouter";

// Senha do administrador — troque para uma senha sua!
const SENHA_ADMIN = "LackControl@2026";

interface Usuario {
  nome: string;
  email: string;
  habito: string;
  multa: number;
  destino: string;
  detalhe?: string;
}

interface Indicadores {
  diasSemReincidencia: number;
  maiorSequencia: number;
  totalDepositado: number;
  ultimaReincidencia?: string;
}

interface CadastroCompleto {
  dispositivo: string;
  usuario: Usuario;
  indicadores: Indicadores;
  historico: unknown[];
  sessaoAtiva: boolean;
}

export default function Admin() {
  const [, setLocation] = useLocation();
  const [autenticado, setAutenticado] = useState(false);
  const [senhaInput, setSenhaInput] = useState("");
  const [erroSenha, setErroSenha] = useState("");
  const [mostrarSenha, setMostrarSenha] = useState(false);
  const [cadastro, setCadastro] = useState<CadastroCompleto | null>(null);
  const [confirmacaoLimpar, setConfirmacaoLimpar] = useState(false);
  const [msgSucesso, setMsgSucesso] = useState("");

  useEffect(() => {
    // Verifica se já estava autenticado nessa sessão
    if (sessionStorage.getItem("admin_auth") === "true") {
      setAutenticado(true);
      carregarDados();
    }
  }, []);

  const carregarDados = () => {
    const usuarioRaw = localStorage.getItem("lack_usuario");
    const indicadoresRaw = localStorage.getItem("lack_indicadores");
    const historicoRaw = localStorage.getItem("lack_historico");
    const sessaoAtiva = localStorage.getItem("lack_sessao_ativa") === "true";

    if (usuarioRaw) {
      setCadastro({
        dispositivo: navigator.userAgent.substring(0, 80),
        usuario: JSON.parse(usuarioRaw),
        indicadores: indicadoresRaw ? JSON.parse(indicadoresRaw) : {},
        historico: historicoRaw ? JSON.parse(historicoRaw) : [],
        sessaoAtiva,
      });
    } else {
      setCadastro(null);
    }
  };

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (senhaInput === SENHA_ADMIN) {
      sessionStorage.setItem("admin_auth", "true");
      setAutenticado(true);
      setErroSenha("");
      carregarDados();
    } else {
      setErroSenha("Senha incorreta.");
      setSenhaInput("");
    }
  };

  const handleLimparTudo = () => {
    ["lack_usuario", "lack_indicadores", "lack_historico", "lack_sessao_ativa"].forEach(k =>
      localStorage.removeItem(k)
    );
    setCadastro(null);
    setConfirmacaoLimpar(false);
    setMsgSucesso("✅ Todos os dados foram removidos com sucesso!");
    setTimeout(() => setMsgSucesso(""), 3000);
  };

  const handleLimparHistorico = () => {
    localStorage.removeItem("lack_historico");
    carregarDados();
    setMsgSucesso("✅ Histórico de multas limpo!");
    setTimeout(() => setMsgSucesso(""), 3000);
  };

  const handleResetarIndicadores = () => {
    localStorage.setItem("lack_indicadores", JSON.stringify({
      diasSemReincidencia: 0,
      maiorSequencia: 0,
      totalDepositado: 0,
      ultimaReincidencia: new Date().toISOString(),
    }));
    carregarDados();
    setMsgSucesso("✅ Indicadores zerados!");
    setTimeout(() => setMsgSucesso(""), 3000);
  };

  const handleLogoutAdmin = () => {
    sessionStorage.removeItem("admin_auth");
    setAutenticado(false);
    setSenhaInput("");
    setCadastro(null);
  };

  // ── TELA DE LOGIN ADMIN ──
  if (!autenticado) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center px-6"
        style={{ background: "linear-gradient(160deg, #0f2027 0%, #1a1a2e 60%, #0d1f0f 100%)" }}>
        <div className="w-full max-w-sm flex flex-col gap-6">
          <div className="text-center">
            <div className="text-5xl mb-3">🛡️</div>
            <p className="text-white font-black text-xl tracking-widest">ÁREA ADMIN</p>
            <p className="text-xs mt-1" style={{ color: "#1FAA6B" }}>LACK CONTROL — Acesso Restrito</p>
          </div>

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div className="relative">
              <input
                type={mostrarSenha ? "text" : "password"}
                placeholder="Senha de administrador"
                value={senhaInput}
                onChange={e => setSenhaInput(e.target.value)}
                className="w-full px-4 py-4 rounded-xl text-sm focus:outline-none border-2"
                style={{ background: "#ffffff11", color: "#fff", borderColor: "#1FAA6B44" }}
                autoComplete="off"
              />
              <button type="button" onClick={() => setMostrarSenha(!mostrarSenha)}
                className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 text-lg">
                {mostrarSenha ? "🙈" : "👁️"}
              </button>
            </div>

            {erroSenha && (
              <p className="text-red-400 text-xs text-center">{erroSenha}</p>
            )}

            <button type="submit"
              className="w-full py-4 rounded-xl font-black text-sm tracking-widest"
              style={{ background: "#1FAA6B", color: "#fff" }}>
              ENTRAR
            </button>
          </form>

          <button onClick={() => setLocation("/login")}
            className="text-xs text-gray-500 text-center underline">
            ← Voltar ao app
          </button>
        </div>
      </div>
    );
  }

  // ── PAINEL ADMIN ──
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#0f0f1a" }}>
      {/* Header */}
      <div className="px-6 py-4 flex items-center justify-between border-b border-gray-800">
        <div>
          <p className="text-white font-black tracking-widest text-sm">🛡️ PAINEL ADMIN</p>
          <p className="text-xs" style={{ color: "#1FAA6B" }}>LACK CONTROL</p>
        </div>
        <button onClick={handleLogoutAdmin}
          className="text-xs text-gray-400 border border-gray-700 px-3 py-1 rounded-lg">
          Sair
        </button>
      </div>

      <div className="flex-1 px-6 py-6 flex flex-col gap-5 overflow-y-auto">

        {msgSucesso && (
          <div className="rounded-xl px-4 py-3 text-sm text-center font-semibold"
            style={{ background: "#1FAA6B22", color: "#1FAA6B", border: "1px solid #1FAA6B44" }}>
            {msgSucesso}
          </div>
        )}

        {/* Dados do cadastro */}
        <div className="rounded-2xl p-4 flex flex-col gap-3" style={{ background: "#1a1a2e" }}>
          <p className="text-xs font-black tracking-widest text-gray-400">👤 CADASTRO ATUAL</p>

          {cadastro ? (
            <>
              <div className="grid grid-cols-2 gap-2">
                {[
                  { label: "Nome", val: cadastro.usuario.nome },
                  { label: "E-mail", val: cadastro.usuario.email },
                  { label: "Hábito", val: cadastro.usuario.habito },
                  { label: "Multa", val: `R$ ${cadastro.usuario.multa}` },
                  { label: "Destino", val: cadastro.usuario.destino },
                  { label: "Sessão", val: cadastro.sessaoAtiva ? "✅ Ativa" : "❌ Inativa" },
                ].map(item => (
                  <div key={item.label} className="rounded-xl p-3" style={{ background: "#0f0f1a" }}>
                    <p className="text-xs text-gray-500">{item.label}</p>
                    <p className="text-xs text-white font-semibold mt-1 break-all">{item.val || "—"}</p>
                  </div>
                ))}
              </div>

              <div className="rounded-xl p-3" style={{ background: "#0f0f1a" }}>
                <p className="text-xs text-gray-500 mb-1">📊 Indicadores</p>
                <div className="flex gap-4">
                  <div>
                    <p className="text-xs text-gray-400">Dias sem reincidência</p>
                    <p className="text-lg font-black" style={{ color: "#1FAA6B" }}>
                      {cadastro.indicadores.diasSemReincidencia ?? 0}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Total depositado</p>
                    <p className="text-lg font-black text-white">
                      R$ {(cadastro.indicadores.totalDepositado ?? 0).toFixed(2)}
                    </p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400">Multas</p>
                    <p className="text-lg font-black text-white">
                      {Array.isArray(cadastro.historico) ? cadastro.historico.length : 0}
                    </p>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-sm text-gray-500 text-center py-4">Nenhum cadastro encontrado neste dispositivo.</p>
          )}
        </div>

        {/* Ações */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-black tracking-widest text-gray-400">⚙️ AÇÕES</p>

          <button onClick={handleLimparHistorico}
            className="w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center gap-3 px-4"
            style={{ background: "#F57C00" }}>
            🗑️ Limpar Histórico de Multas
          </button>

          <button onClick={handleResetarIndicadores}
            className="w-full py-4 rounded-xl text-white font-semibold text-sm flex items-center gap-3 px-4"
            style={{ background: "#1565C0" }}>
            🔄 Zerar Indicadores (reiniciar contagem)
          </button>

          {!confirmacaoLimpar ? (
            <button onClick={() => setConfirmacaoLimpar(true)}
              className="w-full py-4 rounded-xl text-white font-black text-sm flex items-center gap-3 px-4"
              style={{ background: "#E53935" }}>
              ❌ Remover Cadastro Completo
            </button>
          ) : (
            <div className="rounded-xl p-4 flex flex-col gap-3"
              style={{ background: "#E5393522", border: "2px solid #E53935" }}>
              <p className="text-sm text-white text-center font-semibold">
                ⚠️ Tem certeza? Isso apaga <strong>todos os dados</strong> permanentemente!
              </p>
              <div className="flex gap-2">
                <button onClick={handleLimparTudo}
                  className="flex-1 py-3 rounded-xl text-white font-black text-sm"
                  style={{ background: "#E53935" }}>
                  SIM, REMOVER
                </button>
                <button onClick={() => setConfirmacaoLimpar(false)}
                  className="flex-1 py-3 rounded-xl text-white font-semibold text-sm border border-gray-600">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Info */}
        <div className="rounded-xl p-4" style={{ background: "#1a1a2e" }}>
          <p className="text-xs text-gray-500 text-center">
            ℹ️ Os dados ficam apenas no dispositivo do usuário (localStorage).<br />
            Para gerenciar outro usuário, acesse esta página no dispositivo dele.
          </p>
        </div>

        <button onClick={() => setLocation("/home")}
          className="w-full py-3 rounded-xl text-sm font-semibold border text-center"
          style={{ color: "#1FAA6B", borderColor: "#1FAA6B44" }}>
          ← Voltar ao App
        </button>
      </div>
    </div>
  );
}
