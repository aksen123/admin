interface Props {
  message: string;
  callback?: () => void;
}

const Alert = ({ message, callback }: Props) => {
  return (
    <div className="w-80 min-h-[10rem] bg-white rounded-3xl p-3 flex flex-col justify-around">
      <h3 className="font-semibold text-xl text-center">{message}</h3>
      <div className="flex gap-2">
        <button
          onClick={callback}
          className="grow p-2 rounded-2xl text-white bg-blue-500"
        >
          확인
        </button>
      </div>
    </div>
  );
};

export default Alert;
