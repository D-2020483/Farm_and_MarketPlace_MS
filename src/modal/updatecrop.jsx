import { Input } from "@/components/ui/input";
import React, { useState, useEffect } from "react";
import { Plus, SquarePen } from "lucide-react";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogClose,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";

function UpdateCrop({ isOpen, onOpenChange, crop, onUpdate }) {
  // Prevent opening the modal for admin-created crops
  useEffect(() => {
    if (isOpen && crop?.isAdminCreated) {
      alert("Cannot modify admin-created crops");
      onOpenChange(false);
    }
  }, [isOpen, crop, onOpenChange]);

  const [form, setForm] = useState({
    name: "",
    type: "Vegetables",
    quantity: "",
    unit: "Kilograms",
    status: "Planted",
    plantedDate: "",
    expectedHarvest: "",
    description: "",
  });

  useEffect(() => {
    if (!crop) return;
    const toIso = (d) => {
      if (!d) return "";
    
      const dt = new Date(d);
      if (Number.isNaN(dt.getTime())) return d;
      return dt.toISOString().slice(0, 10);
    };

    setForm({
      name: crop.name ?? "",
      type: crop.type ?? "Vegetables",
      // store quantity as numeric string (without units) for editing
      quantity:
        crop.quantity && typeof crop.quantity === "string"
          ? crop.quantity.replace(/[^0-9.]/g, "")
          : crop.quantity ?? "",
      unit: crop.unit ?? (crop.quantity?.includes("kg") ? "Kilograms" : "Pieces"),
      status: crop.status ?? "Planted",
      plantedDate: toIso(crop.plantedDate),
      expectedHarvest: toIso(crop.expectedHarvest),
      description: crop.description ?? "",
    });
  }, [crop]);

  const handleChange = (field, value) =>{
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name.trim()) {
      alert("Please enter a crop name");
      return;
    }

    const updated = {
      ...crop,
      name: form.name,
      type: form.type,
      quantity:
        form.unit === "Kilograms"
          ? `${form.quantity} kg`
          : `${form.quantity} pieces`,
      unit: form.unit,
      status: form.status,
      plantedDate: form.plantedDate || "",
      expectedHarvest: form.expectedHarvest || "",
      description: form.description,
    };

    onUpdate?.(updated);
    onOpenChange?.(false);
  };

  return (
    <Dialog open={!!isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-lg w-[95%] sm:w-[80%] md:w-[600px] bg-white shadow-sm rounded-lg border-0">
        <DialogHeader className="hidden sm:block">
          <DialogTitle className="text-emerald-500">Edit Crop</DialogTitle>
          <DialogDescription>
            Edit the details of your crop and save the changes.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
        <div className="grid gap-4 py-4">
          {/* Crop Name & Type */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Crop Name
              </label>
              <Input
                name="name"
                placeholder=" Crop Name (e.g., organic tomatoes)"
                value={form.name}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Crop Type
              </label>
              <Input
                name="type"
                placeholder="Crop Type (e.g., vegetable)"
                value={form.type}
                onChange={(e) => handleChange(e.target.name, e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
          </div>

          {/* Quantity, Unit & Status */}
          <div className="grid sm:grid-cols-3 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Quantity
              </label>
              <Input
                name="quantity"
                type="number"
                placeholder="e.g., 500"
                value={form.quantity}
                onChange= {(e) => handleChange(e.target.name, e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Unit
              </label>
              <Select
                name="unit"
                value={form.unit}
                onValueChange={(value) => handleChange("unit", value)}
              >
                <SelectTrigger className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem 
                  value="Kilograms"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Kilograms</SelectItem>
                  <SelectItem 
                  value="Pounds"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Pounds</SelectItem>
                  <SelectItem 
                  value="Bushels"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Bushels</SelectItem>
                  <SelectItem 
                  value="Pieces"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Pieces</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <Select
                name="status"
                value={form.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem 
                  value="Planted"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Planted</SelectItem>
                  <SelectItem 
                  value="Growing"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Growing</SelectItem>
                  <SelectItem 
                  value="Ready to Harvest"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Ready to Harvest</SelectItem>
                  <SelectItem 
                  value="Harvested"
                  className="bg-white text-gray-700 hover:bg-emerald-500">Harvested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates & Description */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Planted Date
              </label>
              <Input
                name="plantedDate"
                type="date"
                value={form.plantedDate}
                onChange= {(e) => handleChange("plantedDate", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Expected Harvest Date
              </label>
              <Input
                name="expectedHarvestDate"
                type="date"
                value={form.expectedHarvestDate}
                 onChange={(e) => handleChange("expectedHarvestDate", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
            <div className="flex flex-col sm:col-span-2">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
              <Textarea
                name="description"
                placeholder="Optional notes about the crop..."
                value={form.description}
                onChange={(e) => handleChange("description", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-500 focus:outline-none bg-white"
              />
            </div>
          </div>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button 
            variant="ghost"
            onClick={() => onOpenChange?.(false)}
            className="bg-gray-400 hover:bg-gray-600">Cancel</Button>
          </DialogClose>
          <Button
            type="submit"
            className="bg-emerald-400 hover:bg-emerald-600"
          >
            Save Changes
          </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}

export default UpdateCrop;
