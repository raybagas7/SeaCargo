import Button from "@/components/Button/Button";
import Input from "@/components/Input/Input";
import React, { useEffect, useState } from "react";
import ThemeToggle from "@/components/ThemeToggle/ThemeToggle";
import { useDark } from "@/store/dark/useDark";

export default function Home() {
  const fetching = async () => {
    try {
      const response = await fetch("/api/register");
      if (response.ok) {
        const data = await response.json(); // Extract JSON data from the response
        console.log(data); // Log the 'name' from the data
      } else {
        console.error("Request failed with status:", response.status);
      }
    } catch (error) {
      console.error("An error occurred:", error);
    }
  };

  const [input, setInput] = useState("");
  const dark = useDark.use.dark();
  const toggleTheme = useDark.use.toggleTheme();
  let htmlTag: HTMLElement | null;
  useEffect(() => {
    htmlTag = document.getElementById("chocovery-app");

    return () => {
      htmlTag;
    };
  }, [dark]);

  const darkToggler = () => {
    toggleTheme();
    htmlTag?.classList.toggle("dark");
  };

  const onChangeInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  return (
    <main>
      <div className="ml-10 mt-10 space-y-10">
        <Input
          onChange={onChangeInput}
          normal
          value={input}
          name="test"
          placeholder="FullName"
        />
        <Button onClick={fetching} primary normal name="test">
          Button
        </Button>
        <ThemeToggle onClick={darkToggler} isDark={dark} />
      </div>
    </main>
  );
}
