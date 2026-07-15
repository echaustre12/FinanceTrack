import Modal from "./Modal";
import ClayButton from "./ClayButton";

function ConfirmModal({
  title = "Eliminar gasto",
  message = "¿Está seguro de eliminar este gasto?",
  confirmText = "Eliminar",
  cancelText = "Cancelar",
  onClose,
  onConfirm
}) {
  return (
    <Modal onClose={onClose}>
      <div className="confirm-box">

        <h3 className="confirm-title">
          {title}
        </h3>

        <p>
          {message}
        </p>

        <div className="confirm-actions">
          <ClayButton
            className="confirm-cancel"
            onClick={onClose}
          >
            {cancelText}
          </ClayButton>

          <ClayButton
            className="confirm-delete"
            onClick={onConfirm}
          >
            {confirmText}
          </ClayButton>
        </div>

      </div>
    </Modal>
  );
}

export default ConfirmModal;