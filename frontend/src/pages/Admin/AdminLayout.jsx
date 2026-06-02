import { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "../../components/admin/Sidebar.jsx";

const SIDEBAR_W = 250;
const MOBILE_BP = 1024;

function useMobile() {
  const [isMobile, setIsMobile] = useState(() => window.innerWidth < MOBILE_BP);
  useEffect(() => {
    function onResize() {
      setIsMobile(window.innerWidth < MOBILE_BP);
    }
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, []);
  return isMobile;
}

export default function AdminLayout() {
  const isMobile = useMobile();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  function closeSidebar() {
    setSidebarOpen(false);
  }

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: "#141414",
        color: "#f0f0f0",
        fontFamily: '"Segoe UI", system-ui, sans-serif',
      }}
    >
      <Sidebar
        isMobile={isMobile}
        isOpen={sidebarOpen}
        onClose={closeSidebar}
      />

      {/* Overlay escuro no mobile quando sidebar aberta */}
      {isMobile && sidebarOpen && (
        <button
          type="button"
          aria-label="Fechar menu"
          onClick={closeSidebar}
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.6)",
            zIndex: 99,
            border: "none",
            cursor: "default",
            padding: 0,
          }}
        />
      )}

      <main
        style={{
          flex: 1,
          marginLeft: isMobile ? 0 : SIDEBAR_W,
          padding: 32,
          minHeight: "100vh",
          overflowY: "auto",
          transition: "margin-left 0.2s",
        }}
      >
        {/* Hamburger — visível apenas em mobile */}
        {isMobile && (
          <button
            onClick={() => setSidebarOpen((o) => !o)}
            aria-label="Abrir menu"
            style={{
              background: "none",
              border: "1px solid #333",
              borderRadius: 6,
              color: "#ccc",
              padding: "6px 10px",
              fontSize: "1.1rem",
              cursor: "pointer",
              marginBottom: 20,
              display: "block",
            }}
          ></button>
        )}

        <Outlet />
      </main>
    </div>
  );
}
