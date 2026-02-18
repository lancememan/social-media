import { cn } from "@/lib/utils";

type LabelProps = React.ComponentPropsWithoutRef<"label">;

export function Label ({ className, children, ...props }: LabelProps) {
    return (
        <label
            className={cn(                
                "block mb-2 text-sm font-medium text-white",
                className
            )}
            {...props}
        >
            {children}
        </label>
    )
}