import { AlertTriangle, RefreshCw, Home } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { ROUTES } from "@/constants";

const ErrorFallback = ({ error, resetError }) => {
  const isDevelopment = import.meta.env.DEV;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-900 p-6">
      <div className="max-w-2xl w-full bg-gray-800 border border-gray-700 rounded-lg p-8 shadow-xl">
        {/* Error Icon */}
        <div className="flex justify-center mb-6">
          <div className="bg-red-500/10 p-4 rounded-full">
            <AlertTriangle size={48} className="text-red-500" />
          </div>
        </div>

        {/* Error Title */}
        <h1 className="text-3xl font-bold text-gray-100 text-center mb-4">
          Oops! Something went wrong
        </h1>

        {/* Error Message */}
        <p className="text-gray-400 text-center mb-6">
          We apologize for the inconvenience. An unexpected error occurred.
        </p>

        {/* Error Details (Development Only) */}
        {isDevelopment && error && (
          <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 mb-6">
            <p className="text-sm font-mono text-red-400 mb-2">
              <strong>Error:</strong> {error.message}
            </p>
            {error.stack && (
              <details className="mt-2">
                <summary className="text-sm text-gray-400 cursor-pointer hover:text-gray-300">
                  Stack Trace
                </summary>
                <pre className="text-xs text-gray-500 mt-2 overflow-auto max-h-48">
                  {error.stack}
                </pre>
              </details>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <button
            onClick={resetError}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg transition-colors"
          >
            <RefreshCw size={20} />
            Try Again
          </button>

          <Link to={ROUTES.HOME}>
            <button className="flex items-center justify-center gap-2 px-6 py-3 bg-gray-700 hover:bg-gray-600 text-white font-semibold rounded-lg transition-colors w-full sm:w-auto">
              <Home size={20} />
              Go Home
            </button>
          </Link>
        </div>

        {/* Help Text */}
        <p className="text-sm text-gray-500 text-center mt-6">
          If this problem persists, please contact support.
        </p>
      </div>
    </div>
  );
};

export default ErrorFallback;
