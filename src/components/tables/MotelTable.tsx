"use client";
import React, { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";
import Input from "../form/input/InputField";
import Badge from "../ui/badge/Badge";
import Image from "next/image";
import {
  Pencil,
  ToggleLeft,
  ToggleRight,
  PlusCircle,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface Room {
    roomNumber: string;
    roomType: string;
  }
  
  interface Motel {
    id: number;
    name: string;
    numberOfRooms: number;
    roomTypes: Record<string, number>;
    rooms: Room[];
    isEnabled: boolean;
    status: string;
    
  }


  const motelData: Motel[] = [
    {
      id: 1,
      name: "Sunset Inn",
      numberOfRooms: 10,
      roomTypes: { Single: 5, Double: 3, Suite: 2 },
      rooms: [
        { roomNumber: "101", roomType: "Single" },
        { roomNumber: "102", roomType: "Double" },
      ],
      isEnabled: true,
      status: "Active",
    },
    {
      id: 2,
      name: "Ocean View",
      numberOfRooms: 15,
      roomTypes: { Single: 7, Double: 5, Suite: 3 },
      rooms: [
        { roomNumber: "201", roomType: "Suite" },
        { roomNumber: "202", roomType: "Single" },
      ],
      isEnabled: true,
      status: "Active",
    },
  ];

const ITEMS_PER_PAGE = 2;
export default function MotelTable() {

 const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedMotel, setSelectedMotel] = useState<Motel | null>(null);
  const [showModal, setShowModal] = useState(false);

  const filteredData = motelData.filter((motel) =>
    motel.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const paginatedData = filteredData.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 px-6 mb-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
    <div>
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Properties
      </h3>
    </div>
    <div className="flex gap-3 sm:items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search property..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <PlusCircle size={18} /> Add Property
          </button>
        </div>
  </div>
      <div className="max-w-full overflow-x-auto">
        <div className="min-w-[1102px]">
          <Table>
            <TableHeader className="border-b border-gray-100 dark:border-white/[0.05]">
              <TableRow>
              <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Motel Name</TableCell>
                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Number of Rooms</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room Types</TableCell>
                    <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Status</TableCell>
                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Actions</TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
              {paginatedData.map((motel) => (
                <TableRow key={motel.id}>
                  
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{motel.name}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{motel.numberOfRooms}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                  {Object.entries(motel.roomTypes).map(([type, count]) => (
                    <Badge key={type} size="sm" color="info">
                      {type}: {count}
                    </Badge>
                  ))}
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        motel.status === "Active"
                          ? "success"
                          : motel.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {motel.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-4">
                    <Pencil
                    className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500"
                    onClick={() => {
                      setSelectedMotel(motel);
                      setShowModal(true);
                    }}
                  />
                      {motel.isEnabled ? (
                        <ToggleRight className="w-5 h-5 text-green-500 cursor-pointer hover:text-red-500" />
                      ) : (
                        <ToggleLeft className="w-5 h-5 text-red-500 cursor-pointer hover:text-green-500" />
                      )}
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

      </div>
       {/* Modal */}
       {showModal && selectedMotel && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Manage Rooms - {selectedMotel.name}</h2>
            {selectedMotel.rooms.map((room, index) => (
              <div key={index} className="mb-2 flex justify-between">
                <span>Room {room.roomNumber} - {room.roomType}</span>
                <Pencil className="w-4 h-4 text-gray-500 cursor-pointer hover:text-blue-500" />
              </div>
            ))}
            <button className="mt-2 bg-blue-500 text-white px-4 py-2 rounded">Add Room</button>
            <button onClick={() => setShowModal(false)} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded ml-2">Close</button>
          </div>
        </div>
      )}
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
