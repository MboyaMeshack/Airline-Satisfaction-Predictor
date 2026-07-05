import { Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import Dashboard from "./pages/Dashboard.jsx";
import Prediction from "./pages/Prediction.jsx";
import FeatureImportance from "./pages/FeatureImportance.jsx";
import ModelComparison from "./pages/ModelComparison.jsx";
import About from "./pages/About.jsx";

export default function App() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route path="/" element={<Dashboard />} />
        <Route path="/prediction" element={<Prediction />} />
        <Route path="/feature-importance" element={<FeatureImportance />} />
        <Route path="/model-comparison" element={<ModelComparison />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </AnimatePresence>
  );
}
