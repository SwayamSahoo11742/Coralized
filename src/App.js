import CoralMap from "./coral";

function App() {
  return (
    <div className="relative h-screen"> {/* Set the parent to relative and full height */}
      <CoralMap />
      <div className="absolute top-4 left-4 z-50 bg-white bg-opacity-75 p-4 rounded-md shadow-lg"> {/* Overlay div with higher z-index */}
        <h1 className="text-lg font-bold z-50">Overlay Title</h1>
        <p>This is an overlay text!</p>
      </div>
    </div>
  );
}

export default App;
