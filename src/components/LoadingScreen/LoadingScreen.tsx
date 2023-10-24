import { useDark } from "@/store/dark/useDark";
import { useLoading } from "@/store/loading/useLoading";

const LoadingScreen = () => {
  const show = useLoading.use.show();
  const dark = useDark.use.dark();

  if (!show) {
    return null;
  }
  return (
    <div className="fixed top-0 z-50 flex h-[100vh] w-[100vw] items-center justify-center bg-white/50 text-sm">
      <div className=" flex flex-col items-center">
        {dark ? (
          <iframe src="https://lottie.host/?file=6d244b68-bc1a-4fca-890a-c17171afd91b/xsql978lpK.json"></iframe>
        ) : (
          <iframe src="https://lottie.host/?file=f602f056-9476-449a-b4aa-de653393128f/x3TwbYHn0v.json"></iframe>
        )}
      </div>
    </div>
  );
};

export default LoadingScreen;
