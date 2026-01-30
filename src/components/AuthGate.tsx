import { Navigate, Outlet } from "react-router-dom";

export default function AuthGate() {
  const userName = sessionStorage.getItem("nexus_user_name");

  // Se não existe usuário cadastrado na sessão, bloqueia acesso
  if (!userName) {
    return <Navigate to="/auth" replace />;
  }

  // Usuário existe → libera as rotas protegidas
  return <Outlet />;
}
