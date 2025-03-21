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
import {
  Plus,
  Search,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";
import Button from "../ui/button/Button";
import Label from "../form/Label";

interface Room {
    id: number;
    roomId: string;
    roomType: string;
    lastCleaned: string;
    checkOutDate: string;
    status: string;
    maintncetype: string;
    notes: string;
  }
  
const vacantRooms: Room[] = [
    { id: 1, roomId: "101", roomType: "Single", lastCleaned: "2024-03-01",checkOutDate: "2024-03-15", status:"Under Progress", maintncetype: "Flooring",notes:"" },
    { id: 2, roomId: "102", roomType: "Double", lastCleaned: "2024-02-20",checkOutDate: "2024-03-15",status:"Checked Out", maintncetype: "Bathroom",notes:"tap leaking" },
    { id: 3, roomId: "103", roomType: "Suite",  lastCleaned: "2024-01-15",checkOutDate: "2024-03-15",status:"Maintanance Issue", maintncetype: "AC",notes:"not cooling" },
  ];
  const roomTypes = ["All", "Single", "Double", "Suite"];
const ITEMS_PER_PAGE = 2;
export default function MaintnceTable() {

 const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedRoomType, setSelectedRoomType] = useState("All");
  const { isOpen, openModal, closeModal } = useModal();
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
  const handleSave = () => {
    // Handle save logic here
    console.log("Saving changes...");
    closeModal();
  };
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/[0.05] dark:bg-white/[0.03]">
      <div className="flex flex-col gap-5 px-6 mb-4 mt-4 sm:flex-row sm:items-center sm:justify-between">
  {/* Title */}
  <div>
    <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
      Maintanence Rooms
    </h3>
  </div>

  {/* Search + Buttons Container */}
  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-end gap-3 w-full sm:w-auto">
    {/* Search Input */}
    <div className="relative flex items-center w-full sm:w-auto">
      <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
      <Input
        type="text"
        placeholder="Search room number..."
        className="border p-2 pl-10 rounded-lg w-full sm:w-64"
        onChange={(e) => setSearch(e.target.value)}
      />
    </div>

    {/* Filter Button + Dropdown */}
    <div className="relative">
      <button
        onClick={() => setShowFilter(!showFilter)}
        className="text-theme-sm shadow-theme-xs flex h-11 items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 font-medium text-gray-700 hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
      >
        <svg
          className="stroke-current fill-white dark:fill-gray-800"
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M2.29004 5.90393H17.7067" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M17.7075 14.0961H2.29085" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path>
          <path d="M12.0826 3.33331C13.5024 3.33331 14.6534 4.48431 14.6534 5.90414C14.6534 7.32398 13.5024 8.47498 12.0826 8.47498C10.6627 8.47498 9.51172 7.32398 9.51172 5.90415C9.51172 4.48432 10.6627 3.33331 12.0826 3.33331Z" strokeWidth="1.5"></path>
          <path d="M7.91745 11.525C6.49762 11.525 5.34662 12.676 5.34662 14.0959C5.34661 15.5157 6.49762 16.6667 7.91745 16.6667C9.33728 16.6667 10.4883 15.5157 10.4883 14.0959C10.4883 12.676 9.33728 11.525 7.91745 11.525Z" strokeWidth="1.5"></path>
        </svg>
        Filter
      </button>

      {/* Dropdown */}
      {showFilter && (
        <div className="absolute left-0 top-full mt-2 min-w-[10rem] md:w-40 bg-white border rounded-lg shadow-lg p-1 z-50">
          {roomTypes.map((type) => (
            <button
              key={type}
              className={`block text-theme-sm font-medium text-gray-700 w-full text-left px-4 py-2 rounded-lg  ${
                selectedRoomType === type ? "bg-blue-500 text-white" : "hover:bg-gray-200"
              }`}
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
    </div>

    {/* Add Room Button */}
    <button
      onClick={openModal}
      className="flex w-full sm:w-auto items-center h-11 justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200"
    >
      <Plus size={18} />
      Add Room
    </button>
  </div>
</div>

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
                >Room Number</TableCell>
           <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Room Type</TableCell>
           <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Last Cleaned</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Check-out Date</TableCell>
                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Maintanence Type</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Notes</TableCell>
                  <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Actions</TableCell>
          </TableRow>
        </TableHeader>
        <TableBody className="divide-y divide-gray-100 dark:divide-white/[0.05]">
          {paginatedData.map((room, index) => (
            <TableRow key={room.id}>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{index + 1}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.roomId}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.roomType}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.lastCleaned}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.checkOutDate}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.maintncetype}</TableCell>
               <TableCell className="px-5 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{room.notes}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
       {/* Modal */}
       <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <div className="px-2 pr-14">
            <h4 className="mb-2 text-2xl font-semibold text-gray-800 dark:text-white/90">
              Add Room
            </h4>
            <p className="mb-6 text-sm text-gray-500 dark:text-gray-400 lg:mb-7">
              Fill necessary details to add room for maintenance.
            </p>
          </div>
          <form className="flex flex-col">
            <div className="px-2 overflow-y-auto custom-scrollbar">
              <div className="grid grid-cols-1 gap-x-6 gap-y-5 lg:grid-cols-2">
                <div>
                  <Label>Country</Label>
                  <Input type="text" defaultValue="United States" />
                </div>

                <div>
                  <Label>City/State</Label>
                  <Input type="text" defaultValue="Arizona, United States." />
                </div>

                <div>
                  <Label>Postal Code</Label>
                  <Input type="text" defaultValue="ERT 2489" />
                </div>

                <div>
                  <Label>TAX ID</Label>
                  <Input type="text" defaultValue="AS4568384" />
                </div>
              </div>
            </div>
            <div className="flex items-center gap-3 px-2 mt-6 lg:justify-end">
              <Button size="sm" variant="outline" onClick={closeModal}>
                Close
              </Button>
              <Button size="sm" onClick={handleSave}>
                Add Room
              </Button>
            </div>
          </form>
        </div>
      </Modal>
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
