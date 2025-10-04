import { useRef, useState } from "react";
import "/src/styles.css";

function App() {
  const [boxLimits, setBoxLimits] = useState([]);

  const charactersImages = [
    { path: "/Waldo.png", name: "Waldo" },
    { path: "/Wizard.png", name: "Wizard" },
    { path: "/Wenda.png", name: "Wenda" },
    { path: "/Woof.png", name: "Woof" },
    { path: "/Odlaw.png", name: "Odlaw" },
  ];

  const charactersPositions = {
    Waldo: { x: 28, y: 35 },
    Wizard: { x: 96, y: 81 },
    Wenda: { x: 89, y: 67 },
    Woof: { x: 76, y: 76 },
    Odlaw: { x: 9, y: 67 },
  };

  const imageRef = useRef(null);
  const [clickBox, setBox] = useState(null);

  const handleClick = (e) => {
    const target = e.target;
    const rect = target.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const xPercent = (x / rect.width) * 100;
    const yPercent = (y / rect.height) * 100;

    const boxW = (60 / rect.width) * 100;
    const boxH = (60 / rect.height) * 100;

    placeBox(xPercent, yPercent, boxW, boxH);

    console.log(xPercent.toFixed(2), yPercent.toFixed(2));

    setBoxLimits({
      x: { min: xPercent - boxW / 2, max: xPercent + boxW / 2 },
      y: { min: yPercent - boxH / 2, max: yPercent + boxH / 2 },
    });
  };

  const placeBox = (x, y, w, h) => {
    if (clickBox) {
      setBox(null);
    } else {
      setBox({ x, y, w, h });
    }
  };

  const handleSelectCharacter = (e) => {
    const target = e.currentTarget;
    const characterName = target.dataset.name;

    const characterPosition = charactersPositions[characterName];

    if (
      characterPosition.x >= boxLimits.x.min &&
      characterPosition.x <= boxLimits.x.max &&
      characterPosition.y >= boxLimits.y.min &&
      characterPosition.y <= boxLimits.y.max
    ) {
      console.log(`¡Encontraste a ${characterName}!`);
    } else {
      console.log("Ahi no esta! intenta de nuevo");
    }
    setBox(null);
  };

  return (
    <div style={{ position: "relative", display: "inline-block" }}>
      <img
        ref={imageRef}
        src="/public/map1.webp"
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

          <ul
            className="character-box"
            style={{
              position: "absolute",
              top: `calc(${clickBox.y}% - ${clickBox.h / 2}%)`,
              left: `calc(${clickBox.x + 6}% - ${clickBox.w / 2}%)`,
            }}
          >
            {charactersImages.map((img, index) => (
              <li key={index}>
                <button data-name={img.name} onClick={handleSelectCharacter}>
                  <img src={img.path} alt={`Waldo ${index}`} />
                  <p>{img.name}</p>
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </div>
  );
}

export default App;
