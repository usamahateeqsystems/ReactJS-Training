export const rateTypes = {
    GET_RATES: 'GET_RATES',
};

export const getRates = (rates) => ({
    type: rateTypes.GET_RATES,
    payload: { rates },
  });
