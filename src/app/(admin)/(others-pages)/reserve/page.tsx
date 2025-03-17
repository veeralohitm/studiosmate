import React from "react";
import ReserveForm from "@/components/form/form-elements/reserveroom";



export default function Reserve() {
  return (
    <div>
      <div className="rounded-2xl border border-gray-200 bg-white p-5 dark:border-gray-800 dark:bg-white/[0.03] lg:p-6">
        <h3 className="mb-5 text-lg font-semibold text-gray-800 dark:text-white/90 lg:mb-7">
          Reserve a Room
        </h3>
        <div className="space-y-6">
        <ReserveForm />
        </div>
      </div>
    </div>
  );
}
