import styles from "./JarArea.module.css";

import JarImg from "../../../assets/jar.png";
import ThrowImg from "../../../assets/throw.png";
import MeImg from "../../../assets/me.png";

import { MovableEye } from "./MovableEye";
import { useCallback, useEffect, useRef, useState } from "react";

export function JarArea() {
  const jarRef = useRef<HTMLDivElement>(null);
  const [victoryCondition, setVictoryCondition] = useState(
    Array(8).fill(false)
  );

  const checkIfInJarForEye = useCallback(
    (val: number) => (event: PointerEvent) => {
      if (!jarRef.current) return false;
      if (victoryCondition[val]) return true;

      const el = jarRef.current;

      const rect = el.getBoundingClientRect();

      const result =
        rect.left + 10 < event.clientX &&
        event.clientX < rect.right - 10 &&
        rect.top + 10 < event.clientY &&
        event.clientY < rect.bottom - 10;

      setVictoryCondition((prev) => {
        const newArr = [...prev];
        newArr[val] = result;
        return newArr;
      });
      return result;
    },
    [jarRef]
  );

  return (
    <div className={styles.JarArea}>
      <div className={styles.JarWrapper} ref={jarRef}>
        <img src={JarImg.src} className={styles.Jar} alt="" draggable="false" />
      </div>
      {[...Array(8).keys()].map((val) => {
        return (
          <MovableEye
            key={val}
            wentIn={useCallback(checkIfInJarForEye(val), [checkIfInJarForEye])}
          />
        );
      })}
      {victoryCondition.filter((el) => !el).length === 0 ? (
        <div className={styles.VictoryMessage}>
          <img src={ThrowImg.src} alt="Throw" draggable="false" />
          <img src={MeImg.src} alt="Me" draggable="false" />
        </div>
      ) : null}
    </div>
  );
}
