import CustomerFormDialog from "./customer-form";
import CustomerOverviewPage from "./customer-overview";
import DeleteCustomerDialog from "./customer-delete";

const Customers = () => (
  <>
    <CustomerOverviewPage />
    <CustomerFormDialog />
    <DeleteCustomerDialog />
  </>
);

export default Customers;
