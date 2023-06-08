import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import { useSelector } from 'react-redux';

export default function DashboardContainer() {

  const [coins, setCoins] = React.useState([]);
  const coinsData = useSelector((state) => state.coins.userCoins);

  React.useEffect(() => {
    setCoins(coinsData);
  },[]);

  const columns: GridColDef[] = [
    { field: 'id', headerName: 'Coin ID', width: 70 },
    { field: 'coin', headerName: 'Name', width: 200 },
    { field: 'amount', headerName: 'Amount', width: 200 },
    {
      field: 'rate',
      headerName: 'Coin Rate',
      width: 160,
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 500,
      sortable:false,
      renderCell: (params) => {
        const onClick = (e) => {

          e.stopPropagation(); // don't select this row after clicking

        };

        return (
          <Stack direction="row">
            <Button onClick={onClick} color="info" variant="contained">Transfer</Button>
          </Stack>
        );
      }
    },
  ];

  return (
    <>
      <DataGrid
        rows={coins}
        columns={columns}
      />
    </>
  );
}