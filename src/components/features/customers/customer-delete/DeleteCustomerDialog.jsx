import {
  deleteCustomerIsOpenAtom,
  customerToDeleteAtom,
} from "@/state/customers/customerOverview";
import { deleteCustomerMutation } from "@/state/customers/customerMutations";
import { useAtom } from "jotai";
import {
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogTitle,
  AlertDialogDescription,
} from "@/components/ui/alert-dialog";

const DeleteCustomerDialog = () => {
  const [isOpen, setIsOpen] = useAtom(deleteCustomerIsOpenAtom);
  const [customer, setCustomer] = useAtom(customerToDeleteAtom);
  const [deleteMutation] = useAtom(deleteCustomerMutation);

  const handleConfirmDelete = async () => {
    if (customer) {
      await deleteMutation.mutateAsync(customer.id);
      setCustomer(null);
    }
    setIsOpen(false);
  };

  const handleCancel = () => {
    setCustomer(null);
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogOverlay className="fixed inset-0 bg-black/60" />
      <AlertDialogContent className="fixed top-1/2 left-1/2 w-[90vw] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-lg bg-white p-6 shadow-lg">
        <AlertDialogTitle className="text-lg font-medium text-gray-900">
          Delete Customer
        </AlertDialogTitle>
        <AlertDialogDescription className="mt-2 text-sm text-gray-600">
          Are you sure you want to delete the customer "{customer?.firstName}{" "}
          {customer?.lastName}"? This action cannot be undone.
        </AlertDialogDescription>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            onClick={handleCancel}
            className="rounded bg-gray-200 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-300"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirmDelete}
            className="rounded bg-red-600 px-4 py-2 text-sm font-medium text-white hover:bg-red-700"
          >
            Delete
          </button>
        </div>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default DeleteCustomerDialog;
