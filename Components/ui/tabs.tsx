import * as React from "react";

// Placeholder types for Tabs components.
// In a real shadcn/ui setup, these would be more complex and integrate with Radix UI.
interface TabsProps extends React.HTMLAttributes<HTMLDivElement> {
  defaultValue?: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children?: React.ReactNode;
}

interface TabsListProps extends React.HTMLAttributes<HTMLDivElement> {
  children?: React.ReactNode;
}

interface TabsTriggerProps extends React.HTMLAttributes<HTMLButtonElement> {
  value: string;
  children?: React.ReactNode;
}

interface TabsContentProps extends React.HTMLAttributes<HTMLDivElement> {
  value: string;
  children?: React.ReactNode;
}

/**
 * A very basic placeholder for the Tabs component.
 * This implements minimal functionality to switch content based on the `defaultValue` or `value`.
 * It does NOT handle advanced features like keyboard navigation or ARIA attributes.
 * For full functionality, you would integrate a library like shadcn/ui (which uses Radix UI).
 */
const Tabs = ({ defaultValue, value, onValueChange, children, ...props }: TabsProps) => {
  const [activeTab, setActiveTab] = React.useState(value || defaultValue || "");

  React.useEffect(() => {
    if (value !== undefined && value !== activeTab) {
      setActiveTab(value);
    }
  }, [value]);

  const handleTabChange = (newValue: string) => {
    setActiveTab(newValue);
    onValueChange?.(newValue);
  };

  // Clone children to pass down activeTab and handleTabChange
  const childrenWithProps = React.Children.map(children, child => {
    if (React.isValidElement(child) && (child.type === TabsList || child.type === TabsContent)) {
      return React.cloneElement(child, { activeTab, onTabChange: handleTabChange } as any);
    }
    return child;
  });

  return <div {...props}>{childrenWithProps}</div>;
};

const TabsList = React.forwardRef<HTMLDivElement, TabsListProps & { activeTab?: string; onTabChange?: (value: string) => void }>(
  ({ className, children, activeTab, onTabChange, ...props }, ref) => {
    const childrenWithProps = React.Children.map(children, child => {
      if (React.isValidElement(child) && child.type === TabsTrigger) {
        return React.cloneElement(child, {
          isActive: (child.props as TabsTriggerProps).value === activeTab,
          onClick: () => onTabChange?.((child.props as TabsTriggerProps).value),
        } as any);
      }
      return child;
    });

    return (
      <div
        ref={ref}
        className={`inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground ${className}`}
        role="tablist"
        {...props}
      >
        {childrenWithProps}
      </div>
    );
  }
);
TabsList.displayName = "TabsList";

const TabsTrigger = React.forwardRef<HTMLButtonElement, TabsTriggerProps & { isActive?: boolean }>(
  ({ className, children, value, isActive, onClick, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm ${
          isActive ? "bg-background text-foreground shadow-sm" : ""
        } ${className}`}
        data-state={isActive ? "active" : "inactive"}
        role="tab"
        aria-selected={isActive}
        onClick={onClick}
        {...props}
      >
        {children}
      </button>
    );
  }
);
TabsTrigger.displayName = "TabsTrigger";

const TabsContent = React.forwardRef<HTMLDivElement, TabsContentProps & { activeTab?: string }>(
  ({ className, children, value, activeTab, ...props }, ref) => {
    const isActive = value === activeTab;
    return (
      <div
        ref={ref}
        className={`mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 ${className}`}
        data-state={isActive ? "active" : "inactive"}
        role="tabpanel"
        hidden={!isActive} // Hide content if not active
        {...props}
      >
        {isActive && children}
      </div>
    );
  }
);
TabsContent.displayName = "TabsContent";

export { Tabs, TabsList, TabsTrigger, TabsContent };
