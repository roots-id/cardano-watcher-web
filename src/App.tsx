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
import { Heading } from "@components/typography/Heading";
import { Home } from "@pages/home";
import { Admin, LoginPopover } from "@pages/admin";

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
    Component: Main,
    children: [
      {
        index: true,
        Component: Home,
      },
      // {
      //   path: "login",
      //   action: loginAction,
      //   loader: loginLoader,
      //   Component: LoginPage,
      // },
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

function Main() {
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
            <LoginPopover />
          </div>
         
          {/* <AuthStatus /> */}

          {/* <ul>
            <li>
              <Link to="/">Public Page</Link>
            </li>
            <li>
              <Link to="/admin">Protected Page</Link>
            </li>
          </ul> */}

          <Outlet />
        </div>
      </div>
    </main>
  );
}

// function AuthStatus() {
//   // Get our logged in user, if they exist, from the root route loader data
//   let { user } = useRouteLoaderData("root") as { user: string | null };
//   let fetcher = useFetcher();

//   if (!user) {
//     return <p>You are not logged in.</p>;
//   }

//   let isLoggingOut = fetcher.formData != null;

//   return (
//     <div>
//       <p>Welcome {user}!</p>
//       <fetcher.Form method="post" action="/logout">
//         <button type="submit" disabled={isLoggingOut}>
//           {isLoggingOut ? "Signing out..." : "Sign out"}
//         </button>
//       </fetcher.Form>
//     </div>
//   );
// }

// async function loginAction({ request }: LoaderFunctionArgs) {
//   let formData = await request.formData();
//   let username = formData.get("username") as string | null;

//   // Validate our form inputs and return validation errors via useActionData()
//   if (!username) {
//     return {
//       error: "You must provide a username to log in",
//     };
//   }

//   // Sign in and redirect to the proper destination if successful.
//   try {
//     await fakeAuthProvider.signin(username);
//   } catch (error) {
//     // Unused as of now but this is how you would handle invalid
//     // username/password combinations - just like validating the inputs
//     // above
//     return {
//       error: "Invalid login attempt",
//     };
//   }

//   let redirectTo = formData.get("redirectTo") as string | null;
//   return redirect(redirectTo || "/");
// }

// async function loginLoader() {
//   if (fakeAuthProvider.isAuthenticated) {
//     return redirect("/");
//   }
//   return null;
// }

// function LoginPage() {
//   let location = useLocation();
//   let params = new URLSearchParams(location.search);
//   let from = params.get("from") || "/";

//   let navigation = useNavigation();
//   let isLoggingIn = navigation.formData?.get("username") != null;

//   let actionData = useActionData() as { error: string } | undefined;

//   return (
//     <div>
//       <p>You must log in to view the page at {from}</p>

//       <Form method="post" replace>
//         <input type="hidden" name="redirectTo" value={from} />
//         <label>
//           Username: <input name="username" />
//         </label>{" "}
//         <button type="submit" disabled={isLoggingIn}>
//           {isLoggingIn ? "Logging in..." : "Login"}
//         </button>
//         {actionData && actionData.error ? (
//           <p style={{ color: "red" }}>{actionData.error}</p>
//         ) : null}
//       </Form>
//     </div>
//   );
// }

function protectedLoader({ request }: LoaderFunctionArgs) {
  // If the user is not logged in and tries to access `/protected`, we redirect
  // them to `/login` with a `from` parameter that allows login to redirect back
  // to this page upon successful authentication
  // if (!fakeAuthProvider.isAuthenticated) {
  //   const params = new URLSearchParams();
  //   params.set("from", new URL(request.url).pathname);
  //   return redirect("/?" + params.toString());
  // }
  return null;
}

