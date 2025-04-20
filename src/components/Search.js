"use client";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import Radar from "radar-sdk-js";

export default function Search() {
  const [search, setSearch] = useState("");
  const [location, setLocation] = useState("");
  const [coords, setCoords] = useState({ lat: "", lng: "" });
  const [suggestions, setSuggestions] = useState([]);
  const router = useRouter();
  const debounceRef = useRef(null);

  useEffect(() => {
    Radar.initialize(process.env.NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY_TEST || process.env.NEXT_PUBLIC_RADAR_PUBLISHABLE_KEY);
  }, []);

  useEffect(() => {
    if (!location) {
      setSuggestions([]);
      return;
    }
    clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      try {
        const { addresses } = await Radar.autocomplete({
          query: location,
          limit: 5,
        });
        setSuggestions(addresses || []);
      } catch (err) {
        console.error(err);
      }
    }, 300);
    return () => clearTimeout(debounceRef.current);
  }, [location]);

  const handleSelect = (addr) => {
    setLocation(addr.formattedAddress);
    setCoords({
      lat: addr.latitude.toFixed(6),
      lng: addr.longitude.toFixed(6),
    });
    setSuggestions([]);
  };

  const handleSearch = () => {
    const locParam =
      coords.lat && coords.lng
        ? `${coords.lng},${coords.lat}`
        : location;
    const queryParams = new URLSearchParams({
      search,
      location: locParam,
      locationText: location,
    });
    router.push(`/search/?${queryParams.toString()}`);
  };

  return (
    <div className="flex flex-col items-center justify-center my-8">
      <div className="flex flex-col md:flex-row gap-4 w-full max-w-screen">
        <input
          type="text"
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="flex-1 p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
        />
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Location"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
          />
          {suggestions.length > 0 && (
            <ul className="absolute top-full left-0 w-full mt-1 max-h-60 overflow-y-auto rounded-lg border border-gray-200 bg-white text-gray-800 shadow-md z-10">
              {suggestions.map((addr) => (
                <li key={`${addr.latitude}-${addr.longitude}`}>
                  <button
                    onClick={() => handleSelect(addr)}
                    className="block w-full text-left px-4 py-2 bg-white hover:bg-gray-100"
                  >
                    {addr.formattedAddress}
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
        <button
          onClick={handleSearch}
          className="w-full md:w-auto px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition-colors"
        >
          Search
        </button>
      </div>
    </div>
  );
}