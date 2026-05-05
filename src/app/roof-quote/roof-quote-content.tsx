"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  Phone,
  ArrowRight,
  CheckCircle,
  AlertTriangle,
  XCircle,
  ChevronRight,
  Star,
  Shield,
  Clock,
  Zap,
  DollarSign,
  Home,
  FileText,
} from "lucide-react";
import { COMPANY } from "@/lib/data";
import { formatQuoteRange } from "@/lib/materials";
import ChatWidget from "@/components/ChatWidget";
import { useLanguage } from "@/contexts/LanguageContext";
import { useQuoteWidget } from "@/contexts/QuoteWidgetContext";

function QuoteButton({
  label = "Get Your Instant Quote Now",
  size = "lg",
}: {
  label?: string;
  size?: "lg" | "md";
}) {
  const { openRoofleWidget } = useQuoteWidget();
  const cls =
    size === "lg"
      ? "btn-amber px-8 py-4 rounded-md text-base font-semibold inline-flex items-center gap-2 shadow-lg"
      : "btn-amber px-6 py-3 rounded-md text-sm font-semibold inline-flex items-center gap-2";
  return (
    <button onClick={openRoofleWidget} className={cls}>
      <Zap className="w-4 h-4" />
      {label}
    </button>
  );
}


// ─── Shingle tier data ────────────────────────────────────────────────────────

const SHINGLE_TIERS = [
  {
    tier: "Architectural",
    label: "GOOD",
    name: "Owens Corning Oakridge",
    tagline: "Quality & curb appeal, balanced",
    description:
      "Dimensional wood-shake appearance with proven Owens Corning performance. StreakGuard algae resistance fights the Lowcountry humidity. 110 mph rated, Lifetime Limited warranty.",
    windRating: "110 mph",
    lifespan: "20–25 years",
    priceRange: formatQuoteRange(411),
    steepPriceRange: formatQuoteRange(411, true),
    priceNote: "typical home (22 squares / ~2,200 sq ft roof)",
    highlights: ["Dimensional appearance", "StreakGuard algae resistance", "Owens Corning Lifetime warranty", "Wide color selection"],
    houseImage: "/images/material-oc-oakridge-house.webp",
    badgeColor: "bg-sage text-white",
    borderColor: "border-sage/40",
    accentColor: "text-sage",
  },
  {
    tier: "Premium",
    label: "BETTER",
    name: "Owens Corning Duration",
    tagline: "Top-tier protection & appearance",
    description:
      "Our flagship shingle. SureNail Technology for a reinforced nail zone, 130 mph wind warranty, bold TruDefinition color, and StreakGuard protection. The go-to for premium curb appeal on Lowcountry homes.",
    windRating: "130 mph",
    lifespan: "25–30 years",
    priceRange: formatQuoteRange(425),
    steepPriceRange: formatQuoteRange(425, true),
    priceNote: "typical home (22 squares / ~2,200 sq ft roof)",
    highlights: ["SureNail Technology", "130 mph wind warranty", "Class 4 impact option", "TruDefinition color platform"],
    houseImage: "/images/material-oc-duration-house.webp",
    badgeColor: "bg-amber text-black",
    borderColor: "border-amber/40",
    accentColor: "text-amber-dark",
    popular: true,
  },
  {
    tier: "Storm-Rated",
    label: "BEST",
    name: "TAMKO Storm Fighter",
    tagline: "Built for hurricane season",
    description:
      "Engineered for the South Carolina coast. 160 mph system wind warranty, Hail Guard impact protection, and Class 4 rating — may qualify for insurance discounts.",
    windRating: "160 mph system",
    lifespan: "20–30 years",
    priceRange: formatQuoteRange(558),
    steepPriceRange: formatQuoteRange(558, true),
    priceNote: "typical home (22 squares / ~2,200 sq ft roof)",
    highlights: ["160 mph wind warranty", "Hail Guard impact resistance", "Insurance discount eligible", "Built for coastal SC"],
    houseImage: "/images/material-tamko-house.webp",
    badgeColor: "bg-navy text-white",
    borderColor: "border-navy/30",
    accentColor: "text-navy",
  },
];

const SHINGLE_TIERS_ES = [
  {
    tier: "Arquitectónica",
    label: "BUENA",
    name: "Owens Corning Oakridge",
    tagline: "Calidad y atractivo visual equilibrados",
    description:
      "Apariencia dimensional de madera con el rendimiento comprobado de Owens Corning. La resistencia al algas StreakGuard combate la humedad del Lowcountry. Clasificación 110 mph, garantía limitada de por vida.",
    windRating: "110 mph",
    lifespan: "20–25 años",
    priceRange: formatQuoteRange(411),
    steepPriceRange: formatQuoteRange(411, true),
    priceNote: "hogar típico (22 cuadrados / ~2,200 sq ft de techo)",
    highlights: ["Apariencia dimensional", "Resistencia al algas StreakGuard", "Garantía de por vida Owens Corning", "Amplia selección de colores"],
    houseImage: "/images/material-oc-oakridge-house.webp",
    badgeColor: "bg-sage text-white",
    borderColor: "border-sage/40",
    accentColor: "text-sage",
  },
  {
    tier: "Premium",
    label: "MEJOR",
    name: "Owens Corning Duration",
    tagline: "Protección y apariencia de primer nivel",
    description:
      "Nuestra teja insignia. Tecnología SureNail para una zona de clavado reforzada, garantía de viento de 130 mph, color TruDefinition intenso y protección StreakGuard. La opción preferida para mayor atractivo visual en hogares del Lowcountry.",
    windRating: "130 mph",
    lifespan: "25–30 años",
    priceRange: formatQuoteRange(425),
    steepPriceRange: formatQuoteRange(425, true),
    priceNote: "hogar típico (22 cuadrados / ~2,200 sq ft de techo)",
    highlights: ["Tecnología SureNail", "Garantía de viento de 130 mph", "Opción de impacto Clase 4", "Plataforma de color TruDefinition"],
    houseImage: "/images/material-oc-duration-house.webp",
    badgeColor: "bg-amber text-black",
    borderColor: "border-amber/40",
    accentColor: "text-amber-dark",
    popular: true,
  },
  {
    tier: "Resistente a Tormentas",
    label: "LA MEJOR",
    name: "TAMKO Storm Fighter",
    tagline: "Diseñada para la temporada de huracanes",
    description:
      "Diseñada para la costa de South Carolina. Garantía de viento de 160 mph en sistema, protección contra granizo Hail Guard y clasificación Clase 4 — puede calificar para descuentos de seguro.",
    windRating: "160 mph sistema",
    lifespan: "20–30 años",
    priceRange: formatQuoteRange(558),
    steepPriceRange: formatQuoteRange(558, true),
    priceNote: "hogar típico (22 cuadrados / ~2,200 sq ft de techo)",
    highlights: ["Garantía de viento de 160 mph", "Resistencia al granizo Hail Guard", "Elegible para descuento de seguro", "Diseñada para la costa de SC"],
    houseImage: "/images/material-tamko-house.webp",
    badgeColor: "bg-navy text-white",
    borderColor: "border-navy/30",
    accentColor: "text-navy",
  },
];

// ─── Cost driver data ─────────────────────────────────────────────────────────

const COST_DRIVERS = [
  {
    number: "01",
    title: "Roof Size & Square Footage",
    body: "Roofing is priced by the \"square\" (100 sq ft). A 2,000 sq ft home doesn't always have 2,000 sq ft of roof — pitch, overhangs, and valleys all add to the measurement.",
  },
  {
    number: "02",
    title: "Pitch & Steepness",
    body: "Steep roofs require harnesses, scaffolding, and more labor time. A low-slope Charleston bungalow costs significantly less to reroof than a steep Victorian in the Historic District.",
  },
  {
    number: "03",
    title: "Roof Complexity",
    body: "Every valley, hip, dormer, skylight, and chimney adds time and material waste. Simple gable roofs are the most affordable; complex hip-and-valley roofs cost more.",
  },
  {
    number: "04",
    title: "Tear-Off vs. Overlay",
    body: "South Carolina code allows a second layer of shingles over the first. An overlay saves money short-term but masks deck issues. We always recommend full tear-off for quality and longevity.",
  },
  {
    number: "05",
    title: "Shingle Tier & Material",
    body: "TAMKO Storm Fighter, OC Oakridge, and OC Duration each carry different material costs and wind warranties. The difference in installed cost between tiers is typically $2–$5 per square foot.",
  },
  {
    number: "06",
    title: "Hurricane & Storm Prep",
    body: "Coastal SC homes near water often require enhanced underlayment, self-adhering ice & water shield at eaves, and additional fastener patterns for wind uplift resistance. This is non-negotiable near the coast.",
  },
  {
    number: "07",
    title: "Decking Condition",
    body: "If we find rotted or soft plywood after tear-off, we replace it. In coastal SC, moisture intrusion and humidity take a real toll on OSB and plywood sheeting — especially on older homes.",
  },
  {
    number: "08",
    title: "Ventilation System",
    body: "Proper ridge and soffit ventilation extends your roof's life by 5–10 years in our climate. Poor ventilation in South Carolina's heat and humidity causes premature shingle failure from the underside up. We factor this in every estimate.",
  },
];

const COST_DRIVERS_ES = [
  {
    number: "01",
    title: "Tamaño del Techo y Metros Cuadrados",
    body: "El techado se cotiza por \"cuadrado\" (100 sq ft). Una casa de 2,000 sq ft no siempre tiene 2,000 sq ft de techo — la pendiente, los aleros y los valles aumentan la medición.",
  },
  {
    number: "02",
    title: "Pendiente e Inclinación",
    body: "Los techos empinados requieren arneses, andamios y más tiempo de mano de obra. Un bungalow de poca pendiente en Charleston cuesta significativamente menos de retechar que una casa victoriana empinada en el Distrito Histórico.",
  },
  {
    number: "03",
    title: "Complejidad del Techo",
    body: "Cada valle, cadera, buhardilla, tragaluz y chimenea agrega tiempo y desperdicio de materiales. Los techos de dos aguas simples son los más económicos; los techos complejos de caderas y valles cuestan más.",
  },
  {
    number: "04",
    title: "Remoción Total vs. Capa Adicional",
    body: "El código de South Carolina permite una segunda capa de tejas sobre la primera. Una capa adicional ahorra dinero a corto plazo, pero oculta problemas de la cubierta. Siempre recomendamos la remoción total para garantizar calidad y durabilidad.",
  },
  {
    number: "05",
    title: "Nivel de Teja y Material",
    body: "TAMKO Storm Fighter, OC Oakridge y OC Duration tienen diferentes costos de materiales y garantías de viento. La diferencia en costo instalado entre niveles es típicamente de $2–$5 por pie cuadrado.",
  },
  {
    number: "06",
    title: "Preparación para Huracanes y Tormentas",
    body: "Los hogares costeros de SC cerca del agua frecuentemente requieren subsuelo reforzado, membrana autoadhesiva de hielo y agua en los aleros, y patrones de sujeción adicionales para resistencia al levantamiento por viento. Esto no es negociable cerca de la costa.",
  },
  {
    number: "07",
    title: "Condición de la Cubierta",
    body: "Si encontramos madera contrachapada podrida o blanda después de la remoción, la reemplazamos. En la zona costera de SC, la infiltración de humedad y la humedad ambiental afectan seriamente el OSB y el triplay — especialmente en hogares más antiguos.",
  },
  {
    number: "08",
    title: "Sistema de Ventilación de Ático",
    body: "La ventilación adecuada de cumbrera y sofito extiende la vida útil de su techo entre 5 y 10 años en nuestro clima. La mala ventilación en el calor y la humedad de South Carolina causa falla prematura de las tejas desde adentro hacia afuera. Lo consideramos en cada presupuesto.",
  },
];

// ─── Process steps ────────────────────────────────────────────────────────────

const PROCESS_STEPS = [
  {
    number: "1",
    title: "Your Instant Estimate Arrives",
    body: "The tool measures your roof from satellite imagery and gives you a real price range — fast. No appointment, no waiting, no commitment required.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "2",
    title: "We Reach Out — Friendly, Not Pushy",
    body: "If you share contact info, one of our team members will follow up. We answer questions. We explain options. We don't pressure or use countdown timers.",
    image: "/images/sc-process-02-consultation.webp",
  },
  {
    number: "3",
    title: "Free Roof Inspection (15–20 Minutes)",
    body: "We come look at your roof — decking, ventilation, flashing, underlayment, signs of ice dam or moisture damage. We take photos so you can see what we see.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "4",
    title: "Line-Item Proposal With Photos",
    body: "You get a written proposal with photos, material specs, tear-off cost, labor, warranty details — every line item explained in plain English. Multiple options included.",
    image: "/images/sc-process-03-insurance.webp",
  },
  {
    number: "5",
    title: "You Decide — On Your Timeline",
    body: "Accept, ask questions, or walk away. The decision is 100% yours. We don't do same-day pressure tactics or disappearing discounts. Good work speaks for itself.",
    image: "/images/sc-process-05-walkthrough.webp",
  },
];

const PROCESS_STEPS_ES = [
  {
    number: "1",
    title: "Recibe Su Presupuesto Instantáneo",
    body: "La herramienta mide su techo con imágenes satelitales y le da un rango de precio real — rápidamente. Sin cita, sin espera, sin ningún compromiso.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "2",
    title: "Nos Comunicamos — Con Amabilidad, Sin Presión",
    body: "Si comparte su información de contacto, uno de nuestros representantes le dará seguimiento. Respondemos preguntas. Explicamos opciones. No presionamos ni usamos temporizadores de cuenta regresiva.",
    image: "/images/sc-process-02-consultation.webp",
  },
  {
    number: "3",
    title: "Inspección de Techo Gratuita (15–20 Minutos)",
    body: "Vamos a revisar su techo — cubierta, ventilación, tapajuntas, subsuelo, señales de daños por humedad. Tomamos fotos para que usted pueda ver lo que vemos.",
    image: "/images/sc-process-01-inspection.webp",
  },
  {
    number: "4",
    title: "Propuesta Detallada con Fotos",
    body: "Recibirá una propuesta escrita con fotos, especificaciones de materiales, costo de remoción, mano de obra y detalles de garantía — cada partida explicada en términos claros. Se incluyen múltiples opciones.",
    image: "/images/sc-process-03-insurance.webp",
  },
  {
    number: "5",
    title: "Usted Decide — A Su Propio Ritmo",
    body: "Acepte, haga preguntas o retírese. La decisión es 100% suya. No usamos tácticas de presión el mismo día ni descuentos que desaparecen. El buen trabajo habla por sí solo.",
    image: "/images/sc-process-05-walkthrough.webp",
  },
];

// ─── Spanish translations dictionary ─────────────────────────────────────────

const RQ_ES = {
  // Hero
  heroBadge: "Presupuesto Instantáneo de Techo",
  heroH1a: "La mayoría de las empresas de techado empiezan con presión.",
  heroH1b: "Nosotros empezamos con transparencia.",
  heroP: "Obtenga un estimado de precio real para su hogar en el Lowcountry en menos de 60 segundos — sin cita, sin tecnicismos, sin juegos. Empresa familiar. Con licencia. Honestos.",
  heroCTABtn: "Obtenga Su Presupuesto Instantáneo",

  // Hero trust badges
  trustBadges: [
    "Empresa Familiar",
    "Licencia RBS 67027",
    "Calificación 5.0★ en Google",
    "Servicio de Emergencia 24/7",
  ],

  // Quote tool section
  toolSectionLabel: "La Herramienta que Cambia Todo",
  toolH2: "Obtenga un Presupuesto de Techado en el que Pueda Confiar — Rápido",
  toolP1: "La mayoría de los propietarios en el Lowcountry tienen la misma experiencia: una empresa cotiza $11,000, otra cotiza $19,000 y nadie explica el porqué. Nuestra herramienta de presupuesto instantáneo usa mediciones satelitales de su hogar real para darle un rango de precio verdadero — antes de que alguien pise su propiedad.",
  toolP2: "Sin vendedores presentándose sin aviso. Sin tácticas de alta presión. Sin vagas respuestas de \"depende\". Solo un número transparente que usted puede usar para planificar.",
  toolPreviewCaption: "Así es como se ve — ingrese su dirección y esto es lo que verá:",
  toolRoofDetails: "Detalles de Su Techo",
  toolMainRoof: "Techo Principal",
  toolSteepSlope: "Pendiente Pronunciada",
  toolSecondRoof: "Techo Secundario",
  toolMediumSlope: "Pendiente Media",
  toolSatelliteNote: "La medición satelital identifica cada sección del techo automáticamente — nadie necesita visitar su hogar primero.",
  toolCTAButton: "Obtener Mi Medición Satelital de Techo →",
  toolPreferCall: "¿Prefiere hablar?",
  toolDisclaimer: "Gratis. Sin cita. Los estimados son rangos — una inspección gratuita confirma el alcance exacto.",

  // Shingle tiers section
  tiersLabel: "Vea Sus Opciones",
  tiersH2: "¿Cómo Luciría Su Nuevo Techo?",
  tiersP: "Explore nuestros tres niveles de tejas — cada uno con un rango de precio real y una foto auténtica del producto en un hogar. Compre antes de llamar.",
  tiersMostPopular: "Más Popular",
  tiersWindRating: "Resistencia al Viento",
  tiersLifespan: "Vida Útil",
  tiersEstRange: "Rango Estimado Instalado",
  tiersCTA: "Los precios varían según el tamaño, la pendiente y la complejidad del techo. Obtenga su número exacto →",
  tiersQuoteBtn: "Obtener Mi Presupuesto Instantáneo",
  tiersCompareLink: "Comparación Completa de Materiales",

  // Why stressful section
  stressLabel: "Lo Entendemos",
  stressH2: "Por Qué Obtener un Presupuesto de Techo Genera Estrés",
  stressP: "La mayoría de los propietarios del Lowcountry reemplazan su techo una o dos veces en la vida. Eso significa que está tomando una decisión de $10,000–$25,000+ con casi ninguna experiencia — y una industria que históricamente no ha facilitado entender por qué paga lo que paga.",
  stressItems: [
    "Presupuestos que varían entre $5,000 y $8,000 sin ninguna explicación",
    "Jerga técnica diseñada para confundir, no para informar",
    "Tácticas de alta presión y \"ofertas\" con tiempo limitado",
    "\"Eso es lo que cuesta\" cuando usted pide un desglose",
    "Contratistas lentos o que no se presentan y no dan respuestas directas",
    "Sin fotos, sin documentación, solo un número en una servilleta",
  ],
  stressQuote: `"La esperanza no es una estrategia. Cuando gasta este tipo de dinero en su hogar, merece un número en el que pueda confiar — y un contratista que explique el porqué."`,
  stressTestimonial: `"Finalmente un contratista que explicó cada línea del presupuesto. Sin sorpresas. Exactamente lo que necesitábamos."`,
  stressTestimonialAuthor: "— Propietario de Mount Pleasant",

  // What our tool changes
  toolChangesLabel: "Nuestro Enfoque",
  toolChangesH2: "La Herramienta de Arriba Cambia Todo",
  toolChangesP: "Nuestra herramienta de presupuesto instantáneo está impulsada por la tecnología de medición satelital RoofQuote PRO™ — la misma plataforma que usan los principales contratistas de techado en todo el país. Esto es lo que significa para usted:",
  toolChangesItems: [
    {
      title: "Su techo real, medido desde el satélite",
      body: "No adivinamos los metros cuadrados. La herramienta obtiene imágenes satelitales y calcula medidas reales de su hogar específico.",
    },
    {
      title: "Un rango de precio real — no un número cebo",
      body: "El estimado refleja los costos actuales de materiales y mano de obra en el área de Charleston para el tamaño de su techo y el nivel de teja que elija.",
    },
    {
      title: "Desglose transparente, partida por partida",
      body: "Puede ver qué impulsa el costo — remoción, materiales, mano de obra, disposición. Sin precios de caja negra.",
    },
    {
      title: "Sin programar citas, sin esperar",
      body: "Obtenga un número en menos de 60 segundos. Sin cita. Sin vendedor en su entrada antes de que esté listo.",
    },
    {
      title: "Un punto de partida, no un número final",
      body: "El presupuesto instantáneo le da un rango de planificación. Nuestra inspección gratuita confirma el alcance exacto — especialmente para techos más antiguos, pendientes complejas o preocupaciones sobre la cubierta.",
    },
  ],
  toolChangesFooter: "Es el primer paso hacia la confianza — no hacia un compromiso.",
  toolChangesBtn: "Obtener Mi Rango de Precio →",

  // What a real quote includes
  realQuoteLabel: "Educación para el Comprador",
  realQuoteH2: "Qué Debe Incluir un Presupuesto de Techado Real",
  realQuoteSubtitle: "La Mayoría No lo Hace",
  realQuoteP: "Una propuesta escrita legítima — ya sea que nos contrate a nosotros o a otra empresa — debe cubrir todo lo siguiente. Si un contratista le entrega un solo número sin explicación, esa es su primera señal de alerta.",
  realQuoteItems: [
    "Metros cuadrados totales de su techo, verificados",
    "Número de capas de tejas existentes (afecta el costo de remoción)",
    "Clasificación de pendiente del techo",
    "Tipo y especificaciones del subsuelo",
    "Plan de cobertura con membrana de hielo y agua (crítico cerca de la costa)",
    "Evaluación y plan de mejora de ventilación",
    "Detalles de tapajuntas — chimenea, valles, botas de tubería",
    "Condición de la cubierta y alcance de reemplazo",
    "Marca del material, línea de producto y selección de color",
    "Remoción y disposición incluidas o por separado",
    "Desglose de mano de obra con alcance del equipo",
    "Detalles de garantía del fabricante y de mano de obra",
    "Cumplimiento con el código de construcción local y presentación de permisos",
  ],
  realQuoteCallout: "Elementos faltantes = protección faltante. Cada partida importa.",
  ourQuoteH3: "Nuestro Presupuesto Incluye los 13",
  ourQuoteP: "Cuando le entregamos una propuesta, cada punto anterior está cubierto. Fotos de la inspección. Especificaciones de materiales. Términos de garantía claros. Sin suposiciones.",
  ourQuoteItems: [
    "Propuesta escrita con partidas detalladas",
    "Fotos de su techo real",
    "Múltiples opciones de materiales",
    "Información de financiamiento disponible",
    "Asistencia con reclamaciones de seguro si aplica",
  ],
  ourQuoteBtn: "Empiece Aquí — Es Gratis",
  ourQuoteDisclaimer: "Sin compromiso. Sin presión.",

  // Cost drivers section
  costLabel: "Conozca Antes de Comprar",
  costH2: "Qué Realmente Afecta el Costo de un Techo en South Carolina",
  costP: "Los precios de techado en el Lowcountry están impulsados por factores específicos de nuestro clima costero — exposición a huracanes, aire salino, humedad y códigos de construcción que superan los estándares del interior. Esto es lo que mueve el número.",
  costFooter: "Los presupuestos telefónicos nunca son presupuestos reales. Cualquier número dado sin ver su techo específico es una suposición — y las suposiciones llevan a sorpresas.",

  // #1 thing homeowners want
  goal1Label: "El Objetivo Real",
  goal1H2: "Lo #1 que Todo Propietario Quiere",
  goal1P1: "No el número más barato. No la instalación más rápida. No el discurso de ventas más llamativo.",
  goal1Word: "Confianza.",
  goal1Items: [
    {
      title: "Precios justos que pueden verificar",
      body: "Un número que refleje las tarifas reales del mercado — no el margen de ganancia de un solo contratista.",
    },
    {
      title: "Calidad que pueden ver y documentar",
      body: "Fotos antes, durante y después. Un techo sobre el que no tenga que preguntarse nada.",
    },
    {
      title: "Comunicación clara durante todo el proceso",
      body: "Sepa qué está pasando, cuándo está pasando y qué viene después.",
    },
    {
      title: "Durabilidad en la que pueden confiar",
      body: "Materiales e instalación que resisten la temporada de huracanes — no solo el buen tiempo.",
    },
    {
      title: "Un hogar protegido del que pueden estar orgullosos",
      body: "Atractivo visual y protección estructural en un mismo paquete.",
    },
    {
      title: "Una decisión financiera sólida",
      body: "El alcance correcto, en el nivel correcto, para su presupuesto real — sin sobrevender ni subvender.",
    },
  ],
  goal1Footer: "Eso es lo que nos proponemos entregar. No solo un techo — tranquilidad y un camino a seguir. El presupuesto instantáneo es el primer paso para lograrlo sin el estrés.",

  // Good quote checklist
  checklistLabel: "Lista de Verificación Práctica",
  checklistH2: "Cómo Saber que Está Obteniendo un Buen Presupuesto",
  checklistH3: "Un contratista que vale la pena contratar:",
  checklistItems: [
    "Documenta su techo existente con fotos — antes de presupuestar",
    "Explica sus opciones de materiales en términos claros, no en jerga",
    "Justifica cada costo sin que se lo pidan",
    "Ofrece al menos dos o tres niveles de productos",
    "Le explica la garantía — del fabricante Y de mano de obra",
    "Habla sobre la ventilación de su ático y por qué importa",
    "Responde cada pregunta sin apresurarlo hacia una firma",
    "Le describe qué sucede antes, durante y después de la instalación",
    "Le deja sintiéndose informado — no presionado",
  ],
  advantageH3: "Por Qué un Presupuesto Instantáneo le Da una Ventaja",
  advantageP: "La mayoría de los propietarios van a las reuniones con contratistas sin una línea base — por lo que no pueden distinguir un presupuesto justo de uno inflado. El presupuesto instantáneo cambia eso.",
  advantageItems: [
    "Llega con un número real, no con la mente en blanco",
    "Puede comparar inteligentemente presupuestos de múltiples empresas",
    "Las ofertas demasiado bajas se vuelven señales de alerta obvias, no ofertas emocionantes",
    "Sabe si la reparación o el reemplazo tiene sentido financiero",
    "Entiende qué significa la complejidad para su techo específico",
    "Puede hacer mejores preguntas — y detectar respuestas incompletas",
  ],
  advantageFooter: "Piense en el presupuesto instantáneo como una base, una brújula y un impulso de confianza — todo en uno.",

  // Red flags
  redFlagsLabel: "Protéjase",
  redFlagsH2: "Señales de Alerta en Presupuestos de Techo Baratos",
  redFlagsP: "Los precios bajos son atractivos. Pero en techado, barato generalmente significa que algo se omitió — y no lo sabrá hasta después de una tormenta tropical.",
  redFlags: [
    {
      n: "1",
      title: "Sin mención de ventilación",
      body: "La ventilación adecuada del ático es fundamental en el calor y la humedad de South Carolina. Un contratista que omite este tema está dejando su nuevo techo en riesgo de falla prematura desde adentro hacia afuera.",
    },
    {
      n: "2",
      title: "Solo una capa de subsuelo propuesta",
      body: "En un clima costero con exposición a huracanes, el subsuelo sintético combinado con membrana autoadhesiva de hielo y agua en los aleros es el estándar. Una sola capa no es suficiente.",
    },
    {
      n: "3",
      title: "Sin discusión sobre su cubierta",
      body: "No pueden conocer el estado de su cubierta sin retirar el techo viejo. Un contratista que no menciona esto no planea revisar — ni ser responsable de lo que encuentre.",
    },
    {
      n: "4",
      title: "Sin fotos, sin documentación",
      body: "Si pueden presupuestarle sin inspeccionar su techo y documentar lo que ven, el presupuesto no está basado en su techo. Es una suposición.",
    },
    {
      n: "5",
      title: "Presupuestos solo verbales sin desglose escrito",
      body: "\"Lo hacemos por $11,500\" no es una propuesta. Un contratista legítimo proporciona una propuesta escrita con partidas detalladas que usted puede revisar, comparar y consultar.",
    },
    {
      n: "6",
      title: "Tácticas de presión y precios con tiempo limitado",
      body: "\"Este precio solo es válido hasta el viernes\" es una táctica de manipulación de ventas, no una realidad del negocio. Los precios de un contratista de calidad no vencen en una fecha límite.",
    },
    {
      n: "7",
      title: "Información de garantía faltante o vaga",
      body: "Cada propuesta debe distinguir claramente entre la garantía de tejas del fabricante y la garantía de mano de obra del contratista. Si no pueden explicar ambas — eso es un problema.",
    },
  ],
  redFlagsFooter: "Los presupuestos baratos ganan trabajos. Rara vez generan satisfacción duradera.",

  // Repair or replace
  repairLabel: "Orientación Honesta",
  repairH2: "¿Reparar o Reemplazar?",
  repairSubtitle: "Aquí Está el Análisis Honesto",
  repairP: "Es una pregunta normal. La respuesta depende de la edad, el estado de su techo y cuáles son sus objetivos. Los buenos contratistas le ayudan a reflexionar sobre ello — no lo empujan hacia la opción más costosa.",
  repairWhenH3: "Una reparación tiene sentido cuando:",
  repairWhenItems: [
    "El daño está aislado en una sección o plano",
    "Las tejas siguen siendo flexibles y conservan los gránulos",
    "El techo tiene menos de 10–12 años",
    "Los daños por tormenta son limitados a un área pequeña",
    "El problema es una falla aislada del tapajuntas, no de las tejas",
  ],
  replaceWhenH3: "Un reemplazo completo tiene sentido cuando:",
  replaceWhenItems: [
    "Las tejas están quebradizas, encorvadas o perdiendo gránulos ampliamente",
    "Múltiples áreas muestran desgaste o puntos de filtración",
    "El techo tiene 15–25+ años",
    "El ático muestra historial de mala ventilación",
    "El seguro cubre daños por tormenta",
    "Planea vender o refinanciar en los próximos 5 años",
  ],
  repairFooter: "Un contratista de confianza le muestra la evidencia — y le deja tomar la decisión. Traemos fotos y explicamos lo que vemos, no lo que queremos vender.",

  // Financing
  finLabel: "Opciones Financieras",
  finH2: "Cómo el Financiamiento se Integra en un Presupuesto de Techo",
  finP: "La mayoría de los propietarios no han presupuestado específicamente para el reemplazo de un techo — y eso es completamente normal. Así es como suelen funcionar los números.",
  finItems: [
    {
      title: "El seguro cubre el daño",
      body: "Su costo de bolsillo es típicamente su deducible — frecuentemente $1,000–$2,500. Trabajamos con todas las aseguradoras principales y documentamos todo lo que el ajustador necesita.",
    },
    {
      title: "Sin cobertura de seguro involucrada",
      body: "Ofrecemos opciones de financiamiento que le permiten distribuir el costo en el tiempo con pagos manejables. Pregúntenos sobre las tasas y condiciones actuales.",
    },
    {
      title: "Desea mejorar sus materiales",
      body: "El paso de un nivel intermedio a uno premium suele ser $2,000–$4,000 — una pequeña diferencia de pago mensual que compra protección significativa a largo plazo.",
    },
    {
      title: "Necesita tiempo para decidir",
      body: "No hay prisa. Nuestros presupuestos no vencen y no presionamos con plazos artificiales. Planifique a su propio ritmo.",
    },
  ],
  finLink: "Ver todas las opciones de financiamiento",

  // What happens after
  processLabel: "Nuestro Proceso",
  processH2: "Qué Sucede Después de Su Presupuesto Instantáneo",
  processP: "La herramienta le da un número. Así es el camino a seguir — al ritmo que le funcione.",

  // Brand promise / CTA
  promiseLabel: "Nuestra Promesa",
  promiseH2a: "Un Presupuesto de Techo Debe Hacerle Sentir Una Cosa:",
  promiseH2b: "Alivio.",
  promiseP: "Su hogar es su nido — su mayor inversión y el lugar al que regresa su familia. Tomamos eso en serio. No con presión, sino con proceso.",
  promiseItems: [
    "Comunicación clara en cada etapa",
    "Precios transparentes — sin costos ocultos",
    "Fotos que documentan todo el trabajo realizado",
    "Su tiempo siempre respetado",
    "Cero tácticas de alta presión, nunca",
    "Un techo que protege lo que más importa",
  ],
  promiseTagline: "Protegemos su hogar — y hacemos que el proceso sea tranquilo, no caótico.",
  promiseCTABtn: "Obtenga Su Presupuesto Gratuito Instantáneo",
  promiseFooterTrust: "Contratista de Techado con Licencia · RBS 67027 · Mount Pleasant, SC · Empresa Familiar",

  // Breadcrumb / footer nav
  breadcrumbHome: "Inicio",
  breadcrumbCurrent: "Presupuesto Instantáneo de Techo",
  breadcrumbServices: "Servicios de Techado",
  breadcrumbMaterials: "Comparación de Materiales",
  breadcrumbFinancing: "Financiamiento",
  breadcrumbContact: "Contacto",
};

// ─── Main Component ───────────────────────────────────────────────────────────

export default function RoofQuoteContent() {
  const { lang } = useLanguage();
  const es = lang === "es";

  const activeTiers = es ? SHINGLE_TIERS_ES : SHINGLE_TIERS;
  const activeCostDrivers = es ? COST_DRIVERS_ES : COST_DRIVERS;
  const activeProcessSteps = es ? PROCESS_STEPS_ES : PROCESS_STEPS;

  return (
    <main>
      {/* ── HERO ── */}
      <section className="bg-navy relative overflow-hidden min-h-[60svh] flex items-center">
        <div className="absolute inset-0">
          <Image
            src="/images/roofrecon-pair2-clean.webp"
            alt="Aerial roof measurement and analysis"
            fill
            className="object-cover opacity-100"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/20 to-transparent" />
        </div>
        <div className="container relative z-10 py-20 md:py-28">
          <div className="max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 bg-amber/20 border border-amber/30 rounded-full px-4 py-1.5 mb-6"
            >
              <Zap className="w-3.5 h-3.5 text-amber" />
              <span className="text-amber text-xs font-semibold uppercase tracking-widest">
                {es ? RQ_ES.heroBadge : "Instant Roof Quote"}
              </span>
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 }}
              className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight mb-5"
            >
              {es ? RQ_ES.heroH1a : "Most roofing companies start with pressure."}{" "}
              <span className="text-amber">
                {es ? RQ_ES.heroH1b : "We start with transparency."}
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-white/80 text-base md:text-lg leading-relaxed mb-8 max-w-xl"
            >
              {es
                ? RQ_ES.heroP
                : "Get a real price estimate for your Lowcountry home in under 60 seconds — no appointment, no jargon, no games. Family-owned. Licensed. Honest."}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15 }}
              className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mb-10"
            >
              <QuoteButton label={es ? RQ_ES.heroCTABtn : "Get Your Instant Quote Now"} />
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-white/30 text-white text-base font-semibold hover:bg-white/10 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
            </motion.div>

            {/* Trust row */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-white/60"
            >
              {(es ? RQ_ES.trustBadges : [
                "Family Owned & Operated",
                "License RBS 67027",
                "5.0★ Google Rating",
                "24/7 Emergency Service",
              ]).map((t) => (
                <span key={t} className="flex items-center gap-1.5">
                  <CheckCircle className="w-3.5 h-3.5 text-amber flex-shrink-0" />
                  {t}
                </span>
              ))}
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── QUOTE TOOL SECTION ── */}
      <section id="get-quote" className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.toolSectionLabel : "The Tool That Changes Everything"}
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                {es ? RQ_ES.toolH2 : "Get a Roof Quote You Can Trust — Fast"}
              </h2>
              <div className="flex items-center justify-center gap-3 mb-6">
                <span className="block h-px w-12 bg-amber/40" />
                <Image src="/images/rr-sc-ridge-logo-v3.webp" alt="" aria-hidden width={20} height={20} sizes="20px" className="h-5 w-auto opacity-80" style={{ mixBlendMode: "multiply" }} />
                <span className="block h-px w-12 bg-amber/40" />
              </div>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-4">
                {es
                  ? RQ_ES.toolP1
                  : "Most Lowcountry homeowners get the same experience: one company quotes $11,000, another quotes $19,000, and nobody explains why. Our instant quote tool uses satellite measurements of your actual home to give you a real price range — before anyone steps foot on your property."}
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                {es
                  ? RQ_ES.toolP2
                  : `No salesperson showing up unannounced. No high-pressure tactics. No vague "it depends" non-answers. Just a transparent number you can actually use to plan.`}
              </p>
            </div>

            {/* Tool preview */}
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden mb-6">
              <div className="px-5 pt-5 pb-3 border-b border-gray-100">
                <p className="text-xs font-semibold text-gray-400 uppercase tracking-widest">
                  {es
                    ? RQ_ES.toolPreviewCaption
                    : "Here’s what it looks like — enter your address and this is what you’ll see:"}
                </p>
              </div>
              <Image
                src="/images/roofle-tool-preview.webp"
                alt="Satellite roof measurement tool showing a Lowcountry home with roof sections highlighted and measured"
                width={1052}
                height={846}
                className="w-full h-auto"
                sizes="(max-width: 768px) 100vw, 768px"
              />
              {/* Measurement detail cards */}
              <div className="px-5 py-4 bg-gray-50 border-t border-gray-100">
                <p className="text-xs font-semibold text-navy mb-3">
                  {es ? RQ_ES.toolRoofDetails : "Your Roof Details"}
                </p>
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0">
                      <Home className="w-4 h-4 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        {es ? RQ_ES.toolMainRoof : "Main Roof"}
                      </p>
                      <p className="text-amber font-bold text-base">3,240 sq ft</p>
                      <p className="text-gray-400 text-xs">
                        {es ? RQ_ES.toolSteepSlope : "Steep Slope"}
                      </p>
                    </div>
                  </div>
                  <div className="bg-white rounded-xl border border-gray-100 p-4 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-lg bg-amber/10 flex items-center justify-center flex-shrink-0">
                      <Home className="w-4 h-4 text-amber" />
                    </div>
                    <div>
                      <p className="font-semibold text-navy text-sm">
                        {es ? RQ_ES.toolSecondRoof : "Second Roof"}
                      </p>
                      <p className="text-amber font-bold text-base">260 sq ft</p>
                      <p className="text-gray-400 text-xs">
                        {es ? RQ_ES.toolMediumSlope : "Medium Slope"}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-xs text-gray-400 mt-3 text-center">
                  {es
                    ? RQ_ES.toolSatelliteNote
                    : "Satellite measurement identifies each roof section automatically — no one needs to visit your home first."}
                </p>
              </div>
            </div>

            <div className="text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-4">
                <QuoteButton label={es ? RQ_ES.toolCTAButton : "Get My Satellite Roof Measurement →"} />
                <a
                  href={`tel:${COMPANY.phoneRaw}`}
                  className="inline-flex items-center gap-2 text-navy text-sm font-semibold hover:text-amber transition-colors"
                >
                  <Phone className="w-4 h-4" />
                  {es ? RQ_ES.toolPreferCall : "Prefer to talk?"} {COMPANY.phone}
                </a>
              </div>
              <p className="text-xs text-gray-500">
                {es
                  ? RQ_ES.toolDisclaimer
                  : "Free. No appointment. Estimates are ranges — a free inspection confirms exact scope."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── SHINGLE TIERS / "WHAT YOUR ROOF COULD LOOK LIKE" ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              {es ? RQ_ES.tiersLabel : "See Your Options"}
            </span>
            <h2 className="font-display section-title text-navy mb-4">
              {es ? RQ_ES.tiersH2 : "What Would Your New Roof Look Like?"}
            </h2>
            <p className="text-gray-600 text-base md:text-lg leading-relaxed">
              {es
                ? RQ_ES.tiersP
                : "Browse our three shingle tiers — each with a real price range and an actual photo of the product on a home. Shop before you call."}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {activeTiers.map((tier, i) => (
              <motion.div
                key={tier.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className={`relative rounded-2xl border-2 ${tier.borderColor} bg-white overflow-hidden shadow-md hover:shadow-xl transition-shadow duration-300 group`}
              >
                {tier.popular && (
                  <div className="absolute top-4 right-4 z-10 bg-amber text-black text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full">
                    {es ? RQ_ES.tiersMostPopular : "Most Popular"}
                  </div>
                )}

                {/* House photo */}
                <div className="relative h-52 overflow-hidden">
                  <Image
                    src={tier.houseImage}
                    alt={`${tier.name} shingle on a Charleston home`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <div className={`absolute bottom-3 left-3 ${tier.badgeColor} text-xs font-bold uppercase tracking-widest px-3 py-1 rounded-full`}>
                    {tier.label}
                  </div>
                </div>

                <div className="p-6">
                  <p className="text-xs font-semibold uppercase tracking-widest text-gray-400 mb-1">
                    {tier.tier}
                  </p>
                  <h3 className="font-display text-xl font-bold text-navy mb-1">
                    {tier.name}
                  </h3>
                  <p className="text-sm text-gray-500 italic mb-4">{tier.tagline}</p>

                  <p className="text-sm text-gray-700 leading-relaxed mb-5">
                    {tier.description}
                  </p>

                  {/* Specs row */}
                  <div className="grid grid-cols-2 gap-3 mb-5">
                    <div className="bg-linen rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-0.5">
                        {es ? RQ_ES.tiersWindRating : "Wind Rating"}
                      </p>
                      <p className="text-sm font-bold text-navy">{tier.windRating}</p>
                    </div>
                    <div className="bg-linen rounded-lg p-3 text-center">
                      <p className="text-xs text-gray-500 mb-0.5">
                        {es ? RQ_ES.tiersLifespan : "Lifespan"}
                      </p>
                      <p className="text-sm font-bold text-navy">{tier.lifespan}</p>
                    </div>
                  </div>

                  {/* Highlights */}
                  <ul className="space-y-2 mb-6">
                    {tier.highlights.map((h) => (
                      <li key={h} className="flex items-start gap-2 text-sm text-gray-700">
                        <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                        {h}
                      </li>
                    ))}
                  </ul>

                  {/* Price */}
                  <div className="border-t border-gray-100 pt-5">
                    <p className="text-xs text-gray-500 mb-1">
                      {es ? RQ_ES.tiersEstRange : "Estimated Installed Range"}
                    </p>
                    <p className={`font-display text-2xl font-bold ${tier.accentColor}`}>
                      {tier.priceRange}
                    </p>
                    <p className="text-xs text-gray-400 mt-0.5">{tier.priceNote}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-sm text-gray-500 mb-4">
              {es
                ? RQ_ES.tiersCTA
                : "Prices vary by roof size, pitch, and complexity. Get your exact number →"}
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteButton size="md" label={es ? RQ_ES.tiersQuoteBtn : "Get My Instant Quote"} />
              <Link
                href="/materials-comparison"
                className="text-sm font-semibold text-navy hover:text-amber transition-colors inline-flex items-center gap-1"
              >
                {es ? RQ_ES.tiersCompareLink : "Full Materials Comparison"} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY ROOF QUOTES FEEL STRESSFUL ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-4">
                {es ? RQ_ES.stressLabel : "We Get It"}
              </span>
              <h2 className="font-display section-title text-navy mb-6">
                {es ? RQ_ES.stressH2 : "Why Getting a Roof Quote Feels Stressful"}
              </h2>
              <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
                {es
                  ? RQ_ES.stressP
                  : "Most Lowcountry homeowners replace their roof once or twice in a lifetime. That means you’re making a $10,000–$25,000+ decision with almost no experience — and an industry that historically hasn’t made it easy to understand what you’re paying for."}
              </p>

              <ul className="space-y-4 mb-8">
                {(es ? RQ_ES.stressItems : [
                  "Quotes that vary by $5,000–$8,000 with no explanation why",
                  "Roofing jargon designed to confuse, not inform",
                  `High-pressure tactics and time-limited "deals"`,
                  `"That’s just what it costs" when you ask for a breakdown`,
                  "Slow or no-show contractors who won’t give straight answers",
                  "No photos, no documentation, just a number on a napkin",
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <AlertTriangle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="text-gray-600 text-sm italic leading-relaxed border-l-2 border-amber/40 pl-4">
                {es
                  ? RQ_ES.stressQuote
                  : `"Hope isn’t a strategy. When you’re spending this kind of money on your home, you deserve a number you can actually trust — and a contractor who explains the why behind it."`}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative flex flex-col gap-4"
            >
              <div className="relative rounded-2xl overflow-hidden shadow-lg">
                <Image
                  src="/images/why-quotes-vary-infographic.png"
                  alt="Why roof quotes can vary by thousands — infographic showing what's included in low, complete, and high quotes"
                  width={960}
                  height={960}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="bg-linen border border-amber/20 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber fill-amber" />
                  ))}
                </div>
                <p className="text-gray-700 text-sm leading-relaxed">
                  {es
                    ? RQ_ES.stressTestimonial
                    : `"Restoration Roofing is an amazing roofing company. From the start to the end of the process, by far, customer service is excellent."`}
                </p>
                <p className="text-gray-500 text-xs mt-2">
                  {es ? RQ_ES.stressTestimonialAuthor : "— Emy Phillips"}
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT OUR TOOL CHANGES ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.toolChangesLabel : "Our Approach"}
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                {es ? RQ_ES.toolChangesH2 : "The Tool Above Changes Everything"}
              </h2>
            </div>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-6">
              {es
                ? RQ_ES.toolChangesP
                : "Our instant quote tool is powered by RoofQuote PRO™ satellite measurement technology — the same platform used by leading roofing contractors across the country. Here’s what that means for you:"}
            </p>

            <div className="space-y-5 mb-8">
              {(es
                ? RQ_ES.toolChangesItems.map((item, idx) => ({
                    icon: ([Home, DollarSign, Shield, Clock, FileText] as const)[idx],
                    ...item,
                  }))
                : [
                    {
                      icon: Home,
                      title: "Your actual roof, measured from satellite",
                      body: "We don’t guess square footage. The tool pulls satellite imagery and calculates real measurements of your specific home.",
                    },
                    {
                      icon: DollarSign,
                      title: "A real price range — not a bait number",
                      body: "The estimate reflects current Charleston-area material and labor costs for your roof size and the shingle tier you choose.",
                    },
                    {
                      icon: Shield,
                      title: "Transparent, line-by-line breakdown",
                      body: "You can see what drives the cost — tear-off, materials, labor, disposal. No black box pricing.",
                    },
                    {
                      icon: Clock,
                      title: "No scheduling, no waiting",
                      body: "Get a number in under 60 seconds. No appointment. No salesperson in your driveway before you’re ready.",
                    },
                    {
                      icon: FileText,
                      title: "A starting point, not a final number",
                      body: "The instant quote gives you a planning range. Our free inspection confirms the exact scope — especially for older roofs, complex pitches, or decking concerns.",
                    },
                  ]
              ).map(({ icon: Icon, title, body }) => (
                <div key={title} className="flex items-start gap-4 bg-white rounded-xl p-5 shadow-sm">
                  <div className="w-10 h-10 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-5 h-5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1">{title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <p className="text-gray-500 text-sm mb-4">
                {es
                  ? RQ_ES.toolChangesFooter
                  : "It’s the first step toward confidence — not commitment."}
              </p>
              <QuoteButton size="md" label={es ? RQ_ES.toolChangesBtn : "Get My Price Range →"} />
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT A REAL QUOTE SHOULD INCLUDE ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div>
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.realQuoteLabel : "Buyer Education"}
              </span>
              <h2 className="font-display section-title text-navy mb-2">
                {es ? RQ_ES.realQuoteH2 : "What a Real Roof Quote Should Include"}
              </h2>
              <p className="text-amber font-semibold italic mb-6">
                {es ? `(${RQ_ES.realQuoteSubtitle})` : "(Most Don’t)"}
              </p>

              <p className="text-gray-700 text-base leading-relaxed mb-6">
                {es
                  ? RQ_ES.realQuoteP
                  : "A legitimate written proposal — whether you hire us or someone else — should cover all of the following. If a contractor hands you a single number without explanation, that’s your first red flag."}
              </p>

              <ul className="space-y-3">
                {(es ? RQ_ES.realQuoteItems : [
                  "Total square footage of your roof, verified",
                  "Number of existing shingle layers (affects tear-off cost)",
                  "Roof pitch / steepness classification",
                  "Underlayment type and specifications",
                  "Ice & water shield coverage plan (critical near the coast)",
                  "Ventilation assessment and upgrade plan",
                  "Flashing details — chimney, valleys, pipe boots",
                  "Decking condition and replacement scope",
                  "Material brand, product line, and color selection",
                  "Tear-off and disposal included or separate",
                  "Labor breakdown with crew scope",
                  "Manufacturer and workmanship warranty details",
                  "Local building code compliance and permit filing",
                ]).map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </li>
                ))}
              </ul>

              <p className="mt-8 text-navy font-bold text-base border-l-4 border-amber pl-4">
                {es ? RQ_ES.realQuoteCallout : "Missing items = missing protection. Every line matters."}
              </p>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="lg:sticky lg:top-24 flex flex-col gap-5"
            >
              <div className="bg-amber/10 border border-amber/20 rounded-2xl p-5">
                <h3 className="font-display text-xl font-bold text-navy mb-2">
                  {es ? RQ_ES.ourQuoteH3 : "Our Quote Includes All 13"}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  {es
                    ? RQ_ES.ourQuoteP
                    : "When we hand you a proposal, every line above is covered. Photos from the inspection. Material specs. Clear warranty terms. No guessing."}
                </p>
                <div className="space-y-2 mb-5">
                  {(es ? RQ_ES.ourQuoteItems : [
                    "Written, line-item proposal",
                    "Photos from your actual roof",
                    "Multiple material options",
                    "Financing information available",
                    "Insurance claim assistance if applicable",
                  ]).map((item) => (
                    <div key={item} className="flex items-center gap-2.5">
                      <CheckCircle className="w-4 h-4 text-amber flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
                <QuoteButton size="md" label={es ? RQ_ES.ourQuoteBtn : "Start Here — It’s Free"} />
                <p className="text-gray-400 text-xs mt-2">
                  {es ? RQ_ES.ourQuoteDisclaimer : "No commitment. No pressure."}
                </p>
              </div>

              <div className="rounded-2xl overflow-hidden shadow-md">
                <Image
                  src="/images/what-real-quote-includes-infographic.webp"
                  alt="What a real roof quote includes — diagram showing 7 components: shingles, underlayment, ice & water shield, ventilation, decking, flashing, and ridge & valleys"
                  width={1448}
                  height={1086}
                  className="w-full h-auto"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── WHAT DRIVES ROOF COSTS IN SC ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              {es ? RQ_ES.costLabel : "Know Before You Shop"}
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              {es ? RQ_ES.costH2 : "What Really Affects the Cost of a Roof in South Carolina"}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {es
                ? RQ_ES.costP
                : "Roof pricing in the Lowcountry is driven by factors specific to our coastal climate — hurricane exposure, salt air, humidity, and building codes that exceed inland standards. Here’s what moves the number."}
            </p>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto rounded-2xl overflow-hidden shadow-md"
          >
            <Image
              src="/images/what-drives-roof-cost-infographic.webp"
              alt="What drives roof cost in coastal South Carolina — 8 factors: roof size, pitch, complexity, tear-off vs overlay, shingle tier, hurricane prep, decking condition, and ventilation"
              width={1448}
              height={1086}
              className="w-full h-auto"
              sizes="(max-width: 768px) 100vw, 896px"
            />
          </motion.div>

          <p className="text-center text-gray-400 text-sm mt-8 max-w-lg mx-auto">
            {es
              ? RQ_ES.costFooter
              : "Phone quotes are never real quotes. Any number given without seeing your specific roof is a guess — and guesses lead to surprises."}
          </p>
        </div>
      </section>

      {/* ── THE #1 THING HOMEOWNERS WANT ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              {es ? RQ_ES.goal1Label : "The Real Goal"}
            </span>
            <h2 className="font-display section-title text-navy mb-6">
              {es ? RQ_ES.goal1H2 : "The #1 Thing Every Homeowner Wants"}
            </h2>
            <p className="text-gray-600 text-lg leading-relaxed mb-4">
              {es
                ? RQ_ES.goal1P1
                : "Not the cheapest number. Not the fastest install. Not the slickest sales pitch."}
            </p>
            <p className="font-display text-5xl font-bold text-amber mb-8">
              {es ? RQ_ES.goal1Word : "Confidence."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-left mb-10">
              {(es
                ? RQ_ES.goal1Items.map((item, idx) => ({
                    icon: ([DollarSign, Shield, FileText, Clock, Home, Star] as const)[idx],
                    ...item,
                  }))
                : [
                    {
                      icon: DollarSign,
                      title: "Fair pricing they can verify",
                      body: "A number that reflects real market rates — not one contractor’s margin target.",
                    },
                    {
                      icon: Shield,
                      title: "Quality they can see and document",
                      body: "Photos before, during, and after. A roof you don’t have to wonder about.",
                    },
                    {
                      icon: FileText,
                      title: "Clear communication throughout",
                      body: "Know what’s happening, when it’s happening, and what comes next.",
                    },
                    {
                      icon: Clock,
                      title: "Longevity they can count on",
                      body: "Materials and installation that hold up through hurricane season — not just good weather.",
                    },
                    {
                      icon: Home,
                      title: "A protected home they can be proud of",
                      body: "Curb appeal and structural protection in the same package.",
                    },
                    {
                      icon: Star,
                      title: "A sound financial decision",
                      body: "The right scope, at the right tier, for their actual budget — not oversold, not undersold.",
                    },
                  ]
              ).map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-white rounded-xl p-5 shadow-sm flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1">{title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-gray-600 text-base leading-relaxed">
              {es
                ? RQ_ES.goal1Footer
                : "That’s what we aim to deliver. Not just a roof — peace of mind and a path forward. The instant quote is the first step toward getting there without the stress."}
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW TO KNOW YOU HAVE A GOOD QUOTE ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.checklistLabel : "Practical Checklist"}
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                {es ? RQ_ES.checklistH2 : "How to Know You’re Getting a Good Quote"}
              </h2>
            </div>

            <div className="bg-linen rounded-2xl p-8 mb-10">
              <h3 className="font-display text-xl font-bold text-navy mb-6">
                {es ? RQ_ES.checklistH3 : "A contractor worth hiring will:"}
              </h3>
              <div className="space-y-4">
                {(es ? RQ_ES.checklistItems : [
                  "Document your existing roof with photos — before quoting",
                  "Explain your material options in plain English, not jargon",
                  "Justify every cost line without being asked",
                  "Offer at least two or three product tiers",
                  "Walk you through the warranty — manufacturer AND workmanship",
                  "Discuss your attic ventilation and why it matters",
                  "Answer every question without rushing you toward a signature",
                  "Outline what happens before, during, and after install",
                  "Leave you feeling informed — not pressured",
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-5 h-5 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-linen border border-amber/20 rounded-2xl p-8">
              <h3 className="font-display text-xl font-bold text-navy mb-4">
                {es ? RQ_ES.advantageH3 : "Why an Instant Quote Gives You an Advantage"}
              </h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-5">
                {es
                  ? RQ_ES.advantageP
                  : "Most homeowners go into contractor meetings with no baseline — so they can’t tell a fair quote from an inflated one. The instant quote changes that."}
              </p>
              <div className="space-y-3 mb-6">
                {(es ? RQ_ES.advantageItems : [
                  "You arrive with a real number, not a blank slate",
                  "You can intelligently compare quotes from multiple companies",
                  "Lowball offers become obvious red flags, not exciting deals",
                  "You know whether repair or replacement makes financial sense",
                  "You understand what complexity means for your specific roof",
                  "You can ask better questions — and spot incomplete answers",
                ]).map((item) => (
                  <div key={item} className="flex items-start gap-3">
                    <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                    <span className="text-gray-700 text-sm">{item}</span>
                  </div>
                ))}
              </div>
              <p className="text-gray-500 text-xs italic">
                {es
                  ? RQ_ES.advantageFooter
                  : "Think of the instant quote as a baseline, a compass, and a confidence booster — all in one."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── RED FLAGS ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.redFlagsLabel : "Protect Yourself"}
              </span>
              <h2 className="font-display section-title text-navy mb-5">
                {es ? RQ_ES.redFlagsH2 : "Red Flags in Cheap Roof Quotes"}
              </h2>
              <p className="text-gray-600 text-base leading-relaxed">
                {es
                  ? RQ_ES.redFlagsP
                  : "Low prices are appealing. But in roofing, cheap usually means something got left out — and you won’t find out until after a tropical storm."}
              </p>
            </div>

            <div className="space-y-4">
              {(es ? RQ_ES.redFlags : [
                {
                  n: "1",
                  title: "No mention of ventilation",
                  body: "Proper attic ventilation is critical in South Carolina’s heat and humidity. A contractor who skips this topic is leaving your new roof at risk of premature failure from the inside out.",
                },
                {
                  n: "2",
                  title: "Only one layer of underlayment proposed",
                  body: "In a coastal climate with hurricane exposure, synthetic underlayment paired with self-adhering ice & water shield at the eaves is standard. One layer is not enough.",
                },
                {
                  n: "3",
                  title: "No discussion of your decking",
                  body: "They can’t know your decking condition without tearing off the old roof. A contractor who doesn’t mention this isn’t planning to check — or to be accountable for what they find.",
                },
                {
                  n: "4",
                  title: "No photos, no documentation",
                  body: "If they can quote you without inspecting your roof and documenting what they see, the quote isn’t based on your roof. It’s a guess.",
                },
                {
                  n: "5",
                  title: "Verbal-only quotes with no written breakdown",
                  body: `"We’ll do it for $11,500" is not a proposal. A legitimate contractor provides a written, line-item proposal you can review, compare, and refer back to.`,
                },
                {
                  n: "6",
                  title: "Pressure tactics and time-limited pricing",
                  body: `"This price is only good until Friday" is a sales manipulation tactic, not a business reality. A quality contractor’s pricing doesn’t expire on a deadline.`,
                },
                {
                  n: "7",
                  title: "Missing or vague warranty information",
                  body: "Every proposal should clearly distinguish between the manufacturer’s shingle warranty and the contractor’s workmanship warranty. If they can’t explain both — that’s a problem.",
                },
              ]).map((flag) => (
                <div
                  key={flag.n}
                  className="flex items-start gap-4 bg-red-50 border border-red-100 rounded-xl p-5"
                >
                  <div className="w-8 h-8 rounded-full bg-red-100 border border-red-200 flex items-center justify-center flex-shrink-0">
                    <XCircle className="w-4 h-4 text-red-500" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy mb-1.5">{flag.title}</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">{flag.body}</p>
                  </div>
                </div>
              ))}
            </div>

            <p className="text-center text-gray-400 text-sm mt-8">
              {es ? RQ_ES.redFlagsFooter : "Cheap quotes win jobs. They rarely win lasting satisfaction."}
            </p>
          </div>
        </div>
      </section>

      {/* ── REPAIR OR REPLACE? ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-10">
              <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
                {es ? RQ_ES.repairLabel : "Honest Guidance"}
              </span>
              <h2 className="font-display section-title text-navy mb-4">
                {es ? RQ_ES.repairH2 : "Repair or Replace?"}
              </h2>
              <p className="text-amber font-semibold italic mb-5">
                {es ? RQ_ES.repairSubtitle : "Here’s the Honest Breakdown"}
              </p>
              <p className="text-gray-600 text-base leading-relaxed">
                {es
                  ? RQ_ES.repairP
                  : "It’s a normal question. The answer depends on your roof’s age, condition, and what your goals are. Good contractors help you think through it — they don’t push you toward the more expensive option."}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-sage/20 border border-sage/40 flex items-center justify-center">
                    <CheckCircle className="w-3.5 h-3.5 text-sage" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    {es ? RQ_ES.repairWhenH3 : "A repair makes sense when:"}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(es ? RQ_ES.repairWhenItems : [
                    "Damage is isolated to one section or slope",
                    "Shingles are still flexible and granules intact",
                    "Roof is under 10–12 years old",
                    "Storm damage is limited to a small area",
                    "Problem is isolated flashing failure, not shingle failure",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <CheckCircle className="w-4 h-4 text-sage flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-6 h-6 rounded-full bg-amber/20 border border-amber/40 flex items-center justify-center">
                    <ArrowRight className="w-3.5 h-3.5 text-amber" />
                  </div>
                  <h3 className="font-display text-lg font-bold text-navy">
                    {es ? RQ_ES.replaceWhenH3 : "A full replacement makes sense when:"}
                  </h3>
                </div>
                <ul className="space-y-3">
                  {(es ? RQ_ES.replaceWhenItems : [
                    "Shingles are brittle, curling, or losing granules widely",
                    "Multiple areas showing wear or leak points",
                    "Roof is 15–25+ years old",
                    "Attic shows poor ventilation history",
                    "Insurance claim is covering storm damage",
                    "You’re planning to sell or refinance within 5 years",
                  ]).map((item) => (
                    <li key={item} className="flex items-start gap-2.5 text-sm text-gray-700">
                      <ArrowRight className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <p className="text-center text-gray-500 text-sm mt-8">
              {es
                ? RQ_ES.repairFooter
                : "A trustworthy contractor shows you the evidence — and lets you make the call. We bring photos and explain what we see, not what we want to sell."}
            </p>
          </div>
        </div>
      </section>

      {/* ── FINANCING ── */}
      <section className="bg-white section-padding">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              {es ? RQ_ES.finLabel : "Financial Options"}
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              {es ? RQ_ES.finH2 : "How Financing Fits Into a Roof Quote"}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed mb-8">
              {es
                ? RQ_ES.finP
                : "Most homeowners haven’t budgeted specifically for a roof replacement — and that’s completely normal. Here’s how the numbers typically work."}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
              {(es
                ? RQ_ES.finItems.map((item, idx) => ({
                    icon: ([Shield, DollarSign, ArrowRight, Clock] as const)[idx],
                    ...item,
                  }))
                : [
                    {
                      icon: Shield,
                      title: "Insurance is covering the damage",
                      body: "Your out-of-pocket cost is typically your deductible — often $1,000–$2,500. We work with all major carriers and document everything the adjuster needs.",
                    },
                    {
                      icon: DollarSign,
                      title: "No insurance coverage involved",
                      body: "We offer financing options that let you spread the cost over time with manageable payments. Ask us about current rates and terms.",
                    },
                    {
                      icon: ArrowRight,
                      title: "You want to upgrade your materials",
                      body: "The step from mid-tier to premium is often $2,000–$4,000 — a small monthly payment difference that buys significant long-term protection.",
                    },
                    {
                      icon: Clock,
                      title: "You need time to decide",
                      body: "There’s no rush. Our quotes don’t expire, and we don’t pressure with artificial deadlines. Plan on your timeline.",
                    },
                  ]
              ).map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-linen rounded-xl p-5 flex items-start gap-4">
                  <div className="w-9 h-9 rounded-full bg-amber/10 border border-amber/20 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4.5 h-4.5 text-amber" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-navy text-sm mb-1.5">{title}</h3>
                    <p className="text-gray-600 text-xs leading-relaxed">{body}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8">
              <Link
                href="/financing"
                className="inline-flex items-center gap-2 text-amber font-semibold text-sm hover:underline"
              >
                {es ? RQ_ES.finLink : "See full financing options"} <ChevronRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHAT HAPPENS AFTER ── */}
      <section className="bg-linen section-padding">
        <div className="container">
          <div className="text-center max-w-2xl mx-auto mb-12">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-3">
              {es ? RQ_ES.processLabel : "Our Process"}
            </span>
            <h2 className="font-display section-title text-navy mb-5">
              {es ? RQ_ES.processH2 : "What Happens After Your Instant Quote"}
            </h2>
            <p className="text-gray-600 text-base leading-relaxed">
              {es
                ? RQ_ES.processP
                : "The tool gives you a number. Here’s what the path forward looks like — at whatever pace works for you."}
            </p>
          </div>

          <div className="max-w-4xl mx-auto space-y-8">
            {activeProcessSteps.map((step, i) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex items-start gap-6 bg-white rounded-2xl p-6 shadow-sm"
              >
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 rounded-xl overflow-hidden">
                    <Image
                      src={step.image}
                      alt={step.title}
                      width={64}
                      height={64}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <div className="absolute -top-2 -right-2 w-7 h-7 rounded-full bg-amber flex items-center justify-center">
                    <span className="text-xs font-bold text-black">{step.number}</span>
                  </div>
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-navy mb-2">
                    {step.title}
                  </h3>
                  <p className="text-gray-600 text-sm leading-relaxed">{step.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── BRAND PROMISE / CTA ── */}
      <section className="bg-linen section-padding relative overflow-hidden">
        <div className="absolute inset-0 opacity-[0.04]" style={{
          backgroundImage: "radial-gradient(circle, #333 1px, transparent 1px)",
          backgroundSize: "32px 32px"
        }} />
        <div className="container relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <span className="inline-block text-amber font-bold uppercase tracking-widest text-sm mb-4">
              {es ? RQ_ES.promiseLabel : "Our Promise"}
            </span>
            <h2 className="font-display text-3xl md:text-4xl lg:text-5xl font-bold text-navy mb-6 leading-tight">
              {es ? RQ_ES.promiseH2a : "A Roof Quote Should Make You Feel One Thing:"}{" "}
              <span className="text-amber">{es ? RQ_ES.promiseH2b : "Relief."}</span>
            </h2>

            <p className="text-gray-700 text-base md:text-lg leading-relaxed mb-8">
              {es
                ? RQ_ES.promiseP
                : "Your home is your nest — your biggest investment and the place your family comes home to. We take that seriously. Not with pressure, but with process."}
            </p>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-10 text-left">
              {(es ? RQ_ES.promiseItems : [
                "Clear communication at every step",
                "Transparent pricing — no hidden costs",
                "Photos documenting all work performed",
                "Your time respected, always",
                "Zero high-pressure tactics, ever",
                "A roof that protects what matters most",
              ]).map((item) => (
                <div key={item} className="flex items-start gap-2.5">
                  <CheckCircle className="w-4 h-4 text-amber flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700 text-sm leading-relaxed">{item}</span>
                </div>
              ))}
            </div>

            <p className="text-amber font-display text-xl italic mb-8">
              {es ? RQ_ES.promiseTagline : "We protect your home — and we make the process calm, not chaotic."}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <QuoteButton label={es ? RQ_ES.promiseCTABtn : "Get Your Free Instant Quote"} />
              <a
                href={`tel:${COMPANY.phoneRaw}`}
                className="inline-flex items-center gap-2 px-6 py-4 rounded-md border border-navy/30 text-navy text-sm font-semibold hover:bg-navy/5 transition-colors"
              >
                <Phone className="w-4 h-4" />
                {COMPANY.phone}
              </a>
            </div>

            <p className="text-gray-500 text-xs mt-6">
              {es
                ? RQ_ES.promiseFooterTrust
                : "Licensed Roofing Contractor · RBS 67027 · Mount Pleasant, SC · Family Owned & Operated"}
            </p>
          </div>
        </div>
      </section>

      <ChatWidget />

      {/* ── FINAL BREADCRUMB + TRUST ── */}
      <section className="bg-linen py-8">
        <div className="container">
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-gray-500">
            <Link href="/" className="hover:text-navy transition-colors">
              {es ? RQ_ES.breadcrumbHome : "Home"}
            </Link>
            <ChevronRight className="w-3.5 h-3.5 text-gray-300" />
            <span className="text-navy font-medium">
              {es ? RQ_ES.breadcrumbCurrent : "Instant Roof Quote"}
            </span>
            <span className="hidden sm:block text-gray-300">&middot;</span>
            <Link href="/services/residential-roofing" className="hover:text-navy transition-colors">
              {es ? RQ_ES.breadcrumbServices : "Roofing Services"}
            </Link>
            <span className="hidden sm:block text-gray-300">&middot;</span>
            <Link href="/materials-comparison" className="hover:text-navy transition-colors">
              {es ? RQ_ES.breadcrumbMaterials : "Materials Comparison"}
            </Link>
            <span className="hidden sm:block text-gray-300">&middot;</span>
            <Link href="/financing" className="hover:text-navy transition-colors">
              {es ? RQ_ES.breadcrumbFinancing : "Financing"}
            </Link>
            <span className="hidden sm:block text-gray-300">&middot;</span>
            <Link href="/contact" className="hover:text-navy transition-colors">
              {es ? RQ_ES.breadcrumbContact : "Contact"}
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
