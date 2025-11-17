import { DataTable } from "@/components/ui/data-table";
import columns from "./columns";

const PolicyOverviewTable = ({ data, className }) => {
  return (
    <div className={`policy-overview-table ${className}`}>
      <DataTable columns={columns} data={data} />
    </div>
  );
};

export default PolicyOverviewTable;
