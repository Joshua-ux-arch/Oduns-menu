const MenuCard = ({ item, isAdmin, onEdit, onDelete }) => {
  return (
    <div className="menu-card">
      <img src={item.image} alt={item.name} />
      <h3>{item.name}</h3>
      <p className="price">₦{item.price}</p>

      {isAdmin && (
        <div className="admin-actions">
          <button className="edit" onClick={() => onEdit(item)}>Edit</button>
          <button className="delete" onClick={() => onDelete(item.id)}>Delete</button>
        </div>
      )}
    </div>
  );
};

export default MenuCard;
