import { useState, useEffect } from "react";
import { Button, Drawer, Checkbox, Badge } from "flowbite-react";
import { HiKey } from "react-icons/hi2";
import { extractPrefix } from "@services/watcher/watcher";

interface IIdentifierDrawer {
  isOpen: boolean;
  handleClose: () => void;
  identifier?: any;
  mode?: "create" | "edit";
  handleSubmit: (data: any) => void;
  handleDelete: (data: any) => void;
  isUpdating: boolean;
  isDeleting: boolean;
}

export function IdentifierDrawer({
  isOpen,
  handleClose,
  identifier,
  mode = "create",
  handleSubmit = () => {},
  isUpdating,
  handleDelete,
  isDeleting,
}: IIdentifierDrawer) {
  const [alias, setAlias] = useState("");
  const [prefix, setPrefix] = useState("");
  const [oobi, setOOBI] = useState("");
  const [cardano, setCardano] = useState(false);
  const [watched, setWatched] = useState(false);

  const [aliasError, setAliasError] = useState("");
  const [oobiError, setOOBIError] = useState("");

  const isEdit = mode === "edit";

  useEffect(() => {
    if (identifier && isEdit) {
      setAlias(identifier.alias);
      setPrefix(identifier.prefix);
      setOOBI(identifier.oobi);
      setCardano(identifier.cardano);
      setWatched(identifier.watched);
    } else {
      setAlias("");
      setPrefix("");
      setOOBI("");
      setCardano(false);
      setWatched(false);
    }
    setAliasError("");
    setOOBIError("");
  }, [identifier]);

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
    if (!alias) {
      setAliasError("Alias is required");
      hasError = true;
    } else {
      setAliasError("");
    }
    
    hasError = hasError || validateOOBI();

    return hasError;
  };

  const onSubmit = () => {
    if (validate()) {
      return;
    }
    handleSubmit({ alias, prefix, cardano, oobi, watched });
  };

  const onDelete = () => {
    if (!isUpdating && !isDeleting) {
      handleDelete({ alias, prefix, cardano, oobi, watched });
    }
  };

  return (
    <>
      <Drawer
        className="bg-cardBg border-l border-t border-b border-cardColor"
        open={isOpen}
        onClose={handleClose}
        position="right"
        backdrop={false}
      >
        <Drawer.Header
          theme={{
            inner: {
              titleText:
                "mb-4 inline-flex items-center text-base font-semibold text-cardColor",
            },
          }}
          title={isEdit ? "Edit AID" : "Create AID"}
          titleIcon={HiKey}
        />
        <Drawer.Items>
          <form action="#">
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
                className="focus:outline-none focus:ring-0 text-textColor border w-full rounded border-cardColor bg-cardBg focus:border-primary"
                placeholder="Enter alias for identifier"
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
            <div className="mb-6 flex items-center gap-2">
              <Checkbox
                id="watched"
                checked={watched}
                onClick={() => setWatched(!watched)}
              />
              <label
                className="text-sm font-medium text-textColor"
                htmlFor="watched"
              >
                Watched?
              </label>
            </div>
            <div className="mb-6 flex items-center gap-2">
              <Checkbox
                id="cardano"
                checked={cardano}
                onClick={() => setCardano(!cardano)}
              />
              <label
                className="text-sm font-medium text-textColor"
                htmlFor="cardano"
              >
                Cardano?
              </label>
            </div>
            <div className="mb-6">
              <Button
                type="button"
                isProcessing={isUpdating}
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
