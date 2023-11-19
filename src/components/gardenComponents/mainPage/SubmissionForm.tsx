import { useState } from "react";
import styles from "./SubmissionForm.module.css";

import SendImg from "./assets/Send.png";

export function SubmissionForm() {
  const [story, setStory] = useState("");

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    fetch("http://213.171.10.23:8000/api/add_story", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        storyText: story,
      }),
    })
      .then((res) => {
        return res.json();
      })
      .then((json: { storyId: number }) => {
        if (!json.storyId) return;
        document.cookie = `id=${json.storyId}; expires=Sun, 1 January 2024 12:00:00 UTC; path=/;`;
        setStory("");
      });
  }

  return (
    <form className={styles.Form} onSubmit={handleSubmit}>
      <div className={styles.Sticker}></div>
      <div className={styles.Sticker}></div>
      <textarea value={story} onChange={(e) => setStory(e.target.value)} />
      <button type="submit">
        <img src={SendImg.src} alt="Send to the hole" />
      </button>
    </form>
  );
}
