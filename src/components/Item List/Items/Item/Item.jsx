import './Item.css'
import { FaTrashAlt } from "react-icons/fa";

const Item = ({item, handleCheck, handleDelete}) => {
  return (
    <li className="item">
					<input
						type="checkbox"
						checked={item.checked}
						onChange={() => handleCheck(item.id)}
					/>
					<label
						style={item.checked ? { textDecoration: "line-through" } : null}
					>
						{item.name}
					</label>
					<FaTrashAlt
						onClick={() => handleDelete(item.id)}
						role="button"
						tabIndex="0"
                        aria-label={`Delete ${item}`}
					/>
				</li>
  )
}

export default Item