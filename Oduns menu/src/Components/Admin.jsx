import { useState, useEffect } from "react";
import { collection, addDoc, getDocs, deleteDoc, updateDoc, doc } from "firebase/firestore";
import { db } from "../firebase";
import MenuCard from "./MenuCard";

const Admin = () => {
  const [menu, setMenu] = useState([]);
  const [editingItem, setEditingItem] = useState(null);

  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");
  const [formCategory, setFormCategory] = useState("food");

  const fetchMenu = async () => {
    const snapshot = await getDocs(collection(db, "menu"));
    const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setMenu(items);
  };

  useEffect(() => { fetchMenu(); }, []);

  const addItem = async (e) => {
    e.preventDefault();
    await addDoc(collection(db, "menu"), {
      name, price: Number(price), category: formCategory, image
    });
    setName(""); setPrice(""); setImage(""); setFormCategory("food");
    fetchMenu();
  };

  const deleteItem = async (id) => {
    if (!window.confirm("Delete this item?")) return;
    await deleteDoc(doc(db, "menu", id));
    fetchMenu();
  };

  const updateItem = async (e) => {
    e.preventDefault();
    await updateDoc(doc(db, "menu", editingItem.id), {
      name: editingItem.name,
      price: Number(editingItem.price),
      category: editingItem.category,
      image: editingItem.image
    });
    setEditingItem(null);
    fetchMenu();
  };

  return (
    <section className="admin-page">
      {!editingItem && (
        <form className="admin-form" onSubmit={addItem}>
          <h2>Add Menu Item</h2>
          <input placeholder="Name" value={name} onChange={e => setName(e.target.value)} required />
          <input type="number" placeholder="Price" value={price} onChange={e => setPrice(e.target.value)} required />
          <select value={formCategory} onChange={e => setFormCategory(e.target.value)}>
            <option value="food">Food</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
          <input placeholder="Image URL" value={image} onChange={e => setImage(e.target.value)} required />
          <button>Add Item</button>
        </form>
      )}

      {editingItem && (
        <form className="admin-form" onSubmit={updateItem}>
          <h2>Edit Item</h2>
          <input value={editingItem.name} onChange={e => setEditingItem({...editingItem, name: e.target.value})} />
          <input type="number" value={editingItem.price} onChange={e => setEditingItem({...editingItem, price: e.target.value})} />
          <select value={editingItem.category} onChange={e => setEditingItem({...editingItem, category: e.target.value})}>
            <option value="food">Food</option>
            <option value="snacks">Snacks</option>
            <option value="drinks">Drinks</option>
          </select>
          <input value={editingItem.image} onChange={e => setEditingItem({...editingItem, image: e.target.value})} />
          <button>Update</button>
          <button type="button" className="cancel" onClick={() => setEditingItem(null)}>Cancel</button>
        </form>
      )}

      <div className="menu-grid">
        {menu.map(item => (
          <MenuCard key={item.id} item={item} isAdmin={true} onEdit={setEditingItem} onDelete={deleteItem} />
        ))}
      </div>
    </section>
  );
};

export default Admin;
