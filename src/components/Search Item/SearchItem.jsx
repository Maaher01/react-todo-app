import './SearchItem.css'

const SearchItem = ({ search, setSearch }) => {
	return (
		<form className="searchForm" onSubmit={(e) => e.preventDefault()}>
			<label htmlFor="search">Search</label>
			<input
				id="search"
				type="text"
				placeholder="Search Tasks"
				role="searchbox"
				value={search}
				onChange={(e) => setSearch(e.target.value)}
			/>
		</form>
	);
};

export default SearchItem;
