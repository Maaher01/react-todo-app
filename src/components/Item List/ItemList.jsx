import Items from "./Items/Items";

const ItemList = ({ items, handleCheck, handleDelete }) => {
	return (
		<>
			{items.length ? (
				<Items
					items={items}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
				/>
			) : (
				<p style={{ margin: "2rem" }}>The list is empty</p>
			)}
		</>
	);
};

export default ItemList;
