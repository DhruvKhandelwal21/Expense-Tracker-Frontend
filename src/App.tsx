import { Navigate, Route, Routes } from "react-router-dom";
import PrivateRoutes from "./Components/PrivateRoute";
import Layout from "./Components/Layout";
import LandingPage from "./Pages/LandingPage";
import Home from "./Pages/Home";
import Expense from "./Pages/Expense";
import Income from "./Pages/Income";

const App = () => {
  return (
    <>
      <Routes>
        <Route
          element={
            <Layout>
              <PrivateRoutes />
            </Layout>
          }
        >
          <Route element={<Home />} path="/" />
          <Route element={<Expense />} path="/expense" />
          <Route element={<Income />} path="/income" />
        </Route>
        <Route element={<LandingPage />} path="/landingPage" />
      </Routes>
    </>
  );
};

export default App;
