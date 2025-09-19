import { Routes, Route } from "react-router-dom";
import { useContext, useEffect } from "react";
import { Context } from "./store/appContext";
import Navbar from "./components/Navbar";
import Home from "./views/Home";
import Details from "./views/Details";

export default function App() {
  const { actions } = useContext(Context);

  useEffect(() => {
    actions.loadPeople();
    actions.loadVehicles();
    actions.loadPlanets();
  }, []);

  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/details/:type/:id" element={<Details />} />
      </Routes>
    </>
  );
}
