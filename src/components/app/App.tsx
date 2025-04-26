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
import { Image } from "../../types";

const App = () => {
  const [query, setQuery] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<unknown>(false);
  const [images, setImages] = useState<Image[]>([]);
  const [page, setPage] = useState<number>(1);
  const [modal, setModal] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [url, setUrl] = useState<string>("");
  const [alt, setAlt] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [isEmpty, setIsEmpty] = useState<boolean>(true);

  interface fetchDataInterface {
    total_pages: number;
    results: Image[];
  }

  useEffect(() => {
    if (query === "") {
      return;
    }
    const fetchData = async (): Promise<void> => {
      try {
        setLoading(true);
        setError(false);
        // setImages([]);
        const data: fetchDataInterface = await fetchImages(query, page);
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

  const onHandleSubmit = (newQuery: string): void => {
    setQuery(`${Date.now()}/${newQuery}`);
    setImages([]);
    setPage(1);
    setError(false);
    setIsEmpty(false);
    setIsVisible(false);
  };

  const onLoadMore = (): void => {
    setPage((prevPage) => prevPage + 1);
  };

  const openModal = (object: Image) => {
    setModal(true);
    setUrl(object.urls.regular);
    setAlt(object.alt_description);
    setDescription(object.description);
  };

  const closeModal = (): void => {
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
      {isVisible && !loading && <LoadMoreBtn onClick={onLoadMore} />}
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
