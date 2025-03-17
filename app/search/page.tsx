"use client";
import { useState } from "react";
import Link from "next/link";

interface SearchResult {
  id: number;
  name: string;
  background_image?: string;
  slug?: string;
  released?: string;
}

// Function to fetch search results
async function fetchSearchResults(query: string): Promise<SearchResult[]> {
  const API_KEY = "48f28e1f743841cead5122123c468993";
  const response = await fetch(`https://api.rawg.io/api/games?key=${API_KEY}&search=${query}`);
  if (!response.ok) throw new Error("Failed to fetch search results");
  const data = await response.json();
  return data.results || []; // ✅ Ensure we return an array
}
export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);

  // Handle search
  const handleSearch = async (event: React.FormEvent) => {
    event.preventDefault();
    if (!query) return;
    try {
      const games = await fetchSearchResults(query);
      setResults(games); // ✅ Now results will be set correctly
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Search for Games</h1>
      
      <form onSubmit={handleSearch} className="flex space-x-2">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for a game..."
          className="border p-2 rounded w-full"
        />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Search</button>
      </form>

      {/* Display Results */}
      <div className="mt-6">
        {results.length > 0 ? (
          <ul className="grid grid-cols-3 gap-4">
            {results.map((item) => (
              <li key={item.id} className="border p-4 rounded shadow">
                <Link href={`/game/${item.id}`} className="block">
                  <h2 className="font-bold">{item.name}</h2>
                  {item.background_image && (
                    <img src={item.background_image} alt={item.name} className="rounded mt-2" />
                  )}
                  <p className="text-gray-500">Released: {item.released}</p>
                </Link>
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-gray-500">No results found.</p>
        )}
      </div>
    </div>
  );
}
