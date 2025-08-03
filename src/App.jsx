import { Outlet, Route, Routes } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Footer from "./components/Footer";
import Connection from "./pages/Connection";
import EditProfile from "./pages/EditProfile";

function App() {
  const Layout = () => {
    return (
      <>
        <header>
          <Header />
        </header>
        <main>
          <Outlet />
        </main>
        <footer>
          <Footer />
        </footer>
      </>
    );
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Body />} />
        <Route path="/connections" element={<Connection />} />
        <Route path="/editProfile" element={<EditProfile />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

export default App;
