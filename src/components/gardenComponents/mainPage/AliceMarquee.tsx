import Marquee from "react-fast-marquee";

export function AliceMarquee() {
  return (
    <Marquee
      style={{
        fontSize: "1.5rem",
        backgroundColor: "#1ABC00",
        height: "2.5rem",
        color: "white",
      }}
      autoFill={true}
    >
      ☆ Alice's worries ☆ Don't worry, read tales&nbsp;
    </Marquee>
  );
}
