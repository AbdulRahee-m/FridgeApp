import { useEffect, useState } from "react";
import axios from "axios";
import { parseExpiryDate, getExpiryStatus } from "./helpers";
import type { FridgeList } from "./helpers";

function App() {
  const [items, setItems] = useState<FridgeList[]>([]);
  const [mode, setMode] = useState<"Create" | "Edit">("Create");
  const [editingId, setEditingId] = useState<string | null>(null);

  const [title, setTitle] = useState("");
  const [expiry, setExpiry] = useState("");

  useEffect(() => {
    fetchItems();
  }, []);

  async function fetchItems(): Promise<void> {
    try {
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
    }
  }

  async function handleDelete(id: string): Promise<void> {
    try {
      await axios.delete(
        `https://thefridge-api.karapincha.io/fridge/${id}`
      );
      await fetchItems();
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  }

  async function handleSubmit(e: React.FormEvent): Promise<void> {
    e.preventDefault();

    if (!title || !expiry) return;

    try {
      if (mode === "Create") {
        await axios.post("https://thefridge-api.karapincha.io/fridge", {
          title,
          expiry,
        });
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

      await fetchItems();
    } catch (error) {
      console.error("Error saving item:", error);
    }
  }

  function handleEdit(item: FridgeList): void {
    setTitle(item.title);
    setExpiry(item.expiry.toISOString().split("T")[0]);
    setEditingId(item._id);
    setMode("Edit");
  }

  return (
    <>
      <div>
        <h1>Good Morning, Jonny!</h1>
        <p>🌤 It's better to go shopping before this Friday</p>
      </div>

      <div>
        <form onSubmit={handleSubmit}>
          <div>
            <label>
              🍉 Item Name
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </label>
          </div>

          <div>
            <label>
              ⏰ Expiry Date
              <input
                type="date"
                value={expiry}
                onChange={(e) => setExpiry(e.target.value)}
              />
            </label>
          </div>

          <button type="submit">
            {mode === "Create" ? "Add To Fridge" : "Update Item"}
          </button>
        </form>
      </div>

      <div>
        <ul>
          {items.map((item) => (
            <li key={item._id} onClick={() => handleEdit(item)}>
              <strong>{item.title}</strong>
              <br />
              Expiry Date - {item.expiry.toLocaleDateString()}
              <br />
              {item.status}
              <br />
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleDelete(item._id);
                }}
              >
                delete
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
}

export default App;
