import React from "react";
import { View } from "react-native";
import Body from "../components/Body";
import Header from "../components/Header";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { COLORS } from "../constants/Colors";
import config from "../constants/Enviorment";

export default function Home() {
  const [values, setValues] = React.useState<ValuesResponse>();

  const getValues = async () => {
    try {
      const url = `${config.API_URL}/values`;
      const { data } = await Axios.get<ValuesResponse>(url);
      if (data) {
        AsyncStorage.setItem("VALUES", JSON.stringify(data));
        setValues(data);
      }
      else {
        console.error("Error !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getValues();
  }, []);

  return (
    <View style={{ backgroundColor: COLORS.light, flex: 1 }}>
      <Header title={"Cotizaciones"} />
      {values && <Body data={values} refresh={getValues} />}
    </View>
  );
}
