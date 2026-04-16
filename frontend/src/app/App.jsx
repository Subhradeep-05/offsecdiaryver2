import BootAnimation from "../boot/BootAnimation";
import useBootState from "../boot/useBootState";
import AppRoutes from "./Routes";

export default function App() {
  const { bootDone, finishBoot } = useBootState();

  if (!bootDone) {
    return <BootAnimation onComplete={finishBoot} />;
  }

  return <AppRoutes />;
}
