import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Plus } from "lucide-react";
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

function CreateCrop({ onAddCrop }) {
  const [form, setForm] = useState({
    name: "",
    type: "",
    quantity: "",
    unit: "",
    status: "",
    plantedDate: "",
    expectedHarvestDate: "",
    discription: "",
  });

  const handleChange = (field, value) => {
    setForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!form.name || !form.type || !form.unit || !form.status) {
      alert("Please fill all the fields");
      return;
    }
    onAddCrop(form);
    setForm({
      name: "",
      type: "",
      quantity: "",
      unit: "kg",
      status: "",
      plantedDate: "",
      expectedHarvestDate: "",
      discription: "",
    });
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="w-full sm:w-auto flex items-center justify-center gap-2 bg-purple-500 text-white rounded-lg px-4 py-2 sm:px-5 sm:py-2.5 hover:bg-purple-600 transition-colors duration-200 shadow-sm">
          <Plus size={16} /> Create New Crop
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-lg w-[95%] sm:w-[80%] md:w-[600px] bg-white shadow-sm rounded-lg border-0">
        <DialogHeader className="hidden sm:block">
          <DialogTitle className="text-purple-500">Create New Crop</DialogTitle>
          <DialogDescription>
            Create a new crop to start tracking its progress.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          {/* Crop Name */}
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Crop Name
              </label>
            <Input
              placeholder="Crop Name (e.g., organic tomatoes)"
              value={form.name}
              onChange={(e) => handleChange("name", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white "
            />
            </div>
            {/* Crop Type */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Crop Type
              </label>
            <Input
              placeholder="Crop Type (e.g., vegetable)"
              value={form.type}
              onChange={(e) => handleChange("type", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white "
            />
            </div>
          </div>
          <div className="grid sm:grid-cols-3 gap-4">
            {/* Quantity */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Quantity
              </label>
              <Input
                type="number"
                placeholder="e.g., 500"
                value={form.quantity}
                onChange={(e) => handleChange("quantity", e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
              />
            </div>

            {/* Unit */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Unit
              </label>
              <Select
                value={form.unit}
                onValueChange={(value) => handleChange("unit", value)}
              >
                <SelectTrigger className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <SelectValue placeholder="Select Unit" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem 
                  value="Kilograms"
                  className="bg-white text-gray-700 hover:bg-purple-500">Kilograms</SelectItem>
                  <SelectItem 
                  value="Pounds"
                  className="bg-white text-gray-700 hover:bg-purple-500">Pounds</SelectItem>
                  <SelectItem 
                  value="Bushels"
                  className="bg-white text-gray-700 hover:bg-purple-500">Bushels</SelectItem>
                  <SelectItem 
                  value="Pieces"
                  className="bg-white text-gray-700 hover:bg-purple-500">Pieces</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Status */}
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Status
              </label>
              <Select
                value={form.status}
                onValueChange={(value) => handleChange("status", value)}
              >
                <SelectTrigger className="w-full bg-white pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none">
                  <SelectValue placeholder="Select Status" />
                </SelectTrigger>
                <SelectContent className="bg-white border border-gray-200">
                  <SelectItem 
                  value="Planted"
                  className="bg-white text-gray-700 hover:bg-purple-500">Planted</SelectItem>
                  <SelectItem 
                  value="Growing"
                  className="bg-white text-gray-700 hover:bg-purple-500">Growing</SelectItem>
                  <SelectItem 
                  value="Ready to Harvest"
                  className="bg-white text-gray-700 hover:bg-purple-500">
                    Ready to Harvest
                  </SelectItem>
                  <SelectItem 
                  value="Harvested"
                  className="bg-white text-gray-700 hover:bg-purple-500">Harvested</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Dates */}
          
          <div className="grid sm:grid-cols-2 gap-4">
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Planted Date
              </label>
            <Input
              type="date"
              value={form.plantedDate}
              onChange={(e) => handleChange("plantedDate", e.target.value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
            />
            </div>
            <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Expected Harvest Date
              </label>
            <Input
              type="date"
              value={form.expectedHarvestDate}
              onChange={(e) =>
                handleChange("expectedHarvestDate", e.target.value)
              }
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
            />
          </div>
          <div className="flex flex-col">
              <label className="text-sm font-medium text-gray-600 mb-1">
                Description
              </label>
          <Textarea
            placeholder="Optional notes about the crop..."
            value={form.discription}
            onChange={(e) => handleChange("discription", e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-700 rounded-md shadow-sm focus:ring-2 focus:ring-purple-400 focus:outline-none bg-white"
          />
        </div>
        </div>
      </div> 

        {/* Submit Button */}
        <div className="flex justify-end gap-4">
          <DialogClose asChild>
            <Button className="bg-gray-400 hover:bg-gray-600">Cancel</Button>
          </DialogClose>
          <Button
            onClick={handleSubmit}
            className="bg-purple-400 hover:bg-purple-600"
          >
            Create Crop
          </Button>
        </div>
      </DialogContent>
    </Dialog>
    
  );
}

export default CreateCrop;
