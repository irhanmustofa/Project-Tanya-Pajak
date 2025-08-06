import { useEffect, useState, useMemo } from "react";
import { Checkbox } from "@/components/ui/checkbox";
import UserAction from "@/app/management/users/user-components/UserAction";
import { DatatableColumnHeader } from "@/components/datatables/datatable-components/datatable-column-header";
import { userLevel, statusType } from "@/helpers/variables";
import { useUser } from "./UserProvider";

export default function useUserTableConfig() {
  const [filterColumnTeamValue, setFilterColumnTeamValue] = useState([]);
  const { userGroup } = useUser();

  useEffect(() => {
    if (window.location.pathname === "/user") {
      setFilterColumnTeamValue(
        userGroup.map((item) => ({
          value: item.id,
          label: item.name,
        }))
      );
    }
  }, [userGroup]);

  const userColumn = useMemo(
    () => [
      {
        id: "select",
        header: ({ table }) => (
          <Checkbox
            checked={
              table.getIsAllPageRowsSelected() ||
              (table.getIsSomePageRowsSelected() && "indeterminate")
            }
            onCheckedChange={(value) =>
              table.toggleAllPageRowsSelected(!!value)
            }
            aria-label="Select all"
            className="translate-y-0.5"
          />
        ),
        cell: ({ row }) => (
          <Checkbox
            checked={row.getIsSelected()}
            onCheckedChange={(value) => row.toggleSelected(!!value)}
            aria-label="Select row"
            className="translate-y-0.5"
          />
        ),
        enableSorting: false,
        enableHiding: false,
      },
      {
        accessorKey: "no",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="No" />
        ),
        cell: ({ row }) => <div>{row.index + 1}</div>,
        enableSorting: false,
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Name" />
        ),
        cell: ({ row }) => (
          <div className=" capitalize">{row.getValue("name")}</div>
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Email" />
        ),
        cell: ({ row }) => (
          <div className="lowercase">{row.getValue("email")}</div>
        ),
      },
      {
        accessorKey: "role",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Role" />
        ),
        cell: ({ row }) => (
          <div>
            {userLevel.find((item) => item.code === row.getValue("role"))?.name}
          </div>
        ),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "team",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Team" />
        ),
        cell: ({ row }) => (
          <div>
            {userGroup.find((item) => item.id === row.getValue("team"))?.name}
          </div>
        ),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        accessorKey: "status",
        header: ({ column }) => (
          <DatatableColumnHeader column={column} title="Status" />
        ),
        cell: ({ row }) => (
          <div>
            {
              statusType.find((item) => item.code === row.getValue("status"))
                ?.name
            }
          </div>
        ),
        filterFn: (row, id, value) => value.includes(row.getValue(id)),
      },
      {
        id: "actions",
        header: "Actions",
        cell: ({ row }) => <UserAction row={row} />,
      },
    ],
    [userGroup]
  );

  const filterFields = useMemo(() => {
    const filterColumnStatusValue = statusType.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    const filterColumnRoleValue = userLevel.map((item) => ({
      value: item.code,
      label: item.name,
    }));

    return {
      filterDate: {
        active: false,
        column: "date",
      },
      filterColumn: {
        status: {
          title: "Status",
          values: filterColumnStatusValue,
        },
        role: {
          title: "Role",
          values: filterColumnRoleValue,
        },
        team: {
          title: "Team",
          values: filterColumnTeamValue,
        },
      },
    };
  }, [filterColumnTeamValue]);

  return { userColumn, filterFields };
}
