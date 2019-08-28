import orderBy from "lodash/orderBy";

const sortBy = (type, data) => {
  switch (type) {
    case "rank":
      return orderBy(data, "rank", "asc");

    case "rank_desc":
      return orderBy(data, "rank", "desc");

    case "name_asc":
      return orderBy(data, "name", "asc");

    case "name_desc":
      return orderBy(data, "name", "desc");

    case "priceUsd_asc":
      return orderBy(data, "quotes.USD.price", "asc");

    case "priceUsd_desc":
      return orderBy(data, "quotes.USD.price", "desc");

    case "percent24h_asc":
      return orderBy(data, "quotes.USD.percent_change_24h", "asc");

    case "percent24h_desc":
      return orderBy(data, "quotes.USD.percent_change_24h", "desc");
  }
};

const sortFunction = (sort, data) =>
  sort === "SORTED_BY_RANK_ASC"
    ? sortBy("rank", data)
    : sort === "SORTED_BY_RANK_DESC"
    ? sortBy("rank_desc", data)
    : sort === "SORTED_BY_NAME_ASC"
    ? sortBy("name_asc", data)
    : sort === "SORTED_BY_NAME_DESC"
    ? sortBy("name_desc", data)
    : sort === "SORTED_BY_PRICE_ASC"
    ? sortBy("priceUsd_asc", data)
    : sort === "SORTED_BY_PRICE_DESC"
    ? sortBy("priceUsd_desc", data)
    : sort === "SORTED_BY_PERCENT_ASC"
    ? sortBy("percent24h_asc", data)
    : sort === "SORTED_BY_PERCENT_DESC"
    ? sortBy("percent24h_desc", data)
    : sortBy("name", data);

export default sortFunction;
