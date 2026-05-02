import { Outlet } from "@tanstack/react-router";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";

export function Layout() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <NavBar />
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}
