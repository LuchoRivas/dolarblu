import React from "react";
import { StyleSheet, View, Text } from "react-native";
import { Card, Divider } from "react-native-paper";

export default function ValuesCard(props: ValuesCardProps) {
  const { type, buy, sell, update } = props;

  return (
    <View style={styles.container}>
      <Card elevation={5}>
        <Card.Title
          title={`Dólar ${type}`}
          subtitle={`Última actualización: ${update}`}
        />
        <Divider />
        <Card.Content style={styles.body}>
          {buy && (
            <View style={styles.content}>
              <Text style={styles.title}>Compra</Text>
              <Text style={styles.value}>{buy}</Text>
            </View>
          )}
          <View style={styles.content}>
            <Text style={styles.title}>Venta</Text>
            <Text style={styles.value}>{sell}</Text>
          </View>
        </Card.Content>
      </Card>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginHorizontal: 30,
    marginVertical: 10,
  },
  body: {
    paddingVertical: 5,
    flexDirection: "row",
    justifyContent: "space-evenly",
    marginVertical: 5,
  },
  title: {
    fontSize: 19,
    fontWeight: "bold",
  },
  value: {
    fontSize: 16,
    alignItems: "center",
  },
  content: {
    alignItems: "center",
  },
});
