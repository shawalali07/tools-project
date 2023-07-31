import {
  BulbOutlined,
  DashboardOutlined,
  FundOutlined,
  MoneyCollectOutlined,
} from "@ant-design/icons";
import { browserRoutes } from "../routes/browserRoutes";
export const sidebarItems = [
  {
    id: 1,
    title: "Dashboard",
    path: browserRoutes.DASHBOARD,
    icon: <DashboardOutlined />,
  },
  {
    id: 2,
    title: "Cryptocurrencies",
    path: browserRoutes.DASHBOARD,
    icon: <FundOutlined />,
  },
  {
    id: 3,
    title: "Exchanges",
    path: browserRoutes.DASHBOARD,
    icon: <MoneyCollectOutlined />,
  },
  {
    id: 4,
    title: "News",
    path: browserRoutes.DASHBOARD,
    icon: <BulbOutlined />,
  },
];
