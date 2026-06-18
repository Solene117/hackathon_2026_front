type EventConfirmModalProps = {
  eventTitle: string;
  onConfirm: () => void;
  onClose: () => void;
};

export default function EventConfirmModal({
  eventTitle,
  onConfirm,
  onClose,
}: EventConfirmModalProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-5">
      <section className="w-full max-w-95 rounded-2xl bg-white p-5 shadow-xl">
        <h2 className="text-2xl font-bold">Confirmer l’inscription</h2>

        <p className="mt-3 text-sm text-neutral-600">
          Voulez-vous vraiment vous inscrire à l’événement{" "}
          <strong>{eventTitle}</strong> ?
        </p>

        <div className="mt-6 space-y-3">
          <button
            onClick={onConfirm}
            className="w-full rounded-lg bg-[#27509B] px-4 py-3 font-bold text-white hover:bg-[#1a3d7a]"
          >
            Confirmer
          </button>

          <button
            onClick={onClose}
            className="w-full rounded-lg border border-[#27509B] bg-white px-4 py-3 font-bold text-[#27509B] hover:bg-[#D4E7FA]"
          >
            Annuler
          </button>
        </div>
      </section>
    </div>
  );
}