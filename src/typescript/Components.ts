//#region Home
type HomeBody = {
  data: ValuesResponse;
};

type HeaderProps = {
  title: string;
};

type ValuesCardProps = {
  type: string;
  buy?: number;
  sell?: number;
  update: string;
};

//#endregion Home

//#region Converter
type ConverterProps = {
  options: TypesResponse[];
  currencies: ValuesResponse;
};
//#endregion Converter

//#region TypesModal
type TypesModalProps = {
  visible: boolean;
  toggleModal: () => void;
  selected: TypesResponse;
  options: TypesResponse[];
  onChangeType: (type: TypesResponse) => void;
};
//#region TypesModal
