import React, { useEffect, useState } from "react";
import { 
  getContracts, 
  createContract, 
  updateContract, 
  deleteContract 
} from "../api/api";
import { AxiosError } from "axios";
import type { Contract } from "../types/contracts";
import { toast } from "sonner";
import ContractEditModal from "../components/ContractEditModal";

const Contracts: React.FC = () => {
  const [contracts, setContracts] = useState<Contract[]>([]);
  const [form, setForm] = useState<Partial<Contract>>({});
  const [editingId, setEditingId] = useState<number | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Convert JSON features back to readable text
  const parseFeaturesToText = (featuresJson: string): string => {
    try {
      if (!featuresJson) return "";

      console.log("Parsing features:", featuresJson);

     
      if (!featuresJson.trim().startsWith("[")) {
        return featuresJson;
      }

      const features = JSON.parse(featuresJson);
      if (!Array.isArray(features)) return featuresJson;

      return features
        .map((feature) => {
          // Handle both "Text" and "text" property names
          const text = feature.Text || feature.text || "";
          const indent = feature.Indent || feature.indent || 0;
          const spaces = "  ".repeat(indent);
          return `${spaces}${text}`;
        })
        .join("\n");
    } catch (error) {
      console.error("Error parsing features:", error);
      // If parsing fails, return the original string
      return featuresJson;
    }
  };

 
  const parseTextToFeatures = (featuresText: string): string => {
    if (!featuresText) return "[]";

    const lines = featuresText.split("\n");
    const features = [];

    for (const line of lines) {
      const trimmedLine = line.trim();
      if (!trimmedLine) continue;

      // Detect indentation level
      let indentLevel = 0;
      const spaceMatch = line.match(/^(\s+)/);
      if (spaceMatch) {
        const spaces = spaceMatch[1];
        indentLevel = Math.floor(spaces.length / 2);
      }

      features.push({
        Text: trimmedLine,
        Indent: indentLevel,
      });
    }

    return JSON.stringify(features);
  };

  const fetchContracts = async () => {
    setIsLoading(true);
    try {
      console.log("Fetching contracts...");
      const data = await getContracts();
      console.log("Raw API response:", data);
      
      
      const contractsWithImageSrc = data.map(contract => ({
        ...contract,
        imageSrc: contract.imageData 
          ? `data:${contract.imageContentType || 'image/jpeg'};base64,${contract.imageData}`
          : undefined
      }));
      
      console.log("Processed contracts:", contractsWithImageSrc);
      setContracts(contractsWithImageSrc);
    } catch (err: unknown) {
      console.error("Error fetching contracts:", err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.title || 
                            err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to fetch contracts";
        toast.error(errorMessage);
        
        // Log detailed error info
        console.error("Axios error details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data,
          headers: err.response?.headers
        });
      } else {
        toast.error("Unexpected error while fetching contracts");
      }
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchContracts();
  }, []);

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      
      // Map field names to match your API - using exact case from your API
      if (form.title) formData.append("Title", form.title);
      if (form.subtitle) formData.append("Subtitle", form.subtitle);
      if (form.price) formData.append("Price", form.price.toString());
      if (form.description) formData.append("Description", form.description);
      if (form.features) {
        // Convert text to JSON features before saving
        const featuresJson = parseTextToFeatures(form.features);
        formData.append("Features", featuresJson);
      }
      if (form.imageAlt) formData.append("ImageAlt", form.imageAlt);
      if (imageFile) formData.append("ImageFile", imageFile);

      console.log("Saving contract with data:", {
        editingId,
        form: form,
        hasImageFile: !!imageFile
      });

      if (editingId) {
        await updateContract(editingId, formData);
        toast.success("Contract updated successfully");
        setIsModalOpen(false);
      } else {
        await createContract(formData);
        toast.success("Contract created successfully");

        // Reset file input after creating contract
        const fileInput = document.querySelector(
          'input[type="file"]'
        ) as HTMLInputElement;
        if (fileInput) {
          fileInput.value = "";
        }
      }

      setForm({});
      setImageFile(null);
      setPreview(null);
      setEditingId(null);
      fetchContracts();
    } catch (err: unknown) {
      console.error("Error saving contract:", err);
      if (err instanceof AxiosError) {
        const errorMessage = err.response?.data?.title || 
                            err.response?.data?.message || 
                            err.response?.data?.error || 
                            "Failed to save contract";
        toast.error(errorMessage);
        
        // Log detailed error info
        console.error("Axios error details:", {
          status: err.response?.status,
          statusText: err.response?.statusText,
          data: err.response?.data
        });
      } else {
        toast.error("Unexpected error while saving contract");
      }
    }
  };

  const handleEdit = (c: Contract) => {
    console.log("Editing contract:", c);
    
    // Convert JSON features back to readable text for editing
    const contractWithReadableFeatures = {
      ...c,
      features: parseFeaturesToText(c.features || ""),
    };

    console.log("Contract with readable features:", contractWithReadableFeatures);

    setForm(contractWithReadableFeatures);
    setEditingId(c.id);
    setPreview(c.imageSrc || null);
    setIsModalOpen(true);
  };

  const handleDelete = async (id: number) => {
    if (window.confirm("Delete this contract?")) {
      try {
        await deleteContract(id);
        toast.success("Contract deleted successfully!");
        fetchContracts();
      } catch (err: unknown) {
        console.error("Error deleting contract:", err);
        if (err instanceof AxiosError) {
          const errorMessage = err.response?.data?.title || 
                              err.response?.data?.message || 
                              err.response?.data?.error || 
                              "Failed to delete contract";
          toast.error(errorMessage);
        } else {
          toast.error("Unexpected error while deleting contract");
        }
      }
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setImageFile(file);
    setPreview(file ? URL.createObjectURL(file) : null);
  };

  const handleFormChange = (field: keyof Contract, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setForm({});
    setImageFile(null);
    setPreview(null);
    setEditingId(null);
  };

  return (
    <div className="min-h-screen text-white p-8 m-8">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-white">Contracts Management</h2>

 <button 
            onClick={fetchContracts}
            className=" m-5 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm"
          >
            Refresh Contracts
          </button>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8  items-start">
          {/* Form Section */}
          <div className="bg-gray-950 shadow-2xl rounded-xl p-6 border border-green-900">
            <h3 className="text-xl font-semibold mb-4 text-white">
              {editingId ? "Edit Contract" : "Create New Contract"}
            </h3>
            <form onSubmit={handleSave} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Title
                </label>
                <input
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter title"
                  value={form.title || ""}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Subtitle
                </label>
                <input
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter subtitle"
                  value={form.subtitle || ""}
                  onChange={(e) =>
                    setForm({ ...form, subtitle: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Price
                </label>
                <input
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  type="number"
                  step="0.01"
                  placeholder="Enter price"
                  value={form.price || ""}
                  onChange={(e) => setForm({ ...form, price: parseFloat(e.target.value) || 0 })}
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Description
                </label>
                <textarea
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[100px]"
                  placeholder="Enter description"
                  value={form.description || ""}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Features
                  <span className="text-xs text-gray-400 ml-2">
                    (One per line, use spaces for indentation)
                  </span>
                </label>
                <textarea
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[120px] font-mono text-sm"
                  placeholder={`Enter one feature per line.
Use 2 spaces for each indentation level.

Example:
Standard body preparation for 7 days
Funeral hearse (25 km)
Accidental death coverage:
  Principal: 100%
  Spouse: 50%
  Children: 25%
Cash assistance: 100%
Assignable/transferable`}
                  value={form.features || ""}
                  onChange={(e) =>
                    setForm({ ...form, features: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-300 mb-1">
                  Image Alt Text
                </label>
                <input
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Enter image alt text"
                  value={form.imageAlt || ""}
                  onChange={(e) =>
                    setForm({ ...form, imageAlt: e.target.value })
                  }
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-yellow-400 mb-1 flex items-center">
                  <svg
                    className="w-4 h-4 mr-2"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                  Image Upload
                </label>
                <div className="bg-yellow-900/30 border border-yellow-600 rounded-lg p-3 mb-2">
                  <p className="text-yellow-300 text-sm font-medium">
                    {" "}
                    IMPORTANT: Please make sure the image is in Landscape
                    orientation
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileChange}
                  className="w-full bg-gray-950 border border-gray-600 rounded-lg px-4 py-3 text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700"
                />
              </div>

              {preview && (
                <div className="flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-48 h-48 object-cover rounded-lg border border-gray-600"
                  />
                </div>
              )}

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-semibold py-3 px-4 rounded-lg transition duration-200 ease-in-out transform hover:scale-105"
                disabled={isLoading}
              >
                {isLoading ? "Saving..." : (editingId ? "Update Contract" : "Create Contract")}
              </button>
            </form>
          </div>

          {/* Contracts List Section */}
          <div className="bg-gray-950 shadow-2xl rounded-xl p-4 sm:p-6 border border-gray-900 flex flex-col h-[56rem] sm:h-[60rem]">
            <h3 className="text-lg sm:text-xl font-semibold mb-4 text-white text-center sm:text-left">
              Contracts List ({contracts.length})
            </h3>

            {isLoading ? (
              <div className="text-center py-10 text-gray-400 flex-grow">
                Loading contracts...
              </div>
            ) : contracts.length === 0 ? (
              <div className="text-center py-10 text-gray-400 flex-grow text-sm sm:text-base">
                No contracts found. Create your first contract!
              </div>
            ) : (
              <div className="space-y-3 sm:space-y-4 overflow-y-auto pr-1 sm:pr-2 flex-grow scrollbar-thin scrollbar-thumb-gray-700 scrollbar-track-gray-900">
                {contracts.map((c) => (
                  <div
                    key={c.id}
                    className="bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 hover:bg-gray-750 transition duration-200"
                  >
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 sm:gap-4">
                      <div className="flex items-center space-x-3 sm:space-x-4 flex-1">
                        {c.imageSrc && (
                          <img
                            src={c.imageSrc}
                            alt={c.imageAlt || c.title}
                            className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-lg flex-shrink-0"
                          />
                        )}
                        <div className="flex-1 min-w-0">
                          <h3 className="font-bold text-base sm:text-lg text-white truncate">
                            {c.title}
                          </h3>
                          <p className="text-gray-300 text-xs sm:text-sm truncate">
                            {c.subtitle}
                          </p>
                          <p className="font-semibold text-green-400 text-sm sm:text-base">
                            ₱{c.price}
                          </p>
                          {c.description && (
                            <p className="text-gray-400 text-xs mt-1 line-clamp-2">
                              {c.description}
                            </p>
                          )}
                        </div>
                      </div>

                      <div className="flex sm:flex-col gap-2 w-full sm:w-auto">
                        <button
                          onClick={() => handleEdit(c)}
                          className="bg-yellow-600 hover:bg-yellow-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 flex-1"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(c.id)}
                          className="bg-red-600 hover:bg-red-700 text-white px-3 py-2 rounded-lg text-xs sm:text-sm font-medium transition duration-200 flex-1"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Edit Modal */}
      <ContractEditModal
        isOpen={isModalOpen}
        form={form}
        preview={preview}
        onClose={closeModal}
        onSave={handleSave}
        onFormChange={handleFormChange}
        onFileChange={handleFileChange}
        isEditing={!!editingId}
      />
    </div>
  );
};

export default Contracts;