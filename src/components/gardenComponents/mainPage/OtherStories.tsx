import { useEffect, useState } from "react";

import styles from "./OtherStories.module.css";

export function OtherStories() {
  const [stories, setStories] = useState<string[]>([]);
  const [idVal, setIdVal] = useState<string | undefined>(undefined);
  const [ticker, setTicker] = useState(false);

  useEffect(() => {
    if (getCookie("id") !== idVal) {
      setIdVal(getCookie("id") ?? "");
      fetch("http://213.171.10.23:8000/api/get_stories?q=5")
        .then((res) => {
          return res.json();
        })
        .then((json: { textsForClient: string[] }) => {
          setStories(json.textsForClient);
        });
    }

    const timer = setTimeout(() => {
      setTicker((p) => !p);
    }, 1000);

    return () => clearTimeout(timer);
  }, [ticker]);

  return (
    <div className={styles.OtherStories}>
      <div className={styles.Story}>{stories[0] ?? "Loading..."}</div>
      <div className={styles.Story}>{stories[1] ?? "Loading..."}</div>
      <div className={styles.Story}>{stories[2] ?? "Loading..."}</div>
      <div className={styles.Story}>{stories[3] ?? "Loading..."}</div>
      <div className={styles.Story}>{stories[4] ?? "Loading..."}</div>
    </div>
  );
}

function getCookie(name: string) {
  const cDecoded = decodeURIComponent(document.cookie);
  const cArray = cDecoded.split("; ");

  for (let i = 0; i < cArray.length; i++) {
    const cName = cArray[i].split("=")[0];
    if (cName === name) {
      return cArray[i].split("=")[1];
    }
  }

  return undefined;
}
