import { useState } from "react";
import BillingOrders from "./BillingOrders.jsx";
import ProductsServices from "./ProductsServices.jsx";
import UserManagement from "./UserManagement.jsx";

const ADMIN_NAV = [
  "Home",
  "Products & solutions",
  "User Management",
  "Billing and orders",
  "Reporting",
  "Support",
  "Settings",
];

export default function AccountApp() {
  const [page, setPage] = useState("products-and-solutions");
  const [initialUserId, setInitialUserId] = useState(null);

  const handleViewUser = (userId) => {
    setInitialUserId(userId);
    setPage("user-management");
  };

  if (page === "user-management") {
    return (
      <UserManagement
        onNavigate={setPage}
        initialUserId={initialUserId}
        onInitialUserConsumed={() => setInitialUserId(null)}
      />
    );
  }

  if (page === "billing-and-orders") {
    return <BillingOrders onNavigate={setPage} navItems={ADMIN_NAV} />;
  }

  return (
    <ProductsServices
      onNavigate={setPage}
      onViewUser={handleViewUser}
      navItems={ADMIN_NAV}
    />
  );
}
