import { Outlet, useLocation } from "react-router";
import { ToastContainer } from "react-toastify";
import Footer from "./components/Footer";
import Header from "./components/Header";
function App() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/sign-in" || location.pathname === "/sign-up";
  return (
    <div className="overflow-x-hidden">
      {!hideHeaderFooter && <Header />}
      <main className="min-h-screen bg-salte-100 main-content relative z-50">
        <Outlet />
        <ToastContainer limit={1} />
      </main>
      {!hideHeaderFooter && <Footer />}
    </div>
  );
}

export default App;
