import { Plus } from "lucide-react";
import "./App.css";
import { useEffect, useRef, useState } from "react";
import anime from "animejs/lib/anime.es.js";

function App() {
  const [active, setActive] = useState("idle");
  const animationTl = useRef(null);

  const handleClick = () => {
    // active ? animationTl.current.play() : animationTl.current.pause();
    setActive(
      active === "idle"
        ? "active"
        : active === "inactive"
        ? "active"
        : active === "active"
        ? "inactive"
        : "idle"
    );
  };

  useEffect(() => {
    if (active === "active") {
      animationTl.current = anime
        .timeline({})
        .add({
          targets: ".add_btn",
          translateY: [0, -12, 0],
          scale: [1, 0.85, 1],
          rotate: 316,
          duration: 600,
          easing: "easeInOutSine",
        })
        .add(
          {
            targets: ".note-selectors .first",
            translateY: [0, 80],
            duration: 3200,
            scaleY: [1.8, 1],
          },
          "-=400"
        )
        .add(
          {
            targets: ".note-selectors .other",
            translateY: function (el) {
              return [el.getAttribute("data-from"), el.getAttribute("data-to")];
            },
            scaleY: [0, 1],
            duration: 1600,
            opacity: {
              value: 1,
              duration: 10,
            },
            delay: anime.stagger(240),
            complete: function () {},
          },
          "-=2600"
        );
    } else if (active === "inactive") {
      animationTl.current = anime
        .timeline({})
        ?.add({
          targets: ".add_btn",
          rotate: 0,
          duration: 600,
          easing: "easeInOutSine",
        })
        .add(
          {
            targets: ".note-selectors .selector",
            translateY: function (el) {
              return [el.getAttribute("data-to"), 0];
            },
            duration: 400,
            delay: anime.stagger(60),
            easing: "easeInOutSine",
            complete: function () {
              setActive("idle");
            },
          },
          "-=400"
        );
    }
  }, [active]);
  // console.log(animationTl);
  return (
    <main>
      <div>
        <div className="notes_selectors_container">
          <button id="add_btn" className="add_btn" onClick={handleClick}>
            <Plus color="white" size={30} />
          </button>
          <div className="note-selectors">
            <div className="selector first" data-from="0" data-to="80"></div>
            <div
              className="selector second other"
              data-from="100"
              data-to="140"
            ></div>
            <div
              className="selector third other"
              data-from="160"
              data-to="200"
            ></div>
            <div
              className="selector fourth other"
              data-from="220"
              data-to="260"
            ></div>
            <div
              className="selector fifth other"
              data-from="280"
              data-to="320"
            ></div>
          </div>
        </div>
        <svg
          style={{ display: "none" }}
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
        >
          <defs>
            <filter id="gooey-effect">
              <feGaussianBlur
                in="SourceGraphic"
                stdDeviation="10"
                result="blur"
              />
              <feColorMatrix
                in="blur"
                mode="matrix"
                values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 20 -9"
                result="gooey-effect"
              />
              <feComposite
                in="SourceGraphic"
                in2="gooey-effect"
                operator="atop"
              />
            </filter>
          </defs>
        </svg>
      </div>

      <div className="content"></div>
    </main>
  );
}

export default App;
