import React, { useState, useMemo } from "react";
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
  rowsPerPage = 5,
  filters = [],
}) {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);
  const [selectedFilters, setSelectedFilters] = useState({});

  const handleChange = (key, value, checked) => {
    setSelectedFilters((prev) => {
      const current = new Set(prev[key] || []);
      if (checked) {
        current.add(value);
      } else {
        current.delete(value);
      }
      return { ...prev, [key]: Array.from(current) };
    });
  };

  const hasFilter = (key, value) => {
    if (!selectedFilters[key]) return false;
    return selectedFilters[key].includes(value);
  };

  const handleReset = () => setSelectedFilters({});

  // 🔍 Filter data based on search query
  const filteredData = useMemo(() => {
    if (!search.trim()) return data;
    return data.filter((row) =>
      Object.values(row).some((value) =>
        String(value).toLowerCase().includes(search.toLowerCase())
      )
    );
  }, [data, search]);

  // 📄 Pagination logic
  const totalPages = Math.ceil(filteredData.length / rowsPerPage);
  const startIndex = (page - 1) * rowsPerPage;
  const paginatedData = filteredData.slice(
    startIndex,
    startIndex + rowsPerPage
  );

  const handlePrev = () => setPage((p) => Math.max(p - 1, 1));
  const handleNext = () => setPage((p) => Math.min(p + 1, totalPages));

  return (
    <div className="w-full space-y-4">
      {/* 🔍 Search Bar */}
      <div className="flex justify-between items-center">
        <Input
          placeholder="Search..."
          value={search}
          onChange={(e) => {
            setSearch(e.target.value);
            setPage(1);
          }}
          className="w-1/3"
        />

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
              <Button className="mt-2 w-full" onClick={handleReset}>Clear Filters</Button>
            </DropdownMenuContent>
          </DropdownMenu>
        )}
      </div>

      {/* 📋 Table */}
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
            {paginatedData.length > 0 ? (
              paginatedData.map((row, i) => (
                <TableRow key={i}>
                  {columns.map((col) => (
                    <TableCell key={col.accessor}>
                      {row[col.accessor]}
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

      {/* 🔢 Pagination */}
      <div className="flex items-center justify-between pt-2">
        <p className="text-sm text-gray-500">
          Page {page} of {totalPages || 1}
        </p>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={handlePrev}
            disabled={page === 1}
          >
            <ChevronLeft className="w-4 h-4 mr-1" />
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={handleNext}
            disabled={page === totalPages || totalPages === 0}
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        </div>
      </div>
    </div>
  );
}
