import { useEffect, useMemo } from "react";
import { useAtom, useSetAtom } from "jotai";
import { atomWithQuery } from "jotai-tanstack-query";
import { useNavigate, useLocation } from "@tanstack/react-router";
import { customersApi } from "@api/customers";
import { queryKeys } from "@api/queryKeys";
import LoadingSpinner from "@components/common/LoadingSpinner";
import ErrorDisplay from "@components/common/ErrorDisplay";
import { Badge } from "@components/ui/badge";
import { Button } from "@components/ui/button";
import { Mail, Phone, MapPin, FileText, ArrowLeft } from "lucide-react";
import { ROUTES } from "@/constants/routes";
import titleAtom from "@/state/global/titleAtom";
import CustomerInfoCard from "./CustomerInfoCard";
import CustomerPoliciesSection from "./CustomerPoliciesSection";

const CustomerDetailPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const customerId = location.state?.customerId;

  const setTitle = useSetAtom(titleAtom);

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
          <CustomerInfoCard
            firstName={data.firstName}
            lastName={data.lastName}
            id={data.id}
            email={data.email}
            phoneNumber={data.phoneNumber}
            address={data.address}
          />
          <CustomerPoliciesSection policies={data.policies} />
        </>
      )}
    </div>
  );
};

export default CustomerDetailPage;
