import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";

function Home() {
  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1436491865332-7a61a109cc05')",
      }}
    >
      <div className="min-h-screen bg-black/70 text-white">
        <Navbar />

        {/* Hero Section */}
        <section className="flex flex-col items-center justify-center text-center py-32 px-6">
          <h1 className="text-6xl font-bold mb-6">Book Your Dream Flight ✈️</h1>

          <p className="text-xl text-slate-300 max-w-3xl mb-8">
            Discover the best flight deals, compare prices, and travel to
            destinations around the world with comfort and confidence.
          </p>

          <Link
            to="/flights"
            className="bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-lg text-lg font-semibold transition"
          >
            Search Flights
          </Link>
        </section>

        {/* Features */}
        <section className="grid md:grid-cols-4 gap-6 px-10 pb-24">
          <div className="bg-slate-900/90 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">💰 Best Prices</h3>
            <p className="text-slate-400">
              Competitive fares for every journey.
            </p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">⚡ Fast Booking</h3>
            <p className="text-slate-400">Book flights in just a few clicks.</p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">🔒 Secure Payment</h3>
            <p className="text-slate-400">Safe and encrypted transactions.</p>
          </div>

          <div className="bg-slate-900/90 p-6 rounded-xl text-center">
            <h3 className="text-xl font-semibold mb-2">🌍 Global Routes</h3>
            <p className="text-slate-400">Travel to destinations worldwide.</p>
          </div>
        </section>

        {/* Popular Destinations */}
        <section className="px-10 pb-24">
          <h2 className="text-4xl font-bold text-center mb-10">
            Popular Destinations
          </h2>

          <div className="grid md:grid-cols-4 gap-6">
            <div className="bg-slate-900/90 p-8 rounded-xl text-center hover:bg-slate-800 transition">
              <h3 className="text-2xl font-bold">Delhi</h3>
            </div>

            <div className="bg-slate-900/90 p-8 rounded-xl text-center hover:bg-slate-800 transition">
              <h3 className="text-2xl font-bold">Mumbai</h3>
            </div>

            <div className="bg-slate-900/90 p-8 rounded-xl text-center hover:bg-slate-800 transition">
              <h3 className="text-2xl font-bold">Chennai</h3>
            </div>

            <div className="bg-slate-900/90 p-8 rounded-xl text-center hover:bg-slate-800 transition">
              <h3 className="text-2xl font-bold">Bangalore</h3>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-slate-700 py-6 text-center text-slate-300">
          © 2026 SkyJourney. All Rights Reserved.
        </footer>
      </div>
    </div>
  );
}

export default Home;
