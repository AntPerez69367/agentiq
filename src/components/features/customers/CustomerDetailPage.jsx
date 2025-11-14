import { useEffect, useMemo } from "react";
import { useAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useNavigate, useParams } from "@tanstack/react-router";
import { customersApi } from "@api/customers";
import { queryKeys } from "@api/queryKeys";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ErrorDisplay from "@components/common/ErrorDisplay";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Mail, Phone, MapPin, FileText, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import titleAtom from "@/state/global/titleAtom";

const CustomerDetailPage = () => {
  const { customerId } = useParams({ from: "/customers/$customerId" });
  const navigate = useNavigate();
  const [, setTitle] = useAtom(titleAtom);

  useEffect(() => {
    setTitle("Customer Details");
  }, [setTitle]);

  const customerDetailAtom = useMemo(
    () =>
      atomWithQuery(() => ({
        queryKey: queryKeys.customers.detail(customerId),
        queryFn: () => customersApi.getById(customerId),
        enabled: !!customerId,
      })),
    [customerId]
  );

  const [{ data, isPending, isError }] = useAtom(customerDetailAtom);

  const getPolicyStatusColor = (status) => {
    const colors = {
      active: "bg-green-500/20 text-green-400 border-green-500",
      inactive: "bg-gray-500/20 text-gray-400 border-gray-500",
      pending: "bg-yellow-500/20 text-yellow-400 border-yellow-500",
      cancelled: "bg-red-500/20 text-red-400 border-red-500",
    };
    return colors[status] || colors.inactive;
  };

  const handleBack = () => {
    navigate({ to: ROUTES.CUSTOMERS });
  };

  if (isPending) {
    return <LoadingSpinner text="Loading customer details..." />;
  }

  if (isError) {
    return (
      <ErrorDisplay
        title="Error loading customer"
        error={{ message: "Failed to fetch customer details." }}
        showRetry={false}
      />
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Back Button */}
      <div className="flex items-center gap-4">
        <Button
          onClick={handleBack}
          variant="ghost"
          className="flex items-center gap-2 hover:bg-gray-800"
        >
          <ArrowLeft size={20} />
          Back to Customers
        </Button>
      </div>

      {data && (
        <>
          {/* Customer Information */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <h3 className="text-xl font-semibold text-gray-100 mb-4">
              Personal Information
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label className="text-sm text-gray-400">Full Name</label>
                <p className="text-lg text-gray-100 font-medium">
                  {data.firstName} {data.lastName}
                </p>
              </div>
              <div>
                <label className="text-sm text-gray-400">Customer ID</label>
                <p className="text-lg text-gray-100 font-mono">{data.id}</p>
              </div>
            </div>

            <div className="mt-4 space-y-3">
              <div className="flex items-center gap-3 text-gray-100">
                <Mail size={18} className="text-purple-400" />
                <span>{data.email}</span>
              </div>
              <div className="flex items-center gap-3 text-gray-100">
                <Phone size={18} className="text-purple-400" />
                <span>{data.phoneNumber}</span>
              </div>
              <div className="flex items-start gap-3 text-gray-100">
                <MapPin size={18} className="text-purple-400 mt-1" />
                <span>{data.address}</span>
              </div>
            </div>
          </div>

          {/* Policies Section */}
          <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
            <div className="flex items-center gap-2 mb-4">
              <FileText size={24} className="text-purple-400" />
              <h3 className="text-xl font-semibold text-gray-100">
                Associated Policies
              </h3>
              <Badge variant="outline" className="ml-2">
                {data.policies?.length || 0}
              </Badge>
            </div>

            {!data.policies || data.policies.length === 0 ? (
              <div className="text-center py-8 text-gray-400">
                <FileText size={48} className="mx-auto mb-2 opacity-50" />
                <p>No policies found for this customer</p>
              </div>
            ) : (
              <div className="space-y-3">
                {data.policies.map((policy) => (
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
                            className={getPolicyStatusColor(
                              policy.policyStatus
                            )}
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
        </>
      )}
    </div>
  );
};

export default CustomerDetailPage;
