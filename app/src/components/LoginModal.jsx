import { useEffect, useState } from "react";
import PropTypes from "prop-types";
import { auth } from "../services/Auth";

const LoginModal = ({ isOpen, onClose, onSwitchToRegister, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setLoginData({ email: "", password: "" });
      setErrorMsg("");
      setLoading(false);
    }
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return;
    const handleEsc = (e) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [isOpen, onClose]);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (loading) return;
    setErrorMsg("");

    const email = loginData.email.trim();
    const password = loginData.password;

    if (!email || !password) {
      setErrorMsg("Preencha email e senha.");
      return;
    }

    try {
      setLoading(true);

      // 1) chama /login -> espera { accessToken, expiresIn } (ou similar)
      const loginResp = await auth.login(email, password);
      console.log("loginResp:", loginResp);

      // tenta diferentes chaves de token
      const token = loginResp?.accessToken || loginResp?.token || loginResp?.access_token;
      if (!token) {
        console.error("Nenhum token recebido do loginResp:", loginResp);
        throw new Error("Token não recebido do servidor.");
      }

      // 2) salva token
      try {
        localStorage.setItem("token", token);
      } catch (err) {
        console.warn("Falha ao salvar token no localStorage:", err);
      }

      const user = await auth.getProfile(token);
      console.log("user fetched:", user);

      try {
        localStorage.setItem("user", JSON.stringify(user));
      } catch (err) {
        console.warn("Falha ao salvar user no localStorage:", err);
      }

      onLoginSuccess && onLoginSuccess(user);

      setLoginData({ email: "", password: "" });
      onClose();
    } catch (err) {
      console.error("Erro no login:", err);
      
      if (err.status === 401) {
        setErrorMsg(err.message || "Credenciais inválidas (401).");
      } else {
        setErrorMsg(err.message || "Erro no login. Tente novamente.");
      }
    } finally {
      setLoading(false);
    }
  };

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-orange-50"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label="Tela de login"
    >
      <div className="w-11/12 max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-orange-100 animate-fadeIn">
        <h2 className="text-center text-2xl font-light text-orange-600 mb-6 tracking-wide">
          Entrar na sua conta
        </h2>

        <form onSubmit={handleLogin} className="flex flex-col gap-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            required
            autoComplete="email"
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            required
            autoComplete="current-password"
            disabled={loading}
          />

          {errorMsg && (
            <p className="text-xs text-red-500 text-center mt-1" role="alert">
              {errorMsg}
            </p>
          )}

          <button
            type="submit"
            disabled={loading}
            className={`mt-2 py-2 rounded-lg text-sm font-light tracking-wide transition-colors ${
              loading ? "bg-orange-300 cursor-wait text-white" : "bg-orange-500 hover:bg-orange-600 text-white"
            }`}
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>

          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="py-2 text-gray-500 hover:text-orange-500 text-sm font-light transition-colors"
          >
            Cancelar
          </button>
        </form>

        <div className="mt-4 text-center">
          <button
            type="button"
            onClick={onSwitchToRegister}
            className="text-orange-500 hover:text-orange-600 text-sm font-light"
            disabled={loading}
          >
            Não tem conta? Criar uma agora
          </button>
        </div>
      </div>
    </div>
  );
};

// animação de fade-in (injetado)
const styles = `
@keyframes fadeIn {
  from { opacity: 0; transform: translateY(8px); }
  to { opacity: 1; transform: translateY(0); }
}
.animate-fadeIn {
  animation: fadeIn 0.4s ease-out;
}
`;
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.textContent = styles;
  document.head.appendChild(style);
}

LoginModal.propTypes = {
  isOpen: PropTypes.bool,
  onClose: PropTypes.func,
  onSwitchToRegister: PropTypes.func,
  onLoginSuccess: PropTypes.func,
};

export default LoginModal;
