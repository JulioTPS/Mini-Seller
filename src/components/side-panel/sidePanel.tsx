export const SidePanel: React.FC<{
  onClose: () => void;
  children?: React.ReactNode;
}> = ({ onClose, children }) => {
  return (
    <div className="fixed right-0 top-0 h-full w-1/3 bg-gray-800 text-white p-4 shadow-lg">
      {children}
      <button onClick={onClose}>close</button>
    </div>
  );
};
