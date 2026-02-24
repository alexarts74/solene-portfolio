import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";
import { projects, getProject } from "@/lib/data/projects";
import PhotoGrid from "@/components/ui/PhotoGrid";
import AnimateOnScroll from "@/components/ui/AnimateOnScroll";

interface Props {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return projects.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return {
    title: project.title,
    description: project.subtitle,
  };
}

export default async function ProjectPage({ params }: Props) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) notFound();

  return (
    <div className="pt-24 pb-16">
      {/* Hero */}
      <div className="relative h-[50vh] mb-12 overflow-hidden">
        <Image
          src={project.coverPhoto}
          alt={project.title}
          fill
          className="object-cover animate-slow-zoom"
          sizes="100vw"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
      </div>

      <div className="px-6 mx-auto max-w-3xl">
        <AnimateOnScroll animation="animate-fade-up">
          <h1 className="text-3xl font-light tracking-wide">{project.title}</h1>
        </AnimateOnScroll>
        <AnimateOnScroll animation="animate-fade-up" delay={100}>
          <p className="text-sm text-muted mt-2 tracking-wide uppercase">
            {project.date}
          </p>
        </AnimateOnScroll>
        <AnimateOnScroll animation="animate-fade-up" delay={200}>
          <p className="text-base text-accent mt-4 italic">
            {project.subtitle}
          </p>
        </AnimateOnScroll>

        <div className="mt-8 space-y-4">
          {project.description.map((p, i) => (
            <AnimateOnScroll key={i} animation="animate-fade-up" delay={i * 80}>
              <p className="text-sm leading-relaxed text-muted">
                {p}
              </p>
            </AnimateOnScroll>
          ))}
        </div>
      </div>

      <div className="px-6 mx-auto max-w-7xl mt-16">
        <PhotoGrid photos={project.photos} />
      </div>
    </div>
  );
}
