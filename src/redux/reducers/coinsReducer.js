const defaultUserCoins =
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

const defaultCoinRates = {
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

const fetchData = async () => {
  try {
    const response = await fetch('http://api.coinlayer.com/live?access_key=37bca8e35e16cac55bdd0a850816e642');
    const data = await response.json();
    return data.rates;
  } catch (error)
  {
    console.log('Error', error);
  }
};

const initializeUserCoins = () => {

  const coinsData=[];
  let coinRates = defaultCoinRates;
  fetchData().then(
    (response) => {
      if (response)
      {
        coinRates = response;
      }
    }
    );

    let count = 1;
    for (const [key, value] of Object.entries(defaultUserCoins)) {
      coinsData.push(
        {
          "id": count++,
          "coin": key,
          "amount": value,
          "rate": coinRates[key]
        }
      )
    }
    return coinsData;
}

const initialState = {
    userCoins: initializeUserCoins(),
  };


const coinsReducer = (state = initialState, action) =>
{
    switch (action.type){
      case ("UPDATE_COIN"):
        const updatedCoins = JSON.parse(JSON.stringify([...state.userCoins]));
        const idx = updatedCoins.findIndex(({ id }) => id === action.payload?.coinRecord.id);
        if (idx >= 0)
        {
          updatedCoins[idx].amount = parseInt(action.payload?.coinRecord.amount);
        }
        return {
          ...state,
          userCoins:updatedCoins,
        };
      default:
        return state;
    }
}

export default coinsReducer;
