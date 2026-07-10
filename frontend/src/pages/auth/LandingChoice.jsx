import AuthShell from "./AuthShell";
import ClayButton from "../../components/ui/ClayButton";

function LandingChoice({ onGoLogin, onGoRegister }) {
  return (
    <AuthShell>
      <p className="auth-sub">Bienvenido a tu app preferida para organizar tus gastos, registrar tus ingresos y tener completo control sobre tu vida financiera.</p>
      <div className="landing-actions">
        <ClayButton tone="ink" onClick={onGoRegister}>Regístrate</ClayButton>
        <ClayButton tone="ghost" onClick={onGoLogin}>Inicia Sesión</ClayButton>
      </div>
    </AuthShell>
  );
}

export default LandingChoice;