import { lazy, Suspense } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import Layout from "./components/layout/Layout.jsx";
import ProtectedRoute from "./routes/ProtectedRoute.jsx";

const Home       = lazy(() => import("./pages/Home/index.jsx"));
const Filmes     = lazy(() => import("./pages/Filmes/index.jsx"));
const Filme      = lazy(() => import("./pages/Filme/index.jsx"));
const Diretores  = lazy(() => import("./pages/Diretores/index.jsx"));
const Diretor    = lazy(() => import("./pages/Diretor/index.jsx"));
const Busca      = lazy(() => import("./pages/Busca/index.jsx"));
const Login      = lazy(() => import("./pages/Login/index.jsx"));
const Cadastro   = lazy(() => import("./pages/Cadastro/index.jsx"));
const Favoritos  = lazy(() => import("./pages/Favoritos/index.jsx"));
const Perfil     = lazy(() => import("./pages/Perfil/index.jsx"));
const NotFound   = lazy(() => import("./pages/NotFound/index.jsx"));

function Loader() {
  return (
    <div style={{ display:"flex", alignItems:"center", justifyContent:"center", minHeight:"60vh" }}>
      <div className="spinner" />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Layout>
          <Suspense fallback={<Loader />}>
            <Routes>
              <Route path="/"             element={<Home />} />
              <Route path="/filmes"       element={<Filmes />} />
              <Route path="/filmes/:id"   element={<Filme />} />
              <Route path="/diretores"    element={<Diretores />} />
              <Route path="/diretores/:id" element={<Diretor />} />
              <Route path="/busca"        element={<Busca />} />
              <Route path="/login"        element={<Login />} />
              <Route path="/cadastro"     element={<Cadastro />} />
              <Route
                path="/favoritos"
                element={<ProtectedRoute><Favoritos /></ProtectedRoute>}
              />
              <Route
                path="/perfil"
                element={<ProtectedRoute><Perfil /></ProtectedRoute>}
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Layout>
      </AuthProvider>
    </BrowserRouter>
  );
}
