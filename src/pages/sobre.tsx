import { useLocation } from "wouter";

const LogoSVG = ({size=40}: {size?:number}) => (
  <svg width={size} height={size} viewBox="0 0 140 140" fill="none">
    <circle cx="70" cy="70" r="68" stroke="#1FAA6B" strokeWidth="4"/>
    <circle cx="70" cy="36" r="14" fill="#1a1a2e"/>
    <circle cx="70" cy="36" r="6" fill="#1FAA6B"/>
    <rect x="54" y="50" width="32" height="38" rx="6" fill="#1a1a2e"/>
    <path d="M54 62 Q38 58 32 72 Q30 80 36 84 Q42 88 48 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M86 62 Q102 58 108 72 Q110 80 104 84 Q98 88 92 80" stroke="#1a1a2e" strokeWidth="8" strokeLinecap="round" fill="none"/>
    <path d="M54 88 Q54 108 70 112 Q86 108 86 88" fill="#1a1a2e"/>
  </svg>
);

const passos = [
  { n:"1", cor:"#1FAA6B", titulo:"Primeiros passos", texto:"Toque em Cadastrar e preencha nome, e-mail, senha, hábito a combater, valor da multa e destino (poupança ou entidade)." },
  { n:"2", cor:"#1FAA6B", titulo:"Registrando um deslize", texto:"Toda vez que ceder ao hábito, abra o app e toque em DEPOSITE. O valor será registrado automaticamente no histórico." },
  { n:"3", cor:"#1FAA6B", titulo:"Acompanhando seu progresso", texto:"Na aba Progresso veja dias sem reincidência, maior sequência e total acumulado. Quanto mais a barra avançar, melhor!" },
  { n:"4", cor:"#1FAA6B", titulo:"Histórico", texto:"Na aba Histórico consulte todos os registros de deslizes com data e horário." },
  { n:"5", cor:"#F57C00", titulo:"Modo 2 Jogadores", texto:"Em Perfil → Jogadores, cadastre um parceiro com nome, Pix, celular e e-mail. Monitorem-se mutuamente e envie a multa via Pix." },
  { n:"6", cor:"#1a1a2e", titulo:"Alterar dados", texto:"No Perfil você pode alterar sua senha. Para alterar hábito ou valor da multa, entre em contato pelas redes sociais." },
  { n:"7", cor:"#1a1a2e", titulo:"Compartilhar", texto:"Convide amigos pelo Perfil → Compartilhar via Instagram, TikTok, Pinterest ou WhatsApp." },
];

export default function Sobre() {
  const [, setLocation] = useLocation();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <div className="flex-1 flex flex-col overflow-y-auto">

        {/* Card verde */}
        <div className="flex flex-col items-center gap-4 px-6 pt-8 pb-6" style={{background:"#F0FBF6"}}>
          <LogoSVG size={64}/>
          <div className="text-center">
            <p className="text-lg font-semibold text-gray-900">Lack Control</p>
            <p className="text-sm font-semibold mt-1" style={{color:"#1FAA6B"}}>Reconheça, Combata, Cresça!</p>
          </div>
          <div className="flex flex-col gap-3 w-full">
            {[
              { icon:"✅", titulo:"1. Identifique e Comprometa-se", texto:"Registre seus hábitos negativos para aumentar sua intenção de mudar." },
              { icon:"👥", titulo:"2. Consequências e Reforço", texto:"Multas simbólicas para deslizes geram reforço social ao beneficiar outros." },
            ].map(item => (
              <div key={item.titulo} className="flex gap-3 items-start">
                <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0" style={{background:"#1FAA6B"}}>
                  {item.icon}
                </div>
                <div>
                  <p className="text-sm font-semibold text-gray-900">{item.titulo}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{item.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="h-px bg-gray-100"/>

        {/* Card Como Funciona */}
        <div className="mx-4 my-4 border-2 border-gray-900 rounded-2xl overflow-hidden">
          <div className="py-3 text-center border-b-4 border-gray-900" style={{background:"#1FAA6B"}}>
            <p className="text-sm font-semibold text-white">Como funciona</p>
          </div>
          <div className="p-4 flex flex-col gap-4">
            {passos.map(p => (
              <div key={p.n} className="flex gap-3 items-start">
                <div className="w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5" style={{background:p.cor}}>
                  <span className="text-xs font-semibold text-white">{p.n}</span>
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-900">{p.titulo}</p>
                  <p className="text-xs text-gray-500 mt-1 leading-relaxed">{p.texto}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Card Objetivo */}
        <div className="mx-4 mb-4 border-2 border-gray-900 rounded-2xl overflow-hidden">
          <div className="py-3 text-center border-b-4 border-gray-900" style={{background:"#F5E4A0"}}>
            <p className="text-sm font-semibold text-gray-900 tracking-widest">OBJETIVO</p>
          </div>
          <div className="p-4 flex flex-col gap-3 items-center text-center">
            <p className="text-xs text-gray-800 leading-relaxed">
              Nosso propósito é <span className="underline font-semibold">MELHORAR O COMPORTAMENTO</span> das pessoas através da auto-observação. Hábitos negativos quando monitorados e <span className="underline font-semibold">CONSCIENTIZADOS</span> tendem a ser diminuídos e até extintos!
            </p>
            <p className="text-xs text-gray-800 leading-relaxed">
              Como transformar o mundo se não nos melhorarmos como pessoas? Precisamos de ações fáceis de se tornar uma "moda" global. Preciso de amigos do BEM!
            </p>
            <div className="flex flex-col items-center mt-2">
              <LogoSVG size={40}/>
              <p className="text-xs font-black text-gray-900 tracking-widest mt-1">— LACK —</p>
              <p className="text-xs font-black tracking-[4px]" style={{color:"#1FAA6B", fontSize:"9px"}}>CONTROL</p>
            </div>
          </div>
        </div>

        <div className="pb-6 text-center">
          <button onClick={() => setLocation("/home")} className="text-sm underline" style={{color:"#1FAA6B"}}>
            ← Voltar ao início
          </button>
        </div>
      </div>
    </div>
  );
}
