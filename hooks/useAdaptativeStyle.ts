import { useTheme } from "@react-navigation/native";
import { light_style, dark_style } from "../constants/Styles";

export default function useAdaptativeStyle(): (typeof light_style | typeof dark_style) {
    const theme = useTheme();
    return theme.dark ? dark_style : light_style;
}
