import { Label } from "../ui/label";

export const SelectOpt = (props) => {
  const {
    optionTitle = [],
    optionValue = [],
    title = "",
    value = 0,
    name = "",
    error = "",
  } = props;

  let firstOptionTitle = ["Select Option"];
  let mergeTitle = firstOptionTitle.concat(optionTitle);
  let firstOptionValue = [0];
  let mergeValue = firstOptionValue.concat(optionValue);
  return (
    <div className="grid grid-cols-4 gap-2">
      <div className="col-span-1 flex items-center">
        <Label htmlFor={title}>{title}</Label>
      </div>
      <div className="col-span-3">
        <select
          name={name}
          id={name}
          className="relative z-50 max-h-96 w-full min-w-[8rem] overflow-hidden rounded-md border bg-popover text-popover-foreground shadow-md data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2"
        >
          {mergeValue &&
            mergeValue.map((item, key) => {
              return value === item ? (
                <option key={key} value={item} selected>
                  {mergeTitle[key]}
                </option>
              ) : (
                <option key={key} value={item}>
                  {mergeTitle[key]}
                </option>
              );
            })}
        </select>
      </div>
      {error}
    </div>
  );
};
