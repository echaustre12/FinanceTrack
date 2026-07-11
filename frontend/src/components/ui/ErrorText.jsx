function ErrorText({ children }) {
  if (!children) return null;

  return (
    <div className="error-box">
      ⚠️ {children}
    </div>
  );
}

export default ErrorText;