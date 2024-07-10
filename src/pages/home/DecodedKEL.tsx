import { useEffect, useState, useRef } from "react";
import "@plugins/cesr-decoder/docs/assets/local/styles/decoder.css";
import { parsed } from "@plugins/cesr-decoder/docs/assets/local/modules/document-promises";
import {
  getCesrValue,
  getCesrFrame,
} from "@plugins/cesr-decoder/docs/assets/common/modules/cesr.js";
import { Utf8 } from "@plugins/cesr-decoder/docs/assets/local/modules/utf8.js";
import {
  DecoderUi,
  DecoderState,
} from "@plugins/cesr-decoder/docs/assets/local/modules/decoder-ui.js";
import { CesrSchemaProtocol } from "@plugins/cesr-decoder/docs/assets/common/modules/cesr-schema.js";
import { Spinner } from "flowbite-react";

export function DecodedKEL({ kel }: { kel: string }) {
  const reportRef = useRef();
  const [status, setStatus] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const [statusClasses, setStatusClasses] = useState("");
  const [interleaved, setInterleaved] = useState(true);

  useEffect(() => {
    if (kel) {
      handleDecodeKEL();
    }
  }, [kel]);

  const handleDecodeKEL = async () => {
    setIsLoading(true);
    await decodeKEL();
    setIsLoading(false);
  };
  const decodeKEL = async () => {
    const protocol_promise = await CesrSchemaProtocol.load("Matter", "Counter");
    console.log("protocol_promise", protocol_promise);
    await parsed;
    
    if (reportRef.current) {
      reportRef.current.innerHTML = "";
    }
    setStatusClasses("");

    const buffer = Utf8.encode(kel);
    const state = new DecoderState(reportRef.current);
    state.currentFrame.valueGetter = interleaved ? getCesrFrame : getCesrValue;
    const decoder = new DecoderUi(await protocol_promise);
    try {
      for (const code of decoder.values(state, buffer)) {
        console.log(code);
      }
    } catch (e) {
      console.error(`CESR decode failed: ${e}`);
      setStatus(`CESR decode failed: ${e}`);
      setStatusClasses("error");
    }
  };

  return (
    <>
      {isLoading ? <Spinner size="lg" /> : null}
      <div>
        <textarea
          name="kel"
          rows={12}
          className="rounded-lg border-cardColor bg-bodyBg text-textColor border w-full"
          value={kel}
          disabled
        ></textarea>
      </div>
      <div id="status" className={statusClasses}>
        {status}
      </div>
      <div ref={reportRef}></div>
    </>
  );
}
