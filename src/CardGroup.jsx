import React from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {  Shield, ShoppingCart, Sprout } from 'lucide-react';

export function CardGroup() {
  return (
    <div className="px-4 sm:px-6 md:px-12 lg:px-20 ">
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 p-6"> 
        <Card className="text-center shadow-md border-0 rounded-2xl p-8 min-h-[280px] cursor-pointer hover:ring-2 hover:ring-emerald-400 focus:ring-2 focus:ring-emerald-500 ">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Sprout className="h-8 w-8 text-emerald-500" /> 
            </div>
            <CardTitle>I'm a Farmer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              List crops, manage your farm, and connect with local buyers
            </p>
            <Button asChild className="bg-emerald-400 hover:bg-emerald-600">
              <Link to="/farmer-login">Get Started as Farmer</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center shadow-md border-0 rounded-2xl p-8 min-h-[280px] cursor-pointer hover:ring-2 hover:ring-blue-400 focus:ring-2 focus:ring-emerald-500 ">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <ShoppingCart className="h-8 w-8 text-blue-500" /> 
            </div>
            <CardTitle>I'm a Buyer</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Manage fresh, local produce and connect directly with farmers.
            </p>
            <Button asChild className="bg-blue-400 hover:bg-blue-600">
              <Link to="/Buyer-login">Get Started as Buyer</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="text-center shadow-md border-0 rounded-2xl p-8 min-h-[280px] cursor-pointer hover:ring-2 hover:ring-purple-400 focus:ring-2 focus:ring-emerald-500 ">
          <CardHeader>
            <div className="flex justify-center mb-2">
              <Shield className="h-8 w-8 text-purple-500" /> 
            </div>
            <CardTitle>I'm an Admin</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-gray-500 mb-4">
              Manage the platform and oversee all users and their profiles.
            </p>
            <Button asChild className="bg-purple-400 hover:bg-purple-600">
              <Link to="/admin-login">Get Started as Admin</Link>
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default CardGroup;