"use client";

import { useState } from "react";
import {
  CommandDialog,
  CommandInput,
  CommandList,
  CommandItem,
  CommandEmpty,
  CommandGroup,
} from "@/components/ui/command";
import { useRouter } from "next/navigation";

export default function SearchCommand() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  // Open on Cmd+K or Ctrl+K
  useState(() => {
    const down = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === "k") {
        e.preventDefault();
        setOpen(true);
      }
    };
    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  });

  const shortcuts = [
    { label: "Dashboard", action: () => router.push("/dashboard") },
    { label: "Users", action: () => router.push("/dashboard/users") },
    { label: "Settings", action: () => router.push("/dashboard/settings") },
    { label: "Open Gmail", external: "https://mail.google.com" },
    { label: "Open YouTube", external: "https://youtube.com" },
    { label: "Open Console", external: "https://console.google.com" },
  ];

  const handleSelect = (item: any) => {
    setOpen(false);
    if (item.external) window.open(item.external, "_blank");
    else item.action();
  };

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="px-3 py-1 rounded-md border text-sm w-full max-w-sm"
      >
        Search… (Ctrl + K)
      </button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search…" />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>

          <CommandGroup heading="Shortcuts">
            {shortcuts.map((s) => (
              <CommandItem key={s.label} onSelect={() => handleSelect(s)}>
                {s.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
