import { cn } from "@/lib/utils";

export function AppleLogo({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      className={cn("h-5 w-5", className)}
    >
      <path d="M17.564 12.78c-.026-2.652 2.165-3.927 2.264-3.99-1.232-1.802-3.149-2.048-3.834-2.077-1.631-.165-3.183.96-4.012.96-.829 0-2.108-.937-3.466-.91-1.783.026-3.426 1.036-4.343 2.63-1.851 3.215-.473 7.974 1.33 10.586.88 1.278 1.93 2.713 3.298 2.664 1.32-.054 1.823-.857 3.418-.857 1.595 0 2.047.857 3.45.831 1.425-.025 2.328-1.302 3.198-2.586 1.008-1.487 1.422-2.926 1.448-3 -.031-.013-2.778-1.064-2.751-4.251zM14.94 5.06c.73-.886 1.222-2.116 1.087-3.34-1.051.044-2.327.7-3.082 1.585-.676.785-1.27 2.038-1.111 3.238 1.173.092 2.371-.595 3.106-1.483z" />
    </svg>
  );
}

// Stylized brand mark matching the in-app icon:
// a black rounded square with an upward arrow.
export function WakeMark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 32"
      aria-hidden="true"
      className={cn("h-7 w-7", className)}
    >
      <rect
        x="1"
        y="1"
        width="30"
        height="30"
        rx="8"
        fill="#0E0E10"
        stroke="rgba(255,255,255,0.10)"
        strokeWidth="1"
      />
      <path
        d="M16 9 L16 23 M16 9 L11 14 M16 9 L21 14"
        stroke="#F4F4F5"
        strokeWidth="2.2"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </svg>
  );
}
