import { Button, Popover, Spinner } from "flowbite-react";
import { HiOutlineCreditCard, HiUserCircle } from "react-icons/hi2";
import { MdExtensionOff } from "react-icons/md";

export function LoginPopover({
  initialOpen,
  requestCredential,
  isLoading,
  installedExt,
}: {
  initialOpen: boolean;
  requestCredential: () => void;
  isLoading: boolean;
  installedExt?: string;
}) {
  return (
    <Popover
      aria-labelledby="login-popover"
      initialOpen={initialOpen}
      className="border-cardColor border rounded-lg"
      content={
        <div className="w-64 text-sm bg-cardBg text-textColor">
          <div className="border-b border-b-cardColor px-3 py-2 ">
            <h3 id="login-popover" className="font-semibold text-cardColor">
              Authentication
            </h3>
          </div>

          {installedExt ? (
            <>
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
            </>
          ) : (
            <>
              <div className="px-3 py-2 flex justify-center">
                <MdExtensionOff className="h-16 w-16" />
              </div>
              <div className="px-3 py-2">
                <p>Install a secure extension to communicate</p>
              </div>
            </>
          )}
        </div>
      }
    >
      <Button size="xs">
        <HiUserCircle className="h-4 w-4" />
      </Button>
    </Popover>
  );
}
