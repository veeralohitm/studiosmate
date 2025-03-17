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

interface Order {
  id: number;
  user: {
    image: string;
    name: string;
    userid: string;
  };
  role: string;
  email: string;
  team: {
    images: string[];
  };
  status: string;
  budget: string;
  isEnabled: boolean;
}

const tableData = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      userid: "USR1234",
    },
    role: "Super Admin",
    email: "abc@gmail.com",
    status: "Active",
    isEnabled: true,
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      userid: "USR1235",
    },
    role: "Admin",
    email: "abc@gmail.com",
    status: "Inactive",
    isEnabled: false,
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Jane Doe",
      userid: "USR1236",
    },
    role: "User",
    email: "jane@example.com",
    status: "Active",
    isEnabled: true,
  },
];
const ITEMS_PER_PAGE = 2;
export default function BasicTableWithActions() {

  const [search, setSearch] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  
  const filteredData = tableData.filter((order) =>
    order.user.name.toLowerCase().includes(search.toLowerCase())
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
        Users
      </h3>
    </div>
    <div className="flex gap-3 sm:items-center">
          <div className="relative">
            <Search className="absolute top-1/2 left-4 transform -translate-y-1/2 text-gray-400" size={18} />
            <Input
              type="text"
              placeholder="Search users..."
              className="pl-10 pr-4 py-2 border rounded-lg"
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <button
            onClick={() => setShowModal(true)}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg"
          >
            <PlusCircle size={18} /> Add User
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
                >User</TableCell>
                 <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Role</TableCell>
                <TableCell
                  isHeader
                  className="px-5 py-3 font-medium text-gray-500 text-start text-theme-xs dark:text-gray-400"
                >Email</TableCell>
                
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
              {paginatedData.map((order) => (
                <TableRow key={order.id}>
                  <TableCell className="px-5 py-4 sm:px-6 text-start">
                    <div className="flex items-center gap-3">
                    <div className="w-10 h-10 overflow-hidden rounded-full">
                      <Image
                        width={40}
                        height={40}
                        src={order.user.image}
                        alt={order.user.name}
                      />
                      </div>
                      <div>
                        <span className="block font-medium text-gray-800 text-theme-sm dark:text-white/90">
                          {order.user.name}
                        </span>
                        <span className="block text-gray-500 text-theme-xs dark:text-gray-400">
                          {order.user.userid}
                        </span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.role}</TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">{order.email}</TableCell>
                 
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <Badge
                      size="sm"
                      color={
                        order.status === "Active"
                          ? "success"
                          : order.status === "Pending"
                          ? "warning"
                          : "error"
                      }
                    >
                      {order.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="px-4 py-3 text-gray-500 text-start text-theme-sm dark:text-gray-400">
                    <div className="flex items-center gap-4">
                      <Pencil className="w-5 h-5 text-gray-500 cursor-pointer hover:text-blue-500" />
                      {order.isEnabled ? (
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
       {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-semibold mb-4">Create User</h2>
            <Input type="text" placeholder="Name" className="mb-2 w-full" />
            <Input type="email" placeholder="Email" className="mb-2 w-full" />
            <button onClick={() => setShowModal(false)} className="mt-2 bg-gray-500 text-white px-4 py-2 rounded">Cancel</button>
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
