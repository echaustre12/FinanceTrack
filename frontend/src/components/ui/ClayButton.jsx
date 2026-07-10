function ClayButton({ children, onClick, tone = "ink", icon: Icon, style = {}, type = "button", disabled }) {
  return (
    <button type={type} disabled={disabled} className={`clay-btn clay-btn--${tone}`} onClick={onClick} style={style}>
      {Icon && <Icon size={16} strokeWidth={2.4} />}
      {children}
    </button>
  );
}

export default ClayButton;