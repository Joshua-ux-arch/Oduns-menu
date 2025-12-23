import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase";
import MenuCard from "./MenuCard";
import Header from "./Header";

const Menu = () => {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("all");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      const snapshot = await getDocs(collection(db, "menu"));
      const items = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setMenu(items);
    };
    fetchMenu();
  }, []);

  const filteredMenu = menu.filter(item => {
    const matchesCategory = category === "all" || item.category === category;
    const matchesSearch = item.name.toLowerCase().includes(search.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <>
      <Header />
      <section className="menu">
        <input
          className="search"
          placeholder="Search menu..."
          value={search}
          onChange={e => setSearch(e.target.value)}
        />

        <div className="menu-buttons">
          <button onClick={() => setCategory("all")}>All</button>
          <button onClick={() => setCategory("food")}>Food</button>
          <button onClick={() => setCategory("snacks")}>Snacks</button>
          <button onClick={() => setCategory("drinks")}>Drinks</button>
        </div>

        <div className="menu-grid">
          {filteredMenu.map(item => (
            <MenuCard key={item.id} item={item} isAdmin={false} />
          ))}
        </div>
      </section>
    </>
  );
};

export default Menu;
