import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import AllWorkspacesPage from "../pages/AllWorkspacesPage";


export const routes = [
    {
      path: '/',
      component: HomePage
    },
    {
        path: "/auth",
        component: AuthPage,
    },
    {
        path: "/workspaces",
        component: AllWorkspacesPage
    }
]
