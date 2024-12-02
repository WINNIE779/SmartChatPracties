export const CustomMessage = ({
  text,
  bgColor,
}: {
  text: string;
  bgColor: string;
}) => {
  return (
    <div
      className={`fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white text-[1rem] px-6 py-4 rounded-lg z-50 ${bgColor}`}
    >
      {text}
    </div>
  );
};
