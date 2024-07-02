import { Button, Popover } from "flowbite-react";
import { HiOutlineCreditCard, HiUserCircle } from "react-icons/hi2";

export function CredPopover({ initialOpen }: { initialOpen: boolean }) {
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
              Credential Info
            </h3>
          </div>
          <div className="px-3 py-2 font-bold">
            <p>Legal Entity Official Organizational Role vLEI Credential</p>
          </div>
          <div className="px-3 py-2 italic">
            <p>
              A vLEI Role Credential issued by a Qualified vLEI issuer to
              official representatives of a Legal Entity
            </p>
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
