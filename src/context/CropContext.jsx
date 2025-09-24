import React, { createContext, useContext, useState } from "react";

// Mock data for demonstration
const initialCrops = [
  {
    id: 1,
    name: "Organic Tomatoes",
    status: "Ready to Harvest",
    quantity: "500",
    unit: "Kilograms",
    type: "Vegetables",
    description: "Cherry tomatoes grown in greenhouse",
    plantedDate: "2024-08-15",
    expectedHarvestDate: "2024-10-15",
    isAdminCreated: false,
  },
  {
    id: 2,
    name: "Basil Herbs",
    status: "Planted",
    quantity: "15",
    unit: "Kilograms",
    type: "Herbs",
    description: "Fresh sweet basil for culinary use",
    plantedDate: "2024-09-01",
    expectedHarvestDate: "2024-11-01",
    isAdminCreated: true,
  },
  {
    id: 3,
    name: "Premium Carrots",
    status: "Growing",
    quantity: "300",
    unit: "Kilograms",
    type: "Vegetables",
    description:
      "High-yield carrots variety recommended by agricultural experts",
    plantedDate: "2024-08-20",
    expectedHarvestDate: "2024-12-20",
    isAdminCreated: true,
  },
  {
    id: 4,
    name: "Hybrid Lettuce",
    status: "Ready to Harvest",
    quantity: "15",
    unit: "Kilograms",
    type: "Vegetables",
    description: "Disease-resistant lettuce variety - Admin recommended",
    plantedDate: "2024-08-10",
    expectedHarvestDate: "2024-10-10",
    isAdminCreated: false,
  },
];

const CropContext = createContext();

export function CropProvider({ children }) {
  const [crops, setCrops] = useState(initialCrops);

  // Add a new crop
  const addCrop = (crop, isAdmin = false) => {
    const newCrop = {
      ...crop,
      id: Date.now(),
      quantity:
        crop.quantity +
        (crop.unit === "Kilograms"
          ? " kg"
          : crop.unit === "Pounds"
          ? " lbs"
          : crop.unit === "Bushels"
          ? " bushels"
          : " pieces"),
      isAdminCreated: isAdmin,
    };
    setCrops((prev) => [...prev, newCrop]);
    return newCrop;
  };

  // Update a crop
  const updateCrop = (id, newData, isAdmin = false) => {
    const crop = crops.find((c) => c.id === id);

    // Only admin can update admin-created crops
    if (crop.isAdminCreated && !isAdmin) {
      throw new Error("Cannot update admin-created crops");
    }

    setCrops((prev) =>
      prev.map((crop) => {
        if (crop.id === id) {
          return { ...crop, ...newData, isAdminCreated: crop.isAdminCreated };
        }
        return crop;
      })
    );
  };

  // Delete a crop
  const deleteCrop = (id, isAdmin = false) => {
    const crop = crops.find((c) => c.id === id);

    // Only admin can delete admin-created crops
    if (crop.isAdminCreated && !isAdmin) {
      throw new Error("Cannot delete admin-created crops");
    }

    setCrops((prev) => prev.filter((crop) => crop.id !== id));
  };

  // Get all crops (for admin view)
  const getAllCrops = () => crops;

  // Get crops for farmer view (includes admin-created crops)
  const getFarmerCrops = () => crops;

  return (
    <CropContext.Provider
      value={{
        crops,
        addCrop,
        updateCrop,
        deleteCrop,
        getAllCrops,
        getFarmerCrops,
      }}
    >
      {children}
    </CropContext.Provider>
  );
}

export function useCrops() {
  const context = useContext(CropContext);
  if (!context) {
    throw new Error("useCrops must be used within a CropProvider");
  }
  return context;
}
