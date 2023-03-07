import { useState } from "react";
import reactLogo from "./assets/react.svg";
import { Button } from "@mui/material";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import "./App.css";
import Layout from "./components/Layout";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Cart from "./pages/Cart";
import { Provider } from "react-redux";
import { store } from "./store";
import { createContext } from "react";
import Checkout from "./pages/Checkout";
import { AuthProvider } from "./firebase/Auth";

export const selectedCategoryContext = createContext();

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Layout />}>
      <Route index element={<Home />} />
      <Route path="/cart" element={<Cart />} />
      <Route path="/login" element={<Login />} />
      <Route path="/checkout" element={<Checkout />} />
    </Route>
  )
);
const App = () => {

  const [category, setCategory] = useState("All");

  return (
    <AuthProvider>
      <selectedCategoryContext.Provider value={[category, setCategory]}>
        <Provider store={store}>
          <RouterProvider router={router} />{" "}
        </Provider>
      </selectedCategoryContext.Provider>
    </AuthProvider>
  );
};

export default App;
