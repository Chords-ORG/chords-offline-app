import React from "react";
import {
  LightStyle,
  DarkStyle,
  ColorsType,
  LightColors,
  DarkColors,
} from "../constants/Styles";
import { useColorScheme } from "react-native";
import { LocalSettingsContext } from "./LocalSettingsProvider";

interface ThemeContextProps {
  styleSheet: typeof LightStyle | typeof DarkStyle;
  colors: ColorsType;
  theme: "light" | "dark";
}

export const ThemeContext = React.createContext<ThemeContextProps>({
  styleSheet: LightStyle,
  theme: "light",
  colors: LightColors,
});

interface ThemeProviderProps {
  children: React.ReactNode;
}
export const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = React.useState<"light" | "dark">("light");
  const systemColorScheme = useColorScheme();
  const { localColorScheme } = React.useContext(LocalSettingsContext);

  const toggleTheme = async () => {
    console.log("toggleTheme");
    console.log("localColorScheme", localColorScheme);
    console.log("systemColorScheme", systemColorScheme);
    if (localColorScheme === "system") {
      setTheme(systemColorScheme || "light");
    } else {
      setTheme(localColorScheme as "light" | "dark");
    }
  };

  React.useEffect(() => {
    toggleTheme();
  }, [localColorScheme, systemColorScheme]);

  return (
    <ThemeContext.Provider
      value={{
        styleSheet: theme === "light" ? LightStyle : DarkStyle,
        colors: theme === "light" ? LightColors : DarkColors,
        theme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};
