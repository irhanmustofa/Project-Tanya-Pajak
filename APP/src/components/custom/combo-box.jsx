import { useState, useMemo, useEffect } from "react";
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

const Combobox = ({ options, value, onChange, placeholder = "Select..." }) => {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [searchBy, setSearchBy] = useState(null);

  const handleSelect = (selectedValue) => {
    onChange(selectedValue === value ? "" : selectedValue);
    setOpen(false);
    setSearch("");
    setSearchBy(null);
  };

  const filteredOptions = useMemo(() => {
    const searchLower = search.toLowerCase();

    return options.filter((option) => {
      const label = option.label?.toLowerCase() ?? "";
      const left = option.left?.toLowerCase() ?? "";
      const right = option.right?.toLowerCase() ?? "";

      return (
        label.includes(searchLower) ||
        left.includes(searchLower) ||
        right.includes(searchLower)
      );
    });
  }, [search, options]);

  // Setelah filteredOptions dihitung, tentukan searchBy dengan useEffect
  useEffect(() => {
    if (!search) {
      setSearchBy(null);
      return;
    }

    const searchLower = search.toLowerCase();

    for (const option of filteredOptions) {
      if (option.label?.toLowerCase().includes(searchLower)) {
        setSearchBy("label");
        return;
      }
      if (option.left?.toLowerCase().includes(searchLower)) {
        setSearchBy("left");
        return;
      }
      if (option.right?.toLowerCase().includes(searchLower)) {
        setSearchBy("right");
        return;
      }
    }

    setSearchBy(null);
  }, [search, filteredOptions]);

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div className="relative w-full">
      <Button
        type="button"
        variant="outline"
        role="combobox"
        aria-expanded={open}
        className="justify-between w-full"
        onClick={() => setOpen(!open)}
      >
        {selectedOption
          ? selectedOption.label || selectedOption.left || selectedOption.right
          : placeholder}
      </Button>
      {open && (
        <div className="absolute z-10 w-full bg-white border rounded-lg mt-1">
          <Command>
            <CommandInput
              placeholder="Search..."
              className="h-9"
              value={search}
              onValueChange={setSearch}
              autoFocus
            />
            <CommandList className="overflow-y-auto max-h-60 scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-transparent hover:scrollbar-thumb-gray-500">
              {filteredOptions.length === 0 && (
                <CommandEmpty>No results found.</CommandEmpty>
              )}
              <CommandGroup>
                {filteredOptions.map((option, index) => (
                  <CommandItem
                    key={option.value ?? index}
                    value={option[searchBy] ?? option.value}
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

                      {(option.left || option.right) && (
                        <div className="flex justify-between">
                          <div className="text-xs text-muted-foreground">
                            {option.left}
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {option.right}
                          </div>
                        </div>
                      )}
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            </CommandList>
          </Command>
        </div>
      )}
    </div>
  );
};

export default Combobox;
