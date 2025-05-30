import { NextUIProvider } from "@nextui-org/system";
import { DirectionProvider } from "@radix-ui/react-direction";

export function Provider({ children }: { children: React.ReactNode }) {
  return (
    <DirectionProvider dir="ltr">
      <NextUIProvider>{children}</NextUIProvider>
    </DirectionProvider>
  );
}
