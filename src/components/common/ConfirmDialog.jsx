import { useAtom, useSetAtom } from "jotai";
import {
  AlertDialog,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";
import {
  confirmDialogIsOpenAtom,
  confirmDialogTitleAtom,
  confirmDialogDescriptionAtom,
  confirmDialogConfirmTextAtom,
  confirmDialogCancelTextAtom,
  confirmDialogVariantAtom,
  confirmDialogOnConfirmAtom,
  confirmDialogOnCancelAtom,
  resetConfirmDialogAtom,
} from "@/state/global/confirmDialogAtom";

const ConfirmDialog = () => {
  const [isOpen] = useAtom(confirmDialogIsOpenAtom);
  const [title] = useAtom(confirmDialogTitleAtom);
  const [description] = useAtom(confirmDialogDescriptionAtom);
  const [confirmText] = useAtom(confirmDialogConfirmTextAtom);
  const [cancelText] = useAtom(confirmDialogCancelTextAtom);
  const [variant] = useAtom(confirmDialogVariantAtom);
  const [onConfirm] = useAtom(confirmDialogOnConfirmAtom);
  const [onCancel] = useAtom(confirmDialogOnCancelAtom);

  const resetDialog = useSetAtom(resetConfirmDialogAtom);
  const setIsOpen = useSetAtom(confirmDialogIsOpenAtom);

  const handleConfirm = async () => {
    if (onConfirm?.fn) {
      await onConfirm.fn();
    }
    resetDialog();
  };

  const handleCancel = () => {
    if (onCancel?.fn) {
      onCancel.fn();
    }
    resetDialog();
  };

  const handleOpenChange = (open) => {
    if (!open) {
      handleCancel();
    } else {
      setIsOpen(open);
    }
  };

  const buttonVariant =
    variant === "danger"
      ? "bg-red-600 hover:bg-red-700"
      : "bg-purple-600 hover:bg-purple-700";

  return (
    <AlertDialog open={isOpen} onOpenChange={handleOpenChange}>
      <AlertDialogContent className="max-w-md">
        <AlertDialogHeader>
          <AlertDialogTitle>{title}</AlertDialogTitle>
          <AlertDialogDescription>{description}</AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <button
            onClick={handleCancel}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            className={`rounded px-4 py-2 text-sm font-medium text-white ${buttonVariant}`}
          >
            {confirmText}
          </button>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default ConfirmDialog;
