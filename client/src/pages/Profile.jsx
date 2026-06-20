import Navbar from "../components/Navbar";

function Profile() {
  const userName = localStorage.getItem("userName");
  const userEmail = localStorage.getItem("userEmail");

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-slate-950 text-white p-10">
        <div className="max-w-3xl mx-auto bg-slate-900 p-8 rounded-xl">
          <h1 className="text-4xl font-bold mb-8 text-blue-400">
            My Profile 👤
          </h1>

          <div className="space-y-6">
            <div>
              <h2 className="text-slate-400">Name</h2>
              <p className="text-2xl">{userName}</p>
            </div>

            <div>
              <h2 className="text-slate-400">Email</h2>
              <p className="text-2xl">{userEmail}</p>
            </div>

            <div>
              <h2 className="text-slate-400">Account Status</h2>
              <p className="text-green-400 text-xl">Active ✅</p>
            </div>

            <div>
              <h2 className="text-slate-400">Preferred Seat</h2>
              <p>Window Seat ✈️</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Profile;
