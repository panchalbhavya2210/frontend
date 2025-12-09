"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const themes = [
  { name: "Red", value: "theme-red", color: "#ef4444" },
  { name: "Blue", value: "theme-blue", color: "#3b82f6" },
  { name: "Blue Dark", value: "theme-blue-dark dark", color: "#3b82f6" },
  { name: "Yellow", value: "theme-yellow", color: "#eab308" },
];

export function ThemePicker() {
  const setTheme = async (theme: string) => {
    await fetch("/api/theme", {
      method: "POST",
      body: JSON.stringify({ theme }),
    });

    window.location.reload();
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">Theme</Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        {themes.map((t) => (
          <DropdownMenuItem
            key={t.value}
            onClick={() => setTheme(t.value)}
            className="flex items-center gap-2 cursor-pointer"
          >
            <span
              className="h-3 w-3 rounded-full"
              style={{ backgroundColor: t.color }}
            />
            {t.name}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
