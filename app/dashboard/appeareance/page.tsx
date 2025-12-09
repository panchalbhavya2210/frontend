// @ts-nocheck
import { cookies } from "next/headers";
import { setMode, setTheme } from "@/app/actions/set-theme";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

// All themes including yours
const colorThemes = [
  { id: "blue", label: "Blue", colors: ["#3B82F6", "#1E3A8A", "#93C5FD"] },
  { id: "green", label: "Green", colors: ["#22C55E", "#166534", "#86EFAC"] },
  { id: "orange", label: "Orange", colors: ["#F97316", "#C2410C", "#FDBA74"] },
  { id: "red", label: "Red", colors: ["#EF4444", "#991B1B", "#FCA5A5"] },
  { id: "rose", label: "Rose", colors: ["#F43F5E", "#9F1239", "#FDA4AF"] },
  { id: "violet", label: "Violet", colors: ["#8B5CF6", "#5B21B6", "#C4B5FD"] },
  { id: "yellow", label: "Yellow", colors: ["#FACC15", "#CA8A04", "#FEF08A"] },
  {
    id: "monokai",
    label: "Monokai",
    colors: ["#272822", "#66D9EF", "#A6E22E"],
  },
];

const modes = [
  { id: "light", label: "Light Mode" },
  { id: "dark", label: "Dark Mode" },
];

export default async function AppearancePage() {
  const cookieStore = await cookies();
  const currentTheme = cookieStore.get("theme")?.value || "blue";
  const currentMode = cookieStore.get("mode")?.value || "light";

  return (
    <div className="max-w-6xl mx-auto space-y-10">
      <h1 className="text-3xl font-semibold">Appearance</h1>
      <p className="text-muted-foreground">
        Customize theme colors and dark mode.
      </p>

      {/* MODE SELECTOR */}
      <section>
        <h2 className="text-xl font-medium mb-4">Display Mode</h2>

        <div className="flex gap-4">
          {modes.map((m) => (
            <form
              key={m.toString()}
              action={async () => {
                "use server";
                await setMode(m.id);
              }}
            >
              <button
                type="submit"
                className={cn(
                  "px-4 py-2 rounded-md border transition",
                  currentMode === m.id
                    ? "bg-primary text-white border-primary"
                    : "hover:bg-muted"
                )}
              >
                {m.label}
              </button>
            </form>
          ))}
        </div>
      </section>
      {/* THEME SELECTOR */}
      <section>
        <h2 className="text-xl font-medium mb-4">Color Themes</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {colorThemes.map((t) => (
            <form
              key={t.toString()}
              action={async () => {
                "use server";
                await setTheme(t.id);
              }}
            >
              <Card
                className={cn(
                  "cursor-pointer transition rounded-xl p-4 border hover:shadow-lg",
                  currentTheme === t.id && "ring-2 ring-primary border-primary"
                )}
              >
                <button type="submit" className="w-full text-left">
                  <div className="font-medium text-lg mb-3">{t.label}</div>

                  {/* Swatches */}
                  <div className="flex gap-2 mb-4">
                    {t.colors.map((c) => (
                      <div
                        key={c.toString()}
                        className="h-7 w-7 rounded-md border shadow-sm"
                        style={{ backgroundColor: c }}
                      />
                    ))}
                  </div>

                  {/* Preview */}
                  <div className="rounded-lg overflow-hidden border shadow-sm bg-white dark:bg-neutral-900">
                    <div
                      className="p-3 text-white text-sm"
                      style={{ backgroundColor: t.colors[0] }}
                    >
                      Header Preview
                    </div>

                    <div
                      className={`p-4 space-y-2 ${
                        currentMode === "dark" ? "bg-gray-950" : "bg-white"
                      }`}
                    >
                      <div className="h-3 w-24 rounded bg-gray-300 dark:bg-neutral-700" />
                      <div className="h-3 w-16 rounded bg-gray-200 dark:bg-neutral-800" />
                    </div>
                  </div>
                </button>
              </Card>
            </form>
          ))}
        </div>
      </section>
    </div>
  );
}
