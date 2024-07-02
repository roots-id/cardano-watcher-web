import { Button, Popover, Spinner } from "flowbite-react";
import { HiOutlineCreditCard, HiUserCircle } from "react-icons/hi2";

export function LoginPopover({
  initialOpen,
  requestCredential,
  isLoading,
}: {
  initialOpen: boolean;
  requestCredential: () => void;
  isLoading: boolean;
}) {
  return (
    <Popover
      aria-labelledby="login-popover"
      initialOpen={initialOpen}
      content={
        <div className="w-64 text-sm text-gray-500 dark:text-gray-400">
          <div className="border-b border-gray-200 bg-gray-100 px-3 py-2 dark:border-gray-600 dark:bg-gray-700">
            <h3
              id="login-popover"
              className="font-semibold text-gray-900 dark:text-white"
            >
              Authentication
            </h3>
          </div>
          <div className="px-3 py-2">
            <p>Request signin to Signify Extension</p>
          </div>
          <div className="px-3 py-2">
            <Button size="xs" onClick={requestCredential}>
              {isLoading ? (
                <Spinner className="mr-1 h-4 w-4" />
              ) : (
                <HiOutlineCreditCard className="mr-1 h-4 w-4" />
              )}
              Request ID
            </Button>
          </div>
        </div>
      }
    >
      <Button size="xs">
        <HiUserCircle className="h-4 w-4" />
      </Button>
    </Popover>
  );
}
