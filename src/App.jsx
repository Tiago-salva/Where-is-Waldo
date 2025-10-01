import { useEffect, useRef, useState } from "react";
import { createBrowserRouter } from "react-router-dom";
import "/src/styles.css";

// const router = createBrowserRouter([
//   {
//     path:"/",
//     element:
//   }
// ])

function App() {
  const waldoX = 28;
  const waldoY = 28;
  const imageRef = useRef(null);

  useEffect(() => {
    const image = imageRef.current;
    image.addEventListener("click", handleClick);
  }, []);

  const handleClick = (e) => {
    const target = e.target;

    const x = e.pageX - target.offsetLeft;
    const y = e.pageY - target.offsetTop;

    const xCoord = Math.floor((x / target.width) * 10000) / 100;
    const yCoord = Math.floor((y / target.height) * 10000) / 100;

    console.log(xCoord, yCoord);
  };

  return (
    <img
      ref={imageRef}
      src="/public/67c3c32bfa2b9791019b63f40f0bcccd.webp"
      className="image"
    ></img>
  );
}

export default App;
