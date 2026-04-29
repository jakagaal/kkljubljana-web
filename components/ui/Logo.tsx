import Image from "next/image";
import { clsx } from "@/lib/clsx";

type LogoProps = {
  variant?: "mark" | "wordmark" | "stacked";
  className?: string;
};

const SHIELD_SRC = "/logo.png";

export function Logo({ variant = "wordmark", className }: LogoProps) {
  if (variant === "mark") {
    return <Shield className={className} />;
  }
  if (variant === "stacked") {
    return (
      <div className={clsx("inline-flex items-center gap-3", className)}>
        <Shield className="h-12 w-auto shrink-0" sizeHint={48} />
        <div className="display leading-none text-[0.95rem] tracking-tight">
          <div>Karate</div>
          <div>Klub</div>
          <div className="text-blood">Ljubljana</div>
        </div>
      </div>
    );
  }
  return (
    <div className={clsx("inline-flex items-center gap-3", className)}>
      <Shield className="h-9 w-auto shrink-0" sizeHint={36} />
      <span className="display leading-none text-base tracking-tight">
        Karate Klub <span className="text-blood">Ljubljana</span>
      </span>
    </div>
  );
}

function Shield({
  className,
  sizeHint = 40,
}: {
  className?: string;
  sizeHint?: number;
}) {
  return (
    <Image
      src={SHIELD_SRC}
      alt="Karate Klub Ljubljana"
      width={324}
      height={386}
      priority
      sizes={`${sizeHint}px`}
      className={clsx("h-auto w-auto object-contain", className)}
    />
  );
}
