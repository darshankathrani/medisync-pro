import { useEffect } from "react";
import Navbar from "./components/Navbar";
import "./App.css";

function App() {
  useEffect(() => {
    fetch("https://medisync-pro.onrender.com")
      .then(() => console.log("Backend awake"))
      .catch(() => console.log("Wake-up failed"));
  }, []);

  return (
    <>
      <Navbar />
    </>
  );
}

export default App;
