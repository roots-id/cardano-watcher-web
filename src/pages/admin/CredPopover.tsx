import { Button, Popover } from "flowbite-react";
import { HiOutlineCreditCard, HiUserCircle } from "react-icons/hi2";

export function CredPopover({
  initialOpen,
  prefix,
}: {
  initialOpen: boolean;
  prefix: string;
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
              className="font-semibold text-gray-900 dark:text-white flex flex-row items-center"
            >
              <HiOutlineCreditCard className="mr-1 h-6 w-6" />
              Profile Info
            </h3>
          </div>
          <div className="px-3 font-bold">
            <p>AID</p>
          </div>
          <div className="px-3 pb-2 break-words italic">
            <p>{prefix}</p>
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
