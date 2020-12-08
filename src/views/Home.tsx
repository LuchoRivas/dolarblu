import React from "react";
import { RefreshControl, ScrollView, View } from "react-native";
import Body from "../components/Body";
import Header from "../components/Header";
import Axios from "axios";
import AsyncStorage from "@react-native-community/async-storage";
import { COLORS } from "../constants/Colors";
import config from "../constants/Enviorment";

export default function Home() {
  const [values, setValues] = React.useState<ValuesResponse>();
  const [refreshing, setRefreshing] = React.useState(false);

  const getValues = async () => {
    try {
      const url = `${config.API_URL}/values`;
      const { data } = await Axios.get<ValuesResponse>(url);
      if (data) {
        AsyncStorage.setItem("VALUES", JSON.stringify(data));
        setValues(data);
      } else {
        console.error("Error !");
      }
    } catch (error) {
      console.error(error);
    }
  };

  React.useEffect(() => {
    getValues();
  }, []);

  React.useEffect(() => {
    if (refreshing) refresh();
  }, [refreshing]);

  const refresh = async () => {
    await getValues();
    toggleRefresh();
  };

  const toggleRefresh = () => {
    setRefreshing(!refreshing);
  };
  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={toggleRefresh} />
      }
      style={{ backgroundColor: COLORS.light, flex: 1 }}
    >
      <Header title={"Cotizaciones"} />
      {values && <Body data={values} />}
    </ScrollView>
  );
}
