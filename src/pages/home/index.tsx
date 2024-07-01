import { Button } from "flowbite-react";
import { Metrics } from "./Metrics";

export function Home() {
  return (
    <>
      <Metrics />
      <div className="flex flex-row gap-x-2 items-center">
        <input
          placeholder="Enter AID prefix to query..."
          className="px-4 py-3 border-gray-200 border rounded-lg w-full"
        />
        <Button color="dark">Query</Button>
      </div>
      <textarea
        rows={12}
        cols={120}
        className="rounded-lg border-gray-200 border"
        disabled
        value={
          '{"v":"KERI10JSON000160_","t":"rot","d":"EBzdEaiAgJuhs7V6ERDkjPrRezUv1RgK8uvX8U6ilWUT","i":"ENXiaO-jdN1OZaJfnsOL6_maeHaVCFk0A7S2dljBf07M","s":"1","p":"ENXiaO-jdN1OZaJfnsOL6_maeHaVCFk0A7S2dljBf07M","kt":"1","k":["DAF7LUyZcqzRfQ142cziSXWmP9YAlNrca7Veyj57iurA"],"nt":"1","n":["ECcDnRv7YxEbSKDO-kk6yeR6n9U6FhPYNjaIx82uowrZ"],"bt":"2","br":[],"ba":[],"a":[]}-VBU-AABAACt-9JvEj1RvW-mFWGOSzXoEez1Z0HdlpDObSPrk0oS5X15uQZKcEXClxMdtktCO9hSKiTVXQd5KWcR5YQOS8EG-BACAADJ40dJJ2Uqas4soqgEjUXCOFx8W2EPicV-w97tMgsDZTqsEDpm90L8ClNayUja6hgObZwkjM8QJsS0hxjI65gGABDfTsK2DYtlnUa0DXqpR73DipT3RdlsrfS8p8fDK1wSmnzGkrKK5YIDhDK9AzLT6onSA7dcNWA3VV3Z8ZY_meYD-EAB0AAAAAAAAAAAAAAAAAAAAAAB1AAG2024-06-01T22c19c04d558705p00c00'
        }
      />
    </>
  );
}
