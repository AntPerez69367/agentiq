import { useNavigate } from "@tanstack/react-router";
import ActionMenu, { FIELD_TYPES } from "@/components/ui/action-menu";

import {
  editCustomerIsOpenAtom,
  selectedCustomerAtom,
  deleteCustomerIsOpenAtom,
  customerToDeleteAtom,
} from "@state/customers/customerOverview";

import { useAtom } from "jotai";

const CustomerActionMenu = ({ customer }) => {
  const navigate = useNavigate();
  const [, setEditCustomerIsOpen] = useAtom(editCustomerIsOpenAtom);
  const [, setSelectedCustomer] = useAtom(selectedCustomerAtom);
  const [, setDeleteCustomerIsOpen] = useAtom(deleteCustomerIsOpenAtom);
  const [, setCustomerToDelete] = useAtom(customerToDeleteAtom);

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
    setCustomerToDelete(customer);
    setDeleteCustomerIsOpen(true);
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
