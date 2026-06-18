type EmptyStateProps = {
  message: string;
  className?: string;
};

export default function EmptyState({
  message,
  className = "text-sm text-neutral-600",
}: EmptyStateProps) {
  return <p className={className}>{message}</p>;
}
