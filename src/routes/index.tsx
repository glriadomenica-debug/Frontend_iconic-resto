import { useRoutes } from "react-router-dom";
import adminRoutes from "../modules/Admin/route";
import categoryRoutes from "../modules/Categories/route";
import productRoutes from "../modules/Products/route";
import MenuRoutes from "../modules/CustomerSide/Menu/route";
import TransactionRoute from "../modules/Transaction/route";

export default function AppRoutes() {
  return useRoutes([
    ...adminRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...MenuRoutes,
    ...TransactionRoute,
  ]);
}
