import { Outlet } from "react-router-dom";

export default function SellerLayout() {
  return (
    <div className="flex">
      <aside className="w-64 bg-gray-900 text-white p-4">
        <h2 className="text-xl font-bold">Seller Panel</h2>
        <ul className="mt-4 space-y-2">
          <li>Dashboard</li>
          <li>Products</li>
        </ul>
      </aside>

      <main className="flex-1 p-6">
        <Outlet />
      </main>
    </div>
  );
}
