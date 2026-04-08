import {
  Award,
  CheckCircle,
  ChevronLeft,
  ChevronRight,
  Clock,
  MapPin,
  Menu,
  Phone,
  Star,
  Users,
  X,
  ZoomIn,
  ZoomOut,
} from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import {
  FaFacebook,
  FaInstagram,
  FaTooth,
  FaWhatsapp,
  FaYoutube,
} from "react-icons/fa";
import { SiTiktok } from "react-icons/si";

// ─── Data ────────────────────────────────────────────────────────────────────
const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Servicios", href: "#servicios" },
  { label: "Nuestra Clínica", href: "#clinica" },
  { label: "Casos de Éxito", href: "#casos" },
  { label: "Equipo", href: "#equipo" },
  { label: "Contacto", href: "#contacto" },
];

const SERVICES = [
  {
    icon: "🦷",
    title: "Implantología Digital 3D",
    desc: "Implantes de última generación con planificación digital 3D para resultados predecibles y duraderos.",
  },
  {
    icon: "😁",
    title: "Ortodoncia y Ortopedia Maxilar",
    desc: "Tratamientos correctivos con brackets, alineadores y aparatología funcional para todas las edades.",
  },
  {
    icon: "✨",
    title: "Rehabilitación Oral",
    desc: "Restauración completa de la función masticatoria y estética dental mediante técnicas avanzadas.",
  },
  {
    icon: "🩺",
    title: "Periodoncia",
    desc: "Diagnóstico y tratamiento de enfermedades de las encías con enfoque preventivo y regenerador.",
  },
  {
    icon: "🔬",
    title: "Prótesis Fija",
    desc: "Coronas, puentes y carillas de porcelana de alta estética para devolver tu sonrisa natural.",
  },
  {
    icon: "📡",
    title: "Diagnóstico 3D",
    desc: "Tomografía cone-beam y escáner digital intraoral para diagnósticos precisos y sin radiación excesiva.",
  },
];

const GALLERY_IMAGES = Array.from({ length: 10 }, (_, i) => ({
  id: i + 1,
  src: `/assets/img-${i + 1}.jpeg`,
  alt: `Caso de éxito ${i + 1}`,
}));

const SALLY_CASES = [
  { id: 11, src: "/assets/img-11.jpeg", alt: "Caso clínico 11" },
  { id: 12, src: "/assets/img-12.jpeg", alt: "Caso clínico 12" },
  { id: 13, src: "/assets/img-13.jpeg", alt: "Caso clínico 13" },
  { id: 14, src: "/assets/img-14.jpg", alt: "Caso clínico 14" },
  { id: 15, src: "/assets/img-15.jpg", alt: "Caso clínico 15" },
];

// ─── Lightbox ─────────────────────────────────────────────────────────────────
interface LightboxProps {
  images: { id: number; src: string; alt: string }[];
  initialIndex: number;
  onClose: () => void;
}

function Lightbox({ images, initialIndex, onClose }: LightboxProps) {
  const [current, setCurrent] = useState(initialIndex);
  const [zoom, setZoom] = useState(1);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const dragStart = useRef<{
    x: number;
    y: number;
    ox: number;
    oy: number;
  } | null>(null);

  const resetView = useCallback(() => {
    setZoom(1);
    setOffset({ x: 0, y: 0 });
  }, []);
  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + images.length) % images.length);
    resetView();
  }, [images.length, resetView]);
  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % images.length);
    resetView();
  }, [images.length, resetView]);
  const zoomIn = () => setZoom((z) => Math.min(z + 0.5, 4));
  const zoomOut = () => {
    setZoom((z) => {
      const nz = Math.max(z - 0.5, 1);
      if (nz === 1) setOffset({ x: 0, y: 0 });
      return nz;
    });
  };

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKeyDown);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [prev, next, onClose]);

  const onMouseDown = (e: React.MouseEvent) => {
    if (zoom <= 1) return;
    dragStart.current = {
      x: e.clientX,
      y: e.clientY,
      ox: offset.x,
      oy: offset.y,
    };
  };
  const onMouseMove = (e: React.MouseEvent) => {
    if (!dragStart.current) return;
    setOffset({
      x: dragStart.current.ox + e.clientX - dragStart.current.x,
      y: dragStart.current.oy + e.clientY - dragStart.current.y,
    });
  };
  const onMouseUp = () => {
    dragStart.current = null;
  };

  return (
    <dialog
      open
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-sm w-full h-full max-w-none max-h-none m-0 p-0 border-0"
      aria-label="Visor de imagen"
      data-ocid="lightbox-overlay"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose();
      }}
    >
      <div
        className="relative flex flex-col items-center w-full h-full"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
        role="presentation"
      >
        {/* Controls */}
        <div className="absolute top-4 right-4 z-10 flex gap-2">
          <button
            type="button"
            onClick={zoomIn}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-smooth"
            aria-label="Acercar"
            data-ocid="lightbox-zoom-in"
          >
            <ZoomIn size={18} />
          </button>
          <button
            type="button"
            onClick={zoomOut}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-smooth"
            aria-label="Alejar"
            data-ocid="lightbox-zoom-out"
          >
            <ZoomOut size={18} />
          </button>
          <button
            type="button"
            onClick={onClose}
            className="w-10 h-10 rounded-full bg-white/10 hover:bg-red-500/70 flex items-center justify-center text-white transition-smooth"
            aria-label="Cerrar"
            data-ocid="lightbox-close"
          >
            <X size={18} />
          </button>
        </div>

        {/* Counter */}
        <div className="absolute top-5 left-1/2 -translate-x-1/2 text-white/70 text-sm font-body">
          {current + 1} / {images.length}
        </div>

        {/* Image */}
        <div
          className="flex-1 flex items-center justify-center w-full overflow-hidden"
          style={{ cursor: zoom > 1 ? "grab" : "default" }}
          onMouseDown={onMouseDown}
          onMouseMove={onMouseMove}
          onMouseUp={onMouseUp}
          onMouseLeave={onMouseUp}
          role="presentation"
        >
          <img
            src={images[current].src}
            alt={images[current].alt}
            className="max-h-[80vh] max-w-[85vw] object-contain rounded-lg select-none"
            style={{
              transform: `scale(${zoom}) translate(${offset.x / zoom}px, ${offset.y / zoom}px)`,
              transition: dragStart.current ? "none" : "transform 0.2s ease",
            }}
            draggable={false}
          />
        </div>

        {/* Nav arrows */}
        <button
          type="button"
          onClick={prev}
          className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00AEEF]/70 flex items-center justify-center text-white transition-smooth"
          aria-label="Anterior"
          data-ocid="lightbox-prev"
        >
          <ChevronLeft size={24} />
        </button>
        <button
          type="button"
          onClick={next}
          className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-white/10 hover:bg-[#00AEEF]/70 flex items-center justify-center text-white transition-smooth"
          aria-label="Siguiente"
          data-ocid="lightbox-next"
        >
          <ChevronRight size={24} />
        </button>

        {/* Thumbnails */}
        <div className="flex gap-2 p-4 overflow-x-auto max-w-full">
          {images.map((img, i) => (
            <button
              type="button"
              key={img.id}
              onClick={() => {
                setCurrent(i);
                resetView();
              }}
              className={`w-14 h-14 rounded-md overflow-hidden flex-shrink-0 border-2 transition-smooth ${i === current ? "border-[#00AEEF]" : "border-white/20 hover:border-white/50"}`}
              data-ocid={`lightbox-thumb-${img.id}`}
              aria-label={`Ir a imagen ${i + 1}`}
            >
              <img
                src={img.src}
                alt={img.alt}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </dialog>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────
export default function App() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [lightbox, setLightbox] = useState<{
    images: typeof GALLERY_IMAGES;
    index: number;
  } | null>(null);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const scrollTo = (href: string) => {
    setMobileOpen(false);
    const id = href.replace("#", "");
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* ── Sticky Nav ──────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 left-0 right-0 z-40 transition-all duration-300 ${scrolled ? "bg-[#0d1a2a]/95 backdrop-blur-md shadow-elevated" : "bg-transparent"}`}
        data-ocid="nav-header"
      >
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <button
            type="button"
            onClick={() => scrollTo("#inicio")}
            className="flex items-center gap-2 group"
            aria-label="Ir al inicio"
            data-ocid="nav-logo"
          >
            <div className="w-9 h-9 rounded-lg bg-[#00AEEF] flex items-center justify-center shadow-md">
              <FaTooth className="text-white text-lg" />
            </div>
            <div className="text-left">
              <span className="font-display font-bold text-white text-sm leading-none block">
                COD 3D
              </span>
              <span className="text-[#00AEEF] text-[10px] leading-none font-body">
                Implantes
              </span>
            </div>
          </button>

          {/* Desktop nav */}
          <nav
            className="hidden md:flex items-center gap-6"
            aria-label="Navegación principal"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-[#00AEEF] text-sm font-body transition-smooth"
                data-ocid={`nav-link-${link.label.toLowerCase().replace(/\s+/g, "-")}`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#contacto")}
              className="ml-2 px-4 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white text-sm font-display font-semibold rounded-lg transition-smooth shadow-md"
              data-ocid="nav-cta"
            >
              Agendar Cita
            </button>
          </nav>

          {/* Mobile menu button */}
          <button
            type="button"
            className="md:hidden text-white p-2"
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Abrir menú"
            aria-expanded={mobileOpen}
            data-ocid="nav-mobile-toggle"
          >
            <Menu size={22} />
          </button>
        </div>

        {/* Mobile menu */}
        {mobileOpen && (
          <div
            className="md:hidden bg-[#0d1a2a]/98 backdrop-blur-md border-t border-white/10 px-4 py-4 flex flex-col gap-3"
            data-ocid="nav-mobile-menu"
          >
            {NAV_LINKS.map((link) => (
              <button
                type="button"
                key={link.href}
                onClick={() => scrollTo(link.href)}
                className="text-white/80 hover:text-[#00AEEF] text-left py-2 font-body transition-smooth border-b border-white/5"
                data-ocid={`nav-mobile-${link.label}`}
              >
                {link.label}
              </button>
            ))}
            <button
              type="button"
              onClick={() => scrollTo("#contacto")}
              className="mt-2 px-4 py-3 bg-[#00AEEF] text-white font-display font-semibold rounded-lg text-center transition-smooth"
              data-ocid="nav-mobile-cta"
            >
              Agendar Cita
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────── */}
      <section
        id="inicio"
        className="relative min-h-screen flex items-center justify-center overflow-hidden"
        style={{
          background: "linear-gradient(135deg, #0d1a2a 0%, #1a2332 100%)",
        }}
      >
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-30"
          style={{ backgroundImage: "url('/assets/img-16.jpeg')" }}
          role="presentation"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#0d1a2a]/90 via-[#0d1a2a]/60 to-transparent" />

        <div className="container mx-auto px-4 pt-20 pb-12 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Hero text */}
            <div className="text-white">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/20 border border-[#00AEEF]/40 rounded-full text-[#00AEEF] text-xs font-body mb-6">
                <span
                  className="w-2 h-2 bg-[#00AEEF] rounded-full animate-pulse"
                  aria-hidden="true"
                />
                Tecnología Digital 3D
              </div>
              <h1 className="font-display font-bold text-4xl md:text-5xl lg:text-6xl leading-tight mb-6">
                Centro Odontológico
                <br />
                <span className="text-[#00AEEF]">Digital 3D</span>
                <br />
                Implantes
              </h1>
              <p className="text-white/70 text-lg md:text-xl font-body mb-8 max-w-lg">
                Tecnología de vanguardia para tu mejor sonrisa. Especialistas en
                implantología, rehabilitación oral y ortodoncia.
              </p>
              <div className="flex flex-wrap gap-4">
                <button
                  type="button"
                  onClick={() => scrollTo("#contacto")}
                  className="px-7 py-3.5 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-display font-semibold rounded-xl transition-smooth shadow-lg hover:shadow-[#00AEEF]/30 hover:-translate-y-0.5"
                  data-ocid="hero-cta-primary"
                >
                  Agendar Cita
                </button>
                <button
                  type="button"
                  onClick={() => scrollTo("#casos")}
                  className="px-7 py-3.5 bg-white/10 hover:bg-white/20 text-white font-display font-semibold rounded-xl border border-white/20 transition-smooth hover:-translate-y-0.5"
                  data-ocid="hero-cta-secondary"
                >
                  Ver Casos de Éxito
                </button>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6 mt-10">
                {[
                  {
                    icon: <Star size={16} aria-hidden="true" />,
                    val: "+2000",
                    label: "Pacientes satisfechos",
                  },
                  {
                    icon: <Award size={16} aria-hidden="true" />,
                    val: "+15",
                    label: "Años de experiencia",
                  },
                  {
                    icon: <Users size={16} aria-hidden="true" />,
                    val: "2",
                    label: "Especialistas",
                  },
                ].map((s) => (
                  <div key={s.label} className="flex items-center gap-2">
                    <span className="text-[#00AEEF]">{s.icon}</span>
                    <div>
                      <div className="font-display font-bold text-white text-lg leading-none">
                        {s.val}
                      </div>
                      <div className="text-white/50 text-xs font-body">
                        {s.label}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Doctor card */}
            <div className="flex justify-center lg:justify-end">
              <div
                className="bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 max-w-sm w-full shadow-elevated"
                data-ocid="hero-doctor-card"
              >
                <div className="flex items-start gap-4">
                  <img
                    src="/assets/img-17.jpeg"
                    alt="Dr. Leonard Walter Huamani Díaz"
                    className="w-24 h-24 rounded-xl object-cover object-top border-2 border-[#00AEEF]/50 flex-shrink-0"
                  />
                  <div>
                    <div className="text-[#00AEEF] text-xs font-body mb-1 font-semibold uppercase tracking-wide">
                      Director Médico
                    </div>
                    <h2 className="font-display font-bold text-white text-base leading-snug mb-1">
                      Dr. Leonard Walter Huamani Díaz
                    </h2>
                    <p className="text-white/60 text-xs font-body">
                      Especialista en Rehabilitación Oral &amp; Periodoncia
                    </p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-white/10 grid grid-cols-3 gap-2 text-center">
                  {[
                    { val: "FAIPE", label: "Brasil" },
                    { val: "UIGV", label: "Periodoncia" },
                    { val: "UPCH", label: "Maestría" },
                  ].map((c) => (
                    <div key={c.label} className="bg-white/5 rounded-lg p-2">
                      <div className="font-display font-bold text-[#00AEEF] text-sm">
                        {c.val}
                      </div>
                      <div className="text-white/50 text-[10px] font-body">
                        {c.label}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    onClick={() => scrollTo("#equipo")}
                    className="flex-1 py-2 bg-[#00AEEF] hover:bg-[#0099d6] text-white text-sm font-display font-semibold rounded-lg transition-smooth"
                    data-ocid="hero-see-profile"
                  >
                    Ver Perfil
                  </button>
                  <button
                    type="button"
                    onClick={() => scrollTo("#contacto")}
                    className="flex-1 py-2 bg-white/10 hover:bg-white/20 text-white text-sm font-display font-semibold rounded-lg border border-white/20 transition-smooth"
                    data-ocid="hero-book-appointment"
                  >
                    Pedir Cita
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-white/30"
          aria-hidden="true"
        >
          <span className="text-xs font-body">Desplázate</span>
          <div className="w-px h-8 bg-gradient-to-b from-white/30 to-transparent animate-pulse" />
        </div>
      </section>

      {/* ── Services ────────────────────────────────────────────────────── */}
      <section id="servicios" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/10 rounded-full text-[#00AEEF] text-xs font-body mb-4">
              <FaTooth size={12} aria-hidden="true" /> Nuestros Servicios
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Atención Especializada
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Ofrecemos una amplia gama de tratamientos dentales con la más
              avanzada tecnología digital 3D
            </p>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES.map((svc, i) => (
              <div
                key={svc.title}
                className="group bg-card border border-border rounded-2xl p-6 hover:border-[#00AEEF]/40 hover:shadow-elevated transition-smooth hover:-translate-y-1"
                data-ocid={`service-card-${i}`}
              >
                <div
                  className="w-12 h-12 rounded-xl bg-[#00AEEF]/10 flex items-center justify-center text-2xl mb-4 group-hover:bg-[#00AEEF]/20 transition-smooth"
                  aria-hidden="true"
                >
                  {svc.icon}
                </div>
                <h3 className="font-display font-bold text-foreground text-lg mb-2">
                  {svc.title}
                </h3>
                <p className="text-muted-foreground text-sm font-body leading-relaxed">
                  {svc.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Nuestra Clínica ──────────────────────────────────────────────── */}
      <section id="clinica" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="flex flex-col gap-4">
              {/* Main clinic image */}
              <div className="relative">
                <img
                  src="/assets/img-16.jpeg"
                  alt="Clínica Odontológica Digital 3D — instalaciones modernas"
                  className="w-full h-64 lg:h-72 object-cover rounded-2xl shadow-elevated"
                />
                <div className="absolute -bottom-5 -right-5 bg-[#00AEEF] text-white rounded-2xl px-6 py-4 shadow-lg font-display">
                  <div className="font-bold text-2xl">+15</div>
                  <div className="text-sm font-body opacity-90">
                    Años de experiencia
                  </div>
                </div>
              </div>
              {/* Additional clinic photos grid */}
              <div className="grid grid-cols-3 gap-3 mt-6">
                <img
                  src="/assets/img-20.jpeg"
                  alt="Instalaciones clínica — sala de tratamiento"
                  className="w-full h-28 object-cover rounded-xl shadow-md hover:scale-105 transition-smooth cursor-pointer"
                />
                <img
                  src="/assets/img-21.jpeg"
                  alt="Instalaciones clínica — equipo dental"
                  className="w-full h-28 object-cover rounded-xl shadow-md hover:scale-105 transition-smooth cursor-pointer"
                />
                <img
                  src="/assets/img-22.jpeg"
                  alt="Instalaciones clínica — área de atención"
                  className="w-full h-28 object-cover rounded-xl shadow-md hover:scale-105 transition-smooth cursor-pointer"
                />
              </div>
            </div>

            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/10 rounded-full text-[#00AEEF] text-xs font-body mb-5">
                <FaTooth size={12} aria-hidden="true" /> Nuestra Clínica
              </div>
              <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-5">
                Centro Odontológico{" "}
                <span className="text-[#00AEEF]">Digital 3D</span>
              </h2>
              <p className="text-muted-foreground font-body leading-relaxed mb-6">
                Contamos con la más moderna infraestructura tecnológica para
                brindarte diagnósticos precisos y tratamientos de vanguardia.
                Nuestro equipo de especialistas combina experiencia clínica con
                innovación digital para garantizar los mejores resultados.
              </p>
              <ul className="space-y-3 mb-8">
                {[
                  "Tecnología de tomografía cone-beam 3D",
                  "Escáner intraoral digital de alta resolución",
                  "Quirófanos equipados con luz LED especial",
                  "Protocolo estricto de esterilización y bioseguridad",
                  "Atención personalizada y trato humano",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-start gap-3 text-sm font-body text-foreground"
                  >
                    <CheckCircle
                      size={18}
                      className="text-[#00AEEF] flex-shrink-0 mt-0.5"
                      aria-hidden="true"
                    />
                    {item}
                  </li>
                ))}
              </ul>
              <button
                type="button"
                onClick={() => scrollTo("#contacto")}
                className="px-7 py-3.5 bg-[#00AEEF] hover:bg-[#0099d6] text-white font-display font-semibold rounded-xl transition-smooth shadow-md hover:-translate-y-0.5"
                data-ocid="clinic-cta"
              >
                Conoce más →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Casos de Éxito ──────────────────────────────────────────────── */}
      <section id="casos" className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/10 rounded-full text-[#00AEEF] text-xs font-body mb-4">
              <Star size={12} aria-hidden="true" /> Resultados Reales
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Casos de Éxito
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Transformaciones reales de nuestros pacientes. Haz clic en
              cualquier imagen para verla en detalle con zoom.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
            {GALLERY_IMAGES.map((img, i) => (
              <button
                type="button"
                key={img.id}
                onClick={() =>
                  setLightbox({ images: GALLERY_IMAGES, index: i })
                }
                className="group relative aspect-square overflow-hidden rounded-xl bg-muted border border-border hover:border-[#00AEEF]/50 transition-smooth hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                aria-label={`Ver caso ${img.id} en detalle`}
                data-ocid={`gallery-thumb-${img.id}`}
              >
                <img
                  src={img.src}
                  alt={img.alt}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div
                  className="absolute inset-0 bg-[#00AEEF]/0 group-hover:bg-[#00AEEF]/20 transition-smooth flex items-center justify-center"
                  aria-hidden="true"
                >
                  <ZoomIn
                    size={24}
                    className="text-white opacity-0 group-hover:opacity-100 transition-smooth drop-shadow"
                  />
                </div>
                <div
                  className="absolute bottom-2 left-2 bg-black/50 text-white text-xs font-body px-2 py-0.5 rounded-md"
                  aria-hidden="true"
                >
                  Caso {img.id}
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ── Equipo Médico ────────────────────────────────────────────────── */}
      <section id="equipo" className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/10 rounded-full text-[#00AEEF] text-xs font-body mb-4">
              <Users size={12} aria-hidden="true" /> Nuestro Equipo
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-foreground mb-4">
              Equipo Médico
            </h2>
            <p className="text-muted-foreground font-body max-w-xl mx-auto">
              Especialistas altamente capacitados comprometidos con tu salud
              bucal
            </p>
          </div>

          {/* Dr. Leonard */}
          <div className="bg-card border border-border rounded-3xl p-8 mb-8 shadow-card">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center lg:items-start">
                <img
                  src="/assets/img-17.jpeg"
                  alt="Dr. Leonard Walter Huamani Díaz — Director Médico"
                  className="w-48 h-56 object-cover object-top rounded-2xl shadow-elevated border-4 border-[#00AEEF]/20 mb-4"
                />
                <div className="text-center lg:text-left">
                  <div className="text-[#00AEEF] text-xs font-body font-semibold uppercase tracking-wide mb-1">
                    Director Médico
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground leading-snug">
                    Dr. Leonard Walter
                    <br />
                    Huamani Díaz
                  </h3>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-display font-semibold text-foreground mb-4 text-lg">
                  Credenciales y Formación
                </h4>
                <ul className="space-y-3">
                  {[
                    {
                      icon: "🎓",
                      text: "Especialista en Rehabilitación Oral — FAIPE (Brasil)",
                    },
                    {
                      icon: "🦷",
                      text: "Especialista en Periodoncia e Implantología — UIGV",
                    },
                    { icon: "📜", text: "Maestría en Periodoncia — UPCH" },
                    {
                      icon: "🏫",
                      text: "Docente de Postgrado — UNFV, UNMSM, WIENER, UAC",
                    },
                    {
                      icon: "🌎",
                      text: "Docente Internacional — Bolivia y Argentina",
                    },
                  ].map((c) => (
                    <li
                      key={c.text}
                      className="flex items-start gap-3 p-3 bg-muted/50 rounded-xl"
                    >
                      <span className="text-lg" aria-hidden="true">
                        {c.icon}
                      </span>
                      <span className="text-sm font-body text-foreground">
                        {c.text}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>

          {/* Esp. Sally */}
          <div className="bg-card border border-border rounded-3xl p-8 shadow-card">
            <div className="grid lg:grid-cols-3 gap-8 items-start">
              <div className="flex flex-col items-center lg:items-start">
                <div className="w-48 h-56 rounded-2xl bg-gradient-to-br from-[#00AEEF]/20 to-[#1a2332]/40 flex items-center justify-center mb-4 border-4 border-[#00AEEF]/20 shadow-elevated">
                  <div className="text-center">
                    <FaTooth
                      className="text-[#00AEEF] text-5xl mx-auto mb-2"
                      aria-hidden="true"
                    />
                    <span className="text-muted-foreground text-xs font-body">
                      Esp. Sally Arroyo Saavedra
                    </span>
                  </div>
                </div>
                <div className="text-center lg:text-left">
                  <div className="text-[#00AEEF] text-xs font-body font-semibold uppercase tracking-wide mb-1">
                    Especialista
                  </div>
                  <h3 className="font-display font-bold text-xl text-foreground leading-snug">
                    Esp. Sally Arroyo
                    <br />
                    Saavedra
                  </h3>
                  <p className="text-muted-foreground text-sm font-body mt-1">
                    Ortodoncia y Ortopedia Maxilar
                  </p>
                </div>
              </div>

              <div className="lg:col-span-2">
                <h4 className="font-display font-semibold text-foreground mb-4 text-lg">
                  Casos Clínicos de Ortodoncia
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                  {SALLY_CASES.map((img, i) => (
                    <button
                      type="button"
                      key={img.id}
                      onClick={() =>
                        setLightbox({ images: SALLY_CASES, index: i })
                      }
                      className="group relative aspect-video overflow-hidden rounded-xl bg-muted border border-border hover:border-[#00AEEF]/50 transition-smooth hover:shadow-elevated focus:outline-none focus-visible:ring-2 focus-visible:ring-[#00AEEF]"
                      aria-label={`Ver caso clínico ${img.id} en detalle`}
                      data-ocid={`sally-case-${img.id}`}
                    >
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div
                        className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-smooth flex items-center justify-center"
                        aria-hidden="true"
                      >
                        <ZoomIn
                          size={20}
                          className="text-white opacity-0 group-hover:opacity-100 transition-smooth"
                        />
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Contacto ─────────────────────────────────────────────────────── */}
      <section
        id="contacto"
        style={{
          background: "linear-gradient(135deg, #0d1a2a 0%, #1a2332 100%)",
        }}
        className="py-20"
      >
        <div className="container mx-auto px-4">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 bg-[#00AEEF]/20 border border-[#00AEEF]/30 rounded-full text-[#00AEEF] text-xs font-body mb-4">
              <Phone size={12} aria-hidden="true" /> Contáctanos
            </div>
            <h2 className="font-display font-bold text-3xl md:text-4xl text-white mb-4">
              Información de Contacto
            </h2>
            <p className="text-white/60 font-body max-w-xl mx-auto">
              Estamos listos para atenderte. Visítanos o comunícate con nosotros
              para agendar tu cita.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {[
              {
                icon: <MapPin size={24} aria-hidden="true" />,
                title: "Dirección",
                lines: ["Jr Jorge Aprile 552", "San Borja, Lima — Perú"],
              },
              {
                icon: <Phone size={24} aria-hidden="true" />,
                title: "Teléfono / WhatsApp",
                lines: ["997742781"],
              },
              {
                icon: <Clock size={24} aria-hidden="true" />,
                title: "Horario de Atención",
                lines: ["Lunes a Sábado de 8 am a 8:30 pm"],
              },
            ].map((item) => (
              <div
                key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-6 text-center hover:bg-white/10 transition-smooth"
                data-ocid={`contact-card-${item.title.toLowerCase().replace(/\s+/g, "-")}`}
              >
                <div className="w-12 h-12 rounded-xl bg-[#00AEEF]/20 flex items-center justify-center text-[#00AEEF] mx-auto mb-4">
                  {item.icon}
                </div>
                <h3 className="font-display font-semibold text-white mb-2">
                  {item.title}
                </h3>
                {item.lines.map((l) => (
                  <p key={l} className="text-white/60 font-body text-sm">
                    {l}
                  </p>
                ))}
              </div>
            ))}
          </div>

          {/* Map placeholder */}
          <div
            className="bg-white/5 border border-white/10 rounded-2xl p-8 flex flex-col items-center justify-center gap-4 h-48 mb-10"
            data-ocid="contact-map-placeholder"
          >
            <MapPin size={36} className="text-[#00AEEF]" aria-hidden="true" />
            <div className="text-center">
              <p className="font-display font-semibold text-white">
                Jr Jorge Aprile 552, San Borja
              </p>
              <a
                href="https://www.google.com/maps/search/Jr+Jorge+Aprile+552+San+Borja+Lima"
                target="_blank"
                rel="noopener noreferrer"
                className="text-[#00AEEF] text-sm font-body hover:underline"
                data-ocid="contact-map-link"
              >
                Ver en Google Maps →
              </a>
            </div>
          </div>

          {/* Social links */}
          <div className="flex justify-center gap-4">
            {[
              {
                icon: <FaFacebook size={20} />,
                label: "Facebook",
                href: "https://www.facebook.com/share/1AswNPu13k/",
              },
              {
                icon: <FaInstagram size={20} />,
                label: "Instagram",
                href: "https://www.instagram.com/leonardwalterhuamanidiaz?igsh=OGc3MzVmczk0ZmMz",
              },
              { icon: <FaYoutube size={20} />, label: "YouTube", href: "#" },
              {
                icon: <SiTiktok size={20} />,
                label: "TikTok",
                href: "https://www.tiktok.com/@dr.leonardwalterhuamani?_r=1&_t=ZS-95M7hV6bgmr",
              },
              {
                icon: <FaWhatsapp size={20} />,
                label: "WhatsApp",
                href: "https://wa.me/51997742781",
              },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                className="w-11 h-11 rounded-full bg-white/10 hover:bg-[#00AEEF] flex items-center justify-center text-white transition-smooth"
                aria-label={s.label}
                data-ocid={`social-${s.label.toLowerCase()}`}
              >
                {s.icon}
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────── */}
      <footer className="bg-[#06101a] py-6 border-t border-white/5">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-[#00AEEF] flex items-center justify-center">
              <FaTooth className="text-white text-sm" aria-hidden="true" />
            </div>
            <span className="font-display font-bold text-white text-sm">
              Centro Odontológico Digital 3D Implantes
            </span>
          </div>
          <p className="text-white/40 text-xs font-body text-center">
            © {new Date().getFullYear()} Centro Odontológico Digital 3D
            Implantes. Built with love using{" "}
            <a
              href={`https://caffeine.ai?utm_source=caffeine-footer&utm_medium=referral&utm_content=${encodeURIComponent(window.location.hostname)}`}
              className="text-[#00AEEF] hover:underline"
              target="_blank"
              rel="noopener noreferrer"
            >
              caffeine.ai
            </a>
          </p>
        </div>
      </footer>

      {/* ── Floating WhatsApp ────────────────────────────────────────────── */}
      <a
        href="https://wa.me/51997742781"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 w-14 h-14 bg-[#25D366] hover:bg-[#1db954] rounded-full flex items-center justify-center text-white shadow-elevated transition-smooth hover:scale-110"
        aria-label="Contáctanos por WhatsApp"
        data-ocid="whatsapp-float"
      >
        <FaWhatsapp size={28} />
        <span
          className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-30"
          aria-hidden="true"
        />
      </a>

      {/* ── Lightbox ────────────────────────────────────────────────────── */}
      {lightbox && (
        <Lightbox
          images={lightbox.images}
          initialIndex={lightbox.index}
          onClose={() => setLightbox(null)}
        />
      )}
    </div>
  );
}
