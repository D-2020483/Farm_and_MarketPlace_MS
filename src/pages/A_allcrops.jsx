import React, { useState, useMemo } from "react";
import { Plus, Sprout, Search, Filter, Pencil, Trash2 } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

function AllCrops() {
 
  const [searchTerm, setSearchTerm] = useState(""); //whats typed in search box
  const [filter, setFilter] = useState("all"); //current filter status

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

  return (
    <div className="p-4 sm:p-6 min-h-screen bg-gray-200">
      <div className="flex flex-col md:flex-row justify-between md:items-center mb-6 gap-4">
        <div className="flex items-center gap-2 text-purple-500 font-semibold">
          <Sprout className="h-6 w-6 sm:h-7 sm:w-7" />
          <h2 className="text-lg sm:text-xl md:text-2xl text-purple-500">
            All Crops
          </h2>
        </div>
        <AddCrop
          onAddCrop={(newCrop) =>
            setCrops([...crops, { id: Date.now(), ...newCrop }])
          }
        />
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
                className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white "
              />
            </div>
            <Select
              value={filter}
              onValueChange={(value) => setFilter(value)}
              className="w-full pl-10 pr-4 py-2 border border-gray-300 text-gray-400 rounded-md shadow-sm focus:ring-2 focus:ring-purple-500 focus:outline-none bg-white"
            >
              <SelectTrigger className="w-48 bg-white border-gray-300">
                <Filter className="h-4 w-4 mr-2" />
                <SelectValue placeholder="Filter by status" />
              </SelectTrigger>
              <SelectContent className="w-48 bg-white border-0 ">
                <SelectItem
                  value="all"
                  className="bg-white text-gray-700 hover:bg-purple-500"
                >
                  All Status
                </SelectItem>
                <SelectItem
                  value="Planted"
                  className="bg-white text-gray-700 hover:bg-purple-500"
                >
                  Planted
                </SelectItem>
                <SelectItem
                  value="Growing"
                  className="bg-white text-gray-700 hover:bg-purple-500"
                >
                  Growing
                </SelectItem>
                <SelectItem
                  value="Ready to Harvest"
                  className="bg-white text-gray-700 hover:bg-purple-500"
                >
                  Ready to Harvest
                </SelectItem>
                <SelectItem
                  value="Harvested"
                  className="bg-white text-gray-700 hover:bg-purple-500"
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
                      {/* Edit icon */}
                      <button
                        onClick={() => {
                          setEditingCrop(crop);
                          setIsUpdateOpen(true);
                        }}
                        className="p-1 rounded-md hover:bg-emerald-100 text-purple-600 transition"
                      >
                        <Pencil size={16} />
                      </button>
                      {/* Delete icon */}
                      <button
                        onClick={() => handleDelete(crop.id)}
                        className="p-1 rounded-md hover:bg-red-100 text-red-600 transition"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))
        )}
      </div>
    </div>
  );
}

export default AllCrops;
