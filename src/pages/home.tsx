import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLackData } from "@/hooks/use-lack-data";
import BottomNav from "@/pages/bottom-nav";

export default function Home() {
  const [, setLocation] = useLocation();
  const { registrarDeposito, isRegistrando } = useLackData();

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") !== "true") setLocation("/login");
  }, [setLocation]);

  const handleDeposito = async () => {
    const raw = localStorage.getItem("lack_usuario");
    let valor = 5.0;
    let destino: "poupanca"|"entidade" = "poupanca";
    if (raw) { const u = JSON.parse(raw); if (u.multa) valor = u.multa; if (u.destino) destino = u.destino; }
    await registrarDeposito({ valor, destino, jogadorId: null });
    setLocation("/historico");
  };

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col items-center justify-center gap-6 px-6 pb-20 pt-8">
        <svg width="110" height="110" viewBox="0 0 140 140" fill="none">
          <circle cx="70" cy="36" r="14" fill="#2d2d3a"/>
          <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
          <rect x="54" y="50" width="32" height="38" rx="6" fill="#2d2d3a"/>
          <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#2d2d3a" strokeWidth="8" strokeLinecap="round" fill="none"/>
          <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#2d2d3a" strokeWidth="8" strokeLinecap="round" fill="none"/>
          <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#2d2d3a"/>
          <path d="M24 88 L18 94 M20 94 L14 100" stroke="#2d2d3a" strokeWidth="3" strokeLinecap="round"/>
          <path d="M116 88 L122 94 M120 94 L126 100" stroke="#2d2d3a" strokeWidth="3" strokeLinecap="round"/>
        </svg>

        <p className="text-2xl font-black italic text-red-500 text-center tracking-wide">...FIZ NOVAMENTE!</p>

        <div className="border-2 border-yellow-400 rounded-lg px-6 py-2 text-center w-full max-w-xs">
          <p className="text-sm font-semibold text-gray-900">Reconheça, Combata, Cresça!</p>
        </div>

        <button onClick={handleDeposito} disabled={isRegistrando}
          className="w-56 py-6 border-4 border-gray-900 rounded font-black text-2xl tracking-widest transition-all disabled:opacity-50"
          style={{background:"#C8E86A", color:"#1a1a2e"}}>
          {isRegistrando ? "..." : "DEPOSITE"}
        </button>

        <div className="border-2 border-yellow-200 rounded-lg px-4 py-3 text-center w-full max-w-xs" style={{background:"#FDFBF0"}}>
          <p className="text-xs font-black text-gray-900 uppercase tracking-wide leading-relaxed">
            O MAIOR PODER, É O<br/>PODER SOBRE SI MESMO!
          </p>
        </div>

        <p className="text-xs text-gray-400">© Todos os direitos reservados</p>
      </div>
      <BottomNav active="home" />
    </div>
  );
}
