import { DataTable } from "@/components/ui/data-table";
import columns from "./columns";

const EmployeeOverviewTable = ({ data, className }) => {
  return (
    <div className={`employee-overview-table ${className}`}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default EmployeeOverviewTable;
