import css from "./ImageCard.module.css";
import { AiFillLike } from "react-icons/ai";
import { Image } from "../../types";

interface ImageCardProps {
  image: Image;
  openModal: (obj: Image) => void;
}

const ImageCard: React.FC<ImageCardProps> = ({ image, openModal }) => {
  return (
    <div className={css.thumb} style={{ borderColor: image.color }}>
      <img
        className={css.img}
        src={image.urls.small}
        alt={image.alt_description}
        onClick={() => openModal(image)}
      />
      <p className={css.text}>
        <AiFillLike />
        {image.likes}
      </p>
    </div>
  );
};

export default ImageCard;
