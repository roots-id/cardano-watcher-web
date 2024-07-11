import { Button, Drawer, TextInput } from "flowbite-react";
import { HiOutlineUserGroup } from "react-icons/hi2";

interface IAidDrawer {
  isOpen: boolean;
  handleClose: () => void;
}

export function WitnessDrawer({ isOpen, handleClose }: IAidDrawer) {
  return (
    <>
      <Drawer
        className="bg-cardBg border-l border-t border-b  border-cardColor"
        open={isOpen}
        onClose={handleClose}
        position="right"
      >
        <Drawer.Header
          theme={{
            inner: {
              titleText:
                "mb-4 inline-flex items-center text-base font-semibold text-cardColor",
            },
          }}
          title="Create Witness"
          titleIcon={HiOutlineUserGroup}
        />
        <Drawer.Items>
          <form action="#">
            <div className="mb-6 mt-3">
              <label
                className="mb-2 block text-sm font-medium text-textColor"
                htmlFor="alias"
              >
                Alias
              </label>
              <input
                id="alias"
                name="alias"
                className="text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary focus:outline-none focus:ring-0"
                placeholder="Enter alias for witness"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="prefix"
                className="mb-2 block text-sm font-medium text-textColor"
              >
                Prefix
              </label>
              <input
                id="prefix"
                name="prefix"
                value="BOUZ4v-vPMP5KyZQP-d_8B30UHI4KWgXczBgWcRJnnYd"
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                disabled
                placeholder="Enter prefix"
                type="text"
              />
              
            </div>
            <div className="mb-6">
              <label
                htmlFor="oobi"
                className="mb-2 block text-sm font-medium text-textColor"
              >
                OOBI
              </label>
              <input
                id="oobi"
                name="oobi"
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter OOBI url"
                type="text"
              />
              
            </div>
            <div className="mb-6">
              <label
                htmlFor="provider"
                className="mb-2 block text-sm font-medium text-textColor"
              >
                Provider
              </label>
              <input
                id="provider"
                name="provider"
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter provider name"
                type="text"
              />
            </div>
            <div className="mb-6">
              <label
                htmlFor="referral"
                className="mb-2 block text-sm font-medium text-textColor"
              >
                Referral
              </label>
              <input
                id="referral"
                name="referral"
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Has anyone referred you?"
                type="text"
              />
            </div>
            <div className="mb-6">
              <Button type="submit" className="w-full">
                Create
              </Button>
            </div>
            <div className="mb-6">
              <Button color="red" className="w-full">
                Delete
              </Button>
            </div>
            {/* <p className="mb-2 text-sm text-gray-500 dark:text-gray-400">
              <a href="mailto:info@company.com" className="hover:underline">
                info@company.com
              </a>
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              <a href="tel:2124567890" className="hover:underline">
                212-456-7890
              </a>
            </p> */}
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
