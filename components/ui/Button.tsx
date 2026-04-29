import { clsx } from "@/lib/clsx";
import type { AnchorHTMLAttributes, ReactNode } from "react";
import { ArrowRight } from "./Icons";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  variant?: "primary" | "ghost" | "outline";
  withArrow?: boolean;
  children: ReactNode;
};

export function Button({
  variant = "primary",
  withArrow = false,
  className,
  children,
  ...props
}: ButtonProps) {
  return (
    <a
      className={clsx(
        "group inline-flex items-center justify-center gap-2.5",
        "px-6 py-4 label",
        "transition-all duration-300",
        "border",
        variant === "primary" && [
          "bg-blood text-bone border-blood",
          "hover:bg-blood-deep hover:border-blood-deep",
        ],
        variant === "outline" && [
          "bg-transparent text-ink border-ink",
          "hover:bg-ink hover:text-bone",
        ],
        variant === "ghost" && [
          "bg-transparent text-bone border-bone/30",
          "hover:bg-bone hover:text-ink hover:border-bone",
        ],
        className,
      )}
      {...props}
    >
      <span>{children}</span>
      {withArrow ? (
        <ArrowRight
          className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
          strokeWidth={2}
        />
      ) : null}
    </a>
  );
}
