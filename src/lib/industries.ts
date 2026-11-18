import {
  BarChart3,
  Boxes,
  CalendarCheck,
  ClipboardCheck,
  ContactRound,
  FileText,
  GraduationCap,
  IndianRupee,
  PackageCheck,
  ReceiptIndianRupee,
  ShoppingCart,
  Truck,
  UserCheck,
  Users,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import educationImage from "@/assets/industry-education.jpg";
import startupsImage from "@/assets/industry-startups.jpg";
import retailImage from "@/assets/industry-retail.jpg";

export type IndustryService = {
  name: string;
  description: string;
  detail: string;
  workflow: string;
  benefit: string;
  relatedModules: string[];
  status: "Available" | "Proposed";
  icon: LucideIcon;
};

export type IndustryData = {
  slug: "education" | "startups" | "retail-ecommerce" | "manufacturing";
  name: string;
  shortName: string;
  image: string;
  imageAlt: string;
  description: string;
  challenges: string[];
  solutions: IndustryService[];
  workflow: { title: string; description: string }[];
  benefits: string[];
};

export const INDUSTRIES: IndustryData[] = [
  {
    slug: "education",
    name: "Education",
    shortName: "Education",
    image: educationImage,
    imageAlt: "School administrator reviewing records on a tablet",
    description:
      "The Manager brings admissions, fees, staff records and campus stock into one organised workspace, helping educational institutions reduce manual follow-ups and keep operational data connected.",
    challenges: [
      "Admission records and fee follow-ups are spread across registers and spreadsheets.",
      "Attendance and payroll take time to reconcile every month.",
      "Library, laboratory and office inventory are difficult to track across departments.",
    ],
    workflow: [
      { title: "Set up the institution", description: "Configure departments, courses, batches and team roles." },
      { title: "Connect records", description: "Create student and staff records once, then link fees and activity to them." },
      { title: "Automate routine work", description: "Use reminders, approvals and shared reports to keep teams aligned." },
      { title: "Review performance", description: "Monitor collection, attendance and inventory from one management view." },
    ],
    solutions: [
      { name: "Student Admission Management", description: "Keep the admission journey, records and follow-ups together.", detail: "A structured admission workflow helps teams capture applicant information, assign follow-up tasks and move records through application stages.", workflow: "Capture application → verify details → assign batch → update status → create the active student record.", benefit: "Fewer missed follow-ups and more consistent student onboarding.", relatedModules: ["Sales & CRM", "Documents", "Analytics"], status: "Proposed", icon: GraduationCap },
      { name: "Student Records Management", description: "Maintain one organised record for each student.", detail: "Store and organise student identity, academic and document records with role-based access.", workflow: "Create student profile → add course and batch → attach documents → update records.", benefit: "Students and staff work from a reliable shared record.", relatedModules: ["Documents", "Compliance"], status: "Proposed", icon: ContactRound },
      { name: "Fee and Payment Management", description: "Create invoices, track payments and schedule reminders.", detail: "Finance and invoicing workflows can support fee invoices, receivable tracking and payment follow-ups.", workflow: "Create fee schedule → issue invoice → record payment → send reminder for pending dues.", benefit: "Clearer collections and faster follow-up on outstanding fees.", relatedModules: ["Finance & Invoicing", "Analytics"], status: "Available", icon: ReceiptIndianRupee },
      { name: "Staff Attendance and Payroll", description: "Connect staff attendance with monthly payroll.", detail: "Attendance and employee records can feed a consistent payroll workflow for campus teams.", workflow: "Record attendance → review leave → approve payroll → issue payslip.", benefit: "Less manual reconciliation at month-end.", relatedModules: ["HR & Payroll", "Analytics"], status: "Available", icon: UserCheck },
      { name: "Learning Management System (LMS)", description: "Organise lessons and learner activity.", detail: "A proposed LMS experience can complement The Manager with course content and learner progress management.", workflow: "Create course → publish lessons → assign learners → track completion.", benefit: "A clearer view of course delivery and learner engagement.", relatedModules: ["Documents", "Analytics"], status: "Proposed", icon: CalendarCheck },
      { name: "Course and Batch Scheduling", description: "Coordinate course calendars and batches.", detail: "Plan course sessions and connect staff and learner records to the right batch.", workflow: "Create course → set batch schedule → assign staff → publish timetable.", benefit: "Fewer scheduling conflicts across departments.", relatedModules: ["HR & Payroll", "Analytics"], status: "Proposed", icon: CalendarCheck },
      { name: "Examination Management", description: "Organise examinations and result records.", detail: "A proposed examination module can track assessments, marks and published results.", workflow: "Create exam → assign students → capture marks → publish result.", benefit: "Consistent, traceable academic assessments.", relatedModules: ["Documents", "Analytics"], status: "Proposed", icon: ClipboardCheck },
      { name: "Inventory Management", description: "Track books, lab supplies and campus stock.", detail: "Inventory records help teams monitor available stock and transfer items between campus locations.", workflow: "Create items → receive stock → issue to department → review balances.", benefit: "Better control of campus resources and purchases.", relatedModules: ["Inventory", "Logistics", "Finance & Invoicing"], status: "Available", icon: Boxes },
      { name: "Academic Reporting and Analytics", description: "Review operational and academic performance.", detail: "Analytics can combine fee, attendance and inventory data into role-focused reports.", workflow: "Set report dimensions → review dashboard → share summary → act on exceptions.", benefit: "Decisions based on current operational information.", relatedModules: ["Analytics", "Finance & Invoicing", "HR & Payroll"], status: "Available", icon: BarChart3 },
    ],
    benefits: ["One record for each student, staff member and campus resource.", "Reduced duplicate data entry and manual reconciliation.", "More visibility into collections, attendance and stock.", "Clear role-based access for administration and department teams."],
  },
  {
    slug: "startups",
    name: "Startups",
    shortName: "Startups",
    image: startupsImage,
    imageAlt: "Startup team working together in a modern office",
    description:
      "The Manager gives growing startups a connected workspace for sales, people, money, documents and tasks, so teams can scale their operations without immediately adding a different tool for every function.",
    challenges: [
      "Leads and customer conversations are dispersed across email and chat.",
      "Founders cannot easily see sales, expenses and team workload together.",
      "Growing teams need clearer ownership and repeatable workflows.",
    ],
    workflow: [
      { title: "Unify the team", description: "Create roles and invite the people who need access." },
      { title: "Capture customers", description: "Build the sales pipeline and store customer context in one place." },
      { title: "Run the operation", description: "Coordinate work, inventory, invoices and documents from linked records." },
      { title: "Measure growth", description: "Review sales, costs and operational reports as the business scales." },
    ],
    solutions: [
      { name: "Customer Relationship Management (CRM)", description: "Manage customer context and relationships.", detail: "CRM keeps leads, companies and follow-ups in a visible pipeline for the sales team.", workflow: "Create lead → qualify → assign owner → record follow-up → convert to customer.", benefit: "No lead is lost simply because conversation history lives elsewhere.", relatedModules: ["Sales & CRM", "Documents"], status: "Available", icon: ContactRound },
      { name: "Lead and Sales Management", description: "Track deals from first conversation to closure.", detail: "Pipeline stages and quotes help teams understand deal progress and next actions.", workflow: "Add lead → qualify → prepare quote → convert sale → issue invoice.", benefit: "A shared and measurable sales process.", relatedModules: ["Sales & CRM", "Finance & Invoicing", "Analytics"], status: "Available", icon: ShoppingCart },
      { name: "Employee Management", description: "Organise staff records, attendance and leave.", detail: "Employee profiles and attendance workflows support growing teams and month-end payroll.", workflow: "Add employee → assign role → record attendance → approve leave.", benefit: "People operations stay consistent as the team grows.", relatedModules: ["HR & Payroll", "Documents"], status: "Available", icon: Users },
      { name: "Task and Workflow Automation", description: "Standardise repeatable work and approvals.", detail: "Shared workflows and reminders help teams assign work, record progress and route approvals.", workflow: "Create task → assign owner → set due date → approve or complete.", benefit: "Less status chasing and clearer accountability.", relatedModules: ["Compliance", "Documents", "Analytics"], status: "Proposed", icon: Workflow },
      { name: "Finance and Expense Tracking", description: "Record invoices, expenses and receivables.", detail: "Finance workflows help founders see money due, money paid and major expenses.", workflow: "Create invoice or expense → attach evidence → reconcile payment → review reports.", benefit: "Cleaner books and more useful financial visibility.", relatedModules: ["Finance & Invoicing", "Analytics", "Compliance"], status: "Available", icon: IndianRupee },
      { name: "Business Analytics", description: "Review sales and operations in one dashboard.", detail: "Cross-module reports reduce the need for separate spreadsheets and exports.", workflow: "Choose report → filter period → review trend → share or act.", benefit: "Faster decisions with one operating view.", relatedModules: ["Analytics", "Sales & CRM", "Finance & Invoicing"], status: "Available", icon: BarChart3 },
      { name: "Document Management", description: "Attach important files to the right business record.", detail: "Customers, vendors and employees can have secure, searchable documents attached to their records.", workflow: "Upload document → classify it → attach to record → control access.", benefit: "Important files are easy to find and less likely to be duplicated.", relatedModules: ["Documents", "Compliance"], status: "Available", icon: FileText },
      { name: "Inventory Management", description: "Track products and stock as sales scale.", detail: "Inventory helps startups maintain accurate item records and warehouse balances.", workflow: "Create item → receive stock → sell or transfer → review balance.", benefit: "A reliable connection between sales and available stock.", relatedModules: ["Inventory", "Logistics"], status: "Available", icon: Boxes },
      { name: "Team Collaboration", description: "Keep ownership and updates connected.", detail: "Role-based access, assigned follow-ups and shared records help teams work from the same context.", workflow: "Add teammate → assign role → share record → track status.", benefit: "Less duplicate communication and faster handoffs.", relatedModules: ["Sales & CRM", "Documents", "Compliance"], status: "Proposed", icon: Users },
    ],
    benefits: ["A unified operating view as the team grows.", "Less dependence on disconnected spreadsheets.", "Clear ownership of leads, approvals and people records.", "Faster access to sales and financial information."],
  },
  {
    slug: "retail-ecommerce",
    name: "Retail & E-commerce",
    shortName: "Retail",
    image: retailImage,
    imageAlt: "Retail employee scanning a parcel at a packing counter",
    description:
      "The Manager helps retailers connect stock, orders, customers and dispatch workflows across shop and online channels, reducing overselling and keeping GST-ready records current.",
    challenges: [
      "Stock balances differ between stores, warehouses and online channels.",
      "Orders, dispatches and returns require several status updates.",
      "Customer, payment and invoice records are separated across systems.",
    ],
    workflow: [
      { title: "Configure products", description: "Create the item catalogue with variants and locations." },
      { title: "Receive orders", description: "Capture sales through the shop or online order workflow." },
      { title: "Fulfil and dispatch", description: "Reserve stock, prepare orders and update delivery status." },
      { title: "Close and report", description: "Record payment, returns and performance for management review." },
    ],
    solutions: [
      { name: "Product and Inventory Management", description: "Maintain a central product and stock catalogue.", detail: "Create products with categories and keep balances visible across locations.", workflow: "Create product → add stock → sell or transfer → update balance.", benefit: "Accurate stock information for purchasing and sales.", relatedModules: ["Inventory", "Analytics"], status: "Available", icon: Boxes },
      { name: "Stock Tracking", description: "Follow on-hand, reserved and available quantities.", detail: "Stock records show movements and help identify low-stock items.", workflow: "Receive stock → reserve for order → dispatch → reconcile.", benefit: "Fewer overselling surprises and faster replenishment decisions.", relatedModules: ["Inventory", "Logistics"], status: "Available", icon: PackageCheck },
      { name: "Sales and Order Management", description: "Manage orders from confirmation to fulfilment.", detail: "The sales workflow records orders, items, totals and customer communication.", workflow: "Create order → confirm items → reserve stock → fulfil.", benefit: "Orders and inventory move through a consistent process.", relatedModules: ["Sales & CRM", "Inventory", "Finance & Invoicing"], status: "Available", icon: ShoppingCart },
      { name: "Customer Relationship Management", description: "Keep customer history and preferences connected.", detail: "CRM records can connect customer purchases and follow-ups with sales activity.", workflow: "Create customer → record purchase → schedule follow-up → track relationship.", benefit: "Better service and repeat-sales follow-up.", relatedModules: ["Sales & CRM", "Documents"], status: "Available", icon: ContactRound },
      { name: "Multi-channel Stock Management", description: "Coordinate stock across locations and channels.", detail: "A central inventory record can support manual and connected sales channels.", workflow: "Receive stock → set channel availability → reserve → reconcile.", benefit: "One view of inventory across operating locations.", relatedModules: ["Inventory", "Analytics", "Logistics"], status: "Available", icon: Workflow },
      { name: "Dispatch and Delivery Tracking", description: "Monitor fulfilment from packing to delivery.", detail: "Dispatch records link orders to shipments and delivery status.", workflow: "Pack order → generate dispatch → record courier status → confirm delivery.", benefit: "Customers and teams can find the current shipment status faster.", relatedModules: ["Logistics", "Sales & CRM"], status: "Available", icon: Truck },
      { name: "Returns Management", description: "Record returns and update stock accurately.", detail: "Returns can be linked to the original order and inspected before restocking.", workflow: "Receive return → inspect → approve → update stock or credit.", benefit: "Clearer return handling and reduced inventory mismatch.", relatedModules: ["Logistics", "Inventory", "Finance & Invoicing"], status: "Available", icon: ClipboardCheck },
      { name: "Finance and Invoicing", description: "Create GST-ready invoices and monitor receivables.", detail: "Invoice records can reflect orders and payments with GST fields.", workflow: "Generate invoice → send customer copy → record payment → reconcile.", benefit: "Sales and billing records stay consistent.", relatedModules: ["Finance & Invoicing", "Compliance"], status: "Available", icon: IndianRupee },
      { name: "Business Performance Analytics", description: "Review sales, stock and margin performance.", detail: "Reports combine selling activity and inventory movement for management review.", workflow: "Select period → review sales and stock → identify exception → act.", benefit: "Fast access to operational trends and margin concerns.", relatedModules: ["Analytics", "Inventory", "Sales & CRM"], status: "Available", icon: BarChart3 },
    ],
    benefits: ["More accurate stock across operating locations.", "Connected order, invoice and dispatch records.", "Faster handling of delivery exceptions and returns.", "Clear visibility of sales and stock performance."],
  },
];

export function getIndustry(slug: string) {
  return INDUSTRIES.find((industry) => industry.slug === slug);
}
