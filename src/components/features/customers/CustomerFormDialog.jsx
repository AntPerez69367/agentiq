import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@components/ui/dialog";
import CustomerForm from "./CustomerForm";

const CustomerFormDialog = ({
  customer = null,
  trigger,
  open,
  onOpenChange,
}) => {
  const isEditMode = !!customer;
  const [isOpen, setIsOpen] = useState(false);

  const dialogOpen = open !== undefined ? open : isOpen;
  const setDialogOpen = onOpenChange || setIsOpen;

  const handleSuccess = () => {
    setDialogOpen(false);
  };

  return (
    <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
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
