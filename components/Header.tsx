import { View, Image, Text, StyleSheet } from "react-native";
import { Icon, IconButton, Spacer, Stack } from "@react-native-material/core";
import { ThemeContext } from "../providers/ThemeProvider";
import React from "react";

export interface HeaderProps {
  title?: string;
  subTitle?: string;
  showBackButton?: boolean;
  showLogo?: boolean;
  showEditButton?: boolean;
  onEditButtonPress?: () => void;
  onBackButtonPress?: () => void;
}
export const Header = ({
  title = "Chords",
  subTitle = "",
  showBackButton: backVisible = true,
  showLogo = true,
  onBackButtonPress = () => {},
  showEditButton = false,
  onEditButtonPress = () => {},
}: HeaderProps) => {
  const { styleSheet: themeStyle } = React.useContext(ThemeContext);

  return (
    <View
      style={[
        styles.header,
        { backgroundColor: themeStyle.header_color.backgroundColor },
      ]}
    >
      <View style={styles.contentContainer}>
        {backVisible && (
          <IconButton
            color={themeStyle.header_tint_color.color}
            icon={(props) => <Icon name="arrow-left" {...props} />}
            onPress={onBackButtonPress}
          />
        )}
        {showLogo && (
          <Image
            style={styles.logo}
            source={require("../assets/images/app_logo.png")}
          />
        )}

        <Stack>
          <Text
            style={[
              styles.title,
              { color: themeStyle.header_tint_color.color },
            ]}
          >
            {title}
          </Text>
          {subTitle && (
            <Text
              style={[
                styles.subTitle,
                { color: themeStyle.header_tint_color.color },
              ]}
            >
              {subTitle}
            </Text>
          )}
        </Stack>
        <Spacer />
        {showEditButton && (
          <IconButton
            color={themeStyle.header_tint_color.color}
            icon={(props) => <Icon name="pencil" {...props} />}
            onPress={onEditButtonPress}
          />
        )}
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
  title: {
    fontSize: 18,
    fontWeight: "bold",
  },
  subTitle: {
    fontSize: 12,
  },
});
