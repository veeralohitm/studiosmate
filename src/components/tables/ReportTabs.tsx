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
import Button from "../ui/button/Button";
import jsPDF from "jspdf";
import "jspdf-autotable";
import autoTable from "jspdf-autotable";
import { useModal } from "../../hooks/useModal";
import { Modal } from "../ui/modal";


const reports = {
  Reservations: ["Daily Report", "Weekly Report", "Monthly Report"],
  "Forecasting and Availability": ["Occupancy Forecast", "Revenue Forecast"],
  "Rooms and Room Assignments": ["Room Availability", "Blocked Rooms"],
  "Front Desk": ["Room Types", "Rates Report"],
  "House Keeping": ["Daily Report", "Weekly Report", "Monthly Report"],
  "Groups, Guest History and Profiles": ["Occupancy Forecast", "Revenue Forecast"],
  "Dayend Close and Reprints": ["Room Availability", "Blocked Rooms"],
  "Accounting": ["Room Types", "Rates Report"],
  "Owner Commissions and Travel Agent": ["Assigned Rooms", "Vacant Rooms"],
  "Marketing and Analysis": ["Assigned Rooms", "Vacant Rooms"],
  "City Ledger and Companies": ["Assigned Rooms", "Vacant Rooms"],
  
};
interface ReportData {
    id: number;
    name: string;
    value: string;
  }
  

export default function ReportTabs() {
    const [activeTab, setActiveTab] = useState<string>("Reservations");
  const [activeReport, setActiveReport] = useState<string>("");
  const [dateRange, setDateRange] = useState({ from: "", to: "" });
  const [reportData, setReportData] = useState<ReportData[]>([]);
  const { isOpen, openModal, closeModal } = useModal();

  const handleReportClick = (report: string) => {
    setActiveReport(report);
    openModal();
  };


  const fetchReportData = () => {
    setReportData([
      { id: 1, name: "Sample Data 1", value: "100" },
      { id: 2, name: "Sample Data 2", value: "200" },
    ]);
  };

  const printReport = () => {
    if (!activeReport) return;
    const doc = new jsPDF();
    doc.text(activeReport, 10, 10);
    autoTable(doc, {
      head: [["ID", "Name", "Value"]],
      body: reportData.map((row) => [row.id, row.name, row.value]),
    });
    doc.save(`${activeReport}.pdf`);
  };

  return (
    <div className="p-4">
      <div className="flex border-b">
        {Object.keys(reports).map((tab) => (
          <button
            key={tab}
            className={`px-4 py-2 text-sm font-medium transition-all border-b-2 ${
              activeTab === tab ? "border-blue-500 text-blue-500" : "border-transparent text-gray-500 hover:text-gray-700"
            }`}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>
      <div className="mt-4">
        {Object.entries(reports).map(([category, reportList]) => (
          activeTab === category && (
            <ul key={category} className="space-y-2">
              {reportList.map((report) => (
                <li
                  key={report}
                  className="cursor-pointer text-blue-500 hover:underline"
                  onClick={() => handleReportClick(report)}
                >
                  {report}
                </li>
              ))}
            </ul>
          )
        ))}
      </div>
      <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">
        <div className="relative w-full p-4 overflow-y-auto bg-white no-scrollbar rounded-3xl dark:bg-gray-900 lg:p-11">
          <h2 className="text-lg font-semibold mb-4">{activeReport}</h2>
          <div className="space-y-4">
            <Input
              type="date"
              defaultValue={dateRange.from}
              onChange={(e) => setDateRange({ ...dateRange, from: e.target.value })}
            />
            <Input
              type="date"
              defaultValue={dateRange.to}
              onChange={(e) => setDateRange({ ...dateRange, to: e.target.value })}
            />
            <Button onClick={fetchReportData}>Generate Report</Button>
            {reportData.length > 0 && (
              <div>
                <Table className="mt-4">
                  <TableHeader>
                    <TableRow>
                      <TableCell>ID</TableCell>
                      <TableCell>Name</TableCell>
                      <TableCell>Value</TableCell>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {reportData.map((row) => (
                      <TableRow key={row.id}>
                        <TableCell>{row.id}</TableCell>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{row.value}</TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
                <Button className="mt-4" onClick={printReport}>
                  Print Report
                </Button>
              </div>
            )}
          </div>
          <button
            className="mt-4 px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </Modal>
    </div>
  );
}
