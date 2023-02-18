import { useColorScheme } from "react-native";

import { light_style, dark_style } from "../constants/Styles";
import useLocalConfiguration from "./useLocalConfiguration";
import React from "react";

export default function useAdaptativeStyle() {
  const systemColorScheme = useColorScheme();
  const { colorScheme: localColorScheme } = useLocalConfiguration();
  const [colorScheme, setColorScheme] = React.useState<"light" | "dark">(
    "light"
  );

  React.useEffect(() => {
    if (localColorScheme === "system") {
      setColorScheme(systemColorScheme === "dark" ? "dark" : "light");
    } else {
      setColorScheme(localColorScheme);
    }
  }, [localColorScheme, systemColorScheme]);

  const styleSheet = colorScheme === "light" ? light_style : dark_style;

  return { colorScheme, styleSheet };
}
