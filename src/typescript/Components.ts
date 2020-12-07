//#region Home
type HomeBody = {
  data: ValuesResponse;
  refresh: () => Promise<void>;
};

type HeaderProps = {
  title: string;
};

type ValuesCardProps = {
  type: string;
  buy: string;
  sell: string;
  update: string;
};

//#endregion Home

//#region Converter
type ConverterProps = {
  options: TypesResponse[]
  currencies: ValuesResponse
}
//#endregion Converter