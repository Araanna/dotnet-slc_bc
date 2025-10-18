import axios from "axios";
import type { Contract } from "../types/contracts";

const API_BASE_URL = "http://localhost:5025/api";

export const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

/* ============================
    AUTH APIs
============================ */
export const login = async (
  username: string,
  password: string
): Promise<{ success?: boolean; message?: string }> => {
  const response = await api.post<{ success?: boolean; message?: string }>(
    "/Auth/login",
    { username, password }
  );
  return response.data;
};

/* ============================
    CONTRACT APIs
============================ */

// Define the response type for getContracts
interface ContractsResponse {
  contracts: Contract[];
}

export const getContracts = async (): Promise<Contract[]> => {
  const response = await api.get<ContractsResponse>("/Contracts");
  return response.data.contracts; // Extract the contracts array from the response
};

export const getContractById = async (id: number): Promise<Contract> => {
  const response = await api.get<Contract>(`/Contracts/${id}`);
  return response.data;
};

export const createContract = async (formData: FormData): Promise<Contract> => {
  const response = await api.post<Contract>("/Contracts", formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const updateContract = async (
  id: number,
  formData: FormData
): Promise<Contract> => {
  const response = await api.put<Contract>(`/Contracts/${id}`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};

export const deleteContract = async (id: number): Promise<void> => {
  await api.delete(`/Contracts/${id}`);
};

export const getContractImage = async (id: number): Promise<Blob> => {
  const response = await api.get(`/Contracts/${id}/image`, {
    responseType: 'blob',
  });
  return response.data;
};