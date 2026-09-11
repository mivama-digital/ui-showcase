"use client";

import { useState, useSyncExternalStore } from "react";
import {
  Button,
  Calendar,
  Card,
  CardContent,
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
  DataTable,
  type DataTableColumn,
  DatePicker,
  Input,
  Label,
  Questionnaire,
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@mivama/ui";
import {
  Calculator,
  Calendar as CalendarIcon,
  CreditCard,
  Settings,
  Smile,
  User,
} from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import { PageIntro, Panel, Section } from "../_components/showcase";

interface Payment {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
}

const paymentsData: Payment[] = [
  { id: "p1", amount: 316, status: "success", email: "ken99@yahoo.com" },
  { id: "p2", amount: 242, status: "processing", email: "abe45@gmail.com" },
  { id: "p3", amount: 837, status: "pending", email: "monserrat44@gmail.com" },
  { id: "p4", amount: 874, status: "success", email: "silas22@gmail.com" },
];

const paymentColumns: DataTableColumn<Payment>[] = [
  {
    id: "status",
    header: "Status",
    cell: (row) => <span className="capitalize">{row.status}</span>,
  },
  {
    id: "email",
    header: "Email",
    cell: (row) => <span className="lowercase font-mono text-xs">{row.email}</span>,
  },
  {
    id: "amount",
    header: "Amount",
    cell: (row) => <span className="font-medium">${row.amount.toFixed(2)}</span>,
  },
];

const invoices = [
  { invoice: "INV-001", paymentStatus: "Paid", totalAmount: "$250.00", paymentMethod: "Credit Card" },
  { invoice: "INV-002", paymentStatus: "Pending", totalAmount: "$150.00", paymentMethod: "PayPal" },
  { invoice: "INV-003", paymentStatus: "Unpaid", totalAmount: "$350.00", paymentMethod: "Bank Transfer" },
];

const chartData = [
  { month: "Jan", desktop: 186, mobile: 80 },
  { month: "Feb", desktop: 305, mobile: 200 },
  { month: "Mar", desktop: 237, mobile: 120 },
  { month: "Apr", desktop: 73, mobile: 190 },
  { month: "May", desktop: 209, mobile: 130 },
  { month: "Jun", desktop: 214, mobile: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "var(--chart-1)",
  },
  mobile: {
    label: "Mobile",
    color: "var(--chart-2)",
  },
} satisfies ChartConfig;

const emptySubscribe = () => () => {};

export default function DataPage() {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const mounted = useSyncExternalStore(emptySubscribe, () => true, () => false);

  return (
    <main>
      <PageIntro
        eyebrow="Components / 10"
        title="Data"
        count="8 families"
        description="Data tables, standard tabular layouts, calendars, date pickers, metrics charts, carousels, command menus, and questionnaire forms."
      />

      <div className="px-4 md:px-12 py-4 pb-16">
        <Section
          index="10.1"
          title="DataTable"
          description="Generic typed data table rendering columnar datasets with custom cell renderers."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="DataTable / payments" wide>
              <DataTable columns={paymentColumns} data={paymentsData} getRowId={(row) => row.id} />
            </Panel>
          </div>
        </Section>

        <Section
          index="10.2"
          title="Table"
          description="HTML-semantic table primitives with header, body, row, cell, footer, and caption components."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Table / invoices" wide>
              <Table>
                <TableCaption>A list of recent workspace invoices.</TableCaption>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[100px]">Invoice</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Method</TableHead>
                    <TableHead className="text-right">Amount</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {invoices.map((inv) => (
                    <TableRow key={inv.invoice}>
                      <TableCell className="font-medium">{inv.invoice}</TableCell>
                      <TableCell>{inv.paymentStatus}</TableCell>
                      <TableCell>{inv.paymentMethod}</TableCell>
                      <TableCell className="text-right">{inv.totalAmount}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={3}>Total</TableCell>
                    <TableCell className="text-right">$750.00</TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </Panel>
          </div>
        </Section>

        <Section
          index="10.3"
          title="Calendar & DatePicker"
          description="Interactive date selection primitives built on react-day-picker."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Calendar / interactive">
              {mounted ? (
                <Calendar
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border"
                  labels={{ labelNav: () => "Calendar navigation" }}
                />
              ) : (
                <div className="h-[300px] w-full rounded-lg border bg-muted/20" />
              )}
            </Panel>
            <Panel name="DatePicker / component">
              {mounted ? (
                <DatePicker
                  mode="single"
                  selected={selectedDate}
                  onSelect={setSelectedDate}
                  className="rounded-lg border"
                />
              ) : (
                <div className="h-10 w-full rounded-lg border bg-muted/20" />
              )}
            </Panel>
          </div>
        </Section>

        <Section
          index="10.4"
          title="Chart"
          description="Themeable, accessible chart primitive wrapper built with Recharts."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Chart / bar metric" wide>
              <ChartContainer config={chartConfig} className="min-h-[260px] w-full">
                <BarChart accessibilityLayer data={chartData}>
                  <CartesianGrid vertical={false} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    tickMargin={10}
                    axisLine={false}
                  />
                  <ChartTooltip content={<ChartTooltipContent />} />
                  <ChartLegend content={<ChartLegendContent />} />
                  <Bar dataKey="desktop" fill="var(--color-desktop)" radius={4} isAnimationActive={false} />
                  <Bar dataKey="mobile" fill="var(--color-mobile)" radius={4} isAnimationActive={false} />
                </BarChart>
              </ChartContainer>
            </Panel>
          </div>
        </Section>

        <Section
          index="10.5"
          title="Carousel"
          description="Motion slide and swipe component built with Embla Carousel."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Carousel / slides" wide>
              <div className="mx-auto w-full max-w-sm px-12 py-4">
                <Carousel>
                  <CarouselContent>
                    {["Sprint Planning", "Backlog Refinement", "Design Review", "Release Verification"].map(
                      (title, index) => (
                        <CarouselItem key={title}>
                          <div className="p-1">
                            <Card>
                              <CardContent className="flex flex-col aspect-video items-center justify-center p-6 text-center">
                                <span className="text-xs font-mono text-muted-foreground uppercase">Step 0{index + 1}</span>
                                <span className="text-lg font-semibold mt-1">{title}</span>
                              </CardContent>
                            </Card>
                          </div>
                        </CarouselItem>
                      )
                    )}
                  </CarouselContent>
                  <CarouselPrevious />
                  <CarouselNext />
                </Carousel>
              </div>
            </Panel>
          </div>
        </Section>

        <Section
          index="10.6"
          title="Command"
          description="Fast, composable, unstyled command menu palette built on cmdk."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Command / palette" wide>
              <Command className="rounded-lg border shadow-sm max-w-lg">
                <CommandInput placeholder="Type a command or search..." />
                <CommandSeparator />
                <CommandList>
                  <CommandEmpty>No results found.</CommandEmpty>
                  <CommandGroup heading="Suggestions">
                    <CommandItem>
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      <span>Calendar</span>
                    </CommandItem>
                    <CommandItem>
                      <Smile className="mr-2 h-4 w-4" />
                      <span>Search Emoji</span>
                    </CommandItem>
                    <CommandItem disabled>
                      <Calculator className="mr-2 h-4 w-4" />
                      <span>Calculator (Offline)</span>
                    </CommandItem>
                  </CommandGroup>
                  <CommandGroup heading="Settings">
                    <CommandItem>
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                      <CommandShortcut>⌘P</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <CreditCard className="mr-2 h-4 w-4" />
                      <span>Billing</span>
                      <CommandShortcut>⌘B</CommandShortcut>
                    </CommandItem>
                    <CommandItem>
                      <Settings className="mr-2 h-4 w-4" />
                      <span>Settings</span>
                      <CommandShortcut>⌘S</CommandShortcut>
                    </CommandItem>
                  </CommandGroup>
                </CommandList>
              </Command>
            </Panel>
          </div>
        </Section>

        <Section
          index="10.7"
          title="Questionnaire"
          description="Survey and multi-step inquiry form wrapper."
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Panel name="Questionnaire / survey">
              <Questionnaire
                onSubmit={(e) => {
                  e.preventDefault();
                }}
                className="max-w-md"
              >
                <div className="space-y-1">
                  <h3 className="text-base font-semibold">User Experience Survey</h3>
                  <p className="text-sm text-muted-foreground">
                    Provide feedback on design token consistency and component ergonomics.
                  </p>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-experience">Primary role</Label>
                  <Input id="q-experience" placeholder="e.g. Design Engineer, Product Lead" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="q-comments">Comments</Label>
                  <Input id="q-comments" placeholder="What improvements would you like to see?" />
                </div>
                <Button type="submit">Submit response</Button>
              </Questionnaire>
            </Panel>
          </div>
        </Section>
      </div>
    </main>
  );
}
