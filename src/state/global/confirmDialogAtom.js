import { atom } from "jotai";

const initialState = {
  isOpen: false,
  title: "",
  description: "",
  confirmText: "Confirm",
  cancelText: "Cancel",
  variant: "default",
  onConfirm: null,
  onCancel: null,
};

export const confirmDialogIsOpenAtom = atom(false);
export const confirmDialogTitleAtom = atom("");
export const confirmDialogDescriptionAtom = atom("");
export const confirmDialogConfirmTextAtom = atom("Confirm");
export const confirmDialogCancelTextAtom = atom("Cancel");
export const confirmDialogVariantAtom = atom("default");
export const confirmDialogOnConfirmAtom = atom({ fn: null });
export const confirmDialogOnCancelAtom = atom({ fn: null });

export const confirmDialogAtom = atom(initialState);

export const setConfirmDialogAtom = atom(null, (get, set, config) => {
  set(confirmDialogIsOpenAtom, config.isOpen ?? false);
  set(confirmDialogTitleAtom, config.title ?? "");
  set(confirmDialogDescriptionAtom, config.description ?? "");
  set(confirmDialogConfirmTextAtom, config.confirmText ?? "Confirm");
  set(confirmDialogCancelTextAtom, config.cancelText ?? "Cancel");
  set(confirmDialogVariantAtom, config.variant ?? "default");
  set(confirmDialogOnConfirmAtom, config.onConfirm ?? { fn: null });
  set(confirmDialogOnCancelAtom, config.onCancel ?? { fn: null });
});

export const resetConfirmDialogAtom = atom(null, (get, set) => {
  set(confirmDialogIsOpenAtom, false);
  set(confirmDialogTitleAtom, "");
  set(confirmDialogDescriptionAtom, "");
  set(confirmDialogConfirmTextAtom, "Confirm");
  set(confirmDialogCancelTextAtom, "Cancel");
  set(confirmDialogVariantAtom, "default");
  set(confirmDialogOnConfirmAtom, { fn: null });
  set(confirmDialogOnCancelAtom, { fn: null });
});
