import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { useState } from "react";
import { Button } from "@/components/ui/button";

export default function selectSearch(props) {
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const { dataOption = [], title = "", onChange = {}, name } = props;

  return (
    <>
      {title && <h1 className="leading-none text-sm font-medium">{title}</h1>}

      <Popover open={open} onOpenChange={setOpen} name={name} value={value}>
        <PopoverTrigger asChild>
          <Button
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between"
          >
            {value
              ? props.dataOption.find((item) => item.kode === value)?.name
              : "Pilih..."}
            <ChevronsUpDown className="opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full h-[200px] p-0">
          <Command>
            <CommandInput placeholder="Search framework..." className="h-9" />
            <CommandList>
              <CommandEmpty>No framework found.</CommandEmpty>
              <CommandGroup>
                {props.dataOption.map((item, key) => (
                  <CommandItem
                    key={key}
                    value={item.name}
                    onSelect={(myVal) => {
                      setValue(myVal === value ? "" : item.kode);
                      setOpen(false);
                    }}
                  >
                    {item.name}
                    <Check
                      className={cn(
                        "ml-auto",
                        value === item.kode ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </PopoverContent>
      </Popover>
    </>
  );
}
