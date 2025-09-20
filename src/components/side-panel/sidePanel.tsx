export const SidePanel: React.FC<{
  onClose: () => void;
  children?: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <>
      <div
        className="fixed w-dvw h-dvh bg-black/50 top-0 left-0"
        onClick={onClose}
      ></div>
      <div className="fixed right-0 top-0 h-full w-1/3 bg-gray-800 text-white p-4 shadow-lg flex flex-col justify-center">
        <button
          name="side-panel-close"
          className="absolute top-4 right-4"
          onClick={onClose}
        >
          close
        </button>
        {children}
      </div>
    </>
  );
};
