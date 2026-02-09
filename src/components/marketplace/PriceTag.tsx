import { formatCurrency } from "@/lib/utils";

interface PriceTagProps {
  pricePerHour: number;
  pricePerDay: number;
  pricePerWeek: number;
}

export default function PriceTag({ pricePerHour, pricePerDay, pricePerWeek }: PriceTagProps) {
  return (
    <div className="grid grid-cols-3 gap-3">
      <div className="bg-gray-800/50 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-500 mb-1">Por Hora</p>
        <p className="text-amber-400 font-bold">{formatCurrency(pricePerHour)}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-3 text-center border border-amber-600/30">
        <p className="text-xs text-gray-500 mb-1">Por Dia</p>
        <p className="text-amber-400 font-bold">{formatCurrency(pricePerDay)}</p>
      </div>
      <div className="bg-gray-800/50 rounded-xl p-3 text-center">
        <p className="text-xs text-gray-500 mb-1">Por Semana</p>
        <p className="text-amber-400 font-bold">{formatCurrency(pricePerWeek)}</p>
      </div>
    </div>
  );
}
