import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { AppWindowIcon, CodeIcon } from "lucide-react";
import {
  TabsRoot,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import DataTables from "@/components/datatables/Datatables";
import { useCoaGroup } from "@/app/management/coa/group/coa-group-components/CoaGroupProvider";
import useCoaGroupTableConfig from "@/app/management/coa/group/coa-group-components/CoaGroupColumn";
import CoaGroupAddForm from "./CoaGroupAddForm";
import CoaGroupImportForm from "./CoaGroupImport";

export default function CoaGroupModal() {
  const { coaGroupState } = useCoaGroup();
  const { coaGroupColumn, filterFields } = useCoaGroupTableConfig();
  return (
    <>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">Add Group</Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[1100px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>

          <div className="flex w-full max-w-full flex-col gap-6 mb-8 ">
            <TabsRoot defaultValue="input">
              <TabsList>
                <TabsTrigger value="input">Input Group</TabsTrigger>
                <TabsTrigger value="import">Import Group</TabsTrigger>
              </TabsList>
              <TabsContent value="input" className={"border rounded p-4"}>
                <div className="py-4 mx-2">
                  <CoaGroupAddForm />
                </div>
              </TabsContent>
              <TabsContent value="import" className={"border rounded p-4"}>
                <div className="py-4 mx-2">
                  <CoaGroupImportForm />
                </div>
              </TabsContent>
            </TabsRoot>
          </div>

          {/* <Separator className="mt-20 mb-4" /> */}
          <DataTables
            columns={coaGroupColumn}
            data={coaGroupState.data ?? []}
            filterFields={filterFields}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}
