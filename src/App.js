import React from "react";
import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom"; // Import necessary components
import { useSpring, animated } from "@react-spring/web";
import "./App.css";
import CoralMap from "./coral"; // Assume CoralMap component exists
import BubbleEffect from "./bubble";

function App() {
  const titleSpring = useSpring({
    opacity: 1,
    transform: "translateY(0px)",
    from: { opacity: 0, transform: "translateY(-20px)" },
    config: { duration: 800 },
  });

  const buttonSpring = useSpring({
    opacity: 1,
    transform: "scale(1)",
    from: { opacity: 0, transform: "scale(0.8)" },
    delay: 300,
    config: { duration: 500 },
  });

  return (
    <Router> {/* Wrap your app with Router */}
      <div className="app">
        <Routes> {/* Define your routes */}
          <Route
            path="/"
            element={
              <div className="landing-page">
                <div className="bubbles">
                  {Array.from({ length: 30 }).map((_, i) => (
                    <div
                      key={i}
                      className="bubble"
                      style={{
                        left: `${Math.random() * 100}vw`,
                        animationDelay: `${Math.random() * 5}s`,
                        animationDuration: `${3 + Math.random() * 5}s`,
                      }}
                    />
                  ))}
                </div>
                <animated.h1 style={titleSpring} className="title">
                  Coral Bleaching Awareness
                </animated.h1>
                <animated.p style={titleSpring} className="description">
                  Coral reefs are under threat due to rising sea temperatures and
                  increased UV radiation. Help us monitor and protect these vital
                  ecosystems.
                </animated.p>
                <animated.button
                  style={buttonSpring}
                  className="map-button"
                  onClick={() => window.location.href = "/map"} // Redirect to /map
                >
                  Map
                </animated.button>
                <div className="coral-reef" />
                <BubbleEffect />
              </div>
            }
          />
          <Route path="/map" element={<CoralMap />} /> {/* Define the route for CoralMap */}
        </Routes>

      </div>
    </Router>
  );
}

export default App;
