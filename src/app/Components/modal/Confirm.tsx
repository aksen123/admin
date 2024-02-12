interface Props {
  title: string;
  message: string;
  yes?: string;
  cb1?: () => void;
  cb2?: () => void;
}

const Confirm = ({ title, message, yes = "확인", cb1, cb2 }: Props) => {
  return (
    <div className="w-80 min-h-[10rem] bg-white rounded-3xl p-3 flex flex-col justify-around">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p>{message}</p>
      <div className="flex gap-2">
        <button onClick={cb2} className="grow p-2 rounded-2xl bg-gray-300">
          취소
        </button>
        <button
          onClick={cb1}
          className="grow p-2 rounded-2xl text-white bg-blue-500"
        >
          {yes}
        </button>
      </div>
    </div>
  );
};

export default Confirm;
