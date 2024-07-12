import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { watcherService } from "@services/watcher/watcher";
import { IdentifierDrawer } from "./IdentifierDrawer";
import { IdentifierTable } from "./IdentifierTable";

export function Identifier({ isLoading, identifiers, onSuccess }) {
  const [openIdentifierDrawer, setOpenIdentifierDrawer] = useState(false);
  const [selectedIdentifier, setSelectedIdentifier] = useState(null);
  const [isUpdatingIdentifier, setIsUpdatingIdentifier] = useState(false);
  const [isDeletingIdentifier, setIsDeletingIdentifier] = useState(false);

  const handleCloseIdentifierDrawer = () => {
    setSelectedIdentifier(null);
    setOpenIdentifierDrawer(false);
  };

  const handleEditIdentifier = (item) => {
    setSelectedIdentifier(item);
    setOpenIdentifierDrawer(true);
  };

  const handleSubmit = async (item) => {
    setIsUpdatingIdentifier(true);
    if (item?.prefix) {
      await watcherService.updateIdentifier(item);
    } else {
      await watcherService.createIdentifier(item);
    }
    setIsUpdatingIdentifier(false);
    handleCloseIdentifierDrawer();
    onSuccess();
  };

  const handleDelete = async (item) => {
    if (item?.prefix) {
      setIsDeletingIdentifier(true);
      await watcherService.deleteIdentifier(item.prefix);
      setIsUpdatingIdentifier(false);
      handleCloseIdentifierDrawer();
      onSuccess();
    }
  };

  return isLoading ? (
    <div className="flex flex-row justify-center">
      <Spinner size="xl" />
    </div>
  ) : (
    <>
      <div className="w-full flex flex-row justify-end p-2">
        <Button size="xs" onClick={() => setOpenIdentifierDrawer(true)}>
          + Add New
        </Button>
      </div>
      <IdentifierDrawer
        isOpen={openIdentifierDrawer}
        handleClose={handleCloseIdentifierDrawer}
        identifier={selectedIdentifier}
        mode={selectedIdentifier ? "edit" : "create"}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        isDeleting={isDeletingIdentifier}
        isUpdating={isUpdatingIdentifier}
      />
      <IdentifierTable data={identifiers} handleEdit={handleEditIdentifier} />
    </>
  );
}
