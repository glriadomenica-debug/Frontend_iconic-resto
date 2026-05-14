import Login from "./pages/login";
// import LayoutAdmin from "../../components/layouts/LayoutAdmin/layoutAdmin";

const LoginRoutes = [
  {
    path: "/",
    // element :<LayoutAdmin/>,
    children: [
      {
        index: true,
        element: <Login />,
      },
    ],
  },
];
export default LoginRoutes;
