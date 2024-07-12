import { Table, Button } from "flowbite-react";

export function WitnessesTable({ data, handleEdit }) {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed bg-cardBg">
        <Table.Head>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            Alias
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            Prefix
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            OOBI
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            Provider
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            Referral
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-cardBody text-textColor dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="overflow-auto whitespace-nowrap font-medium  dark:text-white">
                {item.alias}
              </Table.Cell>
              <Table.Cell className="overflow-auto">{item.prefix}</Table.Cell>
              <Table.Cell className="overflow-auto">{item.oobi}</Table.Cell>
              <Table.Cell className="overflow-auto">{item.provider}</Table.Cell>
              <Table.Cell className="overflow-auto">
                {item.referral ? item.referral : "N/A"}
              </Table.Cell>
              <Table.Cell className="overflow-auto">
                <Button
                  size="xs"
                  onClick={() => handleEdit(item)}
                  className="font-medium hover:underline "
                >
                  Edit
                </Button>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
