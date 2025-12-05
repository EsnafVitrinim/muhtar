import { useCallback, useMemo, useState } from "react";
import isObject from 'isobject';

export const useTableLogic = (tableData, defaultPerPage) => {
  const { columns, rows, statusOptions, searchColumnKey, inititalVisibleColumns, defaultSortValue } = tableData;
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState([]);
  const [visibleColumns, setVisibleColumns] = useState(inititalVisibleColumns);
  const [statusFilter, setStatusFilter] = useState("all");
  const [rowsPerPage, setRowsPerPage] = useState(defaultPerPage);
  const sortKey = defaultSortValue ? defaultSortValue.key : inititalVisibleColumns && inititalVisibleColumns.length < 0 ? inititalVisibleColumns[0] : 'id';
  const sortDirection = defaultSortValue ? defaultSortValue.direction : 'descending';
  const [sortDescriptor, setSortDescriptor] = useState({
    column: sortKey,
    direction: sortDirection
  });
  const [page, setPage] = useState(1);

  const hasSearchFilter = Boolean(filterValue);

  const headerColumns = useMemo(() => {
    if (visibleColumns === "all") return columns;

    return columns.filter((column) => Array.from(visibleColumns).includes(column.uid));
  }, [visibleColumns]);

  const filteredItems = useMemo(() => {
    let filteredRows = [...rows];

    if (hasSearchFilter) {
      filteredRows = filteredRows.filter((row) =>
        row[searchColumnKey.key].toLowerCase().includes(filterValue.toLowerCase()),
      );
    }
    if (statusOptions && statusFilter !== "all" && Array.from(statusFilter).length !== statusOptions.length) {
      filteredRows = filteredRows.filter((row) =>
        Array.from(statusFilter).includes(row.status.type),
      );
    }

    return filteredRows;
  }, [rows, filterValue, statusFilter]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const items = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;

    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const sortedItems = useMemo(() => {
    return [...items].sort((a, b) => {
      let first;
      let second;

      if (isObject(a[sortDescriptor.column]) && isObject(b[sortDescriptor.column])) {
        first = a[sortDescriptor.column].value;
        second = b[sortDescriptor.column].value;
      } else {
        first = a[sortDescriptor.column];
        second = b[sortDescriptor.column];
      }

      // Eğer her iki değer de sayıya dönüştürülebiliyorsa, sayı kıyaslaması yap
      if (!isNaN(first) && !isNaN(second)) {
        first = Number(first);
        second = Number(second);
      }

      // String bazlı sıralama
      const cmp = typeof first === "string" && typeof second === "string"
        ? first.localeCompare(second) // Alfabetik sıralama
        : first - second; // Sayısal sıralama

      return sortDescriptor.direction === "descending" ? -cmp : cmp;
    });
  }, [sortDescriptor, items]);

  const onRowsPerPageChange = useCallback((e) => {
    setRowsPerPage(Number(e.target.value));
    setPage(1);
  }, []);

  const onSearchChange = useCallback((value) => {
    if (value) {
      setFilterValue(value);
      setPage(1);
    } else {
      setFilterValue("");
    }
  }, []);

  const onClear = useCallback(() => {
    setFilterValue("")
    setPage(1)
  }, []);

  return {
    filterValue,
    selectedKeys,
    visibleColumns,
    statusFilter,
    rowsPerPage,
    sortDescriptor,
    page,
    headerColumns,
    sortedItems,
    pages,
    onRowsPerPageChange,
    onSearchChange,
    onClear,
    setSelectedKeys,
    setVisibleColumns,
    setStatusFilter,
    setSortDescriptor,
    setPage,
  };
};
