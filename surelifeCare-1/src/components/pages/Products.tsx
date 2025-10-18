import { useState, useEffect } from 'react';
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
        setError('Failed to load contracts');
        console.error('Error:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchContracts();
  }, []);

  if (loading) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center pt-6 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#08241D] ">
        <div className="text-[#DEC79E] text-lg">Loading contracts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="w-full min-h-screen flex flex-col items-center justify-center text-center pt-6 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#08241D] ">
        <div className="text-red-400 text-lg">{error}</div>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen flex flex-col items-center text-center pt-6 px-4 sm:px-6 md:px-10 lg:px-16 bg-[#08241D] relative">
      {/* Section Title */}
      <h1 className="text-sm sm:text-2xl md:text-3xl lg:text-4xl text-[#DEC79E] font-bold mb-10">
        WHAT WE DO
      </h1>

      <div className="w-screen bg-[#B5E099] py-3 flex justify-center">
        <span className="text-lg font-bold text-black">
          MEMORIAL LAY-AWAY PROGRAMS
        </span>
      </div>
      
      <div className="flex flex-wrap justify-center gap-6 mt-10">
        {contracts.map((contract: Contract) => (
          <Cards key={contract.id} contract={contract} />
        ))}
      </div>

      {contracts.length === 0 && (
        <div className="text-[#DEC79E] mt-10">
          No contracts available at the moment.
        </div>
      )}
    </div>
  );
}

export default Products;