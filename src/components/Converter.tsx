import React from "react";
import { StyleSheet, View } from "react-native";
import {
  ActivityIndicator,
  Button,
  Divider,
  Menu,
  Modal,
  Subheading,
  Surface,
  TextInput,
} from "react-native-paper";
import { MODAL_STYLES } from "../constants/ComponentStyles";
import TextHelper from "../helpers/TextHelper";

export default function Converter(props: ConverterProps) {
  const { options, currencies } = props;

  //#region states
  const [visible, setVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [pesos, setPesos] = React.useState("1");
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
    try {
      const default_option =
        options && options.find((option) => option.name === "blue");
      setSelected(default_option!);
      if (currencies) {
        setter(selected);
        setLoading(false);
      }
    } catch (error) {
      console.error(error);
    }
  }, [options, currencies]);
  //#endregion hooks

  const setter = (typeOfValue: TypesResponse) => {
    // array of values
    const dataValues = Object.values(currencies);
    const match_value = dataValues.find((value) => {
      return value._id.$oid === typeOfValue._id.$oid;
    });
    setBuyPrice(match_value!.buy);
    setSellPrice(match_value!.sell);
  };
  
  const toggleModal = () => {
    setVisible(!visible);
  };

  const onItemPress = (type: TypesResponse) => {
    setter(type);
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
              style={styles.input}
              label="Peso"
              keyboardType={"numeric"}
              value={pesos}
              onChangeText={(value) => setPesos(value)}
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
            <Divider style={{ marginVertical: 20 }} />
            <View>
              <Subheading>
                {selected && TextHelper.capitalize(selected.name)}
              </Subheading>
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
        {options &&
          options.map((type, index) => {
            return (
              <Menu.Item
                contentStyle={{ width: "100%" }}
                titleStyle={{ fontWeight: "bold", fontSize: 17 }}
                style={{ flexGrow: 1 }}
                key={index}
                icon="cash"
                onPress={() => onItemPress(type)}
                title={TextHelper.capitalize(type.name)}
              />
            );
          })}
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
  },
});
