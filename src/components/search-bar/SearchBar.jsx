import { useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";
// import toast, { Toaster } from "react-hot-toast";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const handleInput = (evt) => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt) => {
    evt.preventDefault();
    if (evt.target.elements.query.value.trim() === "") {
      toast.error("Please enter search!");
      setQuery("");
      return;
    }
    onSearch(query);
    setQuery(query);
  };

  return (
    <header className={css.header}>
      <form className={css.form} onSubmit={handleSubmit}>
        <input
          className={css.input}
          onChange={handleInput}
          value={query}
          type="text"
          name="query"
          autoFocus
          placeholder="Search images and photos"
          required
        />
        <button type="submit" className={css.btn} title="Search">
          <IoSearch />
        </button>
      </form>
    </header>
  );
};

export default SearchBar;
