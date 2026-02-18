import { cn } from "@/lib/utils";

type ButtonProps = React.ComponentPropsWithoutRef<"button">;

export function Button({ className, children, ...props }: ButtonProps) {
    return (
        <button
            className={cn(
                "cursor-pointer rounded-md px-4 py-2 text-sm text-black bg-white font-semibold disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            {...props}
        >
            {children}
        </button>
    )
}
