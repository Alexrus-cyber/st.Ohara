import { useEffect, useRef, useState } from "react";
import styles from "./LoadableImage.module.scss";
import cn from "classnames";
import { useInView } from "react-intersection-observer";

const LoadableImage = ({ src, alt, onClick }) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const imageRef = useRef(null);
  const { ref, inView } = useInView({
    threshold: 0.3,
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
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          ref={imageRef}
          onClick={onClick}
          className={cn(styles.image, {
            [styles.imageLoaded]: isVisible,
          })}
          src={src}
          alt={alt}
          onLoad={onLoad}
        />
      )}
    </div>
  );
};

export default LoadableImage;
