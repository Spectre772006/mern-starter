import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function CustomerLayout() {
  return (
    <>
      <Navbar />
      <main className="px-6">
        <Outlet />
      </main>
    </>
  );
}
