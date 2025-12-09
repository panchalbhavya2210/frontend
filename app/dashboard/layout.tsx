"use client";
import { useAppSelector } from "@/store/hooks";
import Sidebar from "./sidebar";

export default function DashboardHome({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = useAppSelector((state) => state.auth.user);

  return (
    <div className="flex h-screen">
      <Sidebar user={user}>{children}</Sidebar>
    </div>
  );
}
