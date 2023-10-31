import Item from "./Item/Item";
import "./Items.css";

const Items = ({ items, handleCheck, handleDelete }) => {
	return (
		<ul>
			{items.map((item) => (
				<Item
					item={item}
					key={item.id}
					handleCheck={handleCheck}
					handleDelete={handleDelete}
				/>
			))}
		</ul>
	);
};

export default Items;
