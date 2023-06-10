import { useEffect, useRef, useState } from "react";
import styles from "./LoadableImage.module.scss";
import cn from "classnames";
import { useInView } from "react-intersection-observer";

// imgStyle !== undefined - кастомный стиль картинки приходящий из вне пропсами
// custom !== undefined - кастомный стиль контейнера приходящий из вне пропсами
// slider === true - стиль для работы с библиотекой слайдер

const LazyLoadImage = ({ src, alt, onClick, custom, imgStyle, slider }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.1,
  });

  useEffect(() => {
    if (inView) {
      setIsLoaded(true);
    }
  }, [inView]);

  useEffect(() => {
    if (imageRef.current?.complete) {
      imageRef.current.onload = () => {
        onLoad();
      };
    }
  }, [isLoaded]);

  function onLoad() {
    setIsVisible(true);
  }

  return (
    <div
      ref={ref}
      className={cn(styles.container, {
        [styles.containerLoaded]: isVisible,
        [custom]: custom,
        [styles.slider]: slider,
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          onClick={onClick}
          className={cn(styles.image, {
            [styles.imageLoaded]: isVisible,
            [imgStyle]: imgStyle,
          })}
          src={src}
          alt={alt}
          onLoad={onLoad}
        />
      )}
    </div>
  );
};

export default LazyLoadImage;
