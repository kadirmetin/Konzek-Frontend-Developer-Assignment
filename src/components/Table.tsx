import { Box } from "@mui/material";
import { DataGrid, GridColDef } from "@mui/x-data-grid";
import { useEffect, useState } from "react";

const columns: GridColDef[] = [
  { field: "id", headerName: "ID", width: 100 },
  { field: "name", headerName: "Name", width: 200 },
  { field: "code", headerName: "Code", width: 150 },
  { field: "native", headerName: "Native", width: 200 },
  { field: "currency", headerName: "Currency", width: 150 },
  {
    field: "languages",
    headerName: "Languages",
    width: 200,
    valueGetter: (params) => {
      return params.row.languages
        .map((language: any) => language.name)
        .join(", ");
    },
  },
];

const Table = ({
  rows,
  searchText,
}: {
  rows: Array<{ [key: string]: any }>;
  searchText: string;
}) => {
  const [selectedItemIndex, setSelectedItemIndex] = useState<number>(-1);
  const [filterText, setFilterText] = useState<string>("");

  useEffect(() => {
    if (rows.length > 0) {
      const targetIndex = Math.min(10, rows.length - 1);
      setSelectedItemIndex(targetIndex);
    }
  }, [rows]);

  useEffect(() => {
    setFilterText(searchText);
  }, [searchText]);

  const handleSelectionChange = (newSelection: any) => {
    if (newSelection.length > 0) {
      setSelectedItemIndex(newSelection[0]);
    }
  };

  const filterModel = {
    items: [
      {
        value: filterText,
        field: "name",
        operator: "contains",
      },
    ],
  };

  return (
    <Box className="w-auto h-auto px-4">
      <DataGrid
        rows={rows.map((row: any, index: number) => ({
          ...row,
          id: index + 1,
        }))}
        columns={columns}
        getRowId={(row) => row.id}
        initialState={{
          pagination: {
            paginationModel: { page: 0, pageSize: 10 },
          },
        }}
        pageSizeOptions={[10, 25, 50, 75, 100, 200]}
        onRowSelectionModelChange={(newSelection: any) =>
          handleSelectionChange(newSelection)
        }
        rowSelectionModel={selectedItemIndex !== -1 ? [selectedItemIndex] : []}
        filterModel={filterModel}
      />
    </Box>
  );
};

export default Table;
