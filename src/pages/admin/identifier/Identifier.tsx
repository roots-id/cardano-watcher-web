import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { IdentifierDrawer } from "./IdentifierDrawer";
import { IdentifierTable } from "./IdentifierTable";

export function Identifier({ isLoading, identifiers, onSuccess }) {
  const [openAidDrawer, setOpenAidDrawer] = useState(false);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [isUpdatingIdentifier, setIsUpdatingIdentifier] = useState(false);

  const handleCloseAidDrawer = () => {
    setOpenAidDrawer(false);
  };

  return isLoading ? (
    <div className="flex flex-row justify-center">
      <Spinner size="xl" />
    </div>
  ) : (
    <>
      <div className="w-full flex flex-row justify-end p-2">
        <Button size="xs" onClick={() => setOpenAidDrawer(true)}>
          + Add New
        </Button>
      </div>
      <IdentifierDrawer
        isOpen={openAidDrawer}
        handleClose={handleCloseAidDrawer}
      />
      <IdentifierTable data={identifiers} />
    </>
  );
}
