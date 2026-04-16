import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import NotificationContainer from "../components/ui/Notification";
import NotificationPreferences from "../components/ui/NotificationPreferences";

export default function Layout() {
  return (
    <div style={{ background: "#111", minHeight: "100vh", color: "white", display: "flex", flexDirection: "column" }}>
      <NotificationContainer />
      <NotificationPreferences />
      <Header />
      <main style={{ flex: 1 }}>
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

