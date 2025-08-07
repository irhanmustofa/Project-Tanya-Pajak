import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center flex-col text-center dark:text-white dark:bg-black/80">
      <h1 className="text-5xl font-bold text-red-600">404</h1>
      <p className="text-xl mt-2">Halaman tidak ditemukan</p>
      <div>
        <button
          onClick={() => navigate(-1)}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Kembali
        </button>
      </div>
    </div>
  );
}
