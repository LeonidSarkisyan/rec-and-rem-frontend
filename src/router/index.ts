import AuthPage from "../pages/AuthPage";
import HomePage from "../pages/HomePage";


export const routes = [
    {
      path: '/',
      component: HomePage
    },
    {
        path: "/auth",
        component: AuthPage,
    }
]
