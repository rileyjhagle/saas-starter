import { Avatar } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getOrders } from "@/data";

export default async function Records() {
  const records = await getOrders();

  return (
    <>
      <div className="flex items-end justify-between gap-4">
        <Heading>Orders</Heading>
        <Button className="-my-0.5">Create order</Button>
      </div>
      <Table className="mt-8 [--gutter:theme(spacing.6)] lg:[--gutter:theme(spacing.10)]">
        <TableHead>
          <TableRow>
            <TableHeader>Order number</TableHeader>
            <TableHeader>Purchase date</TableHeader>
            <TableHeader>Customer</TableHeader>
            <TableHeader>Event</TableHeader>
            <TableHeader className="text-right">Amount</TableHeader>
          </TableRow>
        </TableHead>
        <TableBody>
          {records?.map((record) => (
            <TableRow
              key={record.id}
              href={record.url}
              title={`record #${record.id}`}
            >
              <TableCell>{record.id}</TableCell>
              <TableCell className="text-zinc-500">{record.date}</TableCell>
              <TableCell>{record.customer.name}</TableCell>
              <TableCell>
                <div className="flex items-center gap-2">
                  <span>{record.event.name}</span>
                </div>
              </TableCell>
              <TableCell className="text-right">
                US{record.amount.usd}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </>
  );
}
