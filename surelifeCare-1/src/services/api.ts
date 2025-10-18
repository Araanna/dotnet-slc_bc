import type { Contract, ContractData } from '../types/contract';

const API_BASE_URL = 'http://localhost:5025/api';

export const contractService = {
  async getContracts(): Promise<Contract[]> {
    try {
      console.log('🚀 Fetching contracts from:', `${API_BASE_URL}/Contracts`);
      
      const response = await fetch(`${API_BASE_URL}/Contracts`, {
        method: 'GET',
        headers: {
          'Accept': 'text/plain',
        },
      });
      
      console.log('📨 Response status:', response.status);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}: Failed to fetch contracts`);
      }
      
      const data: ContractData = await response.json();
      console.log('✅ Contracts received:', data.contracts.length);
      
      return data.contracts;
      
    } catch (error) {
      console.error('💥 Error fetching contracts:', error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch contracts: ${error.message}`);
      } else {
        throw new Error('Failed to fetch contracts: Unknown error occurred');
      }
    }
  },
  
  async getContractById(id: number): Promise<Contract> {
    try {
      const response = await fetch(`${API_BASE_URL}/Contracts/${id}`, {
        headers: {
          'Accept': 'text/plain',
        },
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch contract with id ${id}. Status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error(`Error fetching contract with id ${id}:`, error);
      if (error instanceof Error) {
        throw new Error(`Failed to fetch contract: ${error.message}`);
      } else {
        throw new Error('Failed to fetch contract: Unknown error occurred');
      }
    }
  },
};