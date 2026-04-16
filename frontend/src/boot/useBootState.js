import { useState } from "react";

export default function useBootState() {
  const [bootDone, setBootDone] = useState(
    sessionStorage.getItem("bootDone") === "true"
  );

  const finishBoot = () => {
    sessionStorage.setItem("bootDone", "true");
    setBootDone(true);
  };

  return { bootDone, finishBoot };
}
