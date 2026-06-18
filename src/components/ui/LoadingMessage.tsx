type LoadingMessageProps = {
  message?: string;
  className?: string;
};

export default function LoadingMessage({
  message = "Chargement...",
  className = "text-sm text-neutral-600",
}: LoadingMessageProps) {
  return <p className={className}>{message}</p>;
}
