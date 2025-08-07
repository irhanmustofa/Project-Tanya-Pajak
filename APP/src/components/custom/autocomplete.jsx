import {
  CommandGroup,
  CommandItem,
  CommandList,
  CommandInput,
} from "@/components/ui/command";
import { Command as CommandPrimitive } from "cmdk";
import { useState, useRef, useCallback, useEffect } from "react";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export const AutoComplete = ({
  options,
  value,
  onChange,
  placeholder = "Search...",
}) => {
  const inputRef = useRef(null);

  const [isOpen, setIsOpen] = useState(false);
  const [inputValue, setInputValue] = useState(value || "");

  useEffect(() => {
    const selectedOption = options.find((option) => option.value === value);
    setInputValue(selectedOption ? selectedOption.label : value || "");
  }, [value, options]);

  const handleKeyDown = useCallback(
    (event) => {
      if (!inputRef.current) return;

      if (!isOpen) setIsOpen(true);

      if (event.key === "Enter" && inputValue !== "") {
        const optionToSelect = options.find(
          (option) => option.label === inputValue
        );
        onChange(optionToSelect ? optionToSelect.value : inputValue);
        setIsOpen(false);
      }

      if (event.key === "Escape") {
        inputRef.current.blur();
      }
    },
    [inputValue, isOpen, options, onChange]
  );

  const handleBlur = useCallback(() => {
    setIsOpen(false);
  }, []);

  const handleSelectOption = useCallback(
    (selectedOption) => {
      onChange(selectedOption.value);
      setIsOpen(false);
      setTimeout(() => inputRef.current?.blur(), 0);
    },
    [onChange]
  );

  return (
    <CommandPrimitive onKeyDown={handleKeyDown}>
      <div>
        <CommandInput
          ref={inputRef}
          value={inputValue}
          onValueChange={setInputValue}
          onBlur={handleBlur}
          onFocus={() => setIsOpen(true)}
          placeholder={placeholder}
          className="text-base"
        />
      </div>
      {isOpen && (
        <div className="relative mt-1">
          <CommandList className="absolute z-10 w-full rounded-lg bg-white ring-1 ring-slate-200">
            {options.length > 0 ? (
              <CommandGroup>
                {options.map((option) => (
                  <CommandItem
                    key={option.value}
                    value={option.label}
                    onMouseDown={(event) => {
                      event.preventDefault();
                      event.stopPropagation();
                    }}
                    onSelect={() => handleSelectOption(option)}
                    className={cn("flex flex-col gap-1 w-full capitalize")}
                  >
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
                      <div className="text-xs text-muted-foreground">
                        {option.left}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {option.right}
                      </div>
                    </div>
                  </CommandItem>
                ))}
              </CommandGroup>
            ) : (
              <CommandPrimitive.Empty className="select-none rounded-sm px-2 py-3 text-center text-sm">
                No results found.
              </CommandPrimitive.Empty>
            )}
          </CommandList>
        </div>
      )}
    </CommandPrimitive>
  );
};
