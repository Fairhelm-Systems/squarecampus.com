import { cn } from "@/lib/utils";

type SkewedRectanglesProps = {
  className?: string;
};

export const SkewedRectangles = ({ className }: SkewedRectanglesProps) => {
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden [perspective:1000px] [transform-style:preserve-3d]",
        // Radial fade mask: fades on all 4 sides
        "[mask-image:radial-gradient(circle_at_center,white_60%,transparent_80%)]",
        className,
      )}
    >
      <Rectangles
        style={{ transform: "rotateX(45deg)" }}
      />
      <Rectangles
        style={{ transform: "rotateX(-45deg)" }}
      />
    </div>
  );
};

const Rectangles = ({
  className,
  ...props
}: {
  className?: string;
  style?: React.CSSProperties;
}) => {
  const rectangleSVG = `<svg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'><rect width='40' height='40' x='0' y='0' stroke='rgba(255,255,255,0.12)' fill='none' /></svg>`;
  const encodedRectangleSVG = encodeURIComponent(rectangleSVG);
  return (
    <div
      className={cn(
        "pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden mix-blend-screen",
        className,
      )}
      {...props}
    >
      <div
        className="h-full w-full"
        style={{
          backgroundImage: `url("data:image/svg+xml,${encodedRectangleSVG}")`,
          backgroundSize: "42px 42px",
          backgroundPosition: "center",
          backgroundRepeat: "repeat",
          opacity: 0.6,
        }}
      />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_40%,rgba(59,130,246,0.08),transparent_50%)]" />
    </div>
  );
};
