// src/services/Auth.js
const API_BASE = "http://localhost:8080"; // ajuste se necessário

async function parseResponseBody(res) {
  // lê o corpo como texto apenas uma vez e tenta fazer JSON.parse
  const text = await res.text();
  try {
    return text ? JSON.parse(text) : null;
  } catch {
    return text;
  }
}

export const auth = {
  login: async (email, password) => {
    const res = await fetch(`${API_BASE}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });

    const data = await parseResponseBody(res);

    // se não ok, lança com mensagem do backend (ou texto cru)
    if (!res.ok) {
      const message =
        (data && (data.message || data.error || data.error_description)) ||
        data ||
        `Login failed (status ${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.body = data;
      throw err;
    }

    // sucesso: retorna objeto (provavelmente { accessToken, expiresIn })
    return data;
  },

  getProfile: async (token) => {
    const res = await fetch(`${API_BASE}/user/me`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await parseResponseBody(res);

    if (!res.ok) {
      const message = (data && (data.message || data.error)) || data || `Profile fetch failed (status ${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.body = data;
      throw err;
    }

    return data;
  },

  register: async (payload) => {
    const res = await fetch(`${API_BASE}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    const data = await parseResponseBody(res);

    if (!res.ok) {
      const message = (data && (data.message || data.error)) || data || `Register failed (status ${res.status})`;
      const err = new Error(message);
      err.status = res.status;
      err.body = data;
      throw err;
    }

    return data;
  },
};
