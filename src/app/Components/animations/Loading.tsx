import Lottie from "react-lottie-player";
import loading from "@/../public/Animation.json";

const Loading = () => {
  return (
    <Lottie
      loop
      animationData={loading}
      play
      style={{ width: 200, height: 200 }}
    />
  );
};

export default Loading;
