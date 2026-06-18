type ErrorAlertProps = {
  message: string;
  className?: string;
};

export default function ErrorAlert({
  message,
  className = "text-sm text-red-600",
}: ErrorAlertProps) {
  return (
    <p className={className} role="alert">
      {message}
    </p>
  );
}
