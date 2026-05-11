export const site = {
  name: "WakeApp",
  domain: "wakeapp.app",
  url: "https://wakeapp.app",
  shortDescription:
    "A personal execution system for attention, discipline, and focus.",
  longDescription:
    "Tasks, habits, calendar, focus, and screen time control — unified into one calm environment. Built for the people who refuse to drift.",
  appStore: "https://apps.apple.com/app/wakeapp",
  testFlight: "mailto:invite@wakeapp.app?subject=TestFlight%20invite%20request",
  social: {
    twitter: "https://x.com/wakeapp",
    instagram: "https://instagram.com/wakeapp",
  },
} as const;

export const navLinks = [
  { label: "Features", href: "#features" },
  { label: "Themes", href: "#themes" },
  { label: "Focus", href: "#focus" },
  { label: "Blackout", href: "#blackout" },
  { label: "FAQ", href: "#faq" },
] as const;
