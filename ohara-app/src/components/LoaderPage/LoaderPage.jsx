import styles from "./LoaderPage.module.scss";
import { useEffect, useState } from "react";
import cl from "classnames";

export const LoaderPage = ({ height }) => {
  const [loopNum, setLoopName] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const toRotate = ["...", "..", "."];
  const [text, setText] = useState("");
  const period = 500;
  const [delta, setDelta] = useState(300 - Math.random() * 100);

  useEffect(() => {
    let ticker = setInterval(() => {
      tick();
    }, delta);

    return () => {
      clearInterval(ticker);
    };
  }, [text]);

  const tick = () => {
    let i = loopNum % toRotate.length;
    let fullText = toRotate[i];
    let updateText = isDeleting
      ? fullText.substring(0, text.length - 1)
      : fullText.substring(0, text.length + 1);
    setText(updateText);
    if (isDeleting) {
      setDelta((prevDelta) => prevDelta / 2);
    }
    if (!isDeleting && updateText === fullText) {
      setIsDeleting(true);
      setDelta(period);
    } else if (isDeleting && updateText === "") {
      setIsDeleting(false);
      setLoopName(loopNum + 1);
      setDelta(500);
    }
  };
  return (
    <div
      className={cl(styles.loader, {
        [styles.loaderMin]: height,
      })}
    >
      <div className={styles.container}>
        <h1 className={styles.loading}>
          Загрузка <span>{text}</span>
        </h1>
      </div>
    </div>
  );
};
