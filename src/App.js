import "./App.css";
import { useState } from "react";
import FlexBox from "./components/FlexBox";
import list from "./utils/list.json";
import styled from "styled-components";
import MovieCard from "./components/MovieCard";

const AppContainer = styled.div`
  height: 100vh;
  padding: 3rem;
  @media only screen and (max-width: 48rem) {
    padding: 2rem;
  }
`;

const Input = styled.input`
  background: #323232;
  border: 1px solid #545454;
  width: 100%;
  height: 2.17rem;
  color: white;
  outline: none;
  padding: 0 1rem;
  border-left: none;
`;
const Select = styled.select`
  background: #323232;
  border: 1px solid #545454;
  height: 2.29rem;
  color: white;
  outline: none;
`;

const ListWrap = styled.div`
  display: grid;
  grid-template-columns: auto auto auto auto;
  grid-row-gap: 20px;
  grid-column-gap: 15px;
  padding: 2rem 0;
  @media only screen and (max-width: 48rem) {
    grid-template-columns: auto;
  }
`;

const toTitleCase = (str) => {
  str = str.replace(/([^\W_]+[^\s-]*) */g, function (txt) {
    return txt.charAt(0).toUpperCase() + txt.substr(1)?.toLowerCase();
  });
  if (str.includes("-")) {
    str = str.charAt(0).toLowerCase() + str.substr(1);
    str = str.replaceAll("-", "");
  }

  return str;
};

const filterList = (queries) => {
  return list.filter((movie) => {
    return queries.some((query) => {
      query = query.split("=");
      let key = query[0];
      key = toTitleCase(key);
      let value = query[1]?.toLowerCase() || "";
      let objvalue = movie[key] || "";
      objvalue = objvalue.toString();
      return objvalue && objvalue?.toLowerCase().includes(value);
    });
  });
};

const getRankPair = (query) => {
  const regex = /(\w+)='([^']+)'.*?&rank=(\d+)/g;
  let match;
  const pairs = [];

  while ((match = regex.exec(query)) !== null) {
    const key = match[1];
    const value = match[2];
    const rank = parseInt(match[3]);
    pairs.push({ rank, [key]: value });
  }

  return pairs;
};
const addRank = (queries) => {
  let queryPairs = getRankPair(queries);
  let movieList = list;
  queryPairs.forEach((pair) => {
    let index = null;
    let filteredObj = movieList.find((i, ind) => {
      index = ind;
      return i.Title === pair.title;
    });
    if (filteredObj && index !== null) {
      movieList[index].Rank = pair.rank;
    }
  });

  return movieList;
};

const getResult = (query) => {
  let split = query.split(":");
  if (split[1]) {
    let action = split[0];
    let queryParts = split[1].split(",");
    queryParts = queryParts.map((key) => key);
    switch (action) {
      case "get":
        return filterList(queryParts);
      case "rank":
        return addRank(split[1]);
      default:
        return list;
    }
  }
  return list;
};

function App() {
  const [action, setAction] = useState("get");
  const [queryInput, setQueryInput] = useState("");
  let query = `${action}:${queryInput}`;
  let movieList = getResult(query);
  return (
    <AppContainer className="App">
      <FlexBox>
        <Select
          value={action}
          onChange={(e) => {
            setAction(e.target.value);
          }}
        >
          <option value={"get"}>GET</option>
          <option value={"rank"}>RANK</option>
        </Select>
        <Input
          value={queryInput}
          onChange={(e) => setQueryInput(e.target.value)}
          placeholder="Enter Your Query Here"
        />
      </FlexBox>
      <ListWrap>
        {movieList.map((movie, i) => (
          <MovieCard details={movie} key={i} />
        ))}
      </ListWrap>
    </AppContainer>
  );
}

export default App;
