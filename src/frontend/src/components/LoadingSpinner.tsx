interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
  label?: string;
}

export function LoadingSpinner({
  size = "md",
  label = "Loading...",
}: LoadingSpinnerProps) {
  const sizeMap = { sm: "w-5 h-5", md: "w-8 h-8", lg: "w-12 h-12" };
  return (
    <div
      className="flex flex-col items-center justify-center gap-3 py-8"
      data-ocid="loading_state"
    >
      <div
        className={`${sizeMap[size]} rounded-full border-4 border-primary/20 border-t-primary animate-spin`}
      />
      <p className="text-muted-foreground text-sm font-body">{label}</p>
    </div>
  );
}
