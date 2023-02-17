import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";

export interface HeaderProps {
  title?: string;
  backVisible?: boolean;
  onBackPress?: () => void;
}
export const Header = ({
  title = "Chords",
  backVisible = true,
  onBackPress = () => {},
}: HeaderProps) => {
  const basic_style = useAdaptativeStyle();
  return (
    <View style={styles.header}>
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
          style={[basic_style.h1, basic_style.primary_color, basic_style.bold]}
        >
          {title}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    backgroundColor: "#fff",
    height: 85,
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    paddingTop: 35,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.8,
    shadowRadius: 2,
    elevation: 3,
    shadowColor: "#000",
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
