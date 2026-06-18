type ConfirmTireDeleteModalProps = {
  isOpen: boolean;
  isSubmitting: boolean;
  onConfirm: () => void;
  onCancel: () => void;
};

export default function ConfirmTireDeleteModal({
  isOpen,
  isSubmitting,
  onConfirm,
  onCancel,
}: ConfirmTireDeleteModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-5">
      <section
        className="w-full max-w-sm rounded-2xl border border-neutral-300 bg-white p-5 shadow-2xl"
        role="alertdialog"
        aria-labelledby="delete-tire-title"
        aria-describedby="delete-tire-description"
      >
        <h2 id="delete-tire-title" className="text-xl font-bold">
          Supprimer ce pneu ?
        </h2>

        <p
          id="delete-tire-description"
          className="mt-3 text-sm text-neutral-600"
        >
          Cette action est irréversible. Toutes les données de suivi de ce
          pneu seront perdues.
        </p>

        <div className="mt-6 space-y-3">
          <button
            type="button"
            onClick={onConfirm}
            disabled={isSubmitting}
            className="w-full rounded-xl bg-red-600 px-4 py-3 text-sm font-semibold text-white hover:bg-red-700 disabled:opacity-60"
          >
            {isSubmitting ? "Suppression..." : "Supprimer"}
          </button>

          <button
            type="button"
            onClick={onCancel}
            disabled={isSubmitting}
            className="w-full rounded-xl border border-[#27509B] px-4 py-3 text-sm font-semibold text-[#27509B] hover:bg-neutral-50 disabled:opacity-60"
          >
            Annuler
          </button>
        </div>
      </section>
    </div>
  );
}
