"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { COMPANY, IMAGES } from "@/lib/data";
import { PageHero, SectionHeader, CTABanner, StatsBar, JsonLdScript } from "@/components/shared";
import { Shield, Heart, Users, Award, FileCheck, CheckCircle2 } from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";

const ABOUT_ES = {
  // Values section
  values: [
    {
      title: "Valores Familiares",
      description: "Tratamos cada hogar como si fuera el nuestro. Como empresa familiar, nuestra reputación es personal — y la protegemos entregando un trabajo excepcional en cada proyecto.",
    },
    {
      title: "La Integridad Primero",
      description: "Ofrecemos evaluaciones honestas, precios justos y comunicación transparente. Si una reparación resolverá su problema, no le recomendaremos un reemplazo.",
    },
    {
      title: "Compromiso Comunitario",
      description: "Vivimos y trabajamos en el área de Charleston. Somos sus vecinos, no contratistas itinerantes. Cuando terminamos su proyecto, seguimos aquí si nos necesita.",
    },
    {
      title: "Excelencia Artesanal",
      description: "Nuestro equipo cuenta con años de experiencia en techos costeros. Utilizamos métodos de instalación resistentes a huracanes y materiales premium diseñados para el clima del Lowcountry.",
    },
  ],
  // Milestones
  milestones: [
    { title: "Fundación de la Empresa", description: "Restoration Roofing SC se estableció en Mount Pleasant para servir al área metropolitana de Charleston." },
    { title: "Equipo en Crecimiento", description: "Ampliamos nuestro equipo para atender la creciente demanda de servicios de techado de calidad en el Lowcountry." },
    { title: "Experiencia en Seguros", description: "Nos convertimos en uno de los principales contratistas del área para el manejo de reclamaciones de seguros y restauración por daños de tormenta." },
    { title: "Más de 500 Proyectos", description: "Alcanzamos el hito de más de 500 proyectos de techado completados en el área de Charleston." },
    { title: "Servicio Bilingüe", description: "Incorporamos miembros bilingües al equipo para servir mejor a nuestra diversa comunidad. Se Habla Español." },
    { title: "Cobertura Ampliada", description: "Extendimos nuestra área de servicio a 21 comunidades en el Lowcountry y el interior del estado." },
  ],
  // PageHero
  heroTitle: "Acerca de Restoration Roofing",
  heroSubtitle: "Empresa familiar, comprometida con la comunidad y dedicada a proteger los hogares del Lowcountry con trabajo artesanal de primera calidad.",
  heroBreadcrumb: "Acerca de Nosotros",
  // Our Story section
  storyEyebrow: "Nuestra Historia",
  storyH2: "Construidos sobre la Confianza, Arraigados en el Lowcountry",
  storyP1: "Restoration Roofing fue fundada con una misión sencilla: brindar a los propietarios de hogares en el área de Charleston servicios de techado honestos y de alta calidad en los que puedan confiar. Con sede en Mount Pleasant, entendemos los desafíos únicos que el clima costero de South Carolina presenta para el sistema de protección más importante de su hogar.",
  storyP2: "Lo que nos distingue es nuestro enfoque hacia la experiencia completa de techado. No solo instalamos y reparamos techos — guiamos a los propietarios en cada paso del proceso, incluido el proceso de reclamaciones de seguros, que suele ser abrumador. Nuestro equipo ha gestionado cientos de reclamaciones y sabe cómo documentar los daños a fondo y abogar por indemnizaciones justas.",
  storyP3: "Como empresa familiar, nuestra reputación lo es todo. Cada proyecto que completamos refleja nuestros valores: integridad, artesanía y un cuidado genuino por nuestros clientes y comunidad. No somos una cadena nacional ni contratistas itinerantes. Somos sus vecinos, y tomamos esa responsabilidad muy en serio.",
  projectsLabel: "Proyectos completados en todo el Lowcountry",
  // Values section header
  valuesEyebrow: "Nuestros Valores",
  valuesTitle: "Lo Que Defendemos",
  valuesSubtitle: "Estas no son solo palabras en una pared — son los principios que guían cada decisión que tomamos y cada proyecto que completamos.",
  // Insurance section
  insuranceEyebrow: "Reclamaciones de Seguros",
  insuranceH2: "Nos Encargamos de Su Reclamación",
  insuranceP: "Lidiar con daños en el techo es suficientemente estresante sin la complejidad adicional de las reclamaciones de seguros. Nuestro equipo ha gestionado cientos de reclamaciones y sabe exactamente cómo documentar los daños, comunicarse con los ajustadores y abogar por indemnizaciones justas.",
  insuranceBullets: [
    "Documentación completa de daños con fotos e informes",
    "Comunicación directa con su ajustador de seguros",
    "Presencia en las inspecciones del ajustador en su nombre",
    "Presentación de reclamaciones suplementarias cuando las ofertas iniciales son insuficientes",
    "Coordinación de las reparaciones con el cronograma de aprobación de la reclamación",
    "Sin costos de su bolsillo más allá de su deducible (para reclamaciones cubiertas)",
  ],
  claimsProcessTitle: "El Proceso de Reclamación",
  claimsSteps: [
    "Inspeccionamos su techo y documentamos todos los daños",
    "Presentamos la reclamación ante su compañía de seguros",
    "Nos reunimos con el ajustador en su propiedad",
    "Revisamos el acuerdo y negociamos si es necesario",
    "Completamos las reparaciones una vez aprobada la reclamación",
    "Manejamos todo el papeleo y el seguimiento",
  ],
  // Bilingual section
  bilingualEyebrow: "Se Habla Español",
  bilingualH2: "Equipo Bilingüe",
  bilingualP: "Nos enorgullece servir a la diversa comunidad de Charleston con miembros bilingües del equipo que pueden comunicarse tanto en inglés como en español. Ya sea que prefiera hablar sobre sus necesidades de techado en inglés o en español, estamos aquí para ayudarle a comprender cada aspecto de su proyecto.",
  englishLabel: "Inglés",
  englishSub: "Servicio completo",
  spanishLabel: "Español",
  spanishSub: "Servicio completo",
  // Timeline
  timelineEyebrow: "Nuestro Camino",
  timelineTitle: "Creciendo con el Lowcountry",
  // CTA
  ctaTitle: "¿Listo para Trabajar con Nosotros?",
  ctaSubtitle: "Experimente la diferencia de Restoration Roofing. Obtenga un presupuesto gratuito y vea por qué sus vecinos nos confían sus hogares.",
};

const values = [
  {
    icon: Heart,
    title: "Family Values",
    description: "We treat every home like it's our own. As a family-owned business, our reputation is personal — and we protect it by delivering exceptional work on every project.",
  },
  {
    icon: Shield,
    title: "Integrity First",
    description: "We provide honest assessments, fair pricing, and transparent communication. If a repair will solve your problem, we won't recommend a replacement.",
  },
  {
    icon: Users,
    title: "Community Commitment",
    description: "We live and work in the Charleston area. We're your neighbors, not storm chasers. When we finish your project, we're still right here if you need us.",
  },
  {
    icon: Award,
    title: "Expert Craftsmanship",
    description: "Our team brings years of experience in coastal roofing. We use hurricane-rated installation methods and premium materials designed for the Lowcountry climate.",
  },
];

const milestones = [
  { year: "2020", title: "Company Founded", description: "Restoration Roofing SC established in Mount Pleasant to serve the Charleston metro area." },
  { year: "2021", title: "Growing Team", description: "Expanded our crew to handle the growing demand for quality roofing services in the Lowcountry." },
  { year: "2022", title: "Insurance Expertise", description: "Became one of the area's leading contractors for insurance claim management and storm damage restoration." },
  { year: "2023", title: "500+ Projects", description: "Reached a milestone of over 500 completed roofing projects across the Charleston area." },
  { year: "2024", title: "Bilingual Service", description: "Added bilingual team members to better serve our diverse community. Se Habla Español." },
  { year: "2025", title: "Expanded Coverage", description: "Extended our service area to 21 communities across the Lowcountry and Midlands." },
];

const insuranceBulletsEN = [
  "Complete damage documentation with photos and reports",
  "Direct communication with your insurance adjuster",
  "Attendance at adjuster inspections on your behalf",
  "Supplemental claim filing when initial offers are insufficient",
  "Coordination of repairs with claim approval timeline",
  "No out-of-pocket costs beyond your deductible (for covered claims)",
];

const claimsStepsEN = [
  "We inspect your roof and document all damage",
  "We file the claim with your insurance company",
  "We meet with the adjuster at your property",
  "We review the settlement and negotiate if needed",
  "We complete repairs once the claim is approved",
  "We handle all paperwork and follow-up",
];

export default function AboutContent() {
  const { lang } = useLanguage();

  const localizedValues = values.map((v, i) => ({
    ...v,
    title: lang === "es" ? ABOUT_ES.values[i].title : v.title,
    description: lang === "es" ? ABOUT_ES.values[i].description : v.description,
  }));

  const localizedMilestones = milestones.map((m, i) => ({
    ...m,
    title: lang === "es" ? ABOUT_ES.milestones[i].title : m.title,
    description: lang === "es" ? ABOUT_ES.milestones[i].description : m.description,
  }));

  const localizedInsuranceBullets = lang === "es" ? ABOUT_ES.insuranceBullets : insuranceBulletsEN;
  const localizedClaimsSteps = lang === "es" ? ABOUT_ES.claimsSteps : claimsStepsEN;

  return (
    <>
      <JsonLdScript data={{
        "@context": "https://schema.org",
        "@type": "RoofingContractor",
        name: COMPANY.fullName,
        url: "https://www.restorationroofingsc.com",
        telephone: COMPANY.phone,
        address: {
          "@type": "PostalAddress",
          addressLocality: "Mount Pleasant",
          addressRegion: "SC",
          addressCountry: "US",
        },
        areaServed: "Charleston, SC metropolitan area",
        description: "Family-owned roofing contractor serving the Charleston, SC area with expert roof installation, repair, and storm damage restoration.",
      }} />

      <PageHero
        title={lang === "es" ? ABOUT_ES.heroTitle : "About Restoration Roofing"}
        subtitle={lang === "es" ? ABOUT_ES.heroSubtitle : "Family-owned, community-focused, and committed to protecting Lowcountry homes with expert craftsmanship."}
        image={IMAGES.heroAbout}
        breadcrumbs={[{ label: lang === "es" ? ABOUT_ES.heroBreadcrumb : "About Us" }]}
      />

      {/* Our Story */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
            >
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">
                {lang === "es" ? ABOUT_ES.storyEyebrow : "Our Story"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-navy mb-6 leading-tight">
                {lang === "es" ? ABOUT_ES.storyH2 : "Built on Trust, Rooted in the Lowcountry"}
              </h2>
              <div className="space-y-4 text-gray-800 leading-relaxed">
                <p>
                  {lang === "es"
                    ? ABOUT_ES.storyP1
                    : "Restoration Roofing was founded with a simple mission: to provide Charleston-area homeowners with honest, high-quality roofing services they can trust. Based in Mount Pleasant, we understand the unique challenges that coastal South Carolina weather presents to your home’s most important protective system."}
                </p>
                <p>
                  {lang === "es"
                    ? ABOUT_ES.storyP2
                    : "What sets us apart is our approach to the complete roofing experience. We don’t just install and repair roofs — we guide homeowners through every step of the process, including the often-overwhelming insurance claims process. Our team has managed hundreds of insurance claims, and we know how to document damage thoroughly and advocate for fair settlements."}
                </p>
                <p>
                  {lang === "es"
                    ? ABOUT_ES.storyP3
                    : "As a family-owned business, our reputation is everything. Every project we complete is a reflection of our values — integrity, craftsmanship, and genuine care for our customers and community. We’re not a national chain or a storm-chasing outfit. We’re your neighbors, and we take that responsibility seriously."}
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="relative"
            >
              <Image
                src={IMAGES.heroResidential}
                alt="Charleston neighborhood with beautiful homes"
                width={1200}
                height={800}
                sizes="(min-width: 1024px) 50vw, 100vw"
                className="rounded-lg shadow-xl w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-navy text-white rounded-lg p-5 shadow-xl max-w-xs hidden md:block">
                <div className="font-display text-2xl font-bold text-amber mb-1">{COMPANY.projectsCompleted}+</div>
                <div className="text-sm text-white/80">
                  {lang === "es" ? ABOUT_ES.projectsLabel : "Projects completed across the Lowcountry"}
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      <StatsBar />

      {/* Our Values */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={lang === "es" ? ABOUT_ES.valuesEyebrow : "Our Values"}
            title={lang === "es" ? ABOUT_ES.valuesTitle : "What We Stand For"}
            subtitle={lang === "es" ? ABOUT_ES.valuesSubtitle : "These aren’t just words on a wall — they’re the principles that guide every decision we make and every project we complete."}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {localizedValues.map((value, i) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="bg-white rounded-lg border border-border/50 p-6 hover:shadow-lg hover:border-amber/30 card-halo transition-all duration-300"
              >
                <value.icon className="w-8 h-8 text-amber mb-4" />
                <h3 className="font-display text-lg font-semibold text-navy mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600 leading-relaxed">{value.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Expertise */}
      <section className="section-padding bg-navy text-white relative overflow-hidden">
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: "radial-gradient(circle at 25% 25%, white 1px, transparent 1px)",
            backgroundSize: "40px 40px"
          }} />
        </div>
        <div className="container relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">
                {lang === "es" ? ABOUT_ES.insuranceEyebrow : "Insurance Claims"}
              </span>
              <h2 className="font-display text-3xl md:text-4xl font-bold text-white mb-6 leading-tight">
                {lang === "es" ? ABOUT_ES.insuranceH2 : "We Handle Your Insurance Claim"}
              </h2>
              <p className="text-white/70 leading-relaxed mb-6">
                {lang === "es"
                  ? ABOUT_ES.insuranceP
                  : "Dealing with roof damage is stressful enough without the added complexity of insurance claims. Our team has managed hundreds of claims and knows exactly how to document damage, communicate with adjusters, and advocate for fair settlements."}
              </p>
              <ul className="space-y-3">
                {localizedInsuranceBullets.map((item) => (
                  <li key={item} className="flex items-start gap-2.5">
                    <CheckCircle2 className="w-5 h-5 text-amber shrink-0 mt-0.5" />
                    <span className="text-sm text-white/80">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="bg-white/5 border border-white/10 rounded-lg p-8">
              <FileCheck className="w-12 h-12 text-amber mb-4" />
              <h3 className="font-display text-xl font-semibold text-white mb-3">
                {lang === "es" ? ABOUT_ES.claimsProcessTitle : "The Claims Process"}
              </h3>
              <ol className="space-y-4">
                {localizedClaimsSteps.map((step, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="w-6 h-6 rounded-full bg-amber/20 flex items-center justify-center shrink-0 mt-0.5">
                      <span className="text-xs font-bold text-amber">{i + 1}</span>
                    </div>
                    <span className="text-sm text-white/80">{step}</span>
                  </li>
                ))}
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* Bilingual Team */}
      <section className="section-padding bg-white">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <span className="text-xs font-semibold tracking-[0.2em] uppercase text-amber mb-3 block">Se Habla Español</span>
            <h2 className="font-display text-3xl font-bold text-navy mb-4">
              {lang === "es" ? ABOUT_ES.bilingualH2 : "Bilingual Team"}
            </h2>
            <p className="text-gray-800 leading-relaxed mb-6">
              {lang === "es"
                ? ABOUT_ES.bilingualP
                : "We’re proud to serve Charleston’s diverse community with bilingual team members who can communicate in both English and Spanish. Whether you prefer to discuss your roofing needs in English or Spanish, we’re here to help you understand every aspect of your project."}
            </p>
            <div className="flex items-center justify-center gap-4">
              <div className="bg-linen rounded-lg px-6 py-4 text-center">
                <div className="font-display text-lg font-semibold text-navy">
                  {lang === "es" ? ABOUT_ES.englishLabel : "English"}
                </div>
                <div className="text-sm text-gray-600">
                  {lang === "es" ? ABOUT_ES.englishSub : "Full service"}
                </div>
              </div>
              <div className="bg-linen rounded-lg px-6 py-4 text-center">
                <div className="font-display text-lg font-semibold text-navy">Español</div>
                <div className="text-sm text-gray-600">Servicio completo</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="section-padding bg-linen">
        <div className="container">
          <SectionHeader
            eyebrow={lang === "es" ? ABOUT_ES.timelineEyebrow : "Our Journey"}
            title={lang === "es" ? ABOUT_ES.timelineTitle : "Growing With the Lowcountry"}
          />

          <div className="max-w-2xl mx-auto">
            {localizedMilestones.map((milestone, i) => (
              <motion.div
                key={milestone.year}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                className="flex gap-6 mb-8 last:mb-0"
              >
                <div className="flex flex-col items-center">
                  <div className="w-12 h-12 rounded-full bg-navy flex items-center justify-center shrink-0">
                    <span className="text-xs font-bold text-amber">{milestone.year}</span>
                  </div>
                  {i < localizedMilestones.length - 1 && <div className="w-px h-full bg-navy/20 mt-2" />}
                </div>
                <div className="pb-8">
                  <h3 className="font-display text-base font-semibold text-navy mb-1">{milestone.title}</h3>
                  <p className="text-sm text-gray-600 leading-relaxed">{milestone.description}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <CTABanner
        title={lang === "es" ? ABOUT_ES.ctaTitle : "Ready to Work With Us?"}
        subtitle={lang === "es" ? ABOUT_ES.ctaSubtitle : "Experience the Restoration Roofing difference. Get a free estimate and see why your neighbors trust us with their homes."}
      />
    </>
  );
}
