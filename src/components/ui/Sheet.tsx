import * as React from "react";

import { cn } from "@/utils/utils";

interface SheetProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTriggerProps {
  children: React.ReactNode;
  asChild?: boolean;
}

interface SheetContentProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetHeaderProps {
  children: React.ReactNode;
  className?: string;
}

interface SheetTitleProps {
  children: React.ReactNode;
  className?: string;
}

const SheetContext = React.createContext<{
  isOpen: boolean;
  setIsOpen: (open: boolean) => void;
}>({
  isOpen: false,
  setIsOpen: () => {},
});

export function Sheet({ children, className }: SheetProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <SheetContext.Provider value={{ isOpen, setIsOpen }}>
      <div className={cn("relative", className)}>{children}</div>
    </SheetContext.Provider>
  );
}

export function SheetTrigger({ children }: SheetTriggerProps) {
  const { setIsOpen } = React.useContext(SheetContext);

  return <div onClick={() => setIsOpen(true)}>{children}</div>;
}

export function SheetContent({ children, className }: SheetContentProps) {
  const { isOpen, setIsOpen } = React.useContext(SheetContext);

  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 z-40"
        onClick={() => setIsOpen(false)}
      />
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full sm:w-[400px] bg-white shadow-lg z-50 p-6 overflow-y-auto",
          "transform transition-transform duration-300 ease-in-out",
          isOpen ? "translate-x-0" : "translate-x-full",
          className,
        )}
      >
        {children}
      </div>
    </>
  );
}

export function SheetHeader({ children, className }: SheetHeaderProps) {
  return <div className={cn("mb-6", className)}>{children}</div>;
}

export function SheetTitle({ children, className }: SheetTitleProps) {
  return (
    <h2 className={cn("text-2xl font-semibold", className)}>{children}</h2>
  );
}
