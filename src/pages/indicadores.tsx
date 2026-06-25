import { useEffect, useState } from "react";
import { useLocation } from "wouter";
import { useLackData } from "@/hooks/use-lack-data";
import BottomNav from "@/pages/bottom-nav";
import EuVenci from "@/pages/eu-venci";

const META_DIAS = 90;

export default function Indicadores() {
  const [, setLocation] = useLocation();
  const { indicadores, isLoadingIndicadores } = useLackData();
  const [mostrarVitoria, setMostrarVitoria] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") !== "true") setLocation("/login");
  }, [setLocation]);

  // Detecta automaticamente ao atingir 90 dias
  useEffect(() => {
    if (!indicadores) return;
    const dias = indicadores.diasSemReincidencia || 0;
    if (dias >= META_DIAS) {
      // Só mostra uma vez por sessão, não fica reabrindo
      const jaViu = sessionStorage.getItem("venci_exibido");
      if (!jaViu) {
        sessionStorage.setItem("venci_exibido", "true");
        setMostrarVitoria(true);
      }
    }
  }, [indicadores]);

  if (mostrarVitoria) {
    return <EuVenci onFechar={() => setMostrarVitoria(false)} />;
  }

  const dias = indicadores?.diasSemReincidencia || 0;
  const recorde = indicadores?.maiorSequencia || 0;
  const total = indicadores?.totalDepositado || 0;
  const progresso = Math.min((dias / META_DIAS) * 100, 100);
  const atingiuMeta = dias >= META_DIAS;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col gap-5 overflow-y-auto">

        <div className="flex flex-col items-center pb-4 border-b border-gray-100 gap-2">
          <svg width="56" height="56" viewBox="0 0 140 140" fill="none">
            <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="3"/>
            <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
            <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
            <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
            <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
            <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
          </svg>
          <div className="text-center">
            <p className="text-base font-black text-gray-900 tracking-widest">— LACK —</p>
            <p className="text-xs font-black tracking-[5px]" style={{color:"#1FAA6B"}}>CONTROL</p>
          </div>
        </div>

        <h2 className="text-base font-semibold text-gray-900">Indicadores</h2>

        <div className="grid grid-cols-2 gap-3">
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-2xl">📅</span>
            <p className="text-xs text-gray-500">Dias sem reincidência</p>
            <p className="text-3xl font-semibold" style={{color:"#1FAA6B"}}>{dias}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2">
            <span className="text-2xl">🏆</span>
            <p className="text-xs text-gray-500">Maior sequência</p>
            <p className="text-3xl font-semibold text-gray-800">{recorde}</p>
          </div>
          <div className="bg-gray-50 rounded-xl p-4 flex flex-col gap-2 col-span-2">
            <span className="text-2xl">💰</span>
            <p className="text-xs text-gray-500">Total depositado</p>
            <p className="text-3xl font-semibold text-gray-800">R$ {total.toFixed(2)}</p>
          </div>
        </div>

        {/* Barra de progresso rumo aos 90 dias */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-semibold text-gray-800">Progresso (meta: 90 dias)</span>
            <span className="text-xs text-gray-400">{Math.round(progresso)}%</span>
          </div>
          <div className="w-full h-3 bg-gray-100 rounded-full overflow-hidden border border-gray-200">
            <div
              className="h-full rounded-full transition-all duration-700"
              style={{width:`${progresso}%`, background: atingiuMeta ? "#E53935" : "#1FAA6B"}}
            />
          </div>
          <p className="text-xs text-gray-400 text-right">
            {atingiuMeta ? "🎉 Meta atingida!" : `${META_DIAS - dias} dias restantes para a vitória`}
          </p>
        </div>

        {/* Botão EU VENCI — aparece sempre mas destacado quando atingiu */}
        <button
          onClick={() => setMostrarVitoria(true)}
          className="w-full py-4 rounded-2xl font-black text-sm tracking-widest transition-all flex items-center justify-center gap-2"
          style={{
            background: atingiuMeta ? "#E53935" : "#1a1a2e",
            color: "#fff",
            boxShadow: atingiuMeta ? "0 0 20px #E5393566" : "none"
          }}
        >
          🏆 {atingiuMeta ? "VER MINHA CONQUISTA!" : "EU VENCI! (prévia)"}
        </button>

        <div className="border-2 border-yellow-200 rounded-xl px-4 py-3 text-center" style={{background:"#FDFBF0"}}>
          <p className="text-xs text-gray-700">O maior poder, é o poder sobre si mesmo!</p>
        </div>
      </div>
      <BottomNav active="progresso" />
    </div>
  );
}
