import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./global.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CategoryPage from "./pages/CategoryPage.tsx";
import StylesPage from "./pages/StylesPage.tsx";
import ProductsPage from "./pages/ProductsPage.tsx";
import AdminPage from "./pages/AdminPage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import AdminPersonalPage from "./pages/AdminPersonalPage.tsx";
import AdminProductsPage from "./pages/AdminProductsPage.tsx";
import AdminCategoriesPage from "./pages/AdminCategoriesPage.tsx";
import AdminStylesPage from "./pages/AdminStylesPage.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import AdminBannerPage from "./pages/AdminBannerPage.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <Router>
    <React.StrictMode>
      <Routes>
        <Route path="/categories/:categoryName" element={<CategoryPage />} />
        <Route path="/styles/:styleName" element={<StylesPage />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/adm" element={<AdminPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/adm/banner" element={<AdminBannerPage />} />
        <Route path="/adm/personal" element={<AdminPersonalPage />} />
        <Route path="/adm/products" element={<AdminProductsPage />} />
        <Route path="/adm/categories" element={<AdminCategoriesPage />} />
        <Route path="/adm/styles" element={<AdminStylesPage />} />
        <Route path="/*" element={<NotFoundPage />} />
        <Route path="/" element={<App />} />
      </Routes>
    </React.StrictMode>
  </Router>
);
