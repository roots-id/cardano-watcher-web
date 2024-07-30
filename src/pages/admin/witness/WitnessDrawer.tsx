import { useState, useEffect } from "react";
import { Button, Drawer, Badge } from "flowbite-react";
import { HiOutlineUserGroup } from "react-icons/hi2";
import { extractPrefix } from "@services/watcher/watcher";

interface IWitnessDrawer {
  isOpen: boolean;
  handleClose: () => void;
  witness?: any;
  mode?: "create" | "edit";
  handleSubmit: (data: any) => void;
  handleDelete: (data: any) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function WitnessDrawer({
  isOpen,
  handleClose,
  witness,
  mode = "create",
  handleSubmit = () => {},
  isUpdating,
  handleDelete,
  isDeleting,
}: IWitnessDrawer) {
  const [alias, setAlias] = useState("");
  const [prefix, setPrefix] = useState("");
  const [oobi, setOOBI] = useState("");
  const [provider, setProvider] = useState("");
  const [referral, setReferral] = useState("");

  const [aliasError, setAliasError] = useState("");
  const [oobiError, setOOBIError] = useState("");
  const [providerError, setProviderError] = useState("");
  const [referralError, setReferralError] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (witness && isEdit) {
      setAlias(witness.alias);
      setPrefix(witness.prefix);
      setOOBI(witness.oobi);
      setProvider(witness.provider);
      setReferral(witness.referral);
    } else {
      setAlias("");
      setPrefix("");
      setOOBI("");
      setProvider("");
      setReferral("");
    }
    setAliasError("");
    setOOBIError("");
    setProviderError("");
    setReferralError("");
  }, [witness]);

  const validateOOBI = () => {
    let hasError = false;
    if (!oobi) {
      setOOBIError("OOBI is required");
      hasError = true;
    } else if (!isEdit && oobi) {
      const _prefix = extractPrefix(oobi);
      if (_prefix) {
        setPrefix(_prefix);
        setOOBIError("");
      } else {
        setOOBIError("OOBI must contain prefix");
        hasError = true;
      }
    }
    return hasError;
  };

  const validate = () => {
    let hasError = false;
    if (!alias || !provider || !referral) {
      setAliasError(alias ? "" : "Alias is required");
      setProviderError(provider ? "" : "Provider is required");
      setReferralError(referral ? "" : "Referral is required");
      hasError = true;
    }

    hasError = hasError || validateOOBI();

    return hasError;
  };

  const onSubmit = () => {
    if (validate()) {
      return;
    }
    handleSubmit({ alias, prefix, provider, oobi, referral });
  };

  const onDelete = () => {
    if (!isUpdating && !isDeleting) {
      handleDelete({ alias, prefix, provider, oobi, referral });
    }
  };

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
          title={isEdit ? "Edit Witness" : "Create Witness"}
          titleIcon={HiOutlineUserGroup}
        />
        <Drawer.Items>
          <form>
            {prefix ? (
              <Badge className="break-all bg-cardBg text-cardColor border border-cardColor">
                {prefix}
              </Badge>
            ) : null}

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
                value={alias}
                className="text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary focus:outline-none focus:ring-0"
                placeholder="Enter alias for witness"
                type="text"
                onChange={(e) => {
                  setAlias(e.target.value);
                  setAliasError("");
                }}
              />
              {aliasError ? (
                <p className="text-red-500 text-xs mt-1">{aliasError}</p>
              ) : null}
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
                value={oobi}
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter OOBI url"
                type="text"
                onChange={(e) => {
                  setOOBI(e.target.value);
                  setOOBIError("");
                }}
                onBlur={validateOOBI}
              />
              {oobiError ? (
                <p className="text-red-500 text-xs mt-1">{oobiError}</p>
              ) : null}
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
                value={provider}
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Enter provider name"
                type="text"
                onChange={(e) => {
                  setProvider(e.target.value);
                  setProviderError("");
                }}
              />
              {providerError ? (
                <p className="text-red-500 text-xs mt-1">{providerError}</p>
              ) : null}
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
                value={referral}
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Has anyone referred you?"
                type="text"
                onChange={(e) => {
                  setReferral(e.target.value);
                  setReferralError("");
                }}
              />
              {referralError ? (
                <p className="text-red-500 text-xs mt-1">{referralError}</p>
              ) : null}
            </div>
            <div className="mb-6">
              <Button
                isProcessing={isUpdating}
                type="button"
                className="w-full"
                onClick={onSubmit}
              >
                {isEdit ? "Update" : "Create"}
              </Button>
            </div>
            {isEdit ? (
              <div className="mb-6">
                <Button
                  onClick={onDelete}
                  type="button"
                  color="red"
                  className="w-full"
                  isProcessing={isDeleting}
                >
                  Delete
                </Button>
              </div>
            ) : null}
          </form>
        </Drawer.Items>
      </Drawer>
    </>
  );
}
