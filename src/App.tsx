import { gql, useQuery } from "@apollo/client";
import { Box } from "@mui/material";
import { useState } from "react";
import { SearchBar, Table } from "./components";

const GET_COUNTRIES = gql`
  query GetCountries {
    countries {
      name
      code
      native
      currency
      languages {
        name
      }
    }
  }
`;

const App = () => {
  const { loading, error, data } = useQuery(GET_COUNTRIES);
  const [searchText, setSearchText] = useState<string>("");

  const handleSearchChange = (text: string) => {
    setSearchText(text);
  };

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <Box className="h-screen flex-col justify-center items-center">
      <SearchBar onSearchChange={handleSearchChange} />
      <Table rows={data.countries} searchText={searchText} />
    </Box>
  );
};

export default App;
