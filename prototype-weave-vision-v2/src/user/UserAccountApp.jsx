import { useState } from "react";
import ProductsServices from "./ProductsServices.jsx";

export default function UserAccountApp() {
  const [page, setPage] = useState("products-and-solutions");

  return <ProductsServices onNavigate={setPage} />;
}
