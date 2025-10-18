// ContractEditModal.tsx
import React from "react";
import type { CreateContract } from "../types/contracts";

export interface ContractEditModalProps {
  isOpen: boolean;
  form: Partial<CreateContract>;
  preview: string | null;
  onClose: () => void;
  onSave: (e: React.FormEvent) => void;
  onFormChange: (field: keyof CreateContract, value: string) => void;
  onFileChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const ContractEditModal: React.FC<ContractEditModalProps> = ({
  isOpen,
  form,
  preview,
  onClose,
  onSave,
  onFormChange,
  onFileChange,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-gray-900 rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <h2 className="text-2xl font-bold mb-4 text-white">Edit Contract</h2>
        
        <form onSubmit={onSave} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Title
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={form.title || ""}
              onChange={(e) => onFormChange("title", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Subtitle
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={form.subtitle || ""}
              onChange={(e) => onFormChange("subtitle", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Price
            </label>
            <input
              type="number"
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={form.price || ""}
              onChange={(e) => onFormChange("price", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Description
            </label>
            <textarea
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white min-h-[100px]"
              value={form.description || ""}
              onChange={(e) => onFormChange("description", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Features
            </label>
            <textarea
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white min-h-[120px] font-mono text-sm"
              value={form.features || ""}
              onChange={(e) => onFormChange("features", e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image Alt Text
            </label>
            <input
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
              value={form.imageAlt || ""} // Changed from image_alt
              onChange={(e) => onFormChange("imageAlt", e.target.value)} // Changed from image_alt
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-300 mb-1">
              Image Upload
            </label>
            <input
              type="file"
              accept="image/*"
              onChange={onFileChange}
              className="w-full bg-gray-800 border border-gray-600 rounded-lg px-4 py-2 text-white"
            />
          </div>

          {preview && (
            <div className="flex justify-center">
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover rounded-lg border border-gray-600"
              />
            </div>
          )}

          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg flex-1"
            >
              Update Contract
            </button>
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded-lg flex-1"
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ContractEditModal;