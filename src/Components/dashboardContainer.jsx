import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'

import { useSelector } from 'react-redux';

export default function DashboardContainer() {

  const coinRates = useSelector((state) => state.rates.coinRates);
  
  const userCoins =
    {
      "ABC":87,
      "ACP":45,
      "ACT":23,
      "ACT*":78,
      "ADA":12,
      "ADCN":45,
      "ADL":12,
      "ADX":34,
      "ADZ":40
    }

    const [coins, setCoins] = React.useState([]);

    React.useEffect(() => {
      const coinsData = [];
      let count = 1;
      for (const [key, value] of Object.entries(userCoins)) {
        coinsData.push(
          {
            "id": count++,
            "coin": key,
            "amount": value,
            "rate": coinRates[key]
          }
        )
      }
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