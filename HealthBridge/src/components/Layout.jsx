import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import "./Layout.css";

function Layout({ children }) {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div className="main-content">
        {children}
      </div>
    </>
  );
}

export default Layout;