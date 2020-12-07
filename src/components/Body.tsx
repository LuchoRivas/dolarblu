import React from "react";
import { ScrollView, RefreshControl } from "react-native";
import DateHelper from "../helpers/DateHelper";
import ValuesCard from "./ValuesCard";

export default function Body(props: HomeBody) {
  // Props
  const { data, refresh } = props;

  // State(s)
  const [refreshing, setRefreshing] = React.useState(false);

  // Service(s)
  const onRefresh = React.useCallback(() => {
    setRefreshing(!refreshing);
    const fetch = async () => {
      await refresh();
      setRefreshing(false);
    };
    fetch();
  }, []);

  return (
    <ScrollView
      refreshControl={
        <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
      }
    >
      {data && (
        <>
          <ValuesCard
            type={"Blue"}
            buy={data.blue.buy}
            sell={data.blue.sell}
            update={DateHelper.toString(data.blue.date.$date)}
          />
          <ValuesCard
            type={"Oficial"}
            buy={data.oficial.buy}
            sell={data.oficial.sell}
            update={DateHelper.toString(data.oficial.date.$date)}
          />
          <ValuesCard
            type={"Bolsa"}
            buy={data.bolsa.buy}
            sell={data.bolsa.sell}
            update={DateHelper.toString(data.bolsa.date.$date)}
          />
          <ValuesCard
            type={"contado con liqui"}
            buy={data.liqui.buy}
            sell={data.liqui.sell}
            update={DateHelper.toString(data.liqui.date.$date)}
          />
        </>
      )}
    </ScrollView>
  );
}
