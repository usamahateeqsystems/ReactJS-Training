import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack'



export default function Dashboard() {

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

    const coinRates = {
      "611": 0.389165,
      "ABC": 59.99,
      "ACP": 0.014931,
      "ACT": 0.15927,
      "ACT*": 0.14371,
      "ADA": 0.160502,
      "ADCN": 0.001406,
      "ADL": 121.5,
      "ADX": 0.427854,
      "ADZ": 0.02908,
      "AE": 2.551479,
      "AGI": 0.12555,
      "AIB": 0.005626,
      "AIDOC": 0.02605
    }

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

  const [coins, setCoins] = React.useState([]);

  React.useEffect(() => {

    const updateCoins = (pUserCoins, pCoinRates) => {
      const coinsData = [];
      let count = 1;
      for (const [key, value] of Object.entries(pUserCoins)) {
        coinsData.push(
          {
            "id": count++,
            "coin": key,
            "amount": value,
            "rate": pCoinRates[key]
          }
        )
      }
      return coinsData;
    }

    const fetchData = async () => {
      try {
        const response = await fetch('http://api.coinlayer.com/live?access_key=37bca8e35e16cac55bdd0a850816e642');
        const data = await response.json();
        setCoins(updateCoins(userCoins, data.rates || coinRates));
      } catch (error)
      {
        console.log('Error', error);
      }
    };
    fetchData();
  }, []);

  return (
    <>
      <DataGrid
        rows={coins}
        columns={columns}
      />
    </>
  );
}