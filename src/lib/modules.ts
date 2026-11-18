import {
  BarChart3,
  Boxes,
  FileText,
  IndianRupee,
  ShieldCheck,
  Truck,
  Users,
  Handshake,
  type LucideIcon,
} from "lucide-react";

export type ModuleKey =
  | "sales"
  | "inventory"
  | "hr"
  | "finance"
  | "logistics"
  | "analytics"
  | "documents"
  | "compliance";

export interface ModuleInfo {
  key: ModuleKey;
  name: string;
  icon: LucideIcon;
  benefit: string;
  details: string[];
}

/** The eight modules, shared by the bento grid, the mockup sidebar and the modal. */
export const MODULES: ModuleInfo[] = [
  {
    key: "sales",
    name: "Sales & CRM",
    icon: Handshake,
    benefit: "Every lead, quote and follow-up in one pipeline your whole team can see.",
    details: [
      "Drag-and-drop pipeline with stages you define",
      "Quotes turn into GST invoices in one click",
      "Follow-up reminders on WhatsApp and email",
      "See which rep owns which deal, and what's stuck",
    ],
  },
  {
    key: "inventory",
    name: "Inventory",
    icon: Boxes,
    benefit: "Live stock across every godown, so you stop selling what you don't have.",
    details: [
      "Multi-warehouse stock with transfers between locations",
      "Low-stock alerts before a customer notices",
      "Batch, serial and expiry tracking",
      "Barcode-ready item catalogue",
    ],
  },
  {
    key: "hr",
    name: "HR & Payroll",
    icon: Users,
    benefit: "Attendance, leave and payslips that run themselves at month-end.",
    details: [
      "Attendance and leave flow straight into payroll",
      "PF, ESI and professional tax fields built in",
      "Employees download their own payslips",
      "Role-based access so salaries stay private",
    ],
  },
  {
    key: "finance",
    name: "Finance & Invoicing",
    icon: IndianRupee,
    benefit: "GST-ready invoices, expenses and receivables without the spreadsheet.",
    details: [
      "CGST, SGST and IGST calculated automatically",
      "UPI and bank reconciliation",
      "Payment reminders sent on schedule",
      "Ageing reports that show who owes what",
    ],
  },
  {
    key: "logistics",
    name: "Logistics",
    icon: Truck,
    benefit: "Track dispatches from packing table to doorstep.",
    details: [
      "Dispatch queues linked to orders",
      "E-way bill details stored with each shipment",
      "Delivery status your sales team can check",
      "Returns that update stock automatically",
    ],
  },
  {
    key: "analytics",
    name: "Analytics",
    icon: BarChart3,
    benefit: "One dashboard for revenue, margin and cash, updated as work happens.",
    details: [
      "Cross-module reports with no exports",
      "Branch and warehouse comparisons",
      "Scheduled reports to your inbox",
      "Custom dashboards per role",
    ],
  },
  {
    key: "documents",
    name: "Documents",
    icon: FileText,
    benefit: "Contracts, bills and KYC files attached to the record they belong to.",
    details: [
      "Attach files to customers, vendors and employees",
      "Version history on every document",
      "Share secure links with expiry",
      "Search across everything you've uploaded",
    ],
  },
  {
    key: "compliance",
    name: "Compliance",
    icon: ShieldCheck,
    benefit: "Filing deadlines, audit trails and approvals, handled before they become fires.",
    details: [
      "GST return-ready reports",
      "Full audit trail on every change",
      "Approval flows for purchases and payouts",
      "Deadline calendar with reminders",
    ],
  },
];

/** Format a number the Indian way: 1,24,500 */
export function formatINR(n: number, opts: Intl.NumberFormatOptions = {}) {
  return new Intl.NumberFormat("en-IN", { maximumFractionDigits: 0, ...opts }).format(n);
}
