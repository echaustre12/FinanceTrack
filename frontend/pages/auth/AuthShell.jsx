function AuthShell({ children }) {
  return (
    <div className="landing">
      <div className="auth-card">
        <div className="brand-mark brand-mark--lg">FT</div>
        <h1 className="auth-title">FinanceTrack</h1>
        {children}
      </div>
    </div>
  );
}

export default AuthShell;