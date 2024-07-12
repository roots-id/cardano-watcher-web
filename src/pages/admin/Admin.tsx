import { useState, useEffect } from "react";
import { Tabs, Spinner } from "flowbite-react";
import { HiOutlineUserGroup, HiKey } from "react-icons/hi";
import { watcherService } from "@services/watcher/watcher";
import { Witness } from "./witness";
import { Identifier } from "./identifier";

export function Admin() {
  const [activeTab, setActiveTab] = useState(0);
  const [isLoadingIdentifier, setIsLoadingIdentifier] = useState(false);
  const [isLoadingWitness, setIsLoadingWitness] = useState(false);
  const [identifiers, setIdentifiers] = useState<unknown>([]);
  const [witnesses, setWitnesses] = useState<unknown>([]);

  const fetchAdminData = async () => {
    if (activeTab === 0) {
      await fetchWitnesses();
    } else {
      await fetchIdentifiers();
    }
  };

  const fetchIdentifiers = async () => {
    setIsLoadingIdentifier(true);
    const _identifiers = await watcherService.listIdentifiers();
    setIdentifiers(_identifiers);
    setIsLoadingIdentifier(false);
  };
  const fetchWitnesses = async () => {
    setIsLoadingWitness(true);
    const _witnesses = await watcherService.listWitnesses();
    setWitnesses(_witnesses);
    setIsLoadingWitness(false);
  };

  useEffect(() => {
    fetchAdminData();
  }, [activeTab]);

  return (
    <Tabs
      aria-label="Admin tabs"
      variant="underline"
      onActiveTabChange={setActiveTab}
    >
      <Tabs.Item
        active={activeTab === 0}
        title="Witnesses"
        icon={isLoadingWitness ? (Spinner as any) : HiOutlineUserGroup}
      >
        <Witness isLoading={isLoadingWitness} witnesses={witnesses} onSuccess={fetchWitnesses} />
      </Tabs.Item>
      <Tabs.Item
        active={activeTab === 1}
        title="Identifiers"
        icon={isLoadingIdentifier ? (Spinner as any) : HiKey}
      >
        <Identifier isLoading={isLoadingIdentifier} identifiers={identifiers} onSuccess={fetchIdentifiers} />
      </Tabs.Item>
    </Tabs>
  );
}
