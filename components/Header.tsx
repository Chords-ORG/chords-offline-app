import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";

export interface HeaderProps {
  title?: string;
  showBackButton?: boolean;
  onPressBackButton?: () => void;
}
export const Header = ({
  title = "Chords",
  showBackButton: backVisible = true,
  onPressBackButton: onBackPress = () => {},
}: HeaderProps) => {
  const basic_style = useAdaptativeStyle();
  return (
    <View
      style={[
        styles.header,
        { backgroundColor: basic_style.header_color.backgroundColor },
      ]}
    >
      <View style={{ flexDirection: "row" }}>
        {backVisible && (
          <TouchableOpacity onPress={onBackPress}>
            <Image
              style={styles.icon}
              source={require("../assets/images/back_icon.png")}
            />
          </TouchableOpacity>
        )}

        <Image
          style={styles.logo}
          source={require("../assets/images/app_logo.png")}
        />
        <Text
          style={[
            basic_style.h1,
            basic_style.bold,
            { color: basic_style.header_tint_color.color },
          ]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    height: 85,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    borderRadiusBottom: 1000,
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    justifyContent: "space-between",
    //borderBottomWidth:1,
  },
  icon: {
    width: 25,
    height: 25,
    marginRight: 15,
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
});
