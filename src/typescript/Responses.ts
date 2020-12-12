type ValuesResponse = {
  blue: {
    _id: {
      $oid: string;
    };
    buy: string;
    date: {
      $date: Date;
    };
    sell: string;
    name: string;
  };
  bolsa: {
    _id: {
      $oid: string;
    };
    buy: string;
    date: {
      $date: Date;
    };
    sell: string;
    name: string;
  };
  liqui: {
    _id: {
      $oid: string;
    };
    buy: string;
    date: {
      $date: Date;
    };
    sell: string;
    name: string;
  };
  oficial: {
    _id: {
      $oid: string;
    };
    buy: string;
    date: {
      $date: Date;
    };
    sell: string;
    name: string;
  };
  solidario: {
    _id: {
      $oid: string;
    };
    date: {
      $date: Date;
    };
    sell: string;
    name: string;
  };
};

type TypesResponse = {
  _id: {
    $oid: string;
  };
  name: string;
};
