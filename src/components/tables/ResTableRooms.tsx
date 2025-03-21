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
import { Filter, Search, ChevronLeft, ChevronRight } from "lucide-react";

interface Booking {
  id: number;
  bookingid:string;
  roomId: string;
  guestName: string;
  city:string;
  state: string;
  checkInDate: string;
  checkOutDate: string;
  roomtype: string;
  paymenttype: string;
  status: string;
  refrence:string;
  deposit:number;
}

const reservedRooms: Booking[] = [
  { id: 1, bookingid:"STDS2345678",roomId: "201", guestName: "John Doe",city:"Norfolk", state:"VA", checkInDate: "2024-03-10", checkOutDate: "2024-03-15", roomtype: "Single", paymenttype:"Cash",deposit: 500, status: "Confirmed" ,refrence:"Random text"},
  { id: 2, bookingid:"STDS2345588",roomId: "202", guestName: "Alice Smith",city:"VA Beach",state:"VA", checkInDate: "2024-03-12", checkOutDate: "2024-03-14", roomtype: "Double",paymenttype:"Card", deposit: 300, status: "Checked In" ,refrence:""},
  { id: 3, bookingid:"STDS2345688",roomId: "203", guestName: "Bob Johnson", city:"Chesapeake",state:"VA",checkInDate: "2024-03-05", checkOutDate: "2024-03-10", roomtype: "Suite",paymenttype:"Card", deposit: 750, status: "Checked Out" ,refrence:""},
];

const roomTypes = ["All", "Single", "Double", "Suite"];
const ITEMS_PER_PAGE = 2;

export default function ReservedRooms() {
  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState("All");
  const [showFilter, setShowFilter] = useState(false);

  const filteredRooms = reservedRooms.filter(
    (booking) => booking.roomId.includes(search) || booking.guestName.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.ceil(filteredRooms.length / ITEMS_PER_PAGE);
  const paginatedData = filteredRooms.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 px-6 mb-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">Rooms</h3>
        <div className="flex gap-3 sm:items-center">
          <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" size={18} />
          <Input
            type="text"
            placeholder="Search by room ID or guest name..."
            className="border p-2 rounded-lg"
            onChange={(e) => setSearch(e.target.value)}
          />
          <button className="border p-2 rounded-lg flex items-center gap-2" onClick={() => setShowFilter(!showFilter)}>
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
                >Booking ID</TableCell>
                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room Number</TableCell>
            <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Guest Name</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >City</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >State</TableCell>
            <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Check-In</TableCell>
             <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Check-Out</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room Type</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Payment Type</TableCell>
             <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Deposit ($)</TableCell>
             <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Status</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Reference</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {paginatedData.map((booking, index) => (
            <TableRow key={booking.id}>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.bookingid}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.roomId}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.guestName}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.city}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.state}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.checkInDate}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.checkOutDate}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.roomtype}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.paymenttype}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">${booking.deposit}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.status}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{booking.refrence}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
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
