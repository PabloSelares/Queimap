import { useEffect, useState } from "react";
import { auth } from "../services/Auth";

const RegisterModal = ({ isOpen, onClose, onSwitchToLogin, onRegisterSuccess }) => {
  const [registerData, setRegisterData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (!isOpen) {
      setRegisterData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        confirmPassword: "",
      });
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

  const handleOverlayClick = (e) => {
    if (e.target === e.currentTarget) onClose();
  };

  const attemptAutoLogin = async (email, password) => {
    // tenta logar e buscar perfil; retorna user ou lança erro
    const loginResp = await auth.login(email, password);
    const token = loginResp?.accessToken || loginResp?.token || loginResp?.access_token;
    if (!token) throw new Error("Token não recebido do servidor durante login automático.");
    localStorage.setItem("token", token);
    const user = await auth.getProfile(token);
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setErrorMsg("");

    if (registerData.password !== registerData.confirmPassword) {
      setErrorMsg("As senhas não coincidem!");
      return;
    }

    const payload = {
      firstName: registerData.firstName,
      lastName: registerData.lastName,
      email: registerData.email,
      password: registerData.password,
    };

    try {
      setLoading(true);
      console.log("🔄 Tentando registrar:", payload);

      // 1) Tenta registrar
      const registerResp = await auth.register(payload);
      console.log("registerResp (sucesso):", registerResp);

      // 2) Se registro OK, tenta login automático (fluxo normal)
      try {
        const user = await attemptAutoLogin(registerData.email, registerData.password);
        console.log("Login automático após registro OK:", user);
        onRegisterSuccess && onRegisterSuccess(user);
        setRegisterData({
          firstName: "",
          lastName: "",
          email: "",
          password: "",
          confirmPassword: "",
        });
        onClose();
        return;
      } catch (loginErr) {
        // registro OK mas login automático falhou — avisar usuário para logar manualmente
        console.warn("Registro OK mas login automático falhou:", loginErr);
        setErrorMsg("Conta criada, mas login automático falhou. Faça login manualmente.");
        onRegisterSuccess && onRegisterSuccess(null);
        return;
      }
    } catch (err) {
      console.warn("Erro no register:", err);

      // Se backend retornar 401 (unauthorized) ao registrar, tentamos login direto:
      if (err?.status === 401 || (typeof err.message === "string" && err.message.toLowerCase().includes("unauthorized"))) {
        console.log("Register retornou 401 → tentando login com as mesmas credenciais...");
        try {
          const user = await attemptAutoLogin(registerData.email, registerData.password);
          console.log("Login bem-sucedido após register 401:", user);
          onRegisterSuccess && onRegisterSuccess(user);
          setRegisterData({
            firstName: "",
            lastName: "",
            email: "",
            password: "",
            confirmPassword: "",
          });
          onClose();
          return;
        } catch (loginErr) {
          console.warn("Tentativa de login após register 401 também falhou:", loginErr);
          const msg =
            loginErr?.message ||
            "Não foi possível registrar nem logar automaticamente. Contate o administrador.";
          setErrorMsg(msg);
          return;
        }
      }

      // Para outros erros (400, 500...), mostra mensagem do backend quando disponível
      const message =
        err?.message ||
        (err?.body && JSON.stringify(err.body)) ||
        "Erro ao criar conta. Tente novamente.";
      setErrorMsg(message);
    } finally {
      setLoading(false);
    }
  };

  // --- UI minimalista (igual estilo anterior) ---
  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 flex items-center justify-center z-50 bg-orange-50"
      onClick={handleOverlayClick}
      aria-modal="true"
      role="dialog"
      aria-label="Tela de registro"
    >
      <div className="w-11/12 max-w-sm bg-white rounded-2xl shadow-xl p-8 border border-orange-100 animate-fadeIn">
        <h2 className="text-center text-2xl font-light text-orange-600 mb-6 tracking-wide">
          Criar Conta
        </h2>

        <form onSubmit={handleRegister} className="flex flex-col gap-4">
          <div className="flex gap-2">
            <input
              type="text"
              placeholder="Nome"
              className="w-1/2 p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
              value={registerData.firstName}
              onChange={(e) =>
                setRegisterData({ ...registerData, firstName: e.target.value })
              }
              required
              disabled={loading}
            />

            <input
              type="text"
              placeholder="Sobrenome"
              className="w-1/2 p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
              value={registerData.lastName}
              onChange={(e) =>
                setRegisterData({ ...registerData, lastName: e.target.value })
              }
              required
              disabled={loading}
            />
          </div>

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
            value={registerData.email}
            onChange={(e) => setRegisterData({ ...registerData, email: e.target.value })}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
            value={registerData.password}
            onChange={(e) => setRegisterData({ ...registerData, password: e.target.value })}
            required
            disabled={loading}
          />

          <input
            type="password"
            placeholder="Confirmar senha"
            className="w-full p-2 border-b border-orange-300 bg-transparent text-gray-800 placeholder:text-gray-400 focus:outline-none focus:border-orange-500 transition-all text-sm font-light"
            value={registerData.confirmPassword}
            onChange={(e) =>
              setRegisterData({ ...registerData, confirmPassword: e.target.value })
            }
            required
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
            {loading ? "Criando..." : "Criar Conta"}
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
            onClick={onSwitchToLogin}
            className="text-orange-500 hover:text-orange-600 text-sm font-light"
            disabled={loading}
          >
            Já tem conta? Fazer login
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

export default RegisterModal;
