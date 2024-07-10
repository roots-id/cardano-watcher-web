import { Button, Drawer, Label, Checkbox, TextInput } from "flowbite-react";
import { HiKey } from "react-icons/hi2";

interface IAidDrawer {
  isOpen: boolean;
  handleClose: () => void;
}

export function AidDrawer({ isOpen, handleClose }: IAidDrawer) {
  return (
    <>
      <Drawer
        className="bg-cardBg border-l border-t border-b border-cardColor"
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
          title="Create AID"
          titleIcon={HiKey}
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
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary"
                placeholder="Enter alias for identifier"
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
            <div className="mb-6 flex items-center gap-2">
              <Checkbox id="watched" />
              <label
                className="text-sm font-medium text-textColor"
                htmlFor="watched"
              >
                Watched?
              </label>
            </div>
            <div className="mb-6 flex items-center gap-2">
              <Checkbox id="cardano" />
              <label
                className="text-sm font-medium text-textColor"
                htmlFor="cardano"
              >
                Cardano?
              </label>
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
