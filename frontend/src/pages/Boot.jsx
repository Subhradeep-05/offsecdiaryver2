import { useNavigate } from "react-router-dom";
import BootScreen from "../boot/BootAnimation";

export default function BootPage() {
  const navigate = useNavigate();

  return <BootScreen onComplete={() => navigate("/")} />;
}
