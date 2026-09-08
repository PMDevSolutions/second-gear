export function Logo({ className = "h-7 w-7" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" aria-hidden="true" className={className}>
      <circle cx="16" cy="16" r="15" fill="#1b4332" />
      <circle cx="16" cy="16" r="6.5" fill="none" stroke="#b7e4c7" strokeWidth="2.5" />
      {Array.from({ length: 8 }).map((_, i) => (
        <rect key={i} x="14.75" y="3" width="2.5" height="5" rx="1" fill="#b7e4c7" transform={`rotate(${i * 45} 16 16)`} />
      ))}
      <path d="M13 19.5 L16 12.5 L19 19.5" stroke="#fff" strokeWidth="1.6" fill="none" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
