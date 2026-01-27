import { useState, useMemo } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  useSortable,
  horizontalListSortingStrategy,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
  PaginationEllipsis,
} from "@/components/ui/pagination";
import { GripVertical } from "lucide-react";

interface DynamicTableProps {
  data: Record<string, any>[];
  itemsPerPage?: number;
  excludeColumns?: string[];
  columnLabels?: Record<string, string>;
  onDataReorder?: (newData: Record<string, any>[]) => void;
}

interface SortableHeaderProps {
  id: string;
  children: React.ReactNode;
}

function SortableHeader({ id, children }: SortableHeaderProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableHead
      ref={setNodeRef}
      style={style}
      className="relative group cursor-move"
    >
      <div className="flex items-center gap-2">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground opacity-0 group-hover:opacity-100 transition-opacity" />
        </div>
        <span>{children}</span>
      </div>
    </TableHead>
  );
}

interface SortableRowProps {
  id: string;
  row: Record<string, any>;
  columns: string[];
  formatCellValue: (value: any) => string;
}

function SortableRow({ id, row, columns, formatCellValue }: SortableRowProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  return (
    <TableRow ref={setNodeRef} style={style}>
      <TableCell className="w-12">
        <div
          {...attributes}
          {...listeners}
          className="cursor-grab active:cursor-grabbing hover:bg-accent/50 rounded p-1 transition-colors"
        >
          <GripVertical className="h-4 w-4 text-muted-foreground" />
        </div>
      </TableCell>
      {columns.map((column) => (
        <TableCell key={column}>
          {formatCellValue(row[column])}
        </TableCell>
      ))}
    </TableRow>
  );
}

export function DynamicTable({
  data,
  itemsPerPage = 10,
  excludeColumns = [],
  columnLabels = {},
  onDataReorder,
}: DynamicTableProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [orderedData, setOrderedData] = useState(data);

  // Update ordered data when source data changes
  useMemo(() => {
    setOrderedData(data);
  }, [data]);

  // Extract columns from data
  const allColumns = useMemo(() => {
    if (orderedData.length === 0) return [];
    const keys = Object.keys(orderedData[0]);
    return keys.filter((key) => !excludeColumns.includes(key));
  }, [orderedData, excludeColumns]);

  const [columns, setColumns] = useState(allColumns);

  // Update columns when data changes
  useMemo(() => {
    setColumns(allColumns);
  }, [allColumns]);

  const sensors = useSensors(
    useSensor(PointerSensor),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  // Pagination logic
  const totalPages = Math.ceil(orderedData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const paginatedData = orderedData.slice(startIndex, endIndex);

  // Add unique IDs to rows for drag and drop
  const paginatedDataWithIds = useMemo(
    () => paginatedData.map((row, index) => ({ ...row, _rowId: `row-${startIndex + index}` })),
    [paginatedData, startIndex]
  );

  const handleColumnDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      setColumns((items) => {
        const oldIndex = items.indexOf(active.id as string);
        const newIndex = items.indexOf(over.id as string);
        return arrayMove(items, oldIndex, newIndex);
      });
    }
  };

  const handleRowDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;

    if (over && active.id !== over.id) {
      const activeIndex = paginatedDataWithIds.findIndex((row) => row._rowId === active.id);
      const overIndex = paginatedDataWithIds.findIndex((row) => row._rowId === over.id);

      if (activeIndex !== -1 && overIndex !== -1) {
        const newOrderedData = [...orderedData];
        const actualActiveIndex = startIndex + activeIndex;
        const actualOverIndex = startIndex + overIndex;
        
        const reordered = arrayMove(newOrderedData, actualActiveIndex, actualOverIndex);
        setOrderedData(reordered);
        
        if (onDataReorder) {
          onDataReorder(reordered);
        }
      }
    }
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 3) {
        for (let i = 1; i <= 4; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 2) {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = totalPages - 3; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push("ellipsis");
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push("ellipsis");
        pages.push(totalPages);
      }
    }

    return pages;
  };

  const formatCellValue = (value: any): string => {
    if (value === null || value === undefined) return "";
    if (typeof value === "object") return JSON.stringify(value);
    return String(value);
  };

  const getColumnLabel = (column: string): string => {
    return (
      columnLabels[column] ||
      column.charAt(0).toUpperCase() + column.slice(1).replace(/_/g, " ")
    );
  };

  if (orderedData.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 text-muted-foreground">
        No data available
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="rounded-md border border-border bg-card">
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleColumnDragEnd}
        >
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-12"></TableHead>
                <SortableContext
                  items={columns}
                  strategy={horizontalListSortingStrategy}
                >
                  {columns.map((column) => (
                    <SortableHeader key={column} id={column}>
                      {getColumnLabel(column)}
                    </SortableHeader>
                  ))}
                </SortableContext>
              </TableRow>
            </TableHeader>
          </Table>
        </DndContext>
        
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleRowDragEnd}
        >
          <Table>
            <TableBody>
              <SortableContext
                items={paginatedDataWithIds.map((row) => row._rowId)}
                strategy={verticalListSortingStrategy}
              >
                {paginatedDataWithIds.map((row) => (
                  <SortableRow
                    key={row._rowId}
                    id={row._rowId}
                    row={row}
                    columns={columns}
                    formatCellValue={formatCellValue}
                  />
                ))}
              </SortableContext>
            </TableBody>
          </Table>
        </DndContext>
      </div>

      {totalPages > 1 && (
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                onClick={() => handlePageChange(currentPage - 1)}
                className={
                  currentPage === 1
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>

            {getPageNumbers().map((page, index) => (
              <PaginationItem key={index}>
                {page === "ellipsis" ? (
                  <PaginationEllipsis />
                ) : (
                  <PaginationLink
                    onClick={() => handlePageChange(page as number)}
                    isActive={currentPage === page}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                )}
              </PaginationItem>
            ))}

            <PaginationItem>
              <PaginationNext
                onClick={() => handlePageChange(currentPage + 1)}
                className={
                  currentPage === totalPages
                    ? "pointer-events-none opacity-50"
                    : "cursor-pointer"
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      )}

      <div className="text-sm text-muted-foreground text-center">
        Showing {startIndex + 1} to {Math.min(endIndex, orderedData.length)} of{" "}
        {orderedData.length} entries
      </div>
    </div>
  );
}
