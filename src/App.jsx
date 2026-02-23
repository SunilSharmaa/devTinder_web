import { Outlet, Route, Routes } from "react-router";
import Body from "./components/Body";
import Header from "./components/Header";
import Signup from "./pages/Signup";
import Signin from "./pages/Signin";
import Footer from "./components/Footer";
import Request from "./pages/Request";
import EditProfile from "./pages/EditProfile";
import Connection from "./pages/Connection";
import Chat from "./components/Chat";
import { useEffect } from "react";
import { DEVTINDER_BASE_URL } from "./utils/constants";
import { useDispatch } from "react-redux";
import axios from "axios";
import { addUser } from "./redux/userSlice";

function App() {
  const dispatch = useDispatch();
  const Layout = () => {

    useEffect(()=> {
      const hydrateUser = async () => {
        try{
          const res = await axios.get(
            DEVTINDER_BASE_URL + "/profile/view", {
              withCredentials : true
            }
          );

          dispatch(addUser(res?.data?.data));

        } catch (err) {
          console.log(err);
        }
      }

      hydrateUser();
    },[])
    
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
        <Route path="/request" element={<Request />} />
        <Route path="/editProfile" element={<EditProfile />} />
        <Route path="/connection" element={<Connection />} />
        <Route path="/chat/:targetUserId" element={<Chat />} />
      </Route>
      <Route path="/signup" element={<Signup />} />
      <Route path="/signin" element={<Signin />} />
      <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  );
}

export default App;
