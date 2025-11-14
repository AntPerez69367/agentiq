import { useEffect } from "react";
import { useSetAtom } from "jotai";
import titleAtom from "@state/global/titleAtom";
import { FileText } from "lucide-react";

const PoliciesOverviewPage = () => {
  const setTitle = useSetAtom(titleAtom);

  useEffect(() => {
    setTitle("Policies");
  }, [setTitle]);

  return (
    <div className="flex flex-col items-center justify-center h-full">
      <FileText size={64} className="text-purple-400 mb-4" />
      <h2 className="text-2xl font-bold text-gray-100 mb-2">Policy Management</h2>
      <p className="text-gray-400">This feature is coming soon...</p>
    </div>
  );
};

export default PoliciesOverviewPage;
