import { Button, Popover } from "flowbite-react";
import { HiOutlineCreditCard, HiUserCircle } from "react-icons/hi2";

export function ProfilePopover({
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
      className="border-cardColor border rounded-lg"
      content={
        <div className="w-64 text-sm bg-cardBg text-textColor">
          <div className="border-b border-b-cardColor px-3 py-2">
            <h3
              id="aid-popover"
              className="font-semibold text-cardColor flex flex-row items-center"
            >
              <HiOutlineCreditCard className="mr-1 h-6 w-6" />
              Profile Info
            </h3>
          </div>
          <div className="px-3 font-bold text-cardColor">
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
