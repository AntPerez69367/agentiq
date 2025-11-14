import { AlertCircle, RefreshCw } from "lucide-react";

const ErrorDisplay = ({
  error,
  title = "Error loading data",
  onRetry,
  showRetry = true
}) => {
  return (
    <div className="flex flex-col items-center justify-center p-8 bg-gray-800 border border-gray-700 rounded-lg">
      <div className="bg-red-500/10 p-3 rounded-full mb-4">
        <AlertCircle size={32} className="text-red-500" />
      </div>

      <h3 className="text-xl font-semibold text-gray-100 mb-2">{title}</h3>

      {error?.message && (
        <p className="text-gray-400 text-sm mb-4 text-center max-w-md">
          {error.message}
        </p>
      )}

      {showRetry && onRetry && (
        <button
          onClick={onRetry}
          className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white font-medium rounded-lg transition-colors"
        >
          <RefreshCw size={16} />
          Try Again
        </button>
      )}
    </div>
  );
};

export default ErrorDisplay;
