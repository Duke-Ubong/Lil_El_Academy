import { ArrowUp, Phone } from "lucide-react";

export default function CleanFloatingCTA() {
  return (
    <aside
      aria-label="Admissions quick dock"
      className="fixed bottom-5 right-5 z-40 flex items-center gap-2 bg-[#3B0710] text-white p-1.5 pl-4 rounded-full shadow-lg border border-white/20"
    >
      <span className="text-xs font-semibold hidden sm:inline text-stone-200">
        Ready for tailored tuition?
      </span>
      <a
        href="#inquiry-form"
        className="px-4 py-2 rounded-full text-xs font-bold bg-[#D4AF37] text-[#3B0710] hover:bg-[#E5C358] transition-colors"
      >
        Book Free Assessment
      </a>
      <a
        href="tel:+447768639106"
        className="p-2 rounded-full hover:bg-white/10 text-stone-300 hover:text-white transition-colors"
        title="Call admissions"
      >
        <Phone className="w-3.5 h-3.5" />
      </a>
    </aside>
  );
}
