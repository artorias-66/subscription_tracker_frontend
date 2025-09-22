import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import API from "../api/api";

function Subscriptions({ user }) {
  const [subscriptions, setSubscriptions] = useState([]);
  const [upcoming, setUpcoming] = useState([]);
  const [cancellingId, setCancellingId] = useState(null);
  const hasLoaded = useRef(false);
  const [loadingSubs, setLoadingSubs] = useState(false);
  const [loadingUpcoming, setLoadingUpcoming] = useState(false);
  const [form, setForm] = useState({
    name: "",
    price: "",
    currency: "USD",
    frequency: "monthly",
    category: "entertainment",
    paymentMethod: "Credit Card",
    startDate: new Date().toISOString().split("T")[0],
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (!user) return;
    if (hasLoaded.current) return; // prevent StrictMode double invoke in dev
    hasLoaded.current = true;
    fetchSubscriptions();
    fetchUpcomingRenewals();
  }, [user]);

  // -----------------------------
  // FETCH ALL USER SUBSCRIPTIONS
  // -----------------------------
  const fetchSubscriptions = async (retried = false) => {
    setLoadingSubs(true);
    try {
      const res = await API.get(`/subscriptions/user/${user._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscriptions(res.data?.data || []);
    } catch (err) {
      if (err.response?.status === 429 && !retried) {
        setTimeout(() => fetchSubscriptions(true), 800);
        return;
      }
      console.error("Fetch subscriptions failed:", err.response?.data || err.message);
    }
    finally {
      setLoadingSubs(false);
    }
  };

  // -----------------------------
  // FETCH UPCOMING RENEWALS
  // -----------------------------
  const fetchUpcomingRenewals = async (retried = false) => {
    setLoadingUpcoming(true);
    try {
      const res = await API.get("/subscriptions/upcoming-renewals", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUpcoming(res.data?.data || []);
    } catch (err) {
      if (err.response?.status === 429 && !retried) {
        setTimeout(() => fetchUpcomingRenewals(true), 800);
        return;
      }
      console.error("Fetch upcoming renewals failed:", err.response?.data || err.message);
    }
    finally {
      setLoadingUpcoming(false);
    }
  };

  // -----------------------------
  // ADD SUBSCRIPTION
  // -----------------------------
  const handleAdd = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/subscriptions", form, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const newSub = res.data?.data;
      if (newSub) {
        setSubscriptions([...subscriptions, newSub]);
      }
      setForm({
        name: "",
        price: "",
        currency: "USD",
        frequency: "monthly",
        category: "entertainment",
        paymentMethod: "Credit Card",
        startDate: new Date().toISOString().split("T")[0],
      });
      // Refresh upcoming renewals after adding
      fetchUpcomingRenewals();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to add subscription");
    }
  };

  // -----------------------------
  // CANCEL SUBSCRIPTION
  // -----------------------------
  const handleCancel = async (id) => {
    if (cancellingId === id) return; // prevent duplicate requests for same id
    setCancellingId(id);
    try {
      const res = await API.put(`/subscriptions/${id}/cancel`, {}, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedSub = res.data?.data;
      if (updatedSub) {
        setSubscriptions(subscriptions.map((s) => (s._id === id ? updatedSub : s)));
        fetchUpcomingRenewals();
      }
    } catch (err) {
      if (err.response?.status === 429) {
        alert("You are performing this action too quickly. Please wait a moment and try again.");
      } else if (err.response?.status === 400 && /already canceled/i.test(err.response?.data?.error || err.response?.data?.message || "")) {
        // If backend says it's already canceled, refresh lists to reflect latest state
        await fetchSubscriptions();
        await fetchUpcomingRenewals();
        alert("Subscription is already canceled.");
      } else {
        alert(err.response?.data?.message || "Failed to cancel subscription");
      }
    }
    finally {
      setCancellingId(null);
    }
  };

  // -----------------------------
  // DELETE SUBSCRIPTION
  // -----------------------------
  const handleDelete = async (id) => {
    try {
      await API.delete(`/subscriptions/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSubscriptions(subscriptions.filter((s) => s._id !== id));
      fetchUpcomingRenewals();
    } catch (err) {
      alert(err.response?.data?.message || "Failed to delete subscription");
    }
  };

  // -----------------------------
  // UPDATE SUBSCRIPTION
  // -----------------------------
  const handleUpdate = async (id, updatedData) => {
    try {
      const res = await API.put(`/subscriptions/${id}`, updatedData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const updatedSub = res.data?.data;
      if (updatedSub) {
        setSubscriptions(subscriptions.map((s) => (s._id === id ? updatedSub : s)));
        fetchUpcomingRenewals();
      }
    } catch (err) {
      alert(err.response?.data?.message || "Failed to update subscription");
    }
  };

  if (!user)
    return (
      <div className="mt-24 max-w-lg mx-auto px-4">
        <div className="rounded-2xl bg-white/90 backdrop-blur p-8 border border-gray-100 shadow-xl text-center">
          <div className="mx-auto mb-3 w-12 h-12 rounded-full bg-blue-50 grid place-items-center text-blue-600 text-xl">🔒</div>
          <h2 className="text-2xl font-extrabold mb-2 bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">Sign in required</h2>
          <p className="text-gray-600 mb-6">Please sign in to view and manage your subscriptions.</p>
          <div className="flex items-center justify-center gap-3">
            <Link to="/sign-in" className="px-5 py-2.5 rounded-lg text-white bg-gray-900 hover:bg-black transition font-medium">Sign In</Link>
            <Link to="/sign-up" className="px-5 py-2.5 rounded-lg text-white bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 transition font-medium">Create account</Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className="mt-8 mx-auto max-w-5xl px-4">
      <div className="mb-6 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-[1px] shadow-lg">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm p-6">
          <h2 className="text-3xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-blue-700 to-purple-700">Your Subscriptions</h2>
          <p className="text-sm text-gray-600 mt-1">Manage plans, cancel renewals, and see what’s coming up.</p>
        </div>
      </div>

      {/* ADD SUBSCRIPTION FORM */}
      <form
        onSubmit={handleAdd}
        className="bg-white/90 backdrop-blur-sm p-5 rounded-xl shadow-lg mb-8 grid gap-4 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 border border-gray-100"
      >
        {["name", "price", "currency", "frequency", "category", "paymentMethod", "startDate"].map(
          (field) => (
            <input
              key={field}
              type={field === "price" ? "number" : field === "startDate" ? "date" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              className="p-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition shadow-sm"
              value={form[field]}
              onChange={(e) => setForm({ ...form, [field]: e.target.value })}
              required
            />
          )
        )}
        <button
          type="submit"
          className="col-span-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2.5 rounded-lg hover:from-blue-700 hover:to-indigo-700 transition shadow-md"
        >
          Add Subscription
        </button>
      </form>

      {/* LIST OF SUBSCRIPTIONS */}
      <div className="grid gap-4">
        {loadingSubs && (
          <div className="animate-pulse grid gap-4">
            {[...Array(3)].map((_, idx) => (
              <div key={idx} className="h-24 bg-gray-100 rounded-xl" />
            ))}
          </div>
        )}
        {!loadingSubs && subscriptions.length === 0 && (
          <div className="text-center py-12 bg-white/90 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-700 font-medium">No subscriptions yet</p>
            <p className="text-gray-500 text-sm">Add your first plan to get started.</p>
          </div>
        )}
        {!loadingSubs && subscriptions.map((sub) => (
          <div
            key={sub._id || `${sub.name}-${sub.startDate}`}
            className="p-5 bg-white/95 shadow-lg rounded-xl flex justify-between items-center border border-gray-100 hover:shadow-xl transition"
          >
            <div>
              <div className="flex items-center gap-3">
                <h3 className="font-bold text-xl text-gray-900">{sub.name}</h3>
                <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${sub.status === "active" ? "bg-green-100 text-green-700" : "bg-red-100 text-red-700"}`}>
                  {sub.status?.toUpperCase()}
                </span>
              </div>
              <p className="text-gray-600 mt-1">
                <span className="font-medium text-gray-900">{sub.price} {sub.currency}</span> / {sub.frequency}
              </p>
              {sub.nextRenewalDate && (
                <p className="text-sm text-gray-500">Next renewal: {new Date(sub.nextRenewalDate).toLocaleDateString()}</p>
              )}
            </div>
            <div className="flex gap-2">
              {sub.status === "active" && (
                <button
                  onClick={() => handleCancel(sub._id)}
                  disabled={cancellingId === sub._id}
                  className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-red-500 hover:bg-red-600 disabled:opacity-60 disabled:cursor-not-allowed shadow-sm"
                >
                  {cancellingId === sub._id ? "Cancelling..." : "Cancel"}
                </button>
              )}
              <button
                onClick={() => handleDelete(sub._id)}
                className="px-3 py-2 rounded-lg text-sm font-medium text-white bg-gray-600 hover:bg-gray-700 shadow-sm"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* UPCOMING RENEWALS */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-2xl font-bold">Upcoming Renewals</h2>
          {loadingUpcoming && <span className="text-sm text-gray-500">Loading…</span>}
        </div>
        {(!loadingUpcoming && upcoming.length === 0) ? (
          <div className="text-center py-8 bg-white/90 rounded-xl border border-dashed border-gray-300">
            <p className="text-gray-600">No renewals in the next 7 days.</p>
          </div>
        ) : (
          <ul className="divide-y divide-gray-100 bg-white/95 rounded-xl border border-gray-100 shadow-sm">
            {upcoming.map((sub) => (
              <li key={sub._id || `${sub.name}-${sub.nextRenewalDate || sub.startDate}`} className="p-4 flex items-center justify-between">
                <div>
                  <p className="font-semibold text-gray-900">{sub.name}</p>
                  <p className="text-sm text-gray-600">{sub.price} {sub.currency} / {sub.frequency}</p>
                </div>
                <span className="text-sm px-2.5 py-1 rounded-full bg-blue-50 text-blue-700 border border-blue-100">{sub.nextRenewalDate ? new Date(sub.nextRenewalDate).toLocaleDateString() : "N/A"}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}

export default Subscriptions;