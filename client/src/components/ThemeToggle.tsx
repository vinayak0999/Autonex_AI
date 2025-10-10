import { Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useTheme } from "./ThemeProvider";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();

  return (
    <Button
      variant="ghost"
      size="icon"
      onClick={() => setTheme(theme === "light" ? "dark" : "light")}
      data-testid="button-theme-toggle"
      className="relative overflow-hidden transition-transform duration-150 hover:scale-105"
    >
      <span className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-200 bg-[radial-gradient(30rem_18rem_at_50%_-10%,rgba(99,102,241,0.18),transparent)]" />
      {theme === "light" ? (
        <Moon className="h-5 w-5" />
      ) : (
        <Sun className="h-5 w-5" />
      )}
      <span className="sr-only">Toggle theme</span>
    </Button>
  );
}