const iconBase = "https://cdn.jsdelivr.net/npm/simple-icons@v16/icons";

const technologyIcons: Record<string, string> = {
  "Next.js": `${iconBase}/nextdotjs.svg`,
  React: `${iconBase}/react.svg`,
  TypeScript: `${iconBase}/typescript.svg`,
  TailwindCSS: `${iconBase}/tailwindcss.svg`,
  Vercel: `${iconBase}/vercel.svg`,
  Supabase: `${iconBase}/supabase.svg`,
  Firebase: `${iconBase}/firebase.svg`,
  Golang: `${iconBase}/go.svg`,
  "Three.js": `${iconBase}/threedotjs.svg`,
  Rust: `${iconBase}/rust.svg`,
  Leaflet: `${iconBase}/leaflet.svg`,
  // Axum and Tokio are Rust libraries without a distinct, established brand mark.
  Axum: `${iconBase}/rust.svg`,
  Tokio: `${iconBase}/rust.svg`,
  "Dijkstra Algorithm": "https://api.iconify.design/lucide:route.svg?color=%2371717a",
};

export const TechnologyIcon = ({ name, size = 16 }: { name: string; size?: number }) => {
  const src = technologyIcons[name] ?? "https://api.iconify.design/lucide:server-cog.svg?color=%2371717a";

  return <img src={src} alt="" aria-hidden width={size} height={size} className="object-contain" />;
};
