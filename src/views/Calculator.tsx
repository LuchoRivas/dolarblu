import AsyncStorage from "@react-native-community/async-storage";
import Axios from "axios";
import React from "react";
import { View } from "react-native";
import Converter from "../components/Converter";
import Header from "../components/Header";

export default function Calculator() {

  const [values, setValues] = React.useState<ValuesResponse>();
  const [types, setTypes] = React.useState<TypesResponse[]>();

  //#region services
  const getFromStorage = async () => {
    const store = await AsyncStorage.getItem("VALUES");
    const data = JSON.parse(store!);
    setValues(data);
  };

  const getTypes = async () => {
    try {
      const url = "http://192.168.0.33:5000/types";
      const { data } = await Axios.get<TypesResponse[]>(url);
      setTypes(data);
    } catch (error) {
      console.error(error);
    }
  };

  //#endregion services

  React.useEffect(() => {
    const fetch = async () => {
      await getTypes();
      await getFromStorage();
    };
    fetch();
  }, []);

  React.useEffect(() => {
    // if (values) setDollar(values.blue.buy);
  }, [values, types]);



  return (
    <View style={{ backgroundColor: "#edf7ff", flex: 1 }}>
      <Header title={"Calculadora"} />
      <Converter options={types!} currencies={values!} />
    </View>
  );
}
