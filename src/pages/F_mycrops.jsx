import React, { useState, useMemo } from "react";
import { Plus, Sprout, Search, Filter, Pencil, Trash2, Lock, Shield } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import AddCrop from "@/modal/addcrop.jsx";
import UpdateCrop from "@/modal/updatecrop.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useCrops } from "@/context/CropContext";
import { Tooltip } from "@/components/ui/tooltip";

function Mycrops() {
  const { getFarmerCrops, addCrop, updateCrop, deleteCrop } = useCrops();
  const [searchTerm, setSearchTerm] = useState(""); //whats typed in search box
  const [filter, setFilter] = useState("all"); //current filter status
  const [editingCrop, setEditingCrop] = useState(null); //current crop being edited
  const [isUpdateOpen, setIsUpdateOpen] = useState(false); //modal open state

  // Get crops including admin-created ones with edit/delete flags
  const crops = getFarmerCrops();

  //Delete crop
  const handleDelete = (id) => {
    const crop = crops.find(c => c.id === id);
    if (crop.isAdminCreated) {
      alert("This crop was created by an admin and cannot be modified or deleted.");
      return;
    }
    try {
      deleteCrop(id, false); // false indicates farmer privileges
    } catch (error) {
      alert(error.message);
    }
  };

  {
    /* filter + search logic */
  }
  //useMemo prevents re-compution the filtered list on every render unless inputs change
  const filteredCrops = useMemo(() => {
    const q = searchTerm.trim().toLowerCase();

    return crops.filter((crop) => {
      //Filter by status if not "all"
      const matchesFilter = filter === "all" ? true : crop.status === filter;

      //Match search : if query empty, match all or check if name + discription includes query
      const matchesSearch =
        q === ""
          ? true
          : crop.name.toLowerCase().includes(q) ||
            crop.description.toLowerCase().includes(q);

      //only include items and match both filter + search
      return matchesFilter && matchesSearch;
    });
  }, [searchTerm, filter, crops]);

  const statusPill = (status) => {
    switch (status) {
      case "Planted":
        return "bg-yellow-100 text-yellow-800";
      case "Growing":
        return "bg-emerald-100 text-emerald-800";
      case "Ready to Harvest":
        return "bg-blue-100 text-blue-800";
      case "Harvested":
        return "bg-gray-100 text-gray-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  {
    /* Update Crop Modal */
  }
  const handleUpdateCrop = (UpdateCrop) => {
    setCrops((prev) =>
      prev.map((c) => (c.id === UpdateCrop.id ? UpdateCrop : c))
    );
    setIsUpdateOpen(false);
    setEditingCrop(null);
  };

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-200">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-emerald-500 font-semibold">
          <Sprout className="h-6 w-6 sm:h-7 sm:w-7" />
          <h2 className="text-lg sm:text-xl md:text-2xl text-emerald-500">
            My Crops
          </h2>
        </div>
        <AddCrop onAddCrop={addCrop} />
      </div>
      {/* Search and Filter Bar */}
      <Card className="bg-white shadow-sm rounded-lg border-0">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search crops..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white "
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-emerald-400 focus:outline-none bg-white"
            >
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="w-48 bg-white border-0 ">
                <SelectItem
                  value="all"
                  className="bg-white text-gray-700 hover:bg-emerald-500"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  value="Planted"
                  className="bg-white text-gray-700 hover:bg-emerald-500"
                >
                  Planted
                </SelectItem>
                <SelectItem
                  value="Growing"
                  className="bg-white text-gray-700 hover:bg-emerald-500"
                >
                  Growing
                </SelectItem>
                <SelectItem
                  value="Ready to Harvest"
                  className="bg-white text-gray-700 hover:bg-emerald-500"
                >
                  Ready to Harvest
                </SelectItem>
                <SelectItem
                  value="Harvested"
                  className="bg-white text-gray-700 hover:bg-emerald-500"
                >
                  Harvested
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </CardContent>
      </Card>
      <div className="mt-4 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {/* If nothing matches show a helpful message */}
        {filteredCrops.length === 0 ? (
          <div className="col-span-full text-center text-gray-500 py-8">
            No crops found.
          </div>
        ) : (
          filteredCrops.map((crop) => (
            <Card
              key={crop.id}
              className="bg-white shadow-sm  border-0 transform transsition duration-300 hover:shadow-lg hover:scale-[1.02] hover:shadow-gray-400"
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-semibold text-lg text-gray-800">
                      {crop.name}
                    </h3>
                    <p className="text-sm text-gray-500">{crop.description}</p>
                    <p className="text-sm mt-2 text-gray-600">
                      Quantity: {crop.quantity}
                    </p>
                  </div>

                  {/* status pill */}
                  <div className="flex flex-col items-end gap-2">
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${statusPill(
                        crop.status
                      )}`}
                    >
                      {crop.status}
                    </span>
                    <div className="flex gap-2">
                      {crop.isAdminCreated ? (
                        // Show admin indicator for admin-created crops
                        <Tooltip content="Admin-created crop (Cannot be modified)">
                          <div className="flex gap-2 items-center px-2 py-1 rounded-md bg-purple-50">
                            <Shield size={16} className="text-purple-600" />
                            <span className="text-xs text-purple-600 font-medium">Admin Crop</span>
                          </div>
                        </Tooltip>
                      ) : (
                        // Show edit and delete buttons for farmer-created crops
                        <>
                          <Tooltip content="Edit crop">
                            <button
                              onClick={() => {
                                setEditingCrop(crop);
                                setIsUpdateOpen(true);
                              }}
                              className="p-1 rounded-md hover:bg-emerald-100 text-emerald-600 transition"
                            >
                              <Pencil size={16} />
                            </button>
                          </Tooltip>
                          <Tooltip content="Delete crop">
                            <button
                              onClick={() => handleDelete(crop.id)}
                              className="p-1 rounded-md hover:bg-red-100 text-red-600 transition"
                            >
                              <Trash2 size={16} />
                            </button>
                          </Tooltip>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
      <UpdateCrop
        isOpen={isUpdateOpen}
        onOpenChange={(open) => {
          setIsUpdateOpen(open);
          if (!open) setEditingCrop(null);
        }}
        crop={editingCrop}
        onUpdate={handleUpdateCrop}
      />
    </div>
  );
}

export default Mycrops;
