import { createRootRoute, Outlet } from "@tanstack/react-router";
import { Footer } from "../components/Footer";
import { Header } from "../components/Header";

export const Route = createRootRoute({
  component: () => (
    <div className="flex flex-col h-screen justify-between">
      <Header />
      <div className="flex-1">
        <Outlet />
      </div>
      <Footer />
    </div>
  ),
});
