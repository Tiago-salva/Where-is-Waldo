import { useRef, useState } from "react";
import "/src/styles.css";

function App() {
  const waldoX = 28;
  const waldoY = 35;
  const imageRef = useRef(null);
  const [clickBox, setBox] = useState(null);

  const handleClick = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const boxW = (70 / rect.width) * 100;
    const boxH = (70 / rect.height) * 100;

    placeBox(xPercent, yPercent, boxW, boxH);

    console.log(xPercent.toFixed(2), yPercent.toFixed(2));

    const boxLimits = {
      x: { min: xPercent - boxW / 2, max: xPercent + boxW / 2 },
      y: { min: yPercent - boxH / 2, max: yPercent + boxH / 2 },
    };

    // Compare it to the db
    if (
      waldoX >= boxLimits.x.min &&
      waldoX <= boxLimits.x.max &&
      waldoY >= boxLimits.y.min &&
      waldoY <= boxLimits.y.max
    ) {
      console.log("You found Waldo");
    }
  };

  const placeBox = (x, y, w, h) => {
    if (clickBox) {
      setBox(null);
    } else {
      setBox({ x, y, w, h });
    }
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        ref={imageRef}
        src="/public/67c3c32bfa2b9791019b63f40f0bcccd.webp"
        className="image"
        onClick={handleClick}
      />
      {clickBox && (
        <>
          <div
            className="box"
            style={{
              position: "absolute",
              top: `calc(${clickBox.y}% - ${clickBox.h / 2}%)`,
              left: `calc(${clickBox.x}% - ${clickBox.w / 2}%)`,
              width: `${clickBox.w}%`,
              height: `${clickBox.h}%`,
              border: "2px solid red",
            }}
          ></div>

          <div
            className="character-box"
            style={{
              position: "absolute",
              top: `calc(${clickBox.y}% - ${clickBox.h / 2}%)`,
              left: `calc(${clickBox.x + 6}% - ${clickBox.w / 2}%)`,
            }}
          ></div>
        </>
      )}
    </div>
  );
}

export default App;
