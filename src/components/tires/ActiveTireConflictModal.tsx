type ActiveTireConflictModalProps = {
  message: string | null;
  onClose: () => void;
};

export default function ActiveTireConflictModal({
  message,
  onClose,
}: ActiveTireConflictModalProps) {
  if (!message) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <section
        className="w-full max-w-sm rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl"
        role="alertdialog"
        aria-labelledby="active-tire-conflict-title"
        aria-describedby="active-tire-conflict-description"
      >
        <h2 id="active-tire-conflict-title" className="text-xl font-bold">
          Activation impossible
        </h2>

        <p
          id="active-tire-conflict-description"
          className="mt-3 text-sm text-neutral-600"
        >
          {message}
        </p>

        <button
          type="button"
          onClick={onClose}
          className="mt-6 w-full rounded-xl bg-[#27509B] px-4 py-3 text-sm font-semibold text-white hover:bg-[#1a3d7a]"
        >
          Compris
        </button>
      </section>
    </div>
  );
}
