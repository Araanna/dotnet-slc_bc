import { useState, useEffect } from "react";
import Cards from "../primitives/Cards";
import type { Contract } from "../../types/contract";
import { contractService } from "../../services/api";

function Products() {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchContracts = async () => {
      try {
        const data = await contractService.getContracts();
        setContracts(data);
      } catch (err) {
        setError("Failed to load contracts");
        console.error("Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  const SkeletonCard = () => (
    <div className="max-w-sm bg-slate-50 rounded-lg shadow-md overflow-hidden min-h-[400px] flex flex-col border border-green-950 transform transition-all duration-300">
      {/* Image placeholder */}
      <div className="w-full aspect-[4/3] bg-gray-300 animate-pulse relative overflow-hidden border-0">
        <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/20 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col justify-between flex-1 border-t-0 border  rounded-b-lg">
        <div>
          {/* Title + Price row */}
          <div className="flex items-center justify-between gap-2 mb-2">
            <div className="h-7 w-40 rounded-md bg-gray-300 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
            <div className="h-7 w-24 rounded-lg bg-gray-300 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* Subtitle */}
          <div className="h-6 w-32 mb-4 rounded-full bg-gray-300 animate-pulse relative overflow-hidden">
            <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
          </div>

          {/* Description */}
          <div className="mb-4">
            <div className="h-4 w-full mb-2 rounded bg-gray-300 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
            <div className="h-4 w-4/5 rounded bg-gray-300 animate-pulse relative overflow-hidden">
              <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
            </div>
          </div>

          {/* Features */}
          <div className="space-y-2">
            {[100, 85, 75].map((width, i) => (
              <div 
                key={i} 
                className="h-3.5 rounded bg-gray-300 animate-pulse relative overflow-hidden"
                style={{ width: `${width}%` }}
              >
                <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
              </div>
            ))}
          </div>
        </div>

        {/* Button */}
        <div className="h-9 w-28 mt-4 rounded-md bg-gray-300 animate-pulse relative overflow-hidden">
          <div className="absolute inset-0 -translate-x-full animate-[shimmer_2s_infinite] bg-gradient-to-r from-transparent via-white/40 to-transparent" />
        </div>
      </div>
    </div>
  );

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center pt-6 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#08241D] relative">
      {/* Section Title */}
      <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl text-[#DEC79E] font-bold mb-10">
        WHAT WE DO
      </h1>

      {/* Section Header */}
      <div className="w-screen bg-[#B5E099] py-3 flex justify-center">
        <span className="text-lg font-bold text-black">MEMORIAL LAY-AWAY PROGRAMS</span>
      </div>

      {/* Content */}
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {loading || error ? (
          Array.from({ length: 3 }).map((_, i) => (
            <SkeletonCard key={i} />
          ))
        ) : (
          contracts.map((contract: Contract) => (
            <Cards key={contract.id} contract={contract} />
          ))
        )}
      </div>
    </div>
  );
}

export default Products;