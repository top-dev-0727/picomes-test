'use client';

import { useState, useMemo } from 'react';

interface Brewery {
  id: string;
  name: string;
  country: string;
  brewery_type: string;
}

export default function BreweriesTable({ breweries }: { breweries: Brewery[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedType, setSelectedType] = useState('all');

  const itemsPerPage = 10;

  const sortedBreweries = useMemo(() => {
    return breweries.sort((a, b) => {
      if (a.brewery_type === b.brewery_type) {
        return a.name.localeCompare(b.name);
      }
      return a.brewery_type.localeCompare(b.brewery_type);
    });
  }, [breweries]);

  const breweryTypes = useMemo(() => {
    return Array.from(new Set(sortedBreweries.map(item => item.brewery_type)));
  }, [breweries]);

  const filteredBreweries = selectedType === 'all'
    ? sortedBreweries
    : sortedBreweries.filter(item => item.brewery_type === selectedType);

  const totalPages = Math.ceil(filteredBreweries.length / itemsPerPage);
  const start = (currentPage - 1) * itemsPerPage;
  const paginatedBreweries = filteredBreweries.slice(start, start + itemsPerPage);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold mb-4">Brewery Directory</h1>

      <div className="mb-4">
        <label className="mr-2">Filter breweries by Type:</label>
        <select
          value={selectedType}
          onChange={e => {
            setSelectedType(e.target.value);
            setCurrentPage(1);
          }}
        >
          <option value="all">All</option>
          {breweryTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>

      <table className="table-auto w-full border">
        <thead>
          <tr>
            <th className="border px-2 py-1">Name</th>
            <th className="border px-2 py-1">Type</th>
            <th className="border px-2 py-1">Country</th>
          </tr>
        </thead>
        <tbody>
          {paginatedBreweries.map(brewery => (
            <tr key={brewery.id}>
              <td className="border px-2 py-1">{brewery.name}</td>
              <td className="border px-2 py-1">{brewery.brewery_type}</td>
              <td className="border px-2 py-1">{brewery.country}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div className="flex justify-center gap-3 mt-4">
        <button
          onClick={() => handlePageChange(1)}
          className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          disabled={currentPage === 1}
        >
          {"<<"}
        </button>
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          className={currentPage === 1 ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          disabled={currentPage === 1}
        >
          {"<"}
        </button>
        <span>Page {currentPage} of {totalPages}</span>
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          disabled={currentPage === totalPages}
        >
          {">"}
        </button>
        <button
          onClick={() => handlePageChange(totalPages)}
          className={currentPage === totalPages ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
          disabled={currentPage === totalPages}
        >
          {">>"}
        </button>
      </div>
    </div>
  );
}