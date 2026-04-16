export default function HeroGraphic() {
  return (
    <div className="relative mx-auto mt-10 grid max-w-5xl items-center gap-8 rounded-[2rem] border border-[var(--border-soft)] bg-[var(--surface)] p-6 shadow-[var(--shadow-soft)] md:grid-cols-2 md:p-10">
      <div className="text-left">
        <span className="inline-flex rounded-full border border-[var(--border-soft)] bg-[var(--surface-2)] px-4 py-1 text-xs font-medium uppercase tracking-[0.18em] text-[var(--accent-strong)]">
          Handmade with care
        </span>

        <h2 className="mt-5 text-3xl font-semibold leading-tight text-[var(--foreground)] md:text-4xl">
          Thoughtful pieces for meaningful spaces.
        </h2>

        <p className="mt-4 max-w-xl text-base leading-7 text-[var(--muted-foreground)]">
          Explore artisan-made products designed to bring beauty, serenity,
          and warmth into everyday life.
        </p>
      </div>

      <div className="relative h-[280px] overflow-hidden rounded-[1.75rem] bg-[linear-gradient(135deg,var(--accent-soft),var(--surface-2),var(--surface))]">
        <div className="absolute -left-8 top-8 h-36 w-36 rounded-full bg-[var(--accent)]/20 blur-2xl" />
        <div className="absolute right-6 top-10 h-24 w-24 rounded-full bg-[var(--accent-strong)]/15 blur-xl" />
        <div className="absolute bottom-6 left-10 h-28 w-28 rounded-full bg-[var(--clay)]/25 blur-xl" />

        <div className="absolute left-1/2 top-1/2 w-[78%] -translate-x-1/2 -translate-y-1/2 rounded-[2rem] border border-white/50 bg-white/70 p-5 shadow-lg backdrop-blur">
          <div className="rounded-[1.5rem] bg-[var(--surface-2)] p-4">
            <div className="mb-4 h-32 rounded-[1.25rem] bg-[linear-gradient(135deg,#e7d7c8,#d8e0d0)]" />
            <div className="h-3 w-24 rounded-full bg-[var(--accent-strong)]/25" />
            <div className="mt-3 h-3 w-36 rounded-full bg-[var(--foreground)]/10" />
            <div className="mt-3 h-3 w-20 rounded-full bg-[var(--clay)]/30" />
          </div>
        </div>
      </div>
    </div>
  );
}