import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu";

import { LucideFilePen, LucideSettings, LucideFileDown } from "lucide-react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import KontakAddForm from "@/app/management/perubahan-profil/tabs/kontak/kontak-pages/KontakAddForm";
import KontakImportForm from "@/app/management/perubahan-profil/tabs/kontak/kontak-pages/KontakImportForm";

export default function KontakSubject() {
  const [openAdd, setOpenAdd] = useState(false);
  const [openImport, setOpenImport] = useState(false);

  return (
    <div className="flex justify-between mb-4">
      <h2 className="text-2xl font-semibold">
        Contact <b>Management </b>
      </h2>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline">
            <LucideSettings className="h-4 w-4" />
            <span className="">Contact Manager</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel className="font-light w-36">
            Contact Manager
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setOpenAdd(true)}>
            <LucideFilePen className="mr-2 h-4 w-4" />
            <span>Add New</span>
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpenImport(true)}>
            <LucideFileDown className="mr-2 h-4 w-4" />
            <span>Import</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
        </DropdownMenuContent>
      </DropdownMenu>
      {openAdd && <KontakAddForm onClose={() => setOpenAdd(false)} />}
      {openImport && <KontakImportForm onClose={() => setOpenImport(false)} />}
    </div>
  );
}
