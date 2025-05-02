import { NextUIProvider } from "@nextui-org/system";
import { useNavigate } from "react-router-dom";
import { DirectionProvider } from "@radix-ui/react-direction";

export function Provider({ children }: { children: React.ReactNode }) {
  const navigate = useNavigate();

  return (
    <DirectionProvider dir="ltr">
      <NextUIProvider navigate={navigate}>{children}</NextUIProvider>
    </DirectionProvider>
  );
}
