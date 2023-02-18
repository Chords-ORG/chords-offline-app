import React from "react";
import { LightStyle, DarkStyle } from "../constants/Styles";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { useColorScheme } from "react-native";
import { getItem } from "../functions/storage";

interface ThemeContextProps {
  styleSheet: typeof LightStyle | typeof DarkStyle;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  styleSheet: LightStyle,
  theme: "light",
  toggleTheme: () => {},
});

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const systemColorScheme = useColorScheme();
  const { localColorScheme } = useLocalConfiguration();

  const toggleTheme = async () => {
    if (localColorScheme === "system") {
      setTheme(systemColorScheme || "light");
    } else {
      setTheme(localColorScheme as "light" | "dark");
    }
  };

  React.useEffect(() => {
    toggleTheme();
  }, [systemColorScheme, localColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        styleSheet: theme === "light" ? LightStyle : DarkStyle,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
