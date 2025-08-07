import { useState } from "react";
import { Check } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
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

import { serviceDivision } from "@/helpers/variables";

const ComboBox = ({ options, value, onChange, placeholder = "Select..." }) => {
  const [open, setOpen] = useState(false);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-between w-full"
        >
          {value
            ? options.find((option) => option.value === value)?.label
            : placeholder}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0">
        <Command>
          <CommandInput placeholder="Search..." className="h-9" />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option, index) => (
                <CommandItem
                  key={index}
                  value={option.label}
                  onSelect={() => handleSelect(option.value)}
                >
                  <div className="flex flex-col gap-1 w-full capitalize">
                    <div className="flex items-center">
                      {option.label}
                      <Check
                        className={cn(
                          "ml-auto",
                          value === option.value ? "opacity-100" : "opacity-0"
                        )}
                      />
                    </div>

                    <div className="flex justify-between">
                      {option.price && (
                        <div className="text-xs text-muted-foreground">
                          {option.price.toLocaleString("id-ID")}
                        </div>
                      )}
                      {option.division && (
                        <div className="text-xs text-muted-foreground">
                          {
                            serviceDivision.find(
                              (division) =>
                                division.code === Number(option.division)
                            )?.name
                          }
                        </div>
                      )}
                    </div>
                  </div>
                </CommandItem>
              ))}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default ComboBox;
