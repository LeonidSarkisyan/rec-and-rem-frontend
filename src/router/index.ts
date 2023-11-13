import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";
import AllWorkspacesPage from "../pages/AllWorkspacesPage";
import WorkspacePage from "../pages/WorkspacePage";


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
    },
    {
        path: "/workspaces/:id",
        component: WorkspacePage
    }
]
