import SearchIcon from "@mui/icons-material/Search";
import { Box, IconButton, InputAdornment, TextField } from "@mui/material";

const SearchBar = ({
  onSearchChange,
}: {
  onSearchChange: (text: string) => void;
}) => {
  const handleTextChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newText = e.target.value;
    onSearchChange(newText);
  };

  return (
    <Box className="p-4">
      <TextField
        label="Search"
        fullWidth
        onChange={handleTextChange}
        InputProps={{
          endAdornment: (
            <InputAdornment position="end">
              <IconButton>
                <SearchIcon />
              </IconButton>
            </InputAdornment>
          ),
        }}
      />
    </Box>
  );
};

export default SearchBar;
