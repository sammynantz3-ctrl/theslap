import { Layout } from "@/components/Layout";
import ClipsPage from "@/pages/ClipsPage";
import HomePage from "@/pages/HomePage";
import PixPage from "@/pages/PixPage";
import ProfilePage from "@/pages/ProfilePage";
import ProfilesPage from "@/pages/ProfilesPage";
import {
  RouterProvider,
  createRootRoute,
  createRoute,
  createRouter,
} from "@tanstack/react-router";

const rootRoute = createRootRoute({ component: Layout });

const homeRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: HomePage,
});
const clipsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/clips",
  component: ClipsPage,
});
const pixRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pix",
  component: PixPage,
});
const profilesRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profiles",
  component: ProfilesPage,
});
const profileRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/profiles/$userId",
  component: ProfilePage,
});

const routeTree = rootRoute.addChildren([
  homeRoute,
  clipsRoute,
  pixRoute,
  profilesRoute,
  profileRoute,
]);

const router = createRouter({ routeTree });

declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}

export default function App() {
  return <RouterProvider router={router} />;
}
