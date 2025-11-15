import { Badge } from "@components/ui/badge";

import { FileText } from "lucide-react";

const CustomerPoliciesSection = ({ policies = [] }) => {
  const getPolicyStatusColor = (status) => {
    const colors = {
      active: "bg-green-500/20 text-green-400 border-green-500",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
      cancelled: "bg-red-500/20 text-red-400 border-red-500",
    };
    return colors[status] || colors.inactive;
  };

  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <div className="flex items-center gap-2 mb-4">
        <FileText size={24} className="text-purple-400" />
        <h3 className="text-xl font-semibold text-gray-100">
          Associated Policies
        </h3>
        <Badge variant="outline" className="ml-2">
          {policies?.length || 0}
        </Badge>
      </div>

      {!policies || policies.length === 0 ? (
        <div className="text-center py-8 text-gray-400">
          <FileText size={48} className="mx-auto mb-2 opacity-50" />
          <p>No policies found for this customer</p>
        </div>
      ) : (
        <div className="space-y-3">
          {policies.map((policy) => (
            <div
              key={policy.id}
              className="bg-gray-900 border border-gray-700 rounded-lg p-4 hover:border-purple-500 transition-colors"
            >
              <div className="flex items-start justify-between mb-2">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <h4 className="text-lg font-semibold text-gray-100">
                      {policy.policyName}
                    </h4>
                    <Badge
                      className={getPolicyStatusColor(policy.policyStatus)}
                    >
                      {policy.policyStatus}
                    </Badge>
                  </div>
                  <p className="text-sm text-gray-400 font-mono">
                    #{policy.policyNumber}
                  </p>
                </div>
              </div>
              <p className="text-sm text-gray-300 mb-2">
                {policy.policyDescription}
              </p>
              <div className="flex items-center gap-2">
                <Badge variant="outline" className="text-xs">
                  {policy.policyType}
                </Badge>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default CustomerPoliciesSection;
