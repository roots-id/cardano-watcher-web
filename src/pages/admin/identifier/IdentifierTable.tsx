import { Table, Button } from "flowbite-react";
import { HiCheckCircle } from "react-icons/hi";
import { IoCloseCircleSharp } from "react-icons/io5";

export function IdentifierTable({ data, handleEdit }) {
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
            Cardano
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            Watched
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            OOBI
          </Table.HeadCell>
          <Table.HeadCell className="text-cardColor bg-CardBg">
            <span className="sr-only">Edit</span>
          </Table.HeadCell>
        </Table.Head>
        <Table.Body className="divide-y">
          {data.map((item) => (
            <Table.Row className="bg-cardBody text-textColor dark:border-gray-700 dark:bg-gray-800">
              <Table.Cell className="overflow-auto font-medium ">
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
