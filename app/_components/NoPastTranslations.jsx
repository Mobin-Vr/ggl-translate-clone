"use client";

import desert from "@/public/desert.png";
import Image from "next/image";

export default function NoPastTranslations({ onClose, className }) {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <div className="flex max-w-72 flex-col items-center p-6 text-center">
        <div className="mb-4 max-w-48">
          <Image src={desert} alt="No translations" />
        </div>

        <h2 className="mb-2 text-lg font-semibold text-gray-900">
          No past translations
        </h2>

        <p className="text-sm text-gray-600">Start translation ;)</p>
      </div>
    </div>
  );
}
