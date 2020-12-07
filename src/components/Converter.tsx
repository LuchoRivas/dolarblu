import { DefaultTheme } from "@react-navigation/native";
import React, { useEffect } from "react";
import { Dimensions, StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  Menu,
  Modal,
  Subheading,
  Surface,
  TextInput,
  Title,
} from "react-native-paper";
import { Colors } from "react-native/Libraries/NewAppScreen";
import { MODAL_STYLES } from "../constants/ComponentStyles";
import CurrencyHelper from "../helpers/CurrencyHelper";
import TextHelper from "../helpers/TextHelper";

export default function Converter(props: ConverterProps) {
  const { options, currencies } = props;

  //#region states

  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [currency, setCurrency] = React.useState("1");
  const [buyPrice, setBuyPrice] = React.useState("");
  const [sellPrice, setSellPrice] = React.useState("");
  const [selected, setSelected] = React.useState<TypesResponse>({
    name: "",
    _id: {
      $oid: "",
    },
  });

  //#endregion states

  //#region hooks

  React.useEffect(() => {
    const default_option = options[0];
    setSelected(default_option);
    if (currencies) {
      setter(default_option);
      setLoading(false);
    }
  }, []);

  React.useEffect(() => {
    if (currency) calc(currency);
  }, [currency]);

  //#endregion hooks

  const finder = (typeOfValue: TypesResponse) => {
    // db response to array of values
    const dataValues = Object.values(currencies);
    const match_value = dataValues.find((value) => {
      return value._id.$oid === typeOfValue._id.$oid;
    });
    return match_value;
  };

  const setter = (typeOfValue: TypesResponse) => {
    const values_to_set = finder(typeOfValue);
    if (values_to_set !== undefined) {
      setBuyPrice(values_to_set.buy);
      setSellPrice(values_to_set.sell);
    }
  };

  const calc = (currency: string) => {
    const value_selected = finder(selected);
    if (value_selected !== undefined) {
      const buy = CurrencyHelper.toDouble(value_selected.buy);
      const sell = CurrencyHelper.toDouble(value_selected.sell);
      const value = CurrencyHelper.toDouble(currency);
      setBuyPrice(`$ ${(buy * value).toFixed(2).replace(".", ",") + ""}`);
      setSellPrice(`$ ${(sell * value).toFixed(2).replace(".", ",") + ""}`);
    }
  };

  const toggleModal = () => {
    setVisible(!visible);
  };

  const onItemPress = (type: TypesResponse) => {
    setter(type);
    setSelected(type);
    toggleModal();
  };

  return (
    <>
      {loading ? (
        <View style={{ flex: 1, justifyContent: "center" }}>
          <ActivityIndicator animating={loading} size="large" />
        </View>
      ) : (
        <>
          <Surface style={styles.container}>
            <TextInput
              style={[styles.input, { marginHorizontal: 50 }]}
              label="Dolar"
              keyboardType={"numeric"}
              value={currency}
              onChangeText={(value) => setCurrency(value)}
              selectionColor={"#000"}
              underlineColor={"#000"}
            />
            <View style={styles.pricesRow}>
              <TextInput
                style={styles.input}
                disabled
                label="Compra"
                keyboardType={"numeric"}
                value={buyPrice}
                selectionColor={"#000"}
                underlineColor={"#000"}
              />
              <TextInput
                style={styles.input}
                disabled
                label="Venta"
                keyboardType={"numeric"}
                value={sellPrice}
                selectionColor={"#000"}
                underlineColor={"#000"}
              />
            </View>
            <Divider style={{ marginTop: 30 }} />
            <View style={{ paddingHorizontal: 15, marginBottom: 25 }}>
              <Title style={{ marginVertical: 15 }}>
                <Subheading>Tipo de cambio: </Subheading>
                {selected && TextHelper.capitalize(selected.name)}
              </Title>
              <Button
                mode="contained"
                labelStyle={{ color: "#fff" }}
                onPress={toggleModal}
              >
                Cambiar
              </Button>
            </View>
          </Surface>
        </>
      )}

      <Modal
        visible={visible}
        onDismiss={toggleModal}
        contentContainerStyle={MODAL_STYLES}
      >
        <View
          style={{
            width: Dimensions.get("window").height * 0.4,
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {options &&
            options.map((type, index) => {
              return (
                <Menu.Item
                  style={{
                    width: "100%",
                    alignItems: "center",
                  }}
                  titleStyle={{
                    fontWeight: "bold",
                    fontSize: 17,
                    alignSelf: "center",
                  }}
                  key={index}
                  onPress={() => onItemPress(type)}
                  title={TextHelper.capitalize(type.name)}
                />
              );
            })}
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    marginTop: 30,
    marginHorizontal: 30,
  },
  input: {
    marginTop: 10,
    backgroundColor: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
    flexGrow: 1,
  },
  pricesRow: {
    justifyContent: "space-between",
    flexDirection: "row",
    flexWrap: "wrap"
  },
});
