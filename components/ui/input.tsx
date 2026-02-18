import { cn } from "@/lib/utils";

type InputProps = React.ComponentPropsWithoutRef<"input">;

export function Input ({className, placeholder, type, id, ...props}: InputProps) {
    return (
        <input
            className={cn(
                "w-full rounded-md border border-gray-600 bg-transparent px-3 py-2 mb-4 text-sm shadow-sm placeholder-grey-500 focus-outline-none focus:ring-1 focus:ring-blue-600 disabled:cursor-not-allowed disabled:opacity-50",
                className
            )}
            placeholder={placeholder}
            type={type}
            id={id}
            {...props}
        />
    )
}