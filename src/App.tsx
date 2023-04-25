import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";

// Redux
import type { RootState } from "./redux/store";
import { useSelector } from "react-redux";

// Components
import Header from "./components/header/Header";

// Pages
import Category from "./pages/category/Category";
import Product from "./pages/product/Product";
import NotFound from "./pages/notFound/NotFound";

// @mui
import { theme } from "./theme/theme";
import { ThemeProvider } from "@emotion/react";
import { Box } from "@mui/material";

// Styles
import { Container } from "./shared/style";
import Cart from "./pages/cart/Cart";

function App() {
  const darkMode = useSelector((state: RootState) => state.darkMode.value);

  const Layout = () => {
    return (
      <Container>
        <Header />
        <Outlet />
      </Container>
    );
  };

  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Navigate to='/all' />,
        },
        {
          path: "/:category",
          element: <Category />,
        },
        {
          path: "/:category/:productId",
          element: <Product />,
        },
        {
          path: "/cart",
          element: <Cart />,
        },
        {
          path: "*",
          element: <NotFound />,
        },
      ],
    },
  ]);

  return (
    <ThemeProvider theme={theme(darkMode)}>
      <Box className='App' bgcolor='background.default'>
        <RouterProvider router={router} />
      </Box>
    </ThemeProvider>
  );
}

export default App;
