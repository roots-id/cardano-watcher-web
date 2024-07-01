import { Table } from "flowbite-react";

export function Witnesses({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed">
        <Table.Head>
          <Table.HeadCell>Alias</Table.HeadCell>
          <Table.HeadCell>Prefix</Table.HeadCell>
          <Table.HeadCell>OOBI</Table.HeadCell>
          <Table.HeadCell>Provider</Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="overflow-auto whitespace-nowrap font-medium text-gray-900 dark:text-white">
                {item.alias}
              </Table.Cell>
              <Table.Cell className="overflow-auto">{item.prefix}</Table.Cell>
              <Table.Cell className="overflow-auto">{item.oobi}</Table.Cell>
              <Table.Cell className="overflow-auto">{item.provider}</Table.Cell>
              <Table.Cell className="overflow-auto">
                <a
                  href="#"
                  className="font-medium text-cyan-600 hover:underline dark:text-cyan-500"
                >
                  Edit
                </a>
              </Table.Cell>
            </Table.Row>
          ))}
        </Table.Body>
      </Table>
    </div>
  );
}
