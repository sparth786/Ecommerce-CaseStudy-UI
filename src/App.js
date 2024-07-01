import './App.css';
import React, { Suspense, lazy, memo } from 'react';
import { Routes, Route } from "react-router-dom";

const Home = lazy(() => import("./Components/Home.js"));
const Header = lazy(() => import("./Components/Header.js"));
const Footer = lazy(() => import("./Components/Footer.js"));
const Drawer = lazy(() => import("./Components/Drawer.js"));
const PageNotFound = lazy(() => import("./Components/PageNotFound.js"));

const MemoizedHeader = memo(Header); 
const MemoizedFooter = memo(Footer);

function App() {

  // const location = useLocation();
  // const isValidPath = ["/"].includes(location.pathname);

  return (
    <React.Fragment>
      <MemoizedHeader />
      <Suspense fallback={
        <div style={{ marginTop: "500px", textAlign: "center", fontSize: "25px" }}>
          Loading...
        </div>}>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart" element={<Drawer />} />
          <Route path="*" element={<PageNotFound />} />
        </Routes>
        <MemoizedFooter />
      </Suspense>
    </React.Fragment>
  );
}

export default App;
