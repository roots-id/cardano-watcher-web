import { useState } from "react";
import { Button, Spinner } from "flowbite-react";
import { watcherService } from "@services/watcher/watcher";
import { WitnessDrawer } from "./WitnessDrawer";
import { WitnessesTable } from "./WitnessTable";

export function Witness({ isLoading, witnesses, onSuccess }) {
  const [openWitnessDrawer, setOpenWitnessDrawer] = useState(false);
  const [selectedWitness, setSelectedWitness] = useState(null);
  const [isUpdatingWitness, setIsUpdatingWitness] = useState(false);
  const [isDeletingWitness, setIsDeletingWitness] = useState(false);

  const handleCloseWitnessDrawer = () => {
    setSelectedWitness(null);
    setOpenWitnessDrawer(false);
  };

  const handleEditWitness = (item) => {
    setSelectedWitness(item);
    setOpenWitnessDrawer(true);
  };

  const handleSubmit = async (item) => {
    setIsUpdatingWitness(true);
    if (item?.prefix) {
      await watcherService.updateWitness(item);
    } else {
      await watcherService.createWitness(item);
    }
    setIsUpdatingWitness(false);
    handleCloseWitnessDrawer();
    onSuccess();
  };

  const handleDelete = async (item) => {
    if (item?.prefix) {
      setIsDeletingWitness(true);
      await watcherService.deleteWitness(item.prefix);
      setIsUpdatingWitness(false);
      handleCloseWitnessDrawer();
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
        <Button onClick={() => setOpenWitnessDrawer(true)} size="xs">
          + Add New
        </Button>
      </div>
      <WitnessDrawer
        isOpen={openWitnessDrawer}
        handleClose={handleCloseWitnessDrawer}
        witness={selectedWitness}
        mode={selectedWitness ? "edit" : "create"}
        handleSubmit={handleSubmit}
        handleDelete={handleDelete}
        isDeleting={isDeletingWitness}
        isUpdating={isUpdatingWitness}
      />
      <WitnessesTable data={witnesses} handleEdit={handleEditWitness} />
    </>
  );
}
