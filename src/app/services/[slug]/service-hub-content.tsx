"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import type { Service } from "@/lib/data";
import {
  Shield, Home as HomeIcon, Wrench, Droplets, Search,
  Settings, Layers, Square, Gem, Building, Sun, SunDim, CloudLightning,
  ArrowDownToLine, PanelLeft, Hammer, CheckCircle2, Wind, CloudHail,
  TreePine, ShieldAlert, FileCheck, Snowflake, Zap, ArrowRight,
} from "lucide-react";

const iconMap: Record<string, React.ElementType> = {
  Home: HomeIcon, Wrench, Droplets, Search, Settings, Shield, Layers, Square, Gem, Building,
  Sun, SunDim, CloudLightning, ArrowDownToLine, PanelLeft, Hammer, Wind, CloudHail,
  TreePine, ShieldAlert, FileCheck, Snowflake, Zap,
};

function ServiceCard({ service, index }: { service: Service; index: number }) {
  const Icon = iconMap[service.icon] || Shield;
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.06 }}
    >
      <Link href={`/services/${service.slug}`}>
        <article className="group bg-white rounded-xl overflow-hidden shadow-sm hover:shadow-xl border border-border/40 hover:border-amber/30 transition-all duration-500 h-full flex flex-col">
          {/* Image */}
          <div className="relative aspect-[16/10] overflow-hidden">
            <img
              src={service.image}
              alt={service.shortTitle}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
            {/* Icon badge */}
            <div className="absolute top-3 left-3">
              <div className="w-10 h-10 rounded-lg bg-white/90 backdrop-blur-sm flex items-center justify-center shadow-sm">
                <Icon className="w-5 h-5 text-navy" />
              </div>
            </div>
            {/* Category tag */}
            <div className="absolute bottom-3 right-3">
              <span className="text-xs font-semibold uppercase tracking-wider bg-amber/90 text-white px-2.5 py-1 rounded-md">
                {service.category === "roofing"
                  ? "Roofing"
                  : service.category === "gutters"
                    ? "Gutters"
                    : "Emergency"}
              </span>
            </div>
          </div>

          {/* Content */}
          <div className="p-5 flex flex-col flex-1">
            <h3 className="font-display text-lg font-bold text-navy mb-2 group-hover:text-amber transition-colors leading-tight">
              {service.title}
            </h3>
            <p className="text-sm text-gray-600 leading-relaxed mb-4 flex-1">
              {service.description.length > 130
                ? service.description.slice(0, 130) + "..."
                : service.description}
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-1.5 mb-4">
              {service.features.slice(0, 3).map((f) => (
                <span
                  key={f}
                  className="inline-flex items-center gap-1 text-xs bg-linen text-gray-700 px-2 py-0.5 rounded-full"
                >
                  <CheckCircle2 className="w-3 h-3 text-sage shrink-0" />
                  {f}
                </span>
              ))}
            </div>

            <span className="inline-flex items-center gap-1.5 text-sm font-semibold text-amber group-hover:gap-2.5 transition-all mt-auto">
              View Details <ArrowRight className="w-4 h-4" />
            </span>
          </div>
        </article>
      </Link>
    </motion.div>
  );
}

export function ServiceHubContent({ services }: { services: Service[] }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {services.map((service, i) => (
        <ServiceCard key={service.slug} service={service} index={i} />
      ))}
    </div>
  );
}
