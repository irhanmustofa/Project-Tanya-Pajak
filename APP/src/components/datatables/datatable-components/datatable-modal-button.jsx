import { InputVertical } from "@/components/custom/input-custom";
import { Button } from "@/components/ui/button";
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

export default function ModalButtonTrigger({
  dataState = [],
  column = [],
  filter = [],
}) {
  return (
    <Dialog>
      <form>
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
          <div className="grid grid-cols-4 gap-4">
            <div className="col-span-2 ">
              <InputVertical
                title="Kode Group"
                type="text"
                placeholder="1101"
                name="kode_group"
              />
            </div>
            <div className="col-span-2 ">
              <InputVertical
                title="Nama Group"
                type="text"
                placeholder="1101"
                name="nama_group"
              />
            </div>
          </div>
          <DialogFooter className={"mb-20"}>
            <DialogClose asChild>
              <Button variant="outline">Cancel</Button>
            </DialogClose>
            <Button type="submit">Save changes</Button>
          </DialogFooter>
          {/* <Separator className="mt-20 mb-4" /> */}
          <DataTables columns={column} data={dataState} filterFields={filter} />
        </DialogContent>
      </form>
      <div></div>
    </Dialog>
  );
}
