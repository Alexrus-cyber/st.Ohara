import { useEffect, useRef, useState } from "react";
import styles from "./LoadableImage.module.scss";
import cn from "classnames";
import useOnScreen from "../hoocks/useOnScreen";

const LoadableImage = (props) => {
  const { src, alt = "", onLoad = () => {} } = props;
  const [isLoaded, setIsLoaded] = useState(false);
  const imageRef = useRef();
  const containerRef = useRef();
  const isVisible = useOnScreen(containerRef);

  useEffect(() => {
    if (!isVisible || isLoaded) {
      return;
    }
    if (imageRef.current) {
      imageRef.current.onload = () => {
        setIsLoaded(true);
        onLoad();
      };
    }
  }, [isVisible, onLoad, isLoaded]);

  return (
    <div
      ref={containerRef}
      className={cn(styles.container, {
        [styles.containerLoaded]: isLoaded,
      })}
    >
      {(isVisible || isLoaded) && (
        <img
          {...props}
          ref={imageRef}
          className={cn(styles.image, {
            [styles.imageLoaded]: isLoaded,
          })}
          src={src}
          alt={alt}
        />
      )}
    </div>
  );
};

export default LoadableImage;
