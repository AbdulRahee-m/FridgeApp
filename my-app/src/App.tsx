import { useEffect, useState } from "react";
import axios from "axios";
import {
  parseExpiryDate,
  getExpiryStatus,
  formatDateDMY,
} from "./helpers";
import type { FridgeList } from "./helpers";

function App() {
  const [items, setItems] = useState<FridgeList[]>([]);
  const [mode, setMode] = useState<"Create" | "Edit">("Create");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [showDeleteAlert, setShowDeleteAlert] = useState(false);
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems(): Promise<void> {
    try {
      setLoading(true);

      const response = await axios.get<any[]>(
        "https://thefridge-api.karapincha.io/fridge"
      );

      const parsedItems: FridgeList[] = response.data.map((item) => {
        const expiryDate = parseExpiryDate(item.expiry);

        return {
          _id: item._id,
          title: item.title,
          expiry: expiryDate,
          status: getExpiryStatus(expiryDate),
        };
      });

      setItems(parsedItems);
    } catch (error) {
      console.error("Error fetching items:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: string): Promise<void> {
    await axios.delete(
      `https://thefridge-api.karapincha.io/fridge/${id}`
    );
    fetchItems();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !expiry) return;

    if (mode === "Create") {
      await axios.post(
        "https://thefridge-api.karapincha.io/fridge",
        { title, expiry }
      );
    }

    if (mode === "Edit" && editingId) {
      await axios.put(
        `https://thefridge-api.karapincha.io/fridge/${editingId}`,
        { title, expiry }
      );
    }

    setTitle("");
    setExpiry("");
    setMode("Create");
    setEditingId(null);
    fetchItems();
  }

  function handleEdit(item: FridgeList) {
    setTitle(item.title);
    setExpiry(item.expiry.toISOString().split("T")[0]);
    setEditingId(item._id);
    setMode("Edit");
  }

  function resetToCreateMode() {
  setTitle("");
  setExpiry("");
  setMode("Create");
  setEditingId(null);
}


  return (
    <>
    <div className="min-h-screen bg-slate-50 px-6 py-10">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-semibold text-slate-900">
          Good Morning, Jonny!
        </h1>
        <p className="mt-2 text-sm text-slate-500">
          🌤 It&apos;s better to go shopping before this Friday
        </p>
      </div>

      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-sm border border-slate-200 p-6 mb-8">
        <form
          onSubmit={handleSubmit}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end"
        >
          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              🍉 Item Name
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-slate-600 mb-1">
              ⏰ Expiry Date
            </label>
            <input
              type="date"
              value={expiry}
              onChange={(e) => setExpiry(e.target.value)}
              className="w-full rounded-md border border-slate-300 px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-blue-600"
            />
          </div>

          <div className="flex gap-3">
          <button
            type="submit"
            className="h-10 rounded-md bg-blue-700 px-4 text-white text-sm font-semibold hover:bg-blue-800"
          >
            {mode === "Create" ? "ADD TO FRIDGE" : "UPDATE ITEM"}
          </button>

          {mode === "Edit" && (
            <button 
              type="button"
              onClick={resetToCreateMode}
              className="h-10 rounded-md border border-slate-300 px-4 text-sm text-slate-700 hover:bg-slate-100"
            >
              Cancel
            </button>
          )}
        </div>
        </form>

        <p className="mt-3 text-xs text-slate-400">
          ⚠️ We don’t want more than one piece of the same food in our fridge.
        </p>
      </div>

      <div className="max-w-4xl mx-auto flex justify-end text-xs text-slate-500 mb-2">
        Total items — {items.length.toString().padStart(2, "0")}
      </div>

      <ul className="max-w-4xl mx-auto space-y-3">
        {loading && (
          <li className="text-center text-sm text-slate-500 py-6">
            Loading items...
          </li>
        )}

        {!loading && items.length === 0 && (
          <li className="text-center text-sm text-slate-400 py-6">
            No items in the fridge
          </li>
        )}

        {!loading &&
          items.map((item) => (
            <li
              key={item._id}
              onClick={() => handleEdit(item)}
              className="flex items-center justify-between bg-white rounded-lg px-4 py-3 border border-slate-200 shadow-sm cursor-pointer hover:bg-slate-50"
            >
              <div>
                <p className="text-sm font-medium text-slate-900">
                  {item.title}
                </p>
                <p className="text-xs text-slate-500">
                  Expiry date — {formatDateDMY(item.expiry)}
                </p>
              </div>

              <div className="flex items-center gap-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-medium ${
                    item.status === "Expired"
                      ? "bg-red-100 text-red-700"
                      : item.status === "Expiring Soon"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-green-100 text-green-700"
                  }`}
                >
                  {item.status}
                </span>

                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteId(item._id);
                    setShowDeleteAlert(true);
                  }}
                  className="text-slate-400 hover:text-red-600"
                >
                  🗑
                </button>
              </div>
            </li>
          ))}
      </ul>

      {showDeleteAlert && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40">
          <div className="w-full max-w-sm rounded-xl bg-white p-6 shadow-lg">
            <h2 className="text-lg font-semibold text-slate-900">
              Delete item?
            </h2>

            <p className="mt-2 text-sm text-slate-600">
              Are you sure you want to remove this item from your fridge?
              This action cannot be undone.
            </p>

            <div className="mt-6 flex justify-end gap-3">
              <button
                onClick={() => {
                  setShowDeleteAlert(false);
                  setDeleteId(null);
                }}
                className="rounded-md border border-slate-300 px-4 py-2 text-sm text-slate-700 hover:bg-slate-100"
              >
                Cancel
              </button>

              <button
                onClick={async () => {
                  if (deleteId) await handleDelete(deleteId);
                  setShowDeleteAlert(false);
                  setDeleteId(null);
                }}
                className="rounded-md bg-red-600 px-4 py-2 text-sm font-semibold text-white hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
    </>
  );
}

export default App;
