import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import CustomerForm from "./CustomerForm";
import { useAtom } from "jotai";
import {
  editCustomerIsOpenAtom,
  createCustomerIsOpenAtom,
  selectedCustomerAtom,
} from "@state/customers/customerOverview";

const CustomerFormDialog = ({ trigger }) => {
  const [editCustomerIsOpen, setEditCustomerIsOpen] = useAtom(
    editCustomerIsOpenAtom
  );

  const [createCustomerIsOpen, setCreateCustomerIsOpen] = useAtom(
    createCustomerIsOpenAtom
  );

  const [customer, setSelectedCustomer] = useAtom(selectedCustomerAtom);

  const isEditMode = !!customer;

  const setDialogOpen = isEditMode
    ? setEditCustomerIsOpen
    : setCreateCustomerIsOpen;

  const handleSuccess = () => {
    setDialogOpen(false);
    setSelectedCustomer(null);
  };

  const handleOpenChange = (open) => {
    setDialogOpen(open);
    if (!open) {
      setSelectedCustomer(null);
    }
  };

  return (
    <Dialog
      open={isEditMode ? editCustomerIsOpen : createCustomerIsOpen}
      onOpenChange={() => handleOpenChange(false)}
    >
      {trigger}
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>
            {isEditMode ? "Edit Customer" : "Create New Customer"}
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Update customer information below."
              : "Fill in the details to create a new customer."}
          </DialogDescription>
        </DialogHeader>
        <CustomerForm customer={customer} onSuccess={handleSuccess} />
      </DialogContent>
    </Dialog>
  );
};

export default CustomerFormDialog;
