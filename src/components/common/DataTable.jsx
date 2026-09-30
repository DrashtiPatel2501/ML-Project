import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
} from 'lucide-react';
import { EmptyState } from './EmptyState';

export const DataTable = ({
  columns = [],
  data = [],
  keyField = 'id',
  pageSize: initialPageSize = 10,
  searchQuery = '',
  emptyTitle = 'No records found',
  emptyDescription = 'No applicants match your current query.',
  onRowClick,
  className = '',
}) => {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(initialPageSize);
  const [sortColumn, setSortColumn] = useState(null);
  const [sortDirection, setSortDirection] = useState('asc'); // 'asc' | 'desc'

  // Handle column sorting
  const handleSort = (columnKey) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else {
        setSortColumn(null);
        setSortDirection('asc');
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  // Process data (filter + sort)
  const processedData = useMemo(() => {
    let result = [...data];

    // Global text search if any
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter((row) =>
        Object.values(row).some((val) =>
          val !== null && val !== undefined && String(val).toLowerCase().includes(q)
        )
      );
    }

    // Sorting
    if (sortColumn) {
      result.sort((a, b) => {
        let valA = a[sortColumn];
        let valB = b[sortColumn];

        if (typeof valA === 'string') {
          valA = valA.toLowerCase();
          valB = (valB || '').toLowerCase();
        }

        if (valA < valB) return sortDirection === 'asc' ? -1 : 1;
        if (valA > valB) return sortDirection === 'asc' ? 1 : -1;
        return 0;
      });
    }

    return result;
  }, [data, searchQuery, sortColumn, sortDirection]);

  // Pagination calculation
  const totalPages = Math.max(1, Math.ceil(processedData.length / pageSize));
  const validCurrentPage = Math.min(currentPage, totalPages);
  const startIndex = (validCurrentPage - 1) * pageSize;
  const paginatedData = processedData.slice(startIndex, startIndex + pageSize);

  const goToPage = (page) => {
    const p = Math.max(1, Math.min(page, totalPages));
    setCurrentPage(p);
  };

  return (
    <div className={`bg-white rounded-2xl border border-slate-200/80 shadow-soft overflow-hidden ${className}`}>
      {/* Table container */}
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm text-slate-600">
          <thead className="bg-slate-50/80 text-[11px] uppercase tracking-wider text-slate-500 font-semibold border-b border-slate-200/80">
            <tr>
              {columns.map((col) => {
                const isSorted = sortColumn === col.key;
                return (
                  <th
                    key={col.key}
                    scope="col"
                    onClick={() => col.sortable && handleSort(col.key)}
                    className={`px-5 py-3.5 ${
                      col.sortable ? 'cursor-pointer select-none hover:text-slate-800 transition-colors' : ''
                    } ${col.align === 'right' ? 'text-right' : col.align === 'center' ? 'text-center' : 'text-left'} ${
                      col.headerClassName || ''
                    }`}
                  >
                    <div
                      className={`inline-flex items-center gap-1.5 ${
                        col.align === 'right' ? 'justify-end w-full' : ''
                      }`}
                    >
                      <span>{col.label}</span>
                      {col.sortable && (
                        <span className="text-slate-400">
                          {isSorted ? (
                            sortDirection === 'asc' ? (
                              <ArrowUp className="w-3.5 h-3.5 text-brand-600" />
                            ) : (
                              <ArrowDown className="w-3.5 h-3.5 text-brand-600" />
                            )
                          ) : (
                            <ArrowUpDown className="w-3 h-3 opacity-60" />
                          )}
                        </span>
                      )}
                    </div>
                  </th>
                );
              })}
            </tr>
          </thead>

          <tbody className="divide-y divide-slate-100 font-normal">
            {paginatedData.length > 0 ? (
              paginatedData.map((row, index) => (
                <tr
                  key={row[keyField] || index}
                  onClick={() => onRowClick && onRowClick(row)}
                  className={`table-row-hover ${
                    onRowClick ? 'cursor-pointer' : ''
                  }`}
                >
                  {columns.map((col) => (
                    <td
                      key={col.key}
                      className={`px-5 py-4 text-xs sm:text-sm ${
                        col.align === 'right'
                          ? 'text-right'
                          : col.align === 'center'
                          ? 'text-center'
                          : 'text-left'
                      } ${col.className || ''}`}
                    >
                      {col.render ? col.render(row[col.key], row) : row[col.key]}
                    </td>
                  ))}
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={columns.length} className="py-8">
                  <EmptyState title={emptyTitle} description={emptyDescription} />
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination Footer */}
      {processedData.length > 0 && (
        <div className="px-5 py-3.5 border-t border-slate-100 bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span>Showing</span>
            <span className="font-semibold text-slate-800">
              {startIndex + 1} - {Math.min(startIndex + pageSize, processedData.length)}
            </span>
            <span>of</span>
            <span className="font-semibold text-slate-800">{processedData.length}</span>
            <span>records</span>
          </div>

          <div className="flex items-center gap-4">
            {/* Page size dropdown */}
            <div className="flex items-center gap-1.5">
              <span>Rows per page:</span>
              <select
                value={pageSize}
                onChange={(e) => {
                  setPageSize(Number(e.target.value));
                  setCurrentPage(1);
                }}
                className="bg-white border border-slate-200 text-slate-700 text-xs rounded-lg px-2 py-1 focus:ring-1 focus:ring-brand-500 focus:outline-none"
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Page Nav Buttons */}
            <div className="flex items-center gap-1">
              <button
                type="button"
                onClick={() => goToPage(1)}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                title="First Page"
              >
                <ChevronsLeft className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToPage(validCurrentPage - 1)}
                disabled={validCurrentPage === 1}
                className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                title="Previous Page"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>

              <span className="px-2 py-0.5 font-medium text-slate-800">
                {validCurrentPage} / {totalPages}
              </span>

              <button
                type="button"
                onClick={() => goToPage(validCurrentPage + 1)}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                title="Next Page"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
              <button
                type="button"
                onClick={() => goToPage(totalPages)}
                disabled={validCurrentPage === totalPages}
                className="p-1 rounded-lg hover:bg-slate-200 disabled:opacity-40 disabled:hover:bg-transparent transition-colors"
                title="Last Page"
              >
                <ChevronsRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
