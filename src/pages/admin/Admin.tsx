import { useState, useEffect } from "react";
import { Tabs, Button, Spinner } from "flowbite-react";
import { HiOutlineUserGroup, HiKey } from "react-icons/hi";
import { watcherService } from "@services/watcher/watcher";
import { AidDrawer } from "./AidDrawer";
import { WitnessDrawer } from "./WitnessDrawer";
import { Identifiers } from "./Identifier";
import { Witnesses } from "./Witness";

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoadingIdentifier, setIsLoadingIdentifier] = useState(false);
  const [isLoadingWitness, setIsLoadingWitness] = useState(false);
  const [identifiers, setIdentifiers] = useState<unknown>([]);
  const [witnesses, setWitnesses] = useState<unknown>([]);

  const [openAidDrawer, setOpenAidDrawer] = useState(false);
  const [openWitnessDrawer, setOpenWitnessDrawer] = useState(false);

  const handleCloseAidDrawer = () => {
    setOpenAidDrawer(false);
  };
  const handleCloseWitnessDrawer = () => {
    setOpenWitnessDrawer(false);
  };
  const fetchAdminData = async () => {
    if (activeTab === 0) {
      setIsLoadingWitness(true);
      const _witnesses = await watcherService.listWitnesses();
      console.log("witnesses", witnesses);
      setWitnesses(_witnesses);
      setIsLoadingWitness(false);
    } else {
      setIsLoadingIdentifier(true);
      const _identifiers = await watcherService.listIdentifiers();
      setIdentifiers(_identifiers);
      setIsLoadingIdentifier(false);
    }
  };

  useEffect(() => {
    fetchAdminData();
  }, [activeTab]);

  return (
    <Tabs
      aria-label="Default tabs"
      variant="default"
      onActiveTabChange={setActiveTab}
    >
      <Tabs.Item
        active={activeTab === 0}
        title="Witnesses"
        icon={isLoadingWitness ? (Spinner as any) : HiOutlineUserGroup}
      >
        {isLoadingWitness ? (
          <div className="flex flex-row justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-row justify-end">
              <Button onClick={() => setOpenWitnessDrawer(true)} size="xs">
                + Add New
              </Button>
            </div>
            <WitnessDrawer
              isOpen={openWitnessDrawer}
              handleClose={handleCloseWitnessDrawer}
            />
            <Witnesses data={witnesses} />
          </>
        )}
      </Tabs.Item>
      <Tabs.Item
        active={activeTab === 1}
        title="Identifiers"
        icon={isLoadingIdentifier ? (Spinner as any) : HiKey}
      >
        {isLoadingIdentifier ? (
          <div className="flex flex-row justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-row justify-end">
              <Button size="xs" onClick={() => setOpenAidDrawer(true)}>
                + Add New
              </Button>
            </div>
            <AidDrawer
              isOpen={openAidDrawer}
              handleClose={handleCloseAidDrawer}
            />
            <Identifiers data={identifiers} />
          </>
        )}
      </Tabs.Item>
    </Tabs>
  );
}
