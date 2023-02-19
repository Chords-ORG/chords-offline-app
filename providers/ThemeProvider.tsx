import React from "react";
import {
  LightStyle,
  DarkStyle,
  ColorsType,
  LightColors,
  DarkColors,
} from "../constants/Styles";
import useLocalConfiguration from "../hooks/useLocalConfiguration";
import { useColorScheme } from "react-native";
import { getItem } from "../functions/storage";

interface ThemeContextProps {
  styleSheet: typeof LightStyle | typeof DarkStyle;
  colors: ColorsType;
  theme: "light" | "dark";
  toggleTheme: () => void;
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  styleSheet: LightStyle,
  theme: "light",
  colors: LightColors,
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
        colors: theme === "light" ? LightColors : DarkColors,
        theme,
        toggleTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
