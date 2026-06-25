import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

export interface Indicadores {
  diasSemReincidencia: number;
  maiorSequencia: number;
  totalDepositado: number;
  ultimaReincidencia: string | null;
}

export interface DepositoHistorico {
  id: string;
  valor: number;
  destino: "poupanca" | "entidade" | "jogador";
  jogadorId?: string | null;
  data: string;
}

/**
 * Calcula dias sem reincidência com base na data da última reincidência.
 * CORREÇÃO: O original nunca incrementava os dias — ficava sempre em 0
 * após um deslize. Agora calculamos pela diferença de datas.
 */
function calcularDiasSemReincidencia(ultimaReincidencia: string | null): number {
  if (!ultimaReincidencia) return 0;
  const ultima = new Date(ultimaReincidencia);
  const agora = new Date();
  const diffMs = agora.getTime() - ultima.getTime();
  return Math.floor(diffMs / (1000 * 60 * 60 * 24));
}

const fetchIndicadores = async (): Promise<Indicadores> => {
  const local = localStorage.getItem("lack_indicadores");
  if (!local) {
    return { diasSemReincidencia: 0, maiorSequencia: 0, totalDepositado: 0, ultimaReincidencia: null };
  }
  const dados: Indicadores = JSON.parse(local);
  // Recalcula dias ao carregar, para refletir o tempo real passado
  return {
    ...dados,
    diasSemReincidencia: calcularDiasSemReincidencia(dados.ultimaReincidencia),
  };
};

const fetchHistorico = async (): Promise<DepositoHistorico[]> => {
  const local = localStorage.getItem("lack_historico");
  return local ? JSON.parse(local) : [];
};

export function useLackData() {
  const queryClient = useQueryClient();

  const indicadoresQuery = useQuery({
    queryKey: ["indicadores"],
    queryFn: fetchIndicadores,
    // Refetch a cada 60s para manter o contador de dias atualizado
    refetchInterval: 60_000,
  });

  const historicoQuery = useQuery({
    queryKey: ["historico"],
    queryFn: fetchHistorico,
  });

  const registrarDepositoMutation = useMutation({
    mutationFn: async (novo: Omit<DepositoHistorico, "id" | "data">) => {
      const historicoAtual = await fetchHistorico();
      const indicadoresAtuais = await fetchIndicadores();

      const novoDeposito: DepositoHistorico = {
        ...novo,
        id: Math.random().toString(36).substring(2, 9),
        data: new Date().toISOString(),
      };

      const novoHistorico = [novoDeposito, ...historicoAtual];

      const novosIndicadores: Indicadores = {
        ...indicadoresAtuais,
        totalDepositado: indicadoresAtuais.totalDepositado + novo.valor,
        diasSemReincidencia: 0,
        ultimaReincidencia: new Date().toISOString(),
        maiorSequencia: Math.max(
          indicadoresAtuais.maiorSequencia,
          indicadoresAtuais.diasSemReincidencia
        ),
      };

      localStorage.setItem("lack_historico", JSON.stringify(novoHistorico));
      localStorage.setItem("lack_indicadores", JSON.stringify(novosIndicadores));

      return { novoHistorico, novosIndicadores };
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["indicadores"] });
      queryClient.invalidateQueries({ queryKey: ["historico"] });
    },
  });

  return {
    indicadores: indicadoresQuery.data,
    isLoadingIndicadores: indicadoresQuery.isLoading,
    historico: historicoQuery.data || [],
    isLoadingHistorico: historicoQuery.isLoading,
    registrarDeposito: registrarDepositoMutation.mutateAsync,
    isRegistrando: registrarDepositoMutation.isPending,
  };
}
