import React from "react";
import { StyleSheet } from "react-native";
import { Appbar } from "react-native-paper";
import { COLORS } from "../constants/Colors";

export default function Header(props: HeaderProps) {
  const { title } = props;
  
  return (
    <Appbar.Header style={styles.header}>
      <Appbar.Content style={styles.headerContent} title={title} />
    </Appbar.Header>
  );
}

const styles = StyleSheet.create({
  header: {
    paddingVertical: 20,
    backgroundColor: COLORS.primary,
    flexGrow: 1,
  },
  headerContent: {
    alignItems: "center",
    paddingVertical: 30,
  },
});
