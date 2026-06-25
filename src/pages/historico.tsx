import { useEffect } from "react";
import { useLocation } from "wouter";
import { useLackData } from "@/hooks/use-lack-data";
import { format } from "date-fns";
import { ptBR } from "date-fns/locale";
import BottomNav from "@/pages/bottom-nav";

export default function Historico() {
  const [, setLocation] = useLocation();
  const { historico, isLoadingHistorico } = useLackData();

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") !== "true") setLocation("/login");
  }, [setLocation]);

  const total = historico.reduce((s, d) => s + d.valor, 0);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 px-6 pt-8 pb-4 flex flex-col gap-4 overflow-y-auto">
        <div>
          <h2 className="text-lg font-semibold text-gray-900">Histórico</h2>
          <p className="text-xs text-gray-400 mt-1">Multas registradas</p>
        </div>

        {isLoadingHistorico ? (
          <p className="text-sm text-gray-400 text-center py-8">Carregando...</p>
        ) : historico.length === 0 ? (
          <div className="flex flex-col items-center gap-3 py-12 border-2 border-dashed border-gray-200 rounded-2xl">
            <span className="text-4xl">📋</span>
            <p className="text-sm text-gray-500">Nenhum registro ainda</p>
            <p className="text-xs text-gray-400">Continue firme! 💪</p>
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {historico.map(d => (
              <div key={d.id} className="flex items-center justify-between p-4 border border-gray-100 rounded-xl bg-gray-50">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center text-xl ${d.destino==="poupanca" ? "bg-yellow-50" : "bg-red-50"}`}>
                    {d.destino==="poupanca" ? "🏦" : "🤝"}
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-gray-800">{d.destino==="poupanca" ? "Poupança" : "Entidade"}</p>
                    <p className="text-xs text-gray-400">{format(new Date(d.data), "dd 'de' MMMM 'às' HH:mm", {locale: ptBR})}</p>
                  </div>
                </div>
                <span className="text-sm font-semibold text-red-500">- R$ {d.valor.toFixed(2)}</span>
              </div>
            ))}

            {historico.length > 0 && (
              <div className="flex items-center justify-between p-4 border-2 rounded-xl" style={{borderColor:"#1FAA6B", background:"#F0FBF6"}}>
                <div className="flex items-center gap-2">
                  <span className="text-lg">∑</span>
                  <span className="text-sm font-semibold text-gray-800">Total acumulado</span>
                </div>
                <span className="text-base font-semibold" style={{color:"#1FAA6B"}}>R$ {total.toFixed(2)}</span>
              </div>
            )}
          </div>
        )}
      </div>
      <BottomNav active="histórico" />
    </div>
  );
}
