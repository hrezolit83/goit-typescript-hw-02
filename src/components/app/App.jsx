import "./App.css";
import ImageGallery from "../image-gallery/ImageGallery";
import LoadMoreBtn from "../load-more-btn/LoadMoreBtn";
import SearchBar from "../search-bar/SearchBar";
import ImageModal from "../image-modal/ImageModal";
import ErrorMessage from "../error-message/ErrorMessage";
import Loader from "../loader/Loader";

import toast, { Toaster } from "react-hot-toast";
import { fetchImages } from "../../fetch-api";
import { useState, useEffect } from "react";

const App = () => {
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [modal, setModal] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [url, setUrl] = useState("");
  const [alt, setAlt] = useState("");
  const [description, setDescription] = useState("");
  const [isEmpty, setIsEmpty] = useState("");

  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetchData = async () => {
      try {
        setLoading(true);
        setError(false);
        // setImages([]);
        const data = await fetchImages(query, page);
        setImages((prevImages) => [...prevImages, ...data.results]);
        setIsVisible(page < data.total_pages);
        console.log(data);
      } catch (error) {
        setError(error);
        toast.error("Whoops, something went wrong! Please try update page...");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [query, page]);

  const onHandleSubmit = (newQuery) => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setError(false);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = () => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (object) => {
    setModal(true);
    setUrl(object.urls.regular);
    setAlt(object.alt_description);
    setDescription(object.description);
  };

  const closeModal = () => {
    setModal(false);
    setUrl("");
    setAlt("");
    setDescription("");
  };

  return (
    <>
      <SearchBar onSearch={onHandleSubmit} />
      {images.length > 0 && (
        <ImageGallery images={images} openModal={openModal} />
      )}
      {isVisible && !loading && (
        <LoadMoreBtn onClick={onLoadMore} loading={loading} />
      )}
      {loading && <Loader />}
      {!images.length && !isEmpty && <p>Let`s begin search...</p>}
      {error && <ErrorMessage />}
      <ImageModal
        url={url}
        alt={alt}
        description={description}
        modalIsOpen={modal}
        closeModal={closeModal}
      />
      <Toaster position="top-right" reverseOrder={false} />
    </>
  );
};

export default App;
