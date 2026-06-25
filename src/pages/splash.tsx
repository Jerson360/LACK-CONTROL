import { useEffect, useState } from "react";
import { useLocation } from "wouter";

const PersonagemSVG = ({ size = 140 }: { size?: number }) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="3"/>
    <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
    <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
    <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
    <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
  </svg>
);

export { PersonagemSVG };

export default function Splash() {
  const [, setLocation] = useLocation();
  const [dot, setDot] = useState(0);

  useEffect(() => {
    if (localStorage.getItem("lack_sessao_ativa") === "true") {
      setLocation("/home");
      return;
    }
    const interval = setInterval(() => setDot(d => (d + 1) % 3), 600);
    return () => clearInterval(interval);
  }, [setLocation]);

  return (
    <div className="min-h-screen bg-white flex items-center justify-center">
      <div className="w-full max-w-sm min-h-screen flex flex-col items-center justify-between py-10 px-6">
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <PersonagemSVG size={160} />
          <div className="text-center">
            <p className="text-4xl font-black text-gray-900 tracking-tight leading-none">LACK</p>
            <p className="text-2xl font-black tracking-[0.25em] leading-none" style={{color:"#1FAA6B"}}>CONTROL</p>
          </div>
          <p className="text-sm font-bold text-gray-800 tracking-wide text-center">TAKE CONTROL · BREAK FREE</p>
          <p className="text-sm text-gray-500 text-center leading-relaxed">O maior poder é o<br/>poder sobre si mesmo</p>
          <div className="flex gap-2 mt-1">
            {[0,1,2].map(i => (
              <div key={i} className={`h-2 rounded-full transition-all duration-300 ${dot===i ? "w-5" : "w-2 bg-gray-300"}`}
                style={dot===i ? {background:"#1FAA6B"} : {}} />
            ))}
          </div>
        </div>
        <div className="w-full flex flex-col gap-3 mt-6">
          <button onClick={() => setLocation("/login")}
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all"
            style={{background:"#1a1a2e"}}>
            Login
          </button>
          <button onClick={() => setLocation("/cadastro")}
            className="w-full py-4 rounded-2xl text-white font-semibold text-sm tracking-wide transition-all"
            style={{background:"#1FAA6B"}}>
            Cadastrar
          </button>
        </div>
      </div>
    </div>
  );
}
