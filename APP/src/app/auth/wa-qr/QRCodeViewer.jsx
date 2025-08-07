import { useEffect, useState } from "react";

const QRCodeViewer = () => {
  const [qrCode, setQRCode] = useState(null);
  const [clientStatus, setClientStatus] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const whatsappApi = {
    status: "https://crm-wa.mytaxteknologi.site/api/whatsapp/status",
    qr: "https://crm-wa.mytaxteknologi.site/api/whatsapp/qr",
  };

  useEffect(() => {
    const fetchStatus = async () => {
      try {
        const response = await fetch(whatsappApi.status);
        const data = await response.json();
        setClientStatus(data.status);
        if (data.status === "QR Code is required to connect.") {
          fetchQRCode();
        } else {
          setQRCode(null);
          setLoading(false);
        }
      } catch (err) {
        setError("Failed to fetch client status. " + err);
        setLoading(false);
      }
    };

    const fetchQRCode = async () => {
      try {
        const response = await fetch(whatsappApi.qr);
        const data = await response.json();
        setQRCode(data.qrCode);
        setLoading(false);
      } catch (err) {
        setError("Failed to fetch QR Code. " + err);
        setLoading(false);
      }
    };

    const interval = setInterval(fetchStatus, 5000);

    fetchStatus();

    return () => clearInterval(interval);
  }, []);

  if (loading) return <p className="text-center text-gray-500">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-lg text-center">
        <h1 className="text-2xl font-bold mb-4">Scan QR Code</h1>
        {clientStatus === "QR Code is required to connect." && qrCode ? (
          <img
            src={`https://api.qrserver.com/v1/create-qr-code/?data=${encodeURIComponent(
              qrCode
            )}&size=200x200`}
            alt="QR Code"
            className="mx-auto"
          />
        ) : (
          <p className="text-green-500">{clientStatus}</p>
        )}
      </div>
    </div>
  );
};

export default QRCodeViewer;
