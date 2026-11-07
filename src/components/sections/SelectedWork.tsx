"use client";

import * as React from "react";
import { motion, AnimatePresence } from "framer-motion";
import ImagePlaceholder from "@/components/ui/ImagePlaceholder";
import SectionHeader from "@/components/ui/SectionHeader";
import Button from "@/components/ui/Button";
import { ArrowRight, X, Maximize } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProjectImage {
  ratio: "square" | "portrait" | "landscape" | "wide";
  label: string;
}

interface Project {
  id: string;
  category: string;
  title: string;
  description: string;
  images: ProjectImage[];
}

const projects: Project[] = [
  {
    id: "supra",
    category: "3D Visualization / Interior Concept",
    title: "SUPRA — Georgian Restaurant Concept",
    description:
      "A visual exploration of Georgian hospitality through architectural visualization and digital presentation.",
    images: [
      { ratio: "wide", label: "SUPRA — HALL RENDER" },
      { ratio: "portrait", label: "SUPRA — BAR DETAIL" },
      { ratio: "square", label: "SUPRA — MATERIAL STUDY" },
    ],
  },
  {
    id: "webdev",
    category: "Web Development",
    title: "Responsive Digital Experience",
    description:
      "A full responsive website with desktop and mobile presentations.",
    images: [
      { ratio: "landscape", label: "DESKTOP MOCKUP" },
      { ratio: "portrait", label: "MOBILE VERSION" },
    ],
  },
  {
    id: "digitaldesign",
    category: "Digital Design / Presentation",
    title: "Brand Presentation Concept",
    description:
      "Presentation design and digital concept visuals for a modern brand.",
    images: [
      { ratio: "square", label: "PRESENTATION SLIDE" },
      { ratio: "wide", label: "BRAND VISUAL" },
    ],
  },
];

export default function SelectedWork() {
  const [open, setOpen] = React.useState<string | null>(null);
  const project = React.useMemo(
    () => projects.find((p) => p.id === open),
    [open],
  );

  return (
    <section id="work" className="section bg-background relative overflow-hidden z-10">
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-[-10%] w-[500px] h-[500px] rounded-full bg-accent/8 blur-[100px]" />
        <div className="absolute bottom-20 right-[-8%] w-[400px] h-[400px] rounded-full bg-accent/6 blur-[90px]" />
      </div>

      <div className="container relative z-10">
        <SectionHeader
          kicker="SELECTED WORK"
          title="A selection of digital experiences."
          description=""
          center
        />

        <div
          className="grid grid-cols-1 md:grid-cols-12 gap-6 mb-20"
          style={{ gridTemplateRows: "repeat(2, minmax(420px, 1fr))" }}
        >
          {/* SUPRA — featured large */}
          <ProjectCard
            project={projects[0]}
            className="md:col-span-7 md:row-span-2"
            setOpen={setOpen}
            featured
          />
          {/* Web Development */}
          <ProjectCard
            project={projects[1]}
            className="md:col-span-5 md:row-span-1"
            setOpen={setOpen}
          />
          {/* Digital Design */}
          <ProjectCard
            project={projects[2]}
            className="md:col-span-5 md:row-span-2 md:row-start-2"
            setOpen={setOpen}
          />
        </div>

        <div className="flex justify-center">
          <Button variant="outline" size="lg">
            View all projects<span className="ml-2">
              <ArrowRight className="w-4 h-4" />
            </span>
          </Button>
        </div>
      </div>

      <AnimatePresence>
        {open && project && (
          <ProjectModal project={project} onClose={() => setOpen(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}

interface ProjectCardProps {
  project: Project;
  className?: string;
  setOpen: (id: string | null) => void;
  featured?: boolean;
}

function ProjectCard({ project, className, setOpen, featured }: ProjectCardProps) {
  return (
    <motion.div
      whileHover={{ y: -6 }}
      className={cn(
        "group relative rounded-3xl overflow-hidden border border-border bg-secondary",
        className,
        featured ? "" : "hover:border-accent/50",
      )}
    >
      <div className="relative overflow-hidden bg-black/[0.2] group/image">
        <div className="relative z-0 h-full">
          {project.images.map((img, i) => {
            const isMain = i === 0;
            return (
              <ImagePlaceholder
                key={i}
                ratio={img.ratio}
                label={img.label}
                className={cn(
                  "absolute object-cover transition-transform duration-700 group-hover/image:scale-105",
                  isMain
                    ? "inset-0 w-full h-full z-0"
                    : i === 1
                    ? "top-4 right-4 w-1/3 h-1/3 z-10"
                    : "bottom-4 left-4 w-1/4 h-1/4 z-10",
                )}
              />
            );
          })}
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/[0.5] via-transparent to-transparent z-20" />
        <div
          className="absolute inset-0 bg-accent/8 opacity-0 group-hover/image:opacity-100 transition-opacity duration-500 z-30"
        />
      </div>

      <div className="p-6 md:p-8">
        <div className="flex items-center gap-2 mb-2">
          <span className="text-[10px] md:text-xs font-bold uppercase tracking-widest text-accent">
            {project.category}
          </span>
          <span className="w-1 h-1.5 bg-accent rounded-full" />
        </div>
        <motion.h3
          whileHover={{ x: 4 }}
          className="mb-2 text-2xl md:text-3xl font-bold tracking-tight leading-tight text-foreground"
        >
          {project.title}
        </motion.h3>
        <p className="text-muted text-sm md:text-base leading-relaxed mb-6">
          {project.description}
        </p>

        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation();
            setOpen(project.id);
          }}
          className="flex items-center gap-2 text-accent hover:text-accent"
        >
          Explore project
          <Maximize className="w-3.5 h-3.5" />
        </Button>
      </div>

      <div className="absolute inset-0 z-[50] flex items-center justify-center bg-black/40 backdrop-blur-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <Button variant="accent" size="sm" className="scale-95 group-hover:scale-100 transition-transform">
          Open
          <ArrowRight className="ml-2 w-3 h-3" />
        </Button>
      </div>
    </motion.div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] bg-background/97 backdrop-blur-md flex flex-col"
    >
      <div className="flex items-start justify-between p-6 md:p-8 border-b border-border">
        <button onClick={onClose} className="p-2 text-muted hover:text-foreground">
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto p-6 md:p-8">
        <div className="flex flex-col lg:flex-row gap-6">
          <div className="lg:w-1/2">
            <div className="grid grid-cols-2 gap-4">
              {project.images.map((img, i) => (
                <ImagePlaceholder
                  key={i}
                  ratio={img.ratio}
                  label={img.label}
                />
              ))}
            </div>
          </div>
          <div className="flex-1 flex flex-col justify-center">
            <span className="text-[11px] font-bold uppercase tracking-widest text-accent mb-3">
              {project.category}
            </span>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight leading-tight mb-4 text-foreground">
              {project.title}
            </h2>
            <p className="text-muted text-lg leading-relaxed mb-8">
              {project.description}
            </p>
            <div className="flex gap-3">
              <Button variant="accent" size="lg" className="w-auto">
                Visit project
              </Button>
              <Button variant="outline" size="lg" className="w-auto">
                Case study PDF
              </Button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
