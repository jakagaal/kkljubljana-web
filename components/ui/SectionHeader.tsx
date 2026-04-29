import { clsx } from "@/lib/clsx";
import { Container } from "./Container";

type SectionHeaderProps = {
  number: string;
  eyebrow: string;
  title: string;
  description?: string;
  align?: "left" | "center";
  variant?: "light" | "dark";
};

export function SectionHeader({
  number,
  eyebrow,
  title,
  description,
  align = "left",
  variant = "light",
}: SectionHeaderProps) {
  const isDark = variant === "dark";
  return (
    <Container>
      <div
        className={clsx(
          "flex flex-col gap-6 md:gap-8 mb-12 md:mb-20",
          align === "center" && "items-center text-center",
        )}
      >
        <div className="flex items-center gap-4">
          <span
            className={clsx(
              "label",
              isDark ? "text-blood" : "text-blood",
            )}
          >
            / {number}
          </span>
          <span
            className={clsx(
              "h-px w-12",
              isDark ? "bg-bone/30" : "bg-ink/20",
            )}
          />
          <span
            className={clsx(
              "label",
              isDark ? "text-bone/60" : "text-ink/60",
            )}
          >
            {eyebrow}
          </span>
        </div>
        <h2
          className={clsx(
            "display-tight text-balance",
            "text-[clamp(2.75rem,8vw,7rem)]",
            isDark ? "text-bone" : "text-ink",
          )}
        >
          {title}
        </h2>
        {description ? (
          <p
            className={clsx(
              "max-w-2xl text-base md:text-lg leading-relaxed text-pretty",
              isDark ? "text-bone/70" : "text-ink/70",
            )}
          >
            {description}
          </p>
        ) : null}
      </div>
    </Container>
  );
}
