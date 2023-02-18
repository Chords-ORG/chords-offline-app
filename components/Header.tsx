import { View, TouchableOpacity, Image, Text, StyleSheet } from "react-native";
import useAdaptativeStyle from "../hooks/useAdaptativeStyle";
import { Icon, IconButton } from "@react-native-material/core";

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
  const { styleSheet: basic_style, colorScheme } = useAdaptativeStyle();
  const backIconLight = colorScheme === "dark" ? true : false;
  return (
    <View
      style={[
        styles.header,
        { backgroundColor: basic_style.header_color.backgroundColor },
      ]}
    >
      <View style={styles.contentContainer}>
        {backVisible && (
          <IconButton
            color={basic_style.header_tint_color.color}
            icon={(props) => <Icon name="arrow-left" {...props} />}
            onPress={onBackPress}
          />
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
  contentContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  logo: {
    height: 30,
    width: 30,
    marginRight: 15,
  },
});
