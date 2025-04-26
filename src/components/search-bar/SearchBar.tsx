import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import css from "./SearchBar.module.css";
import { IoSearch } from "react-icons/io5";

interface SearchBarProps {
  onSearch: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearch }) => {
  const [query, setQuery] = useState<string>("");

  const handleInput = (evt: ChangeEvent<HTMLInputElement>): void => {
    setQuery(evt.target.value);
  };

  const handleSubmit = (evt: FormEvent<HTMLFormElement>): void => {
    evt.preventDefault();
    if (query.trim() === "") {
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
