import { useState, useEffect } from "react";
import { Tabs, Button, Spinner } from "flowbite-react";
import { HiUserCircle, HiKey } from "react-icons/hi";
import { watcherService } from "@services/watcher/watcher";
import { Identifiers } from "./Identifier";
import { Witnesses } from "./Witness";

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoadingIdentifier, setIsLoadingIdentifier] = useState(false);
  const [isLoadingWitness, setIsLoadingWitness] = useState(false);
  const [identifiers, setIdentifiers] = useState<unknown>([]);
  const [witnesses, setWitnesses] = useState<unknown>([]);

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
        icon={isLoadingWitness ? (Spinner as any) : HiUserCircle}
      >
        {isLoadingWitness ? (
          <div className="flex flex-row justify-center">
            <Spinner size="xl" />
          </div>
        ) : (
          <>
            <div className="w-full flex flex-row justify-end">
              <Button size="xs">+ Add New</Button>
            </div>
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
              <Button size="xs">+ Add New</Button>
            </div>
            <Identifiers data={identifiers} />
          </>
        )}
      </Tabs.Item>
    </Tabs>
  );
}
