import { Suspense } from "react";
import Header from "./Header.jsx";
import Footer from "./Footer.jsx";

function PageLoader() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "60vh",
      }}
    >
      <div className="spinner" />
    </div>
  );
}

export default function Layout({ children }) {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
      }}
    >
      <Header />
      <main
        style={{
          flex: 1,
          paddingTop: "var(--nav-height)",
        }}
      >
        <Suspense fallback={<PageLoader />}>
          {children}
        </Suspense>
      </main>
      <Footer />
    </div>
  );
}
