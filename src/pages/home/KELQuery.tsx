import { useState } from "react";
import { Button, Card } from "flowbite-react";
import { watcherService, IKELDto } from "@services/watcher/watcher";
import { DecodedKEL } from "./DecodedKEL";

export function KELQuery() {
  const [isLoading, setIsLoading] = useState(false);
  const [kelReports, setKelReports] = useState<IKELDto[]>([]);

  const [prefix, setPrefix] = useState("");

  // window.addEventListener("hashchange", async (e) => {
  //   if (location.hash !== "") {
  //     setPrefix(new URL(location.hash.substr(1), location.href).toString());
  //     setInterleaved(true);
  //     const u = new URL(location.href);
  //     u.hash = "";
  //     history.replaceState(null, "", u.toString());
  //     queryKEL(e);
  //   } else {
  //     setPrefix("");
  //     handleReset();
  //   }
  // });

  const queryKEL = async () => {
    setIsLoading(true);
    const _resp = await watcherService.getKEL(prefix);
    console.log("resp", _resp);
    setKelReports(_resp);
    setIsLoading(false);
  };

  const handleURIKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      queryKEL();
    }
  };

  return (
    <>
      <div className="flex flex-row gap-x-2 items-center">
        <div className="w-full relative">
          <input
            name="prefix"
            placeholder="Enter AID prefix to query..."
            className="px-4 py-3 border-gray-200 border rounded-lg w-full"
            value={prefix}
            onChange={(e) => setPrefix(e.target.value)}
            onKeyUp={handleURIKeyPress}
          />
        </div>
        <Button
          isProcessing={isLoading}
          name="fetch"
          color="dark"
          onClick={queryKEL}
        >
          {isLoading ? "..." : "Query"}
        </Button>
      </div>
      <div>
        {kelReports.map((report, idx) => (
          <Card key={idx} className=" my-4">
            <DecodedKEL kel={report.kel} />
          </Card>
        ))}
      </div>
    </>
  );
}
