function Clay({ children, className = "", style = {}, onClick }) {
  return <div className={`clay ${className}`} style={style} onClick={onClick}>{children}</div>;
}

export default Clay;