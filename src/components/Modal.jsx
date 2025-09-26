function Modal({ isOpen, onClose, children }) {
  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: "rgba(0,0,0,0.5)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        zIndex: 2000,
      }}
    >
      <div
        style={{
          background: "#fff",
          padding: 20,
          borderRadius: 8,
          minWidth: 320,
          maxWidth: "90%",
        }}
      >
        <button onClick={onClose} style={{ float: "right" }}>
          ✖
        </button>
        <div style={{ clear: "both" }} />
        {children}
      </div>
    </div>
  );
}

export default Modal;
