"use client";

import Link from "next/link";
import { ArrowRight, ArrowUpRight, FileText } from "lucide-react";
import { IconBrandGithub, IconBrandLinkedin, IconBrandX, IconMail } from "@tabler/icons-react";
import { motion } from "motion/react";
import { featuredProjects } from "@/data";
import { SoftUiButton } from "@/components/ui/soft-ui-button";
import { ResumePreview } from "@/components/ui/resume-preview";

export const StartupPage = () => {
  const spotlightProjects = featuredProjects.filter((project) => ["Pixlate", "Colora", "VOXI"].includes(project.title));

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-3xl items-center border-x border-neutral-200 px-6 font-sans dark:border-white/[0.1] sm:px-8">
      <div className="w-full py-16">
        <div>
          <motion.header
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-5 sm:gap-7">
              <div className="size-24 shrink-0 overflow-hidden rounded-2xl border border-neutral-200 bg-neutral-100 p-1 shadow-sm dark:border-neutral-800 dark:bg-neutral-900 sm:size-32">
                <img src="/profile.jpg" alt="Arnab Jena" className="size-full rounded-xl object-cover" />
              </div>
              <div>
                <h1 className="font-serif text-5xl font-semibold tracking-tight text-neutral-950 dark:text-white sm:text-6xl">
                  Arnab Jena
                </h1>
                <p className="mt-4 text-base leading-7 text-neutral-600 dark:text-neutral-400 sm:text-lg">
                  I build thoughtful web experiences, creative developer tools, and data stories.
                </p>
              </div>
            </div>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-sm font-medium">
              <ResumePreview className="inline-flex h-9 cursor-pointer items-center justify-center gap-1.5 rounded-xl bg-neutral-100 px-3.5 text-xs font-semibold text-neutral-800 shadow-[6px_6px_14px_rgba(0,0,0,0.08),-6px_-6px_14px_rgba(255,255,255,0.9)] transition-[box-shadow,color] duration-200 hover:text-neutral-950 active:shadow-[inset_4px_4px_10px_rgba(0,0,0,0.08),inset_-4px_-4px_10px_rgba(255,255,255,0.85)] dark:bg-neutral-800 dark:text-neutral-100 dark:shadow-[6px_6px_14px_rgba(0,0,0,0.25),-6px_-6px_14px_rgba(255,255,255,0.04)]">
                <FileText size={15} />
                Resume
              </ResumePreview>
              <SoftUiButton href="/home" size="sm">
                Visit main page <ArrowRight size={15} />
              </SoftUiButton>
            </div>
          </motion.header>
        </div>

        <section className="mt-12" aria-labelledby="find-me">
          <p id="find-me" className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-neutral-400 dark:text-neutral-500">
            Find me
          </p>
          <div className="flex flex-wrap gap-x-5 gap-y-3 text-sm text-neutral-600 dark:text-neutral-400">
            <a href="https://github.com/arnabjena007" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-400"><IconBrandGithub size={16} /> GitHub</a>
            <a href="https://www.linkedin.com/in/arnabjena/" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-400"><IconBrandLinkedin size={16} /> LinkedIn</a>
            <a href="https://x.com/ArnabJena11" target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-400"><IconBrandX size={16} /> X</a>
            <a href="mailto:arnabjena2003@gmail.com" className="inline-flex items-center gap-2 transition-colors hover:text-yellow-600 dark:hover:text-yellow-400"><IconMail size={16} /> Email</a>
          </div>
        </section>

        <section className="mt-16" aria-labelledby="selected-work">
          <div className="mb-5 flex items-baseline justify-between border-b border-neutral-200 pb-3 dark:border-neutral-800">
            <h2 id="selected-work" className="font-serif text-2xl font-semibold text-neutral-950 dark:text-white">Selected work</h2>
            <span className="text-xs text-neutral-400 dark:text-neutral-500">open a project for the full story</span>
          </div>

          <div className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
            {spotlightProjects.map((project) => (
              <Link
                key={project.id}
                href={`/projects/${project.id}`}
                className="group flex items-start justify-between gap-4 px-1 py-4 transition-colors hover:bg-neutral-100/70 dark:hover:bg-white/[0.03]"
              >
                <div>
                  <h3 className="font-serif text-xl font-semibold text-neutral-900 dark:text-neutral-100">{project.title}</h3>
                  <p className="mt-1 max-w-md text-sm leading-6 text-neutral-500 dark:text-neutral-400">{project.des}</p>
                </div>
                <ArrowUpRight size={18} className="mt-1 shrink-0 text-neutral-400 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-neutral-900 dark:group-hover:text-white" />
              </Link>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
};
