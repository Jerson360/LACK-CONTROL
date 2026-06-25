import { useEffect, useRef, useState } from "react";
import { useLocation } from "wouter";

// Gerador de confetes em canvas
function Confetes({ ativo }: { ativo: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animRef = useRef<number>(0);

  useEffect(() => {
    if (!ativo) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const cores = ["#1FAA6B", "#E53935", "#FDD835", "#1a1a2e", "#C8E86A", "#F57C00", "#ffffff"];
    const particulas = Array.from({ length: 120 }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * -canvas.height,
      w: Math.random() * 10 + 5,
      h: Math.random() * 6 + 3,
      cor: cores[Math.floor(Math.random() * cores.length)],
      vel: Math.random() * 3 + 2,
      ang: Math.random() * 360,
      spin: (Math.random() - 0.5) * 6,
      swing: Math.random() * 3,
      swingOff: Math.random() * Math.PI * 2,
    }));

    let frame = 0;
    const animar = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      frame++;
      particulas.forEach(p => {
        p.y += p.vel;
        p.ang += p.spin;
        p.x += Math.sin(frame * 0.05 + p.swingOff) * p.swing;
        if (p.y > canvas.height) {
          p.y = -20;
          p.x = Math.random() * canvas.width;
        }
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.ang * Math.PI) / 180);
        ctx.fillStyle = p.cor;
        ctx.fillRect(-p.w / 2, -p.h / 2, p.w, p.h);
        ctx.restore();
      });
      animRef.current = requestAnimationFrame(animar);
    };
    animar();
    return () => cancelAnimationFrame(animRef.current);
  }, [ativo]);

  if (!ativo) return null;
  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none"
      style={{ zIndex: 10 }}
    />
  );
}

export default function EuVenci({ onFechar }: { onFechar?: () => void }) {
  const [, setLocation] = useLocation();
  const [confetes, setConfetes] = useState(true);

  // Para os confetes depois de 6s
  useEffect(() => {
    const t = setTimeout(() => setConfetes(false), 6000);
    return () => clearTimeout(t);
  }, []);

  const handleFechar = () => {
    if (onFechar) { onFechar(); return; }
    setLocation("/indicadores");
  };

  return (
    <div
      className="fixed inset-0 flex flex-col items-center justify-center px-6"
      style={{ background: "linear-gradient(160deg, #0f2027 0%, #1a1a2e 50%, #0d1f0f 100%)", zIndex: 50 }}
    >
      <Confetes ativo={confetes} />

      <div className="flex flex-col items-center gap-6 text-center" style={{ zIndex: 60, position: "relative" }}>

        {/* Título */}
        <div>
          <p className="text-4xl font-black tracking-widest" style={{ color: "#E53935", textShadow: "0 0 30px #E5393588" }}>
            EU VENCI !!
          </p>
          <p className="text-sm font-semibold tracking-widest mt-1" style={{ color: "#C8E86A" }}>
            90 DIAS SEM REINCIDÊNCIA
          </p>
        </div>

        {/* Logo / mascote */}
        <div className="relative">
          {/* Brilho atrás */}
          <div className="absolute inset-0 rounded-full blur-2xl opacity-40" style={{ background: "#1FAA6B", transform: "scale(1.3)" }} />
          <svg width="180" height="180" viewBox="0 0 140 140" fill="none" style={{ position: "relative" }}>
            {/* Correntes quebradas */}
            <path d="M20 110 Q10 100 15 88 Q20 76 30 80" stroke="#888" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
            <path d="M120 110 Q130 100 125 88 Q120 76 110 80" stroke="#888" strokeWidth="4" strokeLinecap="round" fill="none" opacity="0.5"/>
            {/* Raios de luz */}
            {[0,45,90,135,180,225,270,315].map(a => (
              <line key={a}
                x1={70 + Math.cos(a * Math.PI / 180) * 62}
                y1={70 + Math.sin(a * Math.PI / 180) * 62}
                x2={70 + Math.cos(a * Math.PI / 180) * 72}
                y2={70 + Math.sin(a * Math.PI / 180) * 72}
                stroke="#C8E86A" strokeWidth="2.5" strokeLinecap="round" opacity="0.7"
              />
            ))}
            {/* Corpo */}
            <circle cx="70" cy="36" r="14" fill="#2d2d3a"/>
            <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
            <rect x="54" y="50" width="32" height="38" rx="6" fill="#2d2d3a"/>
            {/* Braços levantados (vitória) */}
            <path d="M54 58 Q36 42 28 30 Q24 22 30 18 Q36 14 42 24 Q48 36 54 54"
              stroke="#2d2d3a" strokeWidth="10" strokeLinecap="round" fill="none"/>
            <path d="M86 58 Q104 42 112 30 Q116 22 110 18 Q104 14 98 24 Q92 36 86 54"
              stroke="#2d2d3a" strokeWidth="10" strokeLinecap="round" fill="none"/>
            {/* Pernas */}
            <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#2d2d3a"/>
            {/* Troféu na mão direita */}
            <text x="108" y="22" fontSize="18" textAnchor="middle">🏆</text>
          </svg>
        </div>

        {/* Mensagem motivacional */}
        <div className="rounded-2xl px-6 py-4 border-2" style={{ background: "#ffffff11", borderColor: "#1FAA6B55" }}>
          <p className="text-base font-black text-white leading-relaxed">
            "O maior poder,<br/>é o poder sobre si mesmo!"
          </p>
          <p className="text-xs mt-2" style={{ color: "#1FAA6B" }}>
            Você provou que é capaz. Continue!
          </p>
        </div>

        {/* Estatísticas */}
        <div className="flex gap-4 w-full">
          <div className="flex-1 rounded-xl py-3 px-2 flex flex-col items-center gap-1" style={{ background: "#ffffff11" }}>
            <span className="text-2xl">🗓️</span>
            <p className="text-2xl font-black text-white">90</p>
            <p className="text-xs text-gray-400 text-center">dias<br/>seguidos</p>
          </div>
          <div className="flex-1 rounded-xl py-3 px-2 flex flex-col items-center gap-1" style={{ background: "#ffffff11" }}>
            <span className="text-2xl">💪</span>
            <p className="text-2xl font-black" style={{ color: "#C8E86A" }}>100%</p>
            <p className="text-xs text-gray-400 text-center">meta<br/>atingida</p>
          </div>
          <div className="flex-1 rounded-xl py-3 px-2 flex flex-col items-center gap-1" style={{ background: "#ffffff11" }}>
            <span className="text-2xl">🔥</span>
            <p className="text-2xl font-black" style={{ color: "#E53935" }}>VENCI</p>
            <p className="text-xs text-gray-400 text-center">hábito<br/>vencido</p>
          </div>
        </div>

        {/* Botão fechar */}
        <button
          onClick={handleFechar}
          className="w-full py-4 rounded-2xl font-black text-sm tracking-widest transition-all"
          style={{ background: "#1FAA6B", color: "#fff" }}
        >
          CONTINUAR MINHA JORNADA →
        </button>

        <p className="text-xs text-gray-500">Toque para voltar ao app</p>
      </div>
    </div>
  );
}
