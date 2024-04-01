import animation from "@/../public/nosales.json";
import Lottie from "react-lottie-player";

export default function NoSales() {
  return (
    <>
      <h2 className="text-center text-xl">매출 내역이 없습니다.</h2>

      <Lottie
        loop
        animationData={animation}
        play
        style={{ width: "100%", height: "50%" }}
      />
    </>
  );
}
