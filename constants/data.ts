import { Icons } from "@/components/icons";
import { NavItem,SidebarNavItem } from "@/types";
import { SearchCheckIcon } from "lucide-react";

import { LucideIcon } from 'lucide-react';

// Define SearchCheckIcon type alias

export type User = {
  id: number;
  name: string;
  shopname: string;
  area: string;
  verified: boolean;
  amount : number;
  paymentstatus: string;
};
export const users: User[] = [
  {
    id: 1,
    name: "Candice Schiner",
    shopname: "Dell",
    area: "Frontend Developer",
    verified: false,
    amount : 1200,
    paymentstatus: "Paid",
  },
  {
    id: 2,
    name: "John Doe",
    shopname: "TechCorp",
    area: "Backend Developer",
    verified: true,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 3,
    name: "Alice Johnson",
    shopname: "WebTech",
    area: "UI Designer",
    verified: true,
    amount : 1720,
    paymentstatus: "Paid",
  },
  {
    id: 4,
    name: "David Smith",
    shopname: "Innovate Inc.",
    area: "Fullstack Developer",
    verified: false,
    amount : 100,
    paymentstatus: "Pending",
  },
  {
    id: 5,
    name: "Emma Wilson",
    shopname: "TechGuru",
    area: "Product Manager",
    verified: true,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 6,
    name: "James Brown",
    shopname: "CodeGenius",
    area: "QA Engineer",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 7,
    name: "Laura White",
    shopname: "SoftWorks",
    area: "UX Designer",
    verified: true,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 8,
    name: "Michael Lee",
    shopname: "DevCraft",
    area: "DevOps Engineer",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 9,
    name: "Olivia Green",
    shopname: "WebSolutions",
    area: "Frontend Developer",
    verified: true,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  {
    id: 10,
    name: "Robert Taylor",
    shopname: "DataTech",
    area: "Data Analyst",
    verified: false,
    amount : 100,
    paymentstatus: "Paid",
  },
  
];

export type Employee = {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  gender: string;
  date_of_birth: string; // Consider using a proper date type if possible
  street: string;
  city: string;
  state: string;
  country: string;
  zipcode: string;
  longitude?: number; // Optional field
  latitude?: number; // Optional field
  job: string;
  profile_picture?: string | null; // Profile picture can be a string (URL) or null (if no picture)
};

export const navItems: NavItem[] = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: "dashboard",
    label: "Dashboard",
  },
  {
    title: "Accounts",
    href: "/dashboard/accounts",
    icon: "user",
    label: "user",
  },
  {
    title: "Add Sales",
    href: "/dashboard/addsales",
    icon: "employee",
    label: "employee",
  },
  {
    title: "Add Shop",
    href: "/dashboard/addshop",
    icon: "profile",
    label: "profile",
  },
  {
    title: "Add Product",
    href: "/dashboard/addproduct",
    icon : "kanban",
    label: "kanban",
  },
  {
    title: "Settings",
    href: "/dashboard/settings",
    icon : "settings",
    label: "kanban",
  },
  {
    title: "Login",
    href: "/",
    icon: "login",
    label: "login",
  },
];
