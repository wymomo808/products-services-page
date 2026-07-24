import { useState } from "react";
import BillingOrders from "./BillingOrders.jsx";
import ProductsServices from "./ProductsServices.jsx";
import UserManagement from "./UserManagement.jsx";

export default function AccountApp() {
  const [page, setPage] = useState("products-and-solutions");

  if (page === "user-management") {
    return <UserManagement onNavigate={setPage} />;
  }

  if (page === "billing-and-orders") {
    return <BillingOrders onNavigate={setPage} />;
  }

  return <ProductsServices onNavigate={setPage} />;
}
