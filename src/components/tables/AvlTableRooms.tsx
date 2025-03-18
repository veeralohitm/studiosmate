"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import Input from "@/components/form/input/InputField";
import { Filter } from "lucide-react";

interface Room {
  id: number;
  roomId: string;
  roomType: string;
  rate: number;
  lastBooked: string;
  ytdBookings: number;
}
import {
    Search,
    ChevronLeft,
    ChevronRight,
  } from "lucide-react";
const vacantRooms: Room[] = [
  { id: 1, roomId: "101", roomType: "Single", rate: 100, lastBooked: "2024-03-01", ytdBookings: 5 },
  { id: 2, roomId: "102", roomType: "Double", rate: 150, lastBooked: "2024-02-20", ytdBookings: 8 },
  { id: 3, roomId: "103", roomType: "Suite", rate: 200, lastBooked: "2024-01-15", ytdBookings: 3 },
];
const roomTypes = ["All", "Single", "Double", "Suite"];
const ITEMS_PER_PAGE = 2;

export default function AvailableRooms() {
  const [search, setSearch] = useState("");
  const [selectedRoomType, setSelectedRoomType] = useState("All");
  const [currentPage, setCurrentPage] = useState(1);
  const [showFilter, setShowFilter] = useState(false);
 
  const filteredRooms = vacantRooms.filter((room) =>
    (room.roomId.includes(search) || room.roomType.toLowerCase().includes(search.toLowerCase())) &&
    (selectedRoomType === "All" || room.roomType === selectedRoomType)
  );
  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedData = filteredRooms.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
    <div className="flex flex-col gap-5 px-6 mb-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Rooms</h3>
    <div className="flex gap-3 sm:items-center">
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" size={18} />
        <Input
          type="text"
          placeholder="Search room number..."
          className="border p-2 rounded-lg"
          onChange={(e: { target: { value: React.SetStateAction<string>; }; }) => setSearch(e.target.value)}
        />
        <button
            className="border p-2 rounded-lg flex items-center gap-2"
            onClick={() => setShowFilter(!showFilter)}
          >
            <Filter size={18} /> Filter
          </button>
         </div>
      </div>
      {showFilter && (
            <div className="absolute right-0 mt-10 w-40 bg-white border rounded-lg shadow-lg p-2">
              {roomTypes.map((type) => (
                <button
                  key={type}
                  className={`block w-full text-left px-4 py-2 rounded-lg ${selectedRoomType === type ? "bg-blue-500 text-white" : "hover:bg-gray-200"}`}
                  onClick={() => {
                    setSelectedRoomType(type);
                    setShowFilter(false);
                  }}
                >
                  {type}
                </button>
              ))}
            </div>
          )}
      <Table>
      <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
          <TableRow>
          <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >S.No</TableCell>
            <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room ID</TableCell>
           <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room Type</TableCell>
            <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Rate ($)</TableCell>
           <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Last Booked</TableCell>
           <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >YTD Bookings</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {paginatedData.map((room, index) => (
            <TableRow key={room.id}>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.roomId}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.roomType}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">${room.rate}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.lastBooked}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.ytdBookings}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      {/* Pagination */}
      <div className="flex items-center justify-between px-6 py-4 border-t">
        <button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
          className="flex items-center gap-1 px-4 py-2 text-gray-600 border rounded-lg disabled:opacity-50"
        >
          <ChevronLeft size={18} /> Previous
        </button>
        <span className="text-gray-700">Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={currentPage === totalPages}
          className="flex items-center gap-1 px-4 py-2 text-gray-600 border rounded-lg disabled:opacity-50"
        >
          Next <ChevronRight size={18} />
        </button>
      </div>
    </div>
  );
}
