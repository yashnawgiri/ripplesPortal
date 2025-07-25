import Toast from "./Toast";

import { useToast } from "@/hooks/use-toast";

export function Toaster() {
  const { toasts } = useToast();

  return (
    <div className="fixed bottom-0 right-0 z-50 flex flex-col gap-2 p-4">
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          description={toast.description}
          id={toast.id}
          title={toast.title}
          type={toast.type}
          onClose={() => toast.onClose?.()}
        />
      ))}
    </div>
  );
}
