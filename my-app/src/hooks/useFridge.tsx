import { useState,useEffect } from "react";
import axios from "axios";
import {
  parseExpiryDate,
  getExpiryStatus,
} from "../helpers/helpers";
import type { FridgeList } from "../helpers/helpers";
const BASE_URL = import.meta.env.VITE_API_BASE_URL;

export function useFridge(){

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
        BASE_URL
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
      `${BASE_URL}/${id}`
    );
    fetchItems();
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!title || !expiry) return;

    if (mode === "Create") {
      await axios.post(
        BASE_URL,
        { title, expiry }
      );
    }

    if (mode === "Edit" && editingId) {
      await axios.put(
        `${BASE_URL}/${editingId}`,
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

 return{
    items,
    mode,
    title,
    expiry,
    loading,
    showDeleteAlert,
    deleteId,
    setTitle,
    setExpiry,
    setShowDeleteAlert,
    setDeleteId,
    fetchItems,
    handleDelete,
    handleSubmit,
    handleEdit,
    resetToCreateMode
 }
}