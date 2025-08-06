import { useState } from "react";
import { Label } from "../ui/label";
import { Input } from "../ui/input";

export const InputVertical = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  return (
    <>
      <div className="grid gap-2">
        <Label htmlFor={name}>{title}</Label>
        <Input
          id={name}
          title={title}
          name={name}
          type={type}
          placeholder={placeholder}
          {...props}
        />
        {error}
      </div>
    </>
  );
};

export const InputHorizontal = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  return (
    <>
      <div className="grid grid-cols-4 gap-2">
        <div className="col-span-1 flex items-center">
          <Label htmlFor={name}>{title}</Label>
        </div>
        <div className="col-span-3">
          <Input
            id={name}
            title={title}
            name={name}
            type={type}
            placeholder={placeholder}
            {...props}
          />
        </div>
      </div>
      {error}
    </>
  );
};

export const InputFloating = (props) => {
  const { title, name, type, placeholder, error = "" } = props;
  const [isFocused, setIsFocused] = useState(false);

  return (
    <>
      <div className="relative">
        <Input
          id={name}
          title={title}
          name={name}
          type={type}
          placeholder={placeholder}
          className="peer focus-visible:ring-1 focus-visible:ring-offset-0"
          onFocus={() => setIsFocused(true)}
          onBlur={(e) => setIsFocused(e.target.value !== "")}
          {...props}
        />
        <Label
          htmlFor={name}
          className={`absolute left-2 top-2 transition-all duration-200 ease-in-out ${
            isFocused || props.value
              ? "text-xs -top-[1.1rem] z-10"
              : "text-sm font-thin text-transparent"
          }`}
        >
          {title}
        </Label>
      </div>
      {error}
    </>
  );
};
