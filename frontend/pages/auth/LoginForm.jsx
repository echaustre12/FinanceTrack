function LoginForm({ onGoRegister, onLoggedIn, prefillEmail }) {
  const [form, setForm] = useState({ email: prefillEmail || "", password: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const submit = async (e) => {
    e.preventDefault();
    if (!form.email || !form.password) { setError("Correo y contraseña son obligatorios."); return; }
    setLoading(true); setError(null);
    try {
      const data = await rawFetch("/api/auth/login", { method: "POST", body: JSON.stringify(form) });
      const token = data?.token;
      const user = data?.user || { email: form.email, name: data?.name, phoneNumber: data?.phoneNumber };
      if (!token) throw new Error("El backend no devolvió un token válido.");
      onLoggedIn(token, user);
    } catch (err) {
      setError(err.message || "No se pudo iniciar sesión.");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell>
      <p className="auth-sub">Ingresa con tu correo y contraseña.</p>
      <form className="auth-form" onSubmit={submit}>
        <label className="field-label">Correo electrónico</label>
        <input className="clay-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tucorreo@ejemplo.com" required />
        <label className="field-label">Contraseña</label>
        <input className="clay-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Tu contraseña" required />
        <ErrorText>{error}</ErrorText>
        <ClayButton tone="ink" type="submit" disabled={loading} style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
          {loading ? "Ingresando..." : "Inicia Sesión"}
        </ClayButton>
      </form>
      <p className="auth-switch">¿No tienes cuenta? <span onClick={onGoRegister}>Regístrate</span></p>
    </AuthShell>
  );
}

export default LoginForm;