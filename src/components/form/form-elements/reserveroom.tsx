"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../common/ComponentCard";
import Form from "../Form";
import Input from "../input/InputField";
import Button from "../../ui/button/Button";
import Label from "../Label";
import Select from "../Select";
import Flatpickr from "react-flatpickr";
import "flatpickr/dist/themes/light.css";
import { CalenderIcon } from "@/icons";
import { useModal } from "@/hooks/useModal";
import { Modal } from "@/components/ui/modal";
import TextArea from "../input/TextArea";
import Radio from "../input/Radio";

interface GuestInfo {
    firstName?: string;
    lastName?: string;
    street?: string;
    city?: string;
    state?: string;
    country?: string;
    zip?: string;
    phone?: string;
    email?: string;
    reference?: string;
    gender?: string;
    idType?: string,
    dob?: string,
    idNumber?: string
  }
  interface StayInfo {
    roomtype?: string;
    checkInDate?: string;
    checkOutDate?: string;
    nights?: string;
    rooms?: string;
    members?: string;
    discount?: string;
    dailyRate?: number;
    weeklyRate?: number;
    tax?: number;
    ratetype?: string;
    adults?: string;
    children?: string;
    totalValue?: number;
    discountApplied?: boolean;
    discountType?: string;
    discountValue?: number;
    taxExempt?: boolean;
    taxType?: string;
    taxPercentage?: number;
  }
  
  interface PaymentInfo {
    method?: string;
    cashAmount?: string;
    reference?: string;
    cardNumber?: string;
    expirationDate?: string;
    cvv?: string;
    nameOnCard?: string;
    routingNumber?: string;
    accountNumber?: string;
    swiftCode?: string;
    companyName?: string;
  }
  const optionsGender = [
    { value: "male", label: "Male" },
    { value: "female", label: "Female" },
    { value: "other", label: "Others" },
  ];

  const roomtypes = [
    { value: "single", label: "Single" },
    { value: "double", label: "Double" },
    { value: "suite", label: "Suite" },
  ];


  const ratetypes = [
    { value: "weekend", label: "Weekend" },
    { value: "weekday", label: "Weekday" },
    { value: "weekly", label: "Weekly" }
  ];

  const paymenttypes = [
    { value: "card", label: "Card" },
    { value: "cash", label: "Cash" },
    { value: "directbilling", label: "Direct Billing" }
  ];

  
export default function ReserveForm() {
  const [step, setStep] = useState(1);
  const [guestInfo, setGuestInfo] = useState<GuestInfo>({});
  const [stayInfo, setStayInfo] = useState<StayInfo>({});
  const [paymentInfo, setPaymentInfo] = useState<PaymentInfo>({});
  const { isOpen, openModal, closeModal } = useModal();
  const [selectedOption, setSelectedOption] = useState<string>("Free");
 
  const [isDiscountEnabled, setIsDiscountEnabled] = useState(false);
  const [isTaxEnabled, setIsTaxEnabled] = useState(false);
  // const handleNext = () => setStep((prev) => prev + 1);
  // const handlePrev = () => setStep((prev) => prev - 1);
  // const handleSubmit = (e: React.FormEvent) => {
  //   e.preventDefault();
  //   console.log("Guest Info:", guestInfo);
  //   console.log("Stay Info:", stayInfo);
  //   console.log("Payment Info:", paymentInfo);
  // };

  const handleScanID = () => {
    // Simulated ID scan result
    const scannedData = {
      firstName: "John",
      lastName: "Doe",
      street: "123 Main St",
      city: "Somewhere",
      state: "VA",
      country: "USA",
      zip: "12345",
      phone: "123-456-7890",
      email: "john.doe@example.com",
      gender: "male",
      idType: "Passport",
      dob: "1990-01-01",
      idNumber: "123456789"
    };
    setGuestInfo(scannedData);
  };

  const handleInputChange = (section: string, field: string, value: string) => {
    if (section === "guest") {
      setGuestInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "stay") {
      setStayInfo((prev) => ({ ...prev, [field]: value }));
    } else if (section === "payment") {
      setPaymentInfo((prev) => ({ ...prev, [field]: value }));
    }
  };
  const handleSelectGender = (value: string) => {
    setGuestInfo((prev) => ({ ...prev, gender: value }));
  };

  const handleSelectRoomType = (value: string) => {
    setStayInfo((prev) => ({ ...prev, roomtype: value }));
  };

  const handleSelectRateType = (value: string) => {
    setStayInfo((prev) => ({ ...prev, ratetype: value }));
  };

  const handleSelectDiscountType = (value: string) => {
    setStayInfo((prev) => ({ ...prev, discountType: value }));
  };

  const handleSelectTaxType = (value: string) => {
    setStayInfo((prev) => ({ ...prev, taxType: value }));
  };

  const handleRadioChange = (value: string) => {
    setSelectedOption(value);
    console.log("Selected:", value);
  };

  const handleDateChange = (date: Date[]) => {
    if (date.length > 0) {
 setGuestInfo(prev => ({...prev, dob: date[0].toLocaleDateString() // Format the date
        }));        
  };};

  const handleCheckInDateChange = (date: Date[]) => {
    if (date.length > 0) {
 setStayInfo(prev => ({...prev, checkInDate: date[0].toLocaleDateString() // Format the date
        }));        
  };};
  const handleCheckOutDateChange = (date: Date[]) => {
    if (date.length > 0) {
        setStayInfo(prev => ({...prev, checkOutDate: date[0].toLocaleDateString() // Format the date
        }));        
  };};



  useEffect(() => {
    calculateTotal();
  }, [stayInfo.roomtype, stayInfo.nights, stayInfo.ratetype, stayInfo.discountApplied, stayInfo.discountType, stayInfo.discountValue, stayInfo.taxExempt, stayInfo.taxType, stayInfo.taxPercentage]);

  const calculateTotal = () => {
    let dailyRate = 0;
    let weeklyRate = 0;

    if (stayInfo.roomtype === "single") {
      dailyRate = stayInfo.ratetype === "weekend" ? 100 : 80;
      weeklyRate = 500;
    } else if (stayInfo.roomtype === "double") {
      dailyRate = stayInfo.ratetype === "weekend" ? 150 : 120;
      weeklyRate = 800;
    } else if (stayInfo.roomtype === "suite") {
      dailyRate = stayInfo.ratetype === "weekend" ? 250 : 200;
      weeklyRate = 1400;
    }

    const nights = parseInt(stayInfo.nights || "1", 10);
    const rate = stayInfo.ratetype === "weekly" ? weeklyRate : dailyRate;
    let subtotal = rate * nights;

    if (stayInfo.discountApplied && stayInfo.discountValue) {
      if (stayInfo.discountType === "percentage") {
        subtotal -= (subtotal * (stayInfo.discountValue / 100));
      } else {
        subtotal -= stayInfo.discountValue;
      }
    }

    if (stayInfo.taxExempt && stayInfo.taxPercentage) {
      if (stayInfo.taxType === "percentage") {
        subtotal += (subtotal * (stayInfo.taxPercentage / 100));
      } else {
        subtotal += stayInfo.taxPercentage;
      }
    }

    setStayInfo((prev) => ({ ...prev, dailyRate, weeklyRate, totalValue: subtotal }));
  };
  const renderStep = () => {
    switch (step) {
      case 1:
        return (
          <div>
            <div className="flex items-center gap-3 mb-2 col-span-full">
            <Label className="m-0">Reservation Type:</Label>
            <div className="flex flex-wrap items-center gap-4">
              <Radio
                id="Reserve a Room"
                name="roleSelect"
                value="Free"
                label="Reserve a Room"
                checked={selectedOption === "Free"}
                onChange={handleRadioChange}
              />
              <Radio
                id="Walk-in"
                name="roleSelect"
                value="Premium"
                label="Walk-in"
                checked={selectedOption === "Premium"}
                onChange={handleRadioChange}
              />
            </div>
          </div>
    <div className="flex flex-col mb-4 sm:flex-row sm:items-center sm:justify-between">
    
      <h3 className="text-lg font-semibold text-gray-800 dark:text-white/90">
        Guest Information
      </h3>
  
    <div className="flex gap-3 sm:items-center">
    <Button onClick={handleScanID} size="sm">Scan ID</Button>
        </div>
  </div>
  <div className="grid grid-cols-4 gap-4">
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="firstName">First Name</Label> 
            <Input type="text" placeholder="First Name" defaultValue={guestInfo.firstName || ''} onChange={(e) => handleInputChange("guest","firstName", e.target.value)} /> 
        </div>
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="lastName">Last Name</Label> 
            <Input type="text" placeholder="Last Name" defaultValue={guestInfo.lastName || ''} onChange={(e) => handleInputChange("guest","lastName", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="email">Email</Label> 
            <Input type="text" placeholder="Email" defaultValue={guestInfo.email || ''} onChange={(e) => handleInputChange("guest","email", e.target.value)} />
        </div>
       
        <div className="col-span-2 sm:col-span-1">
             <Label htmlFor="gender">Gender</Label>
            <Select
              options={optionsGender}
              placeholder="Select an option"
              onChange={handleSelectGender}
              defaultValue={guestInfo.gender || ''} 
              className="bg-gray-50 dark:bg-gray-800"
            />
             </div>
             <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="idType">ID Type</Label> 
            <Input type="text" placeholder="idType" defaultValue={guestInfo.idType || ''} onChange={(e) => handleInputChange("guest","idType", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="idNumber">ID Number</Label> 
            <Input type="text" placeholder="idNumber" defaultValue={guestInfo.idNumber || ''} onChange={(e) => handleInputChange("guest","idNumber", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="lastName">Date of Birth</Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={guestInfo.dob || ''} // Set the value to the state
                onChange={handleDateChange} // Handle the date change
                options={{
                  dateFormat: "Y-m-d", // Set the date format
                }}
                placeholder="Select an option"
                className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md h-11 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon />
              </span>
            </div></div>
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="state">Street</Label> 
            <Input type="text" placeholder="Street" defaultValue={guestInfo.street || ''} onChange={(e) => handleInputChange("guest","street", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="state">State</Label> 
            <Input type="text" placeholder="State" defaultValue={guestInfo.state || ''} onChange={(e) => handleInputChange("guest","state", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="country">Country</Label> 
            <Input type="text" placeholder="Country" defaultValue={guestInfo.country || ''} onChange={(e) => handleInputChange("guest","country", e.target.value)} />
        </div>
        <div className="col-span-2 sm:col-span-1">
             <Label htmlFor="zip">Zip Code</Label> 
            <Input type="text" placeholder="Zip" defaultValue={guestInfo.zip || ''} onChange={(e) => handleInputChange("guest","zip", e.target.value)} />
             </div>
             
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="phone">Phone</Label> 
            <Input type="text" placeholder="Phone" defaultValue={guestInfo.phone || ''} onChange={(e) => handleInputChange("guest","phone", e.target.value)} />
        </div>
        
        <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="reference">Reference</Label> 
            <Input type="text" placeholder="Reference" defaultValue={guestInfo.reference || ''} onChange={(e) => handleInputChange("guest","reference", e.target.value)} />
        </div>
             </div>
             <div>
             <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-8 pt-4 dark:text-white/90 border-t border-gray-200 dark:border-gray-800">Stay Information</h3>
    
            <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="gender">Select Room Type</Label>
            <Select
              options={roomtypes}
              placeholder="Select Room Type"
              onChange={handleSelectRoomType}
              defaultValue={stayInfo.roomtype || ''} 
              className="bg-gray-50 dark:bg-gray-800"
            />
            </div>

            <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="lastName">Check-in Date</Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={stayInfo.checkInDate || ''} // Set the value to the state
                onChange={handleCheckInDateChange} // Handle the date change
                options={{
                  dateFormat: "Y-m-d", // Set the date format
                }}
                placeholder="Check-in Date"
                className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md h-11 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon />
              </span>
            </div></div>
            <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="lastName">Check-out Date</Label>
            <div className="relative w-full flatpickr-wrapper">
              <Flatpickr
                value={stayInfo.checkOutDate || ''} // Set the value to the state
                onChange={handleCheckOutDateChange} // Handle the date change
                options={{
                  dateFormat: "Y-m-d", // Set the date format
                }}
                placeholder="Check-out Date"
                className="w-full py-2 pl-3 pr-10 text-sm border border-gray-300 rounded-md h-11 focus:outline-hidden focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
              />
              <span className="absolute text-gray-500 -translate-y-1/2 pointer-events-none right-3 top-1/2 dark:text-gray-400">
                <CalenderIcon />
              </span>
            </div></div>

            <div className="col-span-2 sm:col-span-1">
            <Label>Select Room (if required)</Label>
            <Button  onClick={openModal} size="sm">Check Availability</Button>
            </div>

            <div className="col-span-2 sm:col-span-1">
            <Label>Number of Nights</Label>
            <Input type="number" placeholder="Number of Nights"  defaultValue={stayInfo.nights || ''} onChange={(e) => handleInputChange("stay","nights", e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label>Number of Rooms</Label>
            <Input type="number" placeholder="Number of Rooms"  defaultValue={stayInfo.rooms || ''} onChange={(e) => handleInputChange("stay","rooms", e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label>Adults</Label>
            <Input type="number" placeholder="Adults"  defaultValue={stayInfo.adults || ''} onChange={(e) => handleInputChange("stay","adults", e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label>Children</Label>
            <Input type="number" placeholder="Children"  defaultValue={stayInfo.children || ''} onChange={(e) => handleInputChange("stay","children", e.target.value)} />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="gender">Select Rate Type</Label>
            <Select
              options={ratetypes}
              placeholder="Select Rate Type"
              onChange={handleSelectRateType}
              defaultValue={stayInfo.ratetype || ''} 
              className="bg-gray-50 dark:bg-gray-800"
            />
            </div>

            <div className="col-span-2 sm:col-span-1">
            <Label>Daily Rates</Label>
            <Input type="number" placeholder="Daily Rates"  defaultValue={stayInfo.dailyRate}/>
            </div>

            <div className="col-span-2 sm:col-span-1">
                <Label>
                  <input
                    type="checkbox"
                    checked={isDiscountEnabled}
                    onChange={() => setIsDiscountEnabled(!isDiscountEnabled)}
                  /> Enable Discount
                </Label>
                {isDiscountEnabled && (
                  <>
                    <Select
                      options={[{ value: "percentage", label: "Percentage" }, { value: "value", label: "Value" }]}
                      placeholder="Select Discount Type"
                      defaultValue=""
                      onChange={handleSelectDiscountType}
                    />
                    <Input
                      type="text"
                      placeholder="Discount Value"
                      defaultValue={stayInfo.discountValue}
                      onChange={(e) => handleInputChange("stay","discountValue", e.target.value)} 
                      className="mt-2"
                    />
                  </>
                )}
              </div>

              <div className="col-span-2 sm:col-span-1">
                <Label>
                  <input
                    type="checkbox"
                    checked={isTaxEnabled}
                    onChange={() => setIsTaxEnabled(!isTaxEnabled)}
                  /> Tax Exempt
                </Label>
                {isTaxEnabled && (
                  <>
                    <Select
                      options={[{ value: "fexempt", label: "Full Exempt" }, { value: "stateexempt", label: "State Exempt" }]}
                      placeholder="Select Tax Type"
                      onChange={handleSelectTaxType}
                      defaultValue="0"
                    />
                    <Input
                      type="text"
                      placeholder="Tax Percentage"
                      defaultValue={stayInfo.taxPercentage}
                      onChange={(e) => handleInputChange("stay","taxPercentage", e.target.value)} 
                      className="mt-2"
                    />
                  </>
                )}
              </div>
          </div>

          {/* <div>
            <h4>Total Value: (daily rate * number of nights)</h4>
            <h4>Discount Apllied : Yes/No</h4>
            <h4>If yes Discount Type :</h4>
            <h4>If yes Discount Value :</h4>
            <h4>Discount applied</h4>
            <h4>Total after Discount :</h4>
            <h4>Tax Exempt: Yes/No</h4>
            <h4>If yes Tax Type: </h4>
            <h4>If yes Tax Percentage: </h4>
            <h4>Tax exempt applied:</h4>
            <h4>Total after Tax :</h4>

          </div> */}
          <Modal isOpen={isOpen} onClose={closeModal} className="max-w-[700px] m-4">

    <div className="no-scrollbar relative w-full max-w-[700px] overflow-y-auto rounded-3xl bg-white p-4 dark:bg-gray-900 lg:p-11">
        <h1>sffs</h1>
        </div>

    </Modal>
    <h3 className="text-lg font-semibold text-gray-800 mb-2 mt-8 pt-4 dark:text-white/90 border-t border-gray-200 dark:border-gray-800">Payment Information</h3>
    
   
            <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 sm:col-span-1">
            <Label htmlFor="gender">Select Payment Type</Label>
            <Select
              options={paymenttypes}
              placeholder="Select Payment Type"
              onChange={handleSelectRateType}
              defaultValue={stayInfo.ratetype || ''} 
              className="bg-gray-50 dark:bg-gray-800"
            />
            </div>
            {stayInfo.ratetype === "cash" && (
              <div>

               <div className="col-span-2 sm:col-span-1">
                 <Label htmlFor="email">Amount</Label>
                <Input placeholder="Amount"  />
             </div>
             <div className="col-span-2 mt-4 sm:col-span-1">
        <Label htmlFor="email">Reference</Label>
            <TextArea
              placeholder="Type your message here..."
              rows={1}
              className=" bg-gray-50 dark:bg-gray-800"
            />
            </div>
             </div>
             )}
             {stayInfo.ratetype === "directbilling" && (
              <div>
             <div className="col-span-2 sm:col-span-1">
        <Label htmlFor="email">Select Exsisting Customer:</Label>
        <Select
                      options={[{ value: "percentage", label: "ODU" }, { value: "value", label: "SAS" }]}
                      placeholder="Select Customer"
                      defaultValue=""
                      onChange={handleSelectDiscountType}
                    />
            </div>
            <div className="col-span-2 sm:col-span-1">
            <button
            className="flex w-full items-center h-11 justify-center mt-4 gap-2 rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800 dark:border-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:hover:bg-white/[0.03] dark:hover:text-gray-200 lg:inline-flex lg:w-auto"
          >
            Add New Customer
          </button>
              </div>
             </div>
             )}
    
            </div>
          </div>
          </div>
          
        );
      case 2:
        return (
            <div>
              <h3>Invoice</h3>
              <pre>{JSON.stringify({ guestInfo, stayInfo, paymentInfo }, null, 2)}</pre>
            </div>
          );
      default:
        return null;
    }
  };

  return (
    <ComponentCard title="Room Reservation Form">
      <Form onSubmit={(e) => {
        e.preventDefault();
        setStep(2);
      }}>
        {renderStep()}
        <div className="flex justify-between mt-6">
          {step === 1 ? (
            <Button size="sm" >Submit</Button>
          ) : (
            <div>
            <Button size="sm" onClick={() => window.print()}>Print</Button>
            <Button size="sm" onClick={() => window.print()} className="ml-3">Cancel Reservation</Button>
            </div>
          )}
        </div>
      </Form>
    </ComponentCard>
  );
}
