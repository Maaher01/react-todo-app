import { useEffect, useState } from "react";
import Header from "./shared/Header/header";
import Footer from "./shared/Footer/footer";
import ItemList from "./components/Item List/ItemList";
import AddItem from "./components/Add Item/AddItem";
import SearchItem from "./components/Search Item/SearchItem";
import apiRequest from "./apiRequest";

function App() {
	//Base API URL
	const API_URL = "http://localhost:3000/items";

	const [items, setItems] = useState([]);
	const [newItem, setNewItem] = useState("");
	const [search, setSearch] = useState("");
	const [fetchError, setFetchError] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	//Get All Items
	useEffect(() => {
		const getAllItems = async () => {
			try {
				const res = await fetch(API_URL);

				if (!res.ok) {
					throw new Error("Did not receive expected data");
				}

				const listItems = await res.json();
				setItems(listItems);
				setFetchError(null);
			} catch (err) {
				setFetchError(err.message);
			} finally {
				setIsLoading(false);
			}
		};

		getAllItems();
	}, []);

	//Add New Item
	const addNewItem = async (name) => {
		const id = items.length ? items[items.length - 1].id + 1 : 1;
		const newItem = { id, checked: false, name };
		const listItems = [...items, newItem];
		setItems(listItems);

		const postUrl = API_URL;
		const postOptions = {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newItem),
		};

		const res = await apiRequest(postUrl, postOptions);
		if (res) {
			setFetchError(res);
		}
	};

	//Edit Item Check
	const handleCheck = async (id) => {
		const listItems = items.map((item) =>
			item.id === id ? { ...item, checked: !item.checked } : item
		);
		setItems(listItems);

		const selectedItem = listItems.filter((item) => item.id === id);

		const updateUrl = `${API_URL}/${id}`;
		const updateOptions = {
			method: "PATCH",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify({ checked: selectedItem[0].checked }),
		};

		const res = await apiRequest(updateUrl, updateOptions);
		if (res) {
			setFetchError(res);
		}
	};

	//Delete Item
	const handleDelete = async (id) => {
		const listItems = items.filter((item) => item.id !== id);
		setItems(listItems);

		const deleteUrl = `${API_URL}/${id}`;
		const deleteOptions = {
			method: "DELETE",
		};

		const res = await apiRequest(deleteUrl, deleteOptions);
		if (res) {
			setFetchError(res);
		}
	};

	const handleSubmit = (e) => {
		e.preventDefault();
		addNewItem(newItem);
		setNewItem("");
	};

	return (
		<>
			<Header title="Todo List" />
			<AddItem
				newItem={newItem}
				setNewItem={setNewItem}
				handleSubmit={handleSubmit}
			/>
			<SearchItem search={search} setSearch={setSearch} />
			<main>
				{isLoading && <p style={{ margin: "2rem" }}>Loading List...</p>}
				{fetchError && (
					<p style={{ color: "red", margin: "2rem" }}>
						{`Error: ${fetchError}`}
					</p>
				)}
				{!fetchError && !isLoading && (
					<ItemList
						items={items.filter((item) =>
							item.name.toLowerCase().includes(search.toLowerCase())
						)}
						handleCheck={handleCheck}
						handleDelete={handleDelete}
					/>
				)}
			</main>
			{/* <Footer /> */}
		</>
	);
}

export default App;
