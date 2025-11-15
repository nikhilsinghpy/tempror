import React, { useEffect, useState } from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Menu } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Checkbox } from "@/components/ui/checkbox";

export default function TableCs({
  data = [],
  columns = [],
  filters = [],
  onClick,
  buttonChildren,
  paginationData = {},
  handleNext,
  handlePrevious,
  onSearch,
  handleKeyDown,
}) {
  const [selectedFilters, setSelectedFilters] = useState({});
  const [refactoredData, setRefactoredData] = useState([]);
  const [pagination, setPagination] = useState({
    totalCount: 0,
    totalPages: 0,
    page: 1,
    limit: 10,
  });

  const handleChange = (key, value, checked) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[key] || []);
      if (checked) current.add(value);
      else current.delete(value);
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const hasFilter = (key, value) => {
    if (!selectedFilters[key]) return false;
    return selectedFilters[key].includes(value);
  };
  const handleReset = () => setSelectedFilters({});

  useEffect(() => {
    if (paginationData) {
      setRefactoredData(data);
      setPagination(paginationData);
    } else {
      const totalPages = Math.ceil(data.length / pagination.limit);
      const startIndex = (pagination.page - 1) * pagination.limit;
      setPagination({
        totalCount: data.length,
        totalPages: totalPages,
        page: 1,
        limit: 10,
      });
      setRefactoredData(data.slice(startIndex, startIndex + pagination.limit));
    }
  }, [data]);

  const handleSearch = (e) => {
    const value = e.target.value;
    if (onSearch) {
      onSearch(value);
      return;
    }
    const filtered = data.filter((item) => {
      return Object.values(item).some((val) =>
        String(val).toLowerCase().includes(value)
      );
    });
    setRefactoredData(filtered)
  };
  return (
    <div className="w-full space-y-4">
      {/* Search & Filters */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search Using Phone or name ..."
          onChange={handleSearch}
          className="w-1/3"
          onKeyDown={handleKeyDown}
        />
        {buttonChildren}
        {filters.length > 0 && (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              <DropdownMenuLabel>Select Filter</DropdownMenuLabel>
              <DropdownMenuSeparator />
              {filters.map(({ key, label, values }) => (
                <DropdownMenuSub key={key}>
                  <DropdownMenuSubTrigger className="capitalize">
                    {label}
                  </DropdownMenuSubTrigger>
                  <DropdownMenuSubContent className="p-2">
                    <div className="flex flex-col gap-2">
                      {values.map((val) => (
                        <label
                          key={val}
                          className="flex items-center gap-2 text-sm capitalize"
                        >
                          <Checkbox
                            id={`${key}-${val}`}
                            checked={hasFilter(key, val)}
                            onCheckedChange={(checked) =>
                              handleChange(key, val, checked)
                            }
                          />
                          {val}
                        </label>
                      ))}
                    </div>
                  </DropdownMenuSubContent>
                </DropdownMenuSub>
              ))}
              <Button className="mt-2 w-full" onClick={handleReset}>
                Clear Filters
              </Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* Table */}
      <div className="rounded-md border shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              {columns.map((col) => (
                <TableHead key={col.accessor}>{col.header}</TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody>
            {refactoredData.length > 0 ? (
              refactoredData.map((row, i) => (
                <TableRow
                  key={i}
                  onClick={() => onClick?.(row)}
                  className="cursor-pointer"
                >
                  {columns.map((col) => (
                    <TableCell key={col.accessor}>
                      {col.accessor === "message" &&
                      row[col.accessor]?.length > 20
                        ? `${row[col.accessor].slice(0, 20)}...`
                        : row[col.accessor]}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-6 text-gray-500"
                >
                  No data found
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-gray-500">
          Page {pagination.page} of {pagination.totalPages}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => handlePrevious(pagination.page - 1)}
            disabled={pagination.page === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => handleNext(pagination.page + 1)}
            disabled={pagination.page === pagination.totalPages}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
