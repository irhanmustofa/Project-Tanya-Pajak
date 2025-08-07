import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { LucideFilePen, LucideSettings } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useGroup } from "./GroupProvider";
import GroupAddForm from "@/app/management/groups/group-pages/GroupAddForm";
import { useState } from "react";

export default function GroupSubject() {
  const [openAdd, setOpenAdd] = useState(false);

  const { groupState } = useGroup();

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        Groups <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Group Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Group Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      {openAdd && <GroupAddForm onClose={() => setOpenAdd(false)} />}
    </div>
  );
}
