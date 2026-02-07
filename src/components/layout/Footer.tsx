import Container from "./Container";

export default function Footer() {
  return (
    <footer className="border-t border-white/5 py-12 mt-auto">
      <Container>
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-pink-500 to-purple-600 flex items-center justify-center">
              <span className="text-white text-sm font-bold">R</span>
            </div>
            <span className="font-bold gradient-text">RentAGirlfriend</span>
          </div>

          <div className="text-center">
            <p className="text-gray-600 text-[10px]">
              &copy; 2026 Rent a Girlfriend - Virtual AI Companions
            </p>
          </div>

          <div className="flex gap-4">
            <span className="text-gray-600 hover:text-purple-400 transition-colors text-xs cursor-pointer">Terms</span>
            <span className="text-gray-600 hover:text-purple-400 transition-colors text-xs cursor-pointer">Privacy</span>
          </div>
        </div>
      </Container>
    </footer>
  );
}
