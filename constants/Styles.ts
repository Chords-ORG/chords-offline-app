import { StyleSheet } from "react-native";

export type ColorsType = {
  // Header
  headerBackground: string;
  headerTint: string;

  // Content
  contentBackground: string;

  // Bottom Tab
  bottomTabBackground: string;
  bottomTabTint: string;

  // Button
  buttonBackground: string;
  buttonTint: string;

  // Text
  textPrimary: string;
  textSecondary: string;
  textHighlight: string;

  // Chords
  chordColor: string;
  chordWarningColor: string;
  chordErrorColor: string;

  // Dialog
  dialogBackground: string;
  dialogTint: string;

  // Card
  cardBackground: string;

  // Divider
  divider: string;

  // TextInput
  textInputBackground: string;
  textInputTint: string;
  textInputPlaceholder: string;
  textInputBorder: string;
};

export const LightColors: ColorsType = {
  headerBackground: "#2F80ED",
  headerTint: "#FFFFFF",
  contentBackground: "#FFFFFF",
  bottomTabBackground: "#FFFFFF",
  bottomTabTint: "#2F80ED",
  buttonBackground: "#2F80ED",
  buttonTint: "#FFFFFF",
  textPrimary: "#333333",
  textSecondary: "#828282",
  chordColor: "#2F80ED",
  chordWarningColor: "#F2994A",
  chordErrorColor: "#EB5757",
  textHighlight: "#2F80ED",
  dialogBackground: "#FFFFFF",
  dialogTint: "#333333",
  cardBackground: "#F2F2F2",
  divider: "#E4E4E4",
  textInputBackground: "#FFFFFF",
  textInputTint: "#333333",
  textInputPlaceholder: "#828282",
  textInputBorder: "#E4E4E4",
};

export const DarkColors: ColorsType = {
  headerBackground: "#2F80ED",
  headerTint: "#FFFFFF",
  contentBackground: "#1E201D",
  bottomTabBackground: "#2F80ED",
  bottomTabTint: "#FFFFFF",
  buttonBackground: "#2F80ED",
  buttonTint: "#FFFFFF",
  textPrimary: "#FFFFFF",
  textSecondary: "#BDBDBD",
  textHighlight: "#2F80ED",
  chordColor: "#2F80ED",
  chordWarningColor: "#F2994A",
  chordErrorColor: "#EB5757",
  dialogBackground: "#313337",
  dialogTint: "#FFFFFF",
  cardBackground: "#313337",
  divider: "#828282",
  textInputBackground: "#313337",
  textInputTint: "#FFFFFF",
  textInputPlaceholder: "#828282",
  textInputBorder: "#828282",
};

export const LightStyle = StyleSheet.create({
  header_color: {
    backgroundColor: "#2F80ED",
  },
  header_tint_color: {
    color: "#FFFFFF",
  },
  content: {
    backgroundColor: "#FFFFFF",
    height: "100%",
    width: "100%",
  },
  bottom_tab: {
    backgroundColor: "#FFFFFF",
    shadowColor: "#000",
  },
  button: {
    backgroundColor: "#2F80ED",
    color: "#FFFFFF",
  },
  text_primary: {
    color: "#333333",
  },
  text_secondary: {
    color: "#828282",
  },
  text_highlight: {
    color: "#2F80ED",
  },
  dialog: {
    backgroundColor: "#FFFFFF",
    color: "#333333",
  },
  card: {
    backgroundColor: "#F2F2F2",
    borderRadius: 5,
  },
  divider: {
    color: "#E4E4E4",
  },
  chordText: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    color: LightColors.chordColor,
  },
  // Deprecated
  bold: {
    fontWeight: "bold",
  },
  primary_color: {
    color: "#333333",
  },
  secondary_color: {
    color: "#828282",
  },
  active_color: {
    color: "#2F80ED",
  },
  tint_color: {
    color: "#FFFFFF",
  },
  h1: {
    fontFamily: "roboto",
    fontSize: 18,
  },
  h2: {
    fontFamily: "roboto",
    fontSize: 16,
  },
  h3: {
    fontFamily: "roboto",
    fontSize: 14,
  },
  h4: {
    fontFamily: "roboto",
    fontSize: 12,
  },
  big_card: {
    height: 70,
    width: "100%",
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  medium_card: {
    height: 60,
    width: "100%",
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  small_card: {
    height: 50,
    width: "100%",
    backgroundColor: "#F2F2F2",
    marginBottom: 10,
    marginTop: 10,
    padding: 10,
    borderRadius: 5,
  },
  horizontal_separator: {
    width: "100%",
    borderBottomColor: "#E4E4E4",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  vertical_separator: {
    height: "100%",
    borderLeftColor: "#E4E4E4",
    borderLeftWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  selected_line: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#2F80ED",
    marginTop: 5,
    marginBottom: 5,
  },
});

export const DarkStyle = StyleSheet.create({
  header_color: {
    backgroundColor: "#2F80ED",
  },
  header_tint_color: {
    color: "#FFFFFF",
  },
  content: {
    backgroundColor: "#1E201D",
    height: "100%",
    width: "100%",
  },
  bottom_tab: {
    backgroundColor: "#2F80ED",
    shadowColor: "#fff",
  },
  button: {
    backgroundColor: "#2F80ED",
    color: "#FFFFFF",
  },
  text_primary: {
    color: "#FFFFFF",
  },
  text_secondary: {
    color: "#BDBDBD",
  },
  text_highlight: {
    color: "#2F80ED",
  },
  dialog: {
    backgroundColor: "#313337",
    color: "#FFFFFF",
  },
  card: {
    backgroundColor: "#313337",
    borderRadius: 5,
  },
  divider: {
    color: "#828282",
  },
  chordText: {
    fontFamily: "monospace",
    fontSize: 14,
    fontWeight: "bold",
    color: DarkColors.chordColor,
  },
  // Deprecated
  bold: {
    fontWeight: "bold",
  },
  primary_color: {
    color: "#FFFFFF",
  },
  secondary_color: {
    color: "#BDBDBD",
  },
  active_color: {
    color: "#2F80ED",
  },
  tint_color: {
    color: "#FFFFFF",
  },
  h1: {
    fontFamily: "roboto",
    fontSize: 18,
  },
  h2: {
    fontFamily: "roboto",
    fontSize: 16,
  },
  h3: {
    fontFamily: "roboto",
    fontSize: 14,
  },
  h4: {
    fontFamily: "roboto",
    fontSize: 12,
  },
  big_card: {
    height: 70,
    width: "100%",
    backgroundColor: "#313337",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  medium_card: {
    height: 60,
    width: "100%",
    backgroundColor: "#313337",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  small_card: {
    height: 50,
    width: "100%",
    backgroundColor: "#313337",
    margin: 10,
    padding: 10,
    borderRadius: 5,
  },
  horizontal_separator: {
    width: "100%",
    borderBottomColor: "#828282",
    borderBottomWidth: 1,
    marginTop: 10,
    marginBottom: 10,
  },
  vertical_separator: {
    height: "100%",
    borderLeftColor: "#828282",
    borderLeftWidth: 1,
    marginRight: 10,
    marginLeft: 10,
  },
  selected_line: {
    width: "100%",
    borderBottomWidth: 2,
    borderBottomColor: "#2F80ED",
    marginTop: 5,
    marginBottom: 5,
  },
});
