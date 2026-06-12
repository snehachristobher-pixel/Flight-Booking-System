import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";

function PaymentProcessing() {
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate("/notification");
    }, 3000);

    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white flex items-center justify-center">
        <div className="bg-slate-900 p-10 rounded-xl text-center">
          <h1 className="text-4xl font-bold mb-4">Processing Payment...</h1>

          <p className="text-slate-400">
            Please wait while we confirm your payment.
          </p>
        </div>
      </div>
    </>
  );
}

export default PaymentProcessing;
