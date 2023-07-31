import { browserRoutes } from "../routes/browserRoutes";
import Dashboard from "../pages/Dashboard";
import NotFound from "../components/notFound";

export const appRoutes = [
  {
    id: 1,
    path: browserRoutes.DASHBOARD,
    element: <Dashboard />,
  },
];
