import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/ui/dialog";

import { ClientHistory as getHistory } from "../client-components/ClientService";
import { format } from "date-fns";

const ClientHistory = ({ id, onClose }) => {
  const [history, setHistory] = useState([]);
  const [isOpen, setIsOpen] = useState(false);

  const handleCloseDialog = () => {
    setIsOpen(false);
    onClose();
  };

  useEffect(() => {
    getHistory(id).then((res) => {
      if (res.success) {
        const sortedHistory = res.data.sort((a, b) => {
          return new Date(b.date) - new Date(a.date);
        });
        setHistory(sortedHistory);
      }

      setIsOpen(true);
    });
  }, [id]);

  return (
    <>
      {isOpen && (
        <Dialog onOpenChange={handleCloseDialog} open={isOpen}>
          <DialogContent className="flex flex-col sm:max-w-[425px] md:max-w-[95%] md:h-[95%]">
            <div className="space-y-1 h-12">
              <DialogTitle>Client History</DialogTitle>
              <DialogDescription>
                View historical client information.
              </DialogDescription>
            </div>

            <div className="overflow-y-auto w-full [&::-webkit-scrollbar]:hidden scrollbar-thin">
              <Table className="min-w-full">
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[20%]">Date</TableHead>
                    <TableHead className="w-[10%]">Admin</TableHead>
                    <TableHead className="">Description</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>
                        {format(new Date(item.date), "dd MMM yyyy HH:mm:ss")}
                      </TableCell>
                      <TableCell>{item?.admin}</TableCell>
                      <TableCell>{item.description}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </DialogContent>
        </Dialog>
      )}
    </>
  );
};

export default ClientHistory;
