import React, { createContext, useContext, useState } from 'react';
import { dummyCrops } from '@/data/crops';

const CropContext = createContext();

export function CropProvider({ children }) {
  const [crops, setCrops] = useState(dummyCrops);

  // Add a new crop
  const addCrop = (crop) => {
    const newCrop = {
      ...crop,
      id: Date.now(),
      isAdminCreated: crop.isAdminCreated || false
    };
    setCrops(prev => [...prev, newCrop]);
    return newCrop;
  };

  // Update a crop
  const updateCrop = (id, newData) => {
    setCrops(prev => prev.map(crop => {
      if (crop.id === id) {
        // Preserve the isAdminCreated flag
        return { ...crop, ...newData, isAdminCreated: crop.isAdminCreated };
      }
      return crop;
    }));
  };

  // Delete a crop
  const deleteCrop = (id, isAdmin = false) => {
    const crop = crops.find(c => c.id === id);
    
    // Only admin can delete admin-created crops
    if (crop.isAdminCreated && !isAdmin) {
      throw new Error('Cannot delete admin-created crops');
    }
    
    setCrops(prev => prev.filter(crop => crop.id !== id));
  };

  // Get all crops
  const getAllCrops = () => crops;

  // Get crops for farmer view (includes admin-created crops)
  const getFarmerCrops = (farmerId) => {
    return crops.map(crop => ({
      ...crop,
      // Disable editing for admin-created crops
      canEdit: !crop.isAdminCreated,
      canDelete: !crop.isAdminCreated
    }));
  };

  return (
    <CropContext.Provider value={{
      crops,
      addCrop,
      updateCrop,
      deleteCrop,
      getAllCrops,
      getFarmerCrops
    }}>
      {children}
    </CropContext.Provider>
  );
}

export function useCrops() {
  const context = useContext(CropContext);
  if (!context) {
    throw new Error('useCrops must be used within a CropProvider');
  }
  return context;
}