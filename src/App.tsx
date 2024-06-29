import type { LoaderFunctionArgs } from "react-router-dom";
import {
  Form,
  Link,
  Outlet,
  RouterProvider,
  createBrowserRouter,
  redirect,
  useActionData,
  useFetcher,
  useLocation,
  useNavigation,
  useRouteLoaderData,
} from "react-router-dom";
import { Button } from "flowbite-react";
import { Heading } from "@components/typography/Heading";
import { Metrics } from "@components/domain/metrics";
import { Admin } from "@components/domain/admin";
import logo from "@assets/img/rootsid.png";
import { fakeAuthProvider } from "./auth";

const router = createBrowserRouter([
  {
    id: "root",
    path: "/",
    loader() {
      // Our root route always provides the user, if logged in
      return { user: fakeAuthProvider.username };
    },
    Component: Layout,
    children: [
      {
        index: true,
        Component: PublicPage,
      },
      {
        path: "login",
        action: loginAction,
        loader: loginLoader,
        Component: LoginPage,
      },
      {
        path: "protected",
        loader: protectedLoader,
        Component: ProtectedPage,
      },
    ],
  },
  {
    path: "/logout",
    async action() {
      // We signout in a "resource route" that we can hit from a fetcher.Form
      await fakeAuthProvider.signout();
      return redirect("/");
    },
  },
]);

export default function App() {
  return (
    <RouterProvider router={router} fallbackElement={<p>Initial Load...</p>} />
  );
}

function Layout() {
  return (
    <main className="p-4">
      <div className="grid md:grid-cols-5">
        <div className="grid col-start-2 col-end-5 gap-4">
          <div className="flex flex-row gap-x-2 items-center justify-center">
            <img className="h-16 w-16" src={logo} alt="RootsID Logo" />
            <Heading>RootsID Watcher</Heading>
          </div>
          <Admin />
          <Metrics />

          <div className="flex flex-row gap-x-2 items-center">
            <input
              placeholder="Enter AID prefix to query..."
              className="px-4 py-3 border-gray-200 border rounded-lg w-full"
            />
            <Button color="dark">Query</Button>
          </div>
          <textarea
            rows={12}
            cols={120}
            className="rounded-lg border-gray-200 border"
            disabled
            value={
              '{"v":"KERI10JSON000160_","t":"rot","d":"EBzdEaiAgJuhs7V6ERDkjPrRezUv1RgK8uvX8U6ilWUT","i":"ENXiaO-jdN1OZaJfnsOL6_maeHaVCFk0A7S2dljBf07M","s":"1","p":"ENXiaO-jdN1OZaJfnsOL6_maeHaVCFk0A7S2dljBf07M","kt":"1","k":["DAF7LUyZcqzRfQ142cziSXWmP9YAlNrca7Veyj57iurA"],"nt":"1","n":["ECcDnRv7YxEbSKDO-kk6yeR6n9U6FhPYNjaIx82uowrZ"],"bt":"2","br":[],"ba":[],"a":[]}-VBU-AABAACt-9JvEj1RvW-mFWGOSzXoEez1Z0HdlpDObSPrk0oS5X15uQZKcEXClxMdtktCO9hSKiTVXQd5KWcR5YQOS8EG-BACAADJ40dJJ2Uqas4soqgEjUXCOFx8W2EPicV-w97tMgsDZTqsEDpm90L8ClNayUja6hgObZwkjM8QJsS0hxjI65gGABDfTsK2DYtlnUa0DXqpR73DipT3RdlsrfS8p8fDK1wSmnzGkrKK5YIDhDK9AzLT6onSA7dcNWA3VV3Z8ZY_meYD-EAB0AAAAAAAAAAAAAAAAAAAAAAB1AAG2024-06-01T22c19c04d558705p00c00'
            }
          />
          <p>
            This example demonstrates a simple login flow with three pages: a
            public page, a protected page, and a login page. In order to see the
            protected page, you must first login. Pretty standard stuff.
          </p>

          <p>
            First, visit the public page. Then, visit the protected page. You're
            not yet logged in, so you are redirected to the login page. After
            you login, you are redirected back to the protected page.
          </p>

          <p>
            Notice the URL change each time. If you click the back button at
            this point, would you expect to go back to the login page? No!
            You're already logged in. Try it out, and you'll see you go back to
            the page you visited just *before* logging in, the public page.
          </p>

          <AuthStatus />

          <ul>
            <li>
              <Link to="/">Public Page</Link>
            </li>
            <li>
              <Link to="/protected">Protected Page</Link>
            </li>
          </ul>

          <Outlet />
        </div>
      </div>
    </main>
  );
}

function AuthStatus() {
  // Get our logged in user, if they exist, from the root route loader data
  let { user } = useRouteLoaderData("root") as { user: string | null };
  let fetcher = useFetcher();

  if (!user) {
    return <p>You are not logged in.</p>;
  }

  let isLoggingOut = fetcher.formData != null;

  return (
    <div>
      <p>Welcome {user}!</p>
      <fetcher.Form method="post" action="/logout">
        <button type="submit" disabled={isLoggingOut}>
          {isLoggingOut ? "Signing out..." : "Sign out"}
        </button>
      </fetcher.Form>
    </div>
  );
}

async function loginAction({ request }: LoaderFunctionArgs) {
  let formData = await request.formData();
  let username = formData.get("username") as string | null;

  // Validate our form inputs and return validation errors via useActionData()
  if (!username) {
    return {
      error: "You must provide a username to log in",
    };
  }

  // Sign in and redirect to the proper destination if successful.
  try {
    await fakeAuthProvider.signin(username);
  } catch (error) {
    // Unused as of now but this is how you would handle invalid
    // username/password combinations - just like validating the inputs
    // above
    return {
      error: "Invalid login attempt",
    };
  }

  let redirectTo = formData.get("redirectTo") as string | null;
  return redirect(redirectTo || "/");
}

async function loginLoader() {
  if (fakeAuthProvider.isAuthenticated) {
    return redirect("/");
  }
  return null;
}

function LoginPage() {
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  let from = params.get("from") || "/";

  let navigation = useNavigation();
  let isLoggingIn = navigation.formData?.get("username") != null;

  let actionData = useActionData() as { error: string } | undefined;

  return (
    <div>
      <p>You must log in to view the page at {from}</p>

      <Form method="post" replace>
        <input type="hidden" name="redirectTo" value={from} />
        <label>
          Username: <input name="username" />
        </label>{" "}
        <button type="submit" disabled={isLoggingIn}>
          {isLoggingIn ? "Logging in..." : "Login"}
        </button>
        {actionData && actionData.error ? (
          <p style={{ color: "red" }}>{actionData.error}</p>
        ) : null}
      </Form>
    </div>
  );
}

function PublicPage() {
  return <h3>Public</h3>;
}

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  if (!fakeAuthProvider.isAuthenticated) {
    const params = new URLSearchParams();
    params.set("from", new URL(request.url).pathname);
    return redirect("/login?" + params.toString());
  }
  return null;
}

function ProtectedPage() {
  return <h3>Protected</h3>;
}
