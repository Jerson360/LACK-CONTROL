import { Switch, Route } from "wouter";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Splash from "@/pages/splash";
import Login from "@/pages/login";
import Cadastro from "@/pages/cadastro";
import Home from "@/pages/home";
import Indicadores from "@/pages/indicadores";
import Historico from "@/pages/historico";
import Perfil from "@/pages/perfil";
import Jogadores from "@/pages/jogadores";
import Sobre from "@/pages/sobre";
import EuVenci from "@/pages/eu-venci";
import Admin from "@/pages/admin";

const queryClient = new QueryClient();

function EuVenciPage() { return <EuVenci />; }

function AppRoutes() {
  return (
    <Switch>
      <Route path="/" component={Splash} />
      <Route path="/login" component={Login} />
      <Route path="/cadastro" component={Cadastro} />
      <Route path="/home" component={Home} />
      <Route path="/indicadores" component={Indicadores} />
      <Route path="/historico" component={Historico} />
      <Route path="/perfil" component={Perfil} />
      <Route path="/jogadores" component={Jogadores} />
      <Route path="/sobre" component={Sobre} />
      <Route path="/eu-venci" component={EuVenciPage} />
      <Route path="/lc-admin-2026" component={Admin} />
      <Route component={Splash} />
    </Switch>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <AppRoutes />
    </QueryClientProvider>
  );
}
