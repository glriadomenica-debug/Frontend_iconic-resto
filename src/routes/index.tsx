import { useRoutes } from "react-router-dom";
import LoginRoutes from "../modules/Auth/route";
import adminRoutes from "../modules/Admin/route";
import categoryRoutes from "../modules/Categories/route";
import productRoutes from "../modules/Products/route";
import MenuRoutes from "../modules/CustomerSide/Menu/route";
import TransactionRoute from "../modules/Transaction/route";
import PaymentConfirmRoute from "../modules/CashierSide/PaymentConfirmation/route";

export default function AppRoutes() {
  return useRoutes([
    ...LoginRoutes,
    ...adminRoutes,
    ...categoryRoutes,
    ...productRoutes,
    ...MenuRoutes,
    ...TransactionRoute,
    ...PaymentConfirmRoute,
  ]);
}
