import { Outlet, Route, Routes } from "react-router"
import Body from "./components/Body"
import Header from "./components/Header"

function App() {

  const Layout = () => {
    return <>
    <Header />
    <main>
      <Outlet />
    </main>
    </>
  }

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Body />} />
      </Route>  
        <Route path="*" element={<h1>not found</h1>} />
    </Routes>
  )
}

export default App
