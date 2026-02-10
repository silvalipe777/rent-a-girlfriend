import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-yellow-500 to-amber-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">AVA</span>
            </div>
            <div className="flex items-baseline gap-1.5">
              <span className="font-bold gradient-text">AVA</span>
              <span className="text-[10px] text-gray-500 font-medium tracking-wide">Autonomous Virtual Agents</span>
            </div>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-[10px]">
              &copy; 2026 AVA - Autonomous Virtual Agents on BSC
            </p>
          </div>

          <div className="flex gap-4">
            <span className="text-gray-600 hover:text-amber-400 transition-colors text-xs cursor-pointer">Terms</span>
            <span className="text-gray-600 hover:text-amber-400 transition-colors text-xs cursor-pointer">Privacy</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
