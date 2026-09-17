"use client";

import { Download } from "lucide-react";

interface Place {
  displayName?: { text: string };
  formattedAddress?: string;
  rating?: number;
  userRatingCount?: number;
  priceRange?: {
    startPrice?: {
      currencyCode?: string;
      units?: string;
      nanos?: number;
    };
    endPrice?: {
      currencyCode?: string;
      units?: string;
      nanos?: number;
    };
  };
  regularOpeningHours?: {
    openNow?: boolean;
    weekdayDescriptions?: string[];
  };
  location?: { latitude: number; longitude: number };
  googleMapsUri?: string;
  nationalPhoneNumber?: string;
  internationalPhoneNumber?: string;
  websiteUri?: string;
}

interface DownloadCsvButtonProps {
  places: Place[];
  formattedPrice: (place: Place) => string;
  language: "id" | "en";
}

function escapeCell(value: string | number | undefined | null) {
  if (value === undefined || value === null) return '""';

  const text = String(value).replace(/"/g, '""');

  return `"${text}"`;
}

export default function DownloadCsvButton({
  places,
  formattedPrice,
  language,
}: DownloadCsvButtonProps) {
  const isID = language === "id";

  function handleDownload() {
    if (!places.length) return;

    const headers = isID
      ? [
          "Nama",
          "Alamat",
          "Rating",
          "Jumlah Ulasan",
          "Range Harga",
          "Status",
          "Jam Buka",
          "Telepon",
          "Website",
          "Google Maps",
          "Latitude",
          "Longitude",
        ]
      : [
          "Name",
          "Address",
          "Rating",
          "Review Count",
          "Price Range",
          "Status",
          "Opening Hours",
          "Phone",
          "Website",
          "Google Maps",
          "Latitude",
          "Longitude",
        ];

    const openLabel = isID ? "Buka" : "Open";
    const closedLabel = isID ? "Tutup" : "Closed";
    const unknownLabel = isID ? "Tidak diketahui" : "Unknown";

    const rows = places.map((place) => {
      const openNow = place.regularOpeningHours?.openNow;

      const status =
        openNow === true
          ? openLabel
          : openNow === false
            ? closedLabel
            : unknownLabel;

      const hours =
        place.regularOpeningHours?.weekdayDescriptions?.join(" | ") ?? "";

      const phone =
        place.nationalPhoneNumber || place.internationalPhoneNumber || "";

      return [
        place.displayName?.text ?? "",
        place.formattedAddress ?? "",
        place.rating ?? "",
        place.userRatingCount ?? "",
        formattedPrice(place),
        status,
        hours,
        phone,
        place.websiteUri ?? "",
        place.googleMapsUri ?? "",
        place.location?.latitude ?? "",
        place.location?.longitude ?? "",
      ]
        .map(escapeCell)
        .join(",");
    });

    // BOM supaya Excel membaca UTF-8 dengan benar
    const csv = "\uFEFF" + [headers.map(escapeCell).join(","), ...rows].join("\r\n");

    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);

    const date = new Date().toISOString().slice(0, 10);

    const link = document.createElement("a");
    link.href = url;
    link.download = `googlemaps-ai-${date}.csv`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);

    URL.revokeObjectURL(url);
  }

  return (
    <button
      type="button"
      onClick={handleDownload}
      disabled={!places.length}
      className="inline-flex items-center gap-1.5 rounded-full border border-[#0E4A34]/20 bg-white px-3.5 py-2 text-xs font-semibold text-[#0E4A34] shadow-sm transition-colors duration-200 hover:bg-[#0E4A34]/5 disabled:cursor-not-allowed disabled:opacity-50"
    >
      <Download size={14} aria-hidden="true" />
      {isID ? "Unduh CSV" : "Download CSV"}
    </button>
  );
}