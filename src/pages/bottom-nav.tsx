import { useLocation } from "wouter";

const tabs = [
  { label: "Home", path: "/home", icon: "🏠" },
  { label: "Progresso", path: "/indicadores", icon: "📊" },
  { label: "Histórico", path: "/historico", icon: "📋" },
  { label: "Perfil", path: "/perfil", icon: "👤" },
];

export default function BottomNav({ active }: { active: string }) {
  const [, setLocation] = useLocation();
  return (
    <div className="border-t border-gray-100 flex bg-white">
      {tabs.map(t => (
        <button key={t.path} onClick={() => setLocation(t.path)}
          className="flex-1 flex flex-col items-center gap-1 py-3 transition-all"
          style={{color: active === t.label.toLowerCase() ? "#1FAA6B" : "#9ca3af"}}>
          <span className="text-xl">{t.icon}</span>
          <span className="text-xs font-medium">{t.label}</span>
        </button>
      ))}
    </div>
  );
}
