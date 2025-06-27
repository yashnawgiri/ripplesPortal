import * as React from "react";

import { cn } from "@/utils/utils";

interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
}

interface TabsContextValue {
  value: string;
  onValueChange: (value: string) => void;
}

const TabsContext = React.createContext<TabsContextValue | undefined>(
  undefined,
);

const Tabs = React.forwardRef<HTMLDivElement, TabsProps>(
  (
    { defaultValue, value, onValueChange, className, children, ...props },
    ref,
  ) => {
    const [selectedValue, setSelectedValue] = React.useState(
      value || defaultValue || "",
    );

    // Update internal state when value prop changes (controlled mode)
    React.useEffect(() => {
      if (value !== undefined) {
        setSelectedValue(value);
      }
    }, [value]);

    const handleValueChange = React.useCallback(
      (newValue: string) => {
        setSelectedValue(newValue);
        onValueChange?.(newValue);
      },
      [onValueChange],
    );

    return (
      <TabsContext.Provider
        value={{ value: selectedValue, onValueChange: handleValueChange }}
      >
        <div ref={ref} className={cn("w-full", className)} {...props}>
          {children}
        </div>
      </TabsContext.Provider>
    );
  },
);

Tabs.displayName = "Tabs";

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {}

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps>(
  ({ className, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground",
        "transition-all duration-200 ease-in-out",
        className,
      )}
      role="tablist"
      {...props}
    />
  ),
);

TabsList.displayName = "TabsList";

interface TabsTriggerProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  value: string;
}

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    if (!context) {
      throw new Error("TabsTrigger must be used within a Tabs component");
    }

    const isSelected = context.value === value;

    return (
      <button
        ref={ref}
        aria-selected={isSelected}
        data-state={isSelected ? "active" : "inactive"}
        className={cn(
          "inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all duration-200 ease-in-out",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "disabled:pointer-events-none disabled:opacity-50",
          isSelected
            ? "bg-background text-foreground shadow-sm scale-105"
            : "hover:bg-muted/50",
          className,
        )}
        role="tab"
        onClick={() => context.onValueChange(value)}
        {...props}
      />
    );
  },
);

TabsTrigger.displayName = "TabsTrigger";

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
}

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps>(
  ({ className, value, ...props }, ref) => {
    const context = React.useContext(TabsContext);

    if (!context) {
      throw new Error("TabsContent must be used within a Tabs component");
    }

    const isSelected = context.value === value;

    return (
      <div
        ref={ref}
        className={cn(
          "mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
          "transition-all duration-200 ease-in-out",
          isSelected
            ? "opacity-100 translate-y-0"
            : "opacity-0 translate-y-2 pointer-events-none absolute",
          className,
        )}
        role="tabpanel"
        style={{
          display: isSelected ? "block" : "none",
        }}
        {...props}
      />
    );
  },
);

TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
