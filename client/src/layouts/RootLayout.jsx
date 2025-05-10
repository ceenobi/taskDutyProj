import { Outlet } from "react-router";
import Nav from "../components/Nav";

export default function RootLayout() {
  return (
    <div className="container mx-auto py-5 px-4">
      <Nav />
      <Outlet />
    </div>
  );
}
