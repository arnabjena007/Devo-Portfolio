import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { cn } from "@/lib/utils";

type UserProfileCardProps = {
  className?: string;
  name: string;
  title: string;
  bio: string;
  image: string;
  emailHref: string;
  emailLabel: string;
  websiteHref: string;
  websiteLabel: string;
};

const ProfileLink = ({ href, label }: { href: string; label: string }) => {
  const className = "group inline-flex items-center gap-1 text-sm text-neutral-800 underline-offset-4 transition-colors hover:text-yellow-700 hover:underline dark:text-neutral-200 dark:hover:text-yellow-400";
  const content = <>{label}<ArrowUpRight size={13} aria-hidden className="transition-transform group-hover:-translate-y-px group-hover:translate-x-px" /></>;

  return href.startsWith("/") ? (
    <Link href={href} className={className}>{content}</Link>
  ) : (
    <a href={href} className={className} target={href.startsWith("http") ? "_blank" : undefined} rel={href.startsWith("http") ? "noreferrer" : undefined}>{content}</a>
  );
};

export const UserProfileCard = ({
  className,
  name,
  title,
  bio,
  image,
  emailHref,
  emailLabel,
  websiteHref,
  websiteLabel,
}: UserProfileCardProps) => (
  <article className={cn("w-full max-w-sm border border-neutral-200 bg-[#f6f2eb] p-5 font-sans dark:border-neutral-800 dark:bg-neutral-900", className)}>
    <div className="mb-4 border-b border-neutral-200 pb-3 dark:border-neutral-800">
      <span className="font-mono text-[10px] font-semibold uppercase tracking-[0.2em] text-neutral-500">Profile</span>
    </div>
    <div className="flex gap-4">
      <div className="size-16 shrink-0 overflow-hidden border border-neutral-300 bg-neutral-100 dark:border-neutral-700">
        <img src={image} alt={name} className="size-full object-cover" />
      </div>
      <div className="min-w-0 pt-0.5">
        <h3 className="font-serif text-2xl leading-none tracking-tight text-neutral-950 dark:text-white">{name}</h3>
        <p className="mt-2 font-mono text-[10px] font-medium uppercase tracking-[0.16em] text-neutral-500">{title}</p>
      </div>
    </div>
    <p className="mt-4 text-sm leading-relaxed text-neutral-700 dark:text-neutral-300">{bio}</p>
    <div className="mt-5 flex flex-wrap gap-x-5 gap-y-2 border-t border-neutral-200 pt-4 dark:border-neutral-800">
      <ProfileLink href={emailHref} label={emailLabel} />
      <ProfileLink href={websiteHref} label={websiteLabel} />
    </div>
  </article>
);
