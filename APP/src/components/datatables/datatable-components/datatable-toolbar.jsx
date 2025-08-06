import { Cross2Icon } from "@radix-ui/react-icons";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { DatatableFilter } from "./datatable-filter";
import { DatatableDatePicker } from "./datatable-date-picker";
import { useEffect, useState } from "react";
import { DatatableToggle } from "./datatable-toggle";
import { TrashIcon } from "lucide-react";
import { useLocation } from "react-router-dom";
import { base_url } from "@/api/http-endpoints";
import { useDialog, useDialogDispatch } from "@/dialogs/DialogProvider";
import DialogDeleteSome from "@/dialogs/DialogDeleteSome";
import { format } from "date-fns";

export function DatatableToolbar({ table, filterFields }) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [idSelector, setIdSelector] = useState([]);
  const { filterDate, filterColumn } = filterFields;
  const path = useLocation().pathname.split("/").slice(1).join("/");
  const dispatch = useDialogDispatch();
  const { dialogState, dialogAction } = useDialog();

  useEffect(() => {
    if (table.getFilteredSelectedRowModel().rows.length > 0) {
      setIdSelector(
        table.getFilteredSelectedRowModel().rows.map((row) => row.original.id)
      );
    }
  }, [table.getFilteredSelectedRowModel().rows.length]);
  console.log("DatatableToolbar idSelector:", idSelector);
  const handleDelete = () => {
    dispatch({
      type: dialogAction.DIALOG_DELETE_SOME,
      payload: {
        isOpen: true,
        title: "Delete Some Data",
        message:
          "Are you sure you want to delete these data? This action cannot be undone.",
        status: "warning",
        url: base_url + "/" + path + "/delete",
        data: idSelector,
      },
    });
  };

  const [dateRange, setDateRange] = useState({
    from: new Date(new Date().getFullYear(), 0, 1),
    to: new Date(),
  });

  const handleDateSelect = ({ from, to }) => {
    const formattedFrom = from ? format(from, "yyyy-MM-dd") : null;
    const formattedTo = to ? format(to, "yyyy-MM-dd") : null;

    setDateRange({ from, to });
    table
      .getColumn(filterDate.column)
      ?.setFilterValue([formattedFrom, formattedTo]);
  };

  return (
    <div className="flex flex-wrap items-center justify-between">
      <div className="flex flex-1 flex-wrap items-center gap-2">
        <Input
          placeholder={`Search Data . . .`}
          value={table.getState().globalFilter ?? ""}
          onChange={(event) => table.setGlobalFilter(event.target.value)}
          className="w-[150px] lg:w-[250px]"
        />

        {Object.keys(filterColumn).map((columnKey) => {
          const columnInstance = table.getColumn(columnKey);

          return (
            columnInstance && (
              <DatatableFilter
                key={columnKey}
                column={columnInstance}
                title={filterColumn[columnKey].title}
                options={filterColumn[columnKey].values}
              />
            )
          );
        })}

        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}

        {filterDate.active && (
          <DatatableDatePicker
            date={dateRange}
            onDateSelect={handleDateSelect}
            className=" w-[250px]"
            variant="outline"
          />
        )}
      </div>

      <div className="flex items-center gap-2">
        {table.getFilteredSelectedRowModel().rows.length > 0 ? (
          <Button variant="outline" size="" onClick={handleDelete}>
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete ({table.getFilteredSelectedRowModel().rows.length})
          </Button>
        ) : (
          <DatatableToggle table={table} />
        )}
      </div>

      {dialogState.isOpen && <DialogDeleteSome />}
    </div>
  );
}
