import { Table } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { IoCloseCircleSharp } from "react-icons/io5";

export function Identifiers({ data }) {
  return (
    <div className="overflow-x-auto">
      <Table className="table-fixed">
        <Table.Head>
          <Table.HeadCell>Alias</Table.HeadCell>
          <Table.HeadCell>Prefix</Table.HeadCell>
          <Table.HeadCell>Cardano</Table.HeadCell>
          <Table.HeadCell>Watched</Table.HeadCell>
          <Table.HeadCell>OOBI</Table.HeadCell>
          <Table.HeadCell>
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-white dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="overflow-auto font-medium text-gray-900 ">
                {item.alias}
              </Table.Cell>
              <Table.Cell className="overflow-auto">{item.prefix}</Table.Cell>
              <Table.Cell width={"20%"}>
                {item.cardano ? (
                  <HiCheckCircle color="green" className="m-auto" />
                ) : (
                  <IoCloseCircleSharp color="brown" className="m-auto" />
                )}
              </Table.Cell>
              <Table.Cell>
                {item.watched ? (
                  <HiCheckCircle color="green" className="m-auto" />
                ) : (
                  <IoCloseCircleSharp color="brown" className="m-auto" />
                )}
              </Table.Cell>
              <Table.Cell className="overflow-auto">{item.oobi}</Table.Cell>
              <Table.Cell>
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
