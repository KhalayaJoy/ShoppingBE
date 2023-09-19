import { Routes, Route } from "react-router-dom";
import './App.css';
import NavBar from './components/NavBar';
import { ShoppingCartProvider } from './context/ShoppingCartContext';
import { Store } from "./pages/Store";

function App() {
  return (
    <>
      <ShoppingCartProvider>
        <NavBar />
        <Routes>
          <Route path="/" element={<Store />} />
        </Routes>
      </ShoppingCartProvider>
    </>
  );
}

export default App;
