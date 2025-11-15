import { DataTable } from "@/components/ui/data-table";
import columns from "./columns";

const CustomerOverviewTable = ({ data, className }) => {
  return (
    <div className={`customer-overview-table ${className}`}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default CustomerOverviewTable;
