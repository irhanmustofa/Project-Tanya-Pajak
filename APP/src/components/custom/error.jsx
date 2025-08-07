import { Button } from "../ui/button";

const Error = ({ message }) => {
  return (
    <div className="flex flex-col justify-center items-center gap-5">
      <div className="flex justify-center items-center text-3xl font-semibold">
        {message}
      </div>
      <Button
        onClick={() => {
          window.location.reload();
        }}
      >
        Retry
      </Button>
    </div>
  );
};

export default Error;
