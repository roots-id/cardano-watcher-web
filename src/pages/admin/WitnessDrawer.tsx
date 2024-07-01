import { Button, Drawer, Label, Checkbox, TextInput } from "flowbite-react";
import { HiUserCircle } from "react-icons/hi2";

interface IAidDrawer {
  isOpen: boolean;
  handleClose: () => void;
}

export function WitnessDrawer({ isOpen, handleClose }: IAidDrawer) {
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="right">
        <Drawer.Header title="Create Witness" titleIcon={HiUserCircle} />
        <Drawer.Items>
          <form action="#">
            <div className="mb-6 mt-3">
              <Label htmlFor="alias" className="mb-2 block">
                Alias
              </Label>
              <TextInput
                id="alias"
                name="alias"
                placeholder="Enter alias for identifier"
                type="text"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="prefix" className="mb-2 block">
                Prefix
              </Label>
              <TextInput
                id="prefix"
                name="prefix"
                value="BOUZ4v-vPMP5KyZQP-d_8B30UHI4KWgXczBgWcRJnnYd"
                disabled
                placeholder="Enter prefix"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="oobi" className="mb-2 block">
                OOBI
              </Label>
              <TextInput id="oobi" name="oobi" placeholder="Enter OOBI url" />
            </div>
            <div className="mb-6">
              <Label htmlFor="provider" className="mb-2 block">
                Provider
              </Label>
              <TextInput
                id="provider"
                name="provider"
                placeholder="Enter provider name"
              />
            </div>
            <div className="mb-6">
              <Label htmlFor="referral" className="mb-2 block">
                Referral
              </Label>
              <TextInput
                id="referral"
                name="referral"
                placeholder="Has anyone referred you?"
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
