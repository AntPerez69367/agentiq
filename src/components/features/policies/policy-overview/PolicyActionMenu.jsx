import ActionMenu, { FIELD_TYPES } from "@/components/ui/action-menu";
import {
  editPolicyIsOpenAtom,
  selectedPolicyAtom,
} from "@/state/policies/policyOverview";
import { setConfirmDialogAtom } from "@/state/global/confirmDialogAtom";
import { deletePolicyMutation } from "@/state/policies/policyMutations";
import { useAtom, useSetAtom } from "jotai";

const PolicyActionMenu = ({ policy }) => {
  const setEditPolicyIsOpen = useSetAtom(editPolicyIsOpenAtom);
  const setSelectedPolicy = useSetAtom(selectedPolicyAtom);
  const [deleteMutation] = useAtom(deletePolicyMutation);
  const setConfirmDialog = useSetAtom(setConfirmDialogAtom);

  const handleEditPolicy = () => {
    setSelectedPolicy(policy);
    setEditPolicyIsOpen(true);
  };

  const handleDeletePolicy = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Policy",
      description: `Are you sure you want to delete ${policy.policyName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: {
        fn: async () => {
          await deleteMutation.mutateAsync(policy.id);
        },
      },
    });
  };

  return (
    <ActionMenu
      actions={[
        {
          label: "View Details",
          onClick: () => {},
          type: FIELD_TYPES.ITEM,
        },
        {
          label: "Edit Policy",
          onClick: handleEditPolicy,
          type: FIELD_TYPES.ITEM,
        },
        { type: FIELD_TYPES.SEPARATOR },
        {
          label: "Delete Policy",
          onClick: handleDeletePolicy,
          type: FIELD_TYPES.ITEM,
          className: "text-red-600 font-bold hover:text-red-800",
        },
      ]}
    />
  );
};

export default PolicyActionMenu;
