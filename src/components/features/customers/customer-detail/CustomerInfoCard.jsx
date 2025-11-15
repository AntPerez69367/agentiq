import { Mail, Phone, MapPin } from "lucide-react";

const CustomerInfoCard = ({
  firstName,
  lastName,
  id,
  email,
  phoneNumber,
  address,
}) => {
  return (
    <div className="bg-gray-800 rounded-lg p-6 border border-gray-700">
      <h3 className="text-xl font-semibold text-gray-100 mb-4">
        Personal Information
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="text-sm text-gray-400">Full Name</label>
          <p className="text-lg text-gray-100 font-medium">
            {firstName} {lastName}
          </p>
        </div>
        <div>
          <label className="text-sm text-gray-400">Customer ID</label>
          <p className="text-lg text-gray-100 font-mono">{id}</p>
        </div>
      </div>

      <div className="mt-4 space-y-3">
        <div className="flex items-center gap-3 text-gray-100">
          <Mail size={18} className="text-purple-400" />
          <span>{email}</span>
        </div>
        <div className="flex items-center gap-3 text-gray-100">
          <Phone size={18} className="text-purple-400" />
          <span>{phoneNumber}</span>
        </div>
        <div className="flex items-start gap-3 text-gray-100">
          <MapPin size={18} className="text-purple-400 mt-1" />
          <span>{address}</span>
        </div>
      </div>
    </div>
  );
};

export default CustomerInfoCard;
