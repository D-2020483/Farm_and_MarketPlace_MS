import React from "react";
import { Button } from "@/components/ui/button";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Sprout, BarChart, ShoppingCart, LogOut, MapPin } from "lucide-react";
import { Link } from "react-router-dom";
import Mycrops from "@/pages/F_mycrops.jsx";

function FarmerDashboard() {
  const crops = [
    {
      name: "Organic Tomatoes",
      quantity: "500 kg",
      status: "Ready to Harvest",
      badgeColor: "bg-green-100 text-green-700",
      harvestDate: "9/15/2024",
    },
    {
      name: "Fresh Lettuce",
      quantity: "200 kg",
      status: "Growing",
      badgeColor: "bg-yellow-100 text-yellow-800",
      harvestDate: "10/1/2024",
    },
    {
      name: "Sweet Corn",
      quantity: "1000 pieces",
      status: "Planted",
      badgeColor: "bg-blue-100 text-blue-700",
      harvestDate: "11/15/2024",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-200">
      {/* Top Header */}
      <div className="flex items-center justify-between w-full bg-white px-6 py-4">
        {/* Left: Logo + Farm Name + User Info */}
        <div className="flex items-center gap-3">
          <div>
            <h2 className="text-lg font-semibold text-emerald-500">
              Welcome Back, Farmer!
            </h2>
            <p className="text-sm text-gray-600 flex items-center gap-1">
              <MapPin className="w-4 h-4 text-emerald-500" />
              John Smith • Salinas, CA
            </p>
          </div>
        </div>
        {/* Right: Switch User Button */}
        <Link to="/">
          <Button variant="outline" className="flex items-center gap-2">
            <LogOut className="w-4 h-4" />
            Switch Out
          </Button>
        </Link>
      </div>
      <div>
        {/* Tabs Navigation */}
        <div className="mb-6 px-6 pt-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="bg-gray-400 p-1 rounded-full flex space-x-2 shadow-sm ">
              <TabsTrigger
                value="overview"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium data-[state=active]:bg-gray-100  data-[state=active]:text-emerald-500 data-[state=active]:shadow-none"
              >
                <BarChart className="h-4 w-4 mr-2" />
                Overview
              </TabsTrigger>
              <TabsTrigger
                value="my-crops"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium data-[state=active]:bg-gray-100  data-[state=active]:text-emerald-500 data-[state=active]:shadow-none"
              >
                <Sprout className="h-4 w-4 mr-2" />
                My Crops
              </TabsTrigger>
              <TabsTrigger
                value="marketplace"
                className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium data-[state=active]:bg-gray-100  data-[state=active]:text-emerald-500 data-[state=active]:shadow-none"
              >
                <ShoppingCart className="h-4 w-4 mr-2" />
                Marketplace
              </TabsTrigger>
            </TabsList>
          </Tabs>
          <Mycrops />
        </div>
      </div>
    </div>
  );
}

export default FarmerDashboard;
