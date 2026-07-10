function Modal({ title, onClose, children }) {
  return (
    <div className="modal-veil" onClick={onClose}>
      <Clay className="modal-box" onClick={(e) => e.stopPropagation()}>
        <div className="modal-head">
          <h3>{title}</h3>
          <button className="icon-btn" onClick={onClose}><X size={18} /></button>
        </div>
        {children}
      </Clay>
    </div>
  );
}

export default Modal;