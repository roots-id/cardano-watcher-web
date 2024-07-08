import { useState, useEffect } from "react";
import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useNavigate,
  useLocation,
  useRouteError,
} from "react-router-dom";
import { createClient } from "signify-polaris-web";
import { Heading } from "@components/typography/Heading";
import { Home } from "@pages/home";
import { Admin, LoginPopover, CredPopover } from "@pages/admin";

import logo from "@assets/img/rootsid.png";
import { authProvider } from "./auth";

function ErrorBoundary() {
  const error = useRouteError();
  // Uncaught ReferenceError: path is not defined
  return <div>{error.data}</div>;
}

const signifyClient = createClient();

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the aid, if logged in
      return { aid: authProvider.aid };
    },
    Component: Main,
    errorElement: <ErrorBoundary />,

    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: "admin",
        loader: protectedLoader,
        Component: Admin,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await authProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

function Main() {
  const location = useLocation();
  const navigate = useNavigate();
  const [installedExt, setInstalledExt] = useState("");
  const params = new URLSearchParams(location.search);
  const from = params.get("from");
  const [isLoadingAuth, setLoadingAuth] = useState(false);

  useEffect(() => {
    signifyClient.isExtensionInstalled().then((extId) => {
      if (!extId) return console.log("Extension not installed");

      setInstalledExt(extId);
    });
  });
  const requestCredential = async () => {
    setLoadingAuth(true);
    const resp = await signifyClient.authorizeAid();
    await authProvider.signin(resp?.identifier?.prefix);
    setLoadingAuth(false);
    navigate(from ?? "/");
  };

  return (
    <main className="p-4">
      <div className="grid md:grid-cols-5">
        <div className="grid col-start-2 col-end-5 gap-4">
          <div className="flex flex-row items-center justify-between">
            <div />
            <div className="flex flex-row gap-x-2 items-center">
              <img className="h-16 w-16" src={logo} alt="RootsID Logo" />
              <Heading>RootsID Watcher</Heading>
            </div>
            {authProvider.isAuthenticated ? (
              <div className="flex flex-row gap-x-4">
                <Link
                  className=" hover:text-green-700 text-xs content-center font-bold"
                  to="/admin"
                >
                  Admin
                </Link>
                <CredPopover initialOpen prefix={authProvider?.aid} />
              </div>
            ) : (
              <LoginPopover
                initialOpen={Boolean(from)}
                installedExt={installedExt}
                requestCredential={requestCredential}
                isLoading={isLoadingAuth}
              />
            )}
          </div>

          <Outlet />
        </div>
      </div>
    </main>
  );
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If an aid is not logged in and tries to access `/protected`, we redirect
  // them to `/` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!authProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/?" + params.toString());
  }
  return null;
}
