import TransactionList from "./pages/TransactionList";
import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";

const TransactionRoutes = [
  {
    path: "/transactions",
    element: <LayoutAdmin />,
    children: [
      {
        index: true,
        element: <TransactionList />,
      },
    ],
  },
];
export default TransactionRoutes;
