import { useEffect, useRef, useState } from "react";
import classNames from "classnames";
import eye1 from "./assets/eye1.png";
import eye2 from "./assets/eye2.png";
import eye3 from "./assets/eye3.png";
import eye4 from "./assets/eye4.png";

import styles from "./MovableEye.module.css";

const eyes = [eye1, eye2, eye3, eye4];

export function MovableEye({
  wentIn,
}: {
  wentIn: (ev: PointerEvent) => boolean;
}) {
  const [seed] = useState(Math.random());

  const [isDone, setIsDone] = useState(false);
  const [isMoving, setIsMoving] = useState(false);

  const [position, setPosition] = useState<{ x: number; y: number }>(() => {
    const winWidth =
      window.innerWidth ||
      document.documentElement.clientWidth ||
      document.body.clientWidth;
    const winHeight =
      window.innerHeight ||
      document.documentElement.clientHeight ||
      document.body.clientHeight;

    const result = {
      x: 50 + Math.abs(winWidth - 300) * Math.random(),
      y: 50 + Math.abs(winHeight - 300) * Math.random(),
    };
    console.log({
      result,
      screen: {
        winWidth,
        winHeight,
      },
    });
    return result;
  });
  const ref = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    const el = ref.current;

    el.style.top = position.y - el.offsetHeight / 2 + "px";
    el.style.left = position.x - el.offsetWidth / 2 + "px";
  }, [position]);

  useEffect(() => {
    if (!ref.current || isDone) return;
    const el = ref.current;

    function handlePointerMove(event: PointerEvent) {
      setPosition({
        y: event.clientY,
        x: event.clientX,
      });
    }

    function handlePointerUp(event: PointerEvent) {
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("pointerup", handlePointerUp);
      setIsDone(wentIn(event));
      setIsMoving(false);
    }

    function handlePointerDown() {
      window.addEventListener("pointermove", handlePointerMove);
      window.addEventListener("pointerup", handlePointerUp);
      setIsMoving(true);
    }

    el.addEventListener("pointerdown", handlePointerDown);

    return () => {
      el.removeEventListener("pointerdown", handlePointerDown);
      el.removeEventListener("pointerup", handlePointerUp);
    };
  }, [wentIn, isDone]);

  return (
    <img
      className={classNames(styles.MovableEye, {
        [styles.isDone]: isDone,
        [styles.isMoving]: isMoving,
      })}
      draggable="false"
      src={eyes[Math.floor(seed * 4)].src}
      alt=""
      ref={ref}
      style={{
        transform: `rotate(${seed * 2}turn)`,
      }}
    />
  );
}
