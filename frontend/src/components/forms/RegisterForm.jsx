function RegisterForm({ onGoLogin, onRegistered }) {
  const [form, setForm] = useState({ name: "", email: "", password: "", phoneNumber: "" });
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const allFilled = form.name && form.email && form.password && form.phoneNumber;

  const submit = async (e) => {
    e.preventDefault();
    if (!allFilled) { setError("Todos los campos son obligatorios."); return; }
    setLoading(true); setError(null);
    try {
      await rawFetch("/api/auth/register", { method: "POST", body: JSON.stringify(form) });
      onRegistered(form.email);
    } catch (err) {
      setError(err.message || "No se pudo completar el registro.");
    } finally { setLoading(false); }
  };

  return (
    <AuthShell>
      <p className="auth-sub">Crea tu cuenta para empezar a llevar tus finanzas.</p>
      <form className="auth-form" onSubmit={submit}>
        <label className="field-label">Nombre completo</label>
        <input className="clay-input" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} placeholder="Ej. Luis Pérez" required />
        <label className="field-label">Correo electrónico</label>
        <input className="clay-input" type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="tucorreo@ejemplo.com" required />
        <label className="field-label">Contraseña</label>
        <input className="clay-input" type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} placeholder="Mínimo 8 caracteres" required />
        <label className="field-label">Número de teléfono</label>
        <input className="clay-input" type="tel" value={form.phoneNumber} onChange={(e) => setForm({ ...form, phoneNumber: e.target.value })} placeholder="Ej. 3001234567" required />
        <ErrorText>{error}</ErrorText>
        <ClayButton tone="ink" type="submit" disabled={loading} style={{ marginTop: 10, width: "100%", justifyContent: "center" }}>
          {loading ? "Creando cuenta..." : "Crear cuenta"}
        </ClayButton>
      </form>
      <p className="auth-switch">¿Ya tienes cuenta? <span onClick={onGoLogin}>Inicia sesión</span></p>
    </AuthShell>
  );
}

export default RegisterForm;