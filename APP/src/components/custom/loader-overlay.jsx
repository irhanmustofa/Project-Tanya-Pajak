import Loader from "./loader";

const LoaderOverlay = ({ text = "Updating Data . . ." }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-white/80 dark:bg-black/80">
      <Loader text={text} />
    </div>
  );
};

export default LoaderOverlay;
