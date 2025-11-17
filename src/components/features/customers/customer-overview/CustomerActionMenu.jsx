import { useNavigate } from "@tanstack/react-router";
import ActionMenu, { FIELD_TYPES } from "@/components/ui/action-menu";
import { setConfirmDialogAtom } from "@state/global/confirmDialogAtom";
import {
  editCustomerIsOpenAtom,
  selectedCustomerAtom,
} from "@state/customers/customerOverview";
import { deleteCustomerMutation } from "@/state/customers/customerMutations";
import { useAtom, useSetAtom } from "jotai";

const CustomerActionMenu = ({ customer }) => {
  const navigate = useNavigate();
  const setEditCustomerIsOpen = useSetAtom(editCustomerIsOpenAtom);
  const setSelectedCustomer = useSetAtom(selectedCustomerAtom);
  const [deleteMutation] = useAtom(deleteCustomerMutation);
  const setConfirmDialog = useSetAtom(setConfirmDialogAtom);

  const handleViewDetails = () => {
    navigate({
      to: `/customers/$customer.id`,
      params: { customerId: customer.id },
      mask: {
        to: "/customers/",
      },
      state: { customerId: customer.id },
    });
  };

  const handleEditCustomer = () => {
    setSelectedCustomer(customer);
    setEditCustomerIsOpen(true);
  };

  const handleDeleteCustomer = () => {
    setConfirmDialog({
      isOpen: true,
      title: "Delete Customer",
      description: `Are you sure you want to delete ${customer.firstName} ${customer.lastName}? This action cannot be undone.`,
      confirmText: "Delete",
      cancelText: "Cancel",
      variant: "danger",
      onConfirm: {
        fn: async () => {
          await deleteMutation.mutateAsync(customer.id);
        },
      },
    });
  };

  return (
    <ActionMenu
      customer={customer}
      actions={[
        {
          label: "View Details",
          onClick: handleViewDetails,
          type: FIELD_TYPES.ITEM,
        },
        {
          label: "Edit Customer",
          onClick: handleEditCustomer,
          type: FIELD_TYPES.ITEM,
        },
        { type: FIELD_TYPES.SEPARATOR },
        { type: FIELD_TYPES.LABEL, label: "More Actions" },
        {
          label: "View Payment Details",
          disabled: true,
          type: FIELD_TYPES.ITEM,
        },
        { type: FIELD_TYPES.SEPARATOR },
        {
          label: "Delete Customer",
          onClick: handleDeleteCustomer,
          type: FIELD_TYPES.ITEM,
          className: "text-red-600 font-bold hover:text-red-800",
        },
      ]}
    />
  );
};

export default CustomerActionMenu;
