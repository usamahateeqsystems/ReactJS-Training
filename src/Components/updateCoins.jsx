import React, { useEffect, useState } from "react";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { updateCoin } from '../redux/actions/updateCoin';
import { useSelector, useDispatch } from "react-redux";


const UpdateCoins = (props) => {

  const coinsData = useSelector((state) => state.coins.userCoins);
  const dispatch = useDispatch();

  useEffect(()=>{
    const urlParams = new URLSearchParams(window.location.search);
    const coinId = urlParams.get('coinId');
    const idx = coinsData.findIndex(({ id }) => id === parseInt(coinId));
    setCoinData(coinsData[idx]);
  },[]);

  const [coinData, setCoinData] = useState({
    id: 0,
    coin: '',
    rate: '',
    amount: 0,
  });

  const setAmount = (amount) => 
  {
    setCoinData(
      {
        id:coinData.id,
        coin:coinData.coin,
        amount:amount,
        rate:coinData.rate,
      }
    );
  };

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    dispatch(updateCoin(coinData));
    navigate("/dashboard");
  };

  return (
    <div className="container row">
      <div className="col-6 mx-auto">
        <h3>Update Coins</h3>
        <div className="Control">
        <Form onSubmit={handleSubmit}>
          <Form.Group controlId="name">
            <Form.Label>Name: {coinData.coin}</Form.Label>
          </Form.Group>
          <Form.Group controlId="amount" className="mt-4">
            <Form.Label>Amount</Form.Label>
            <Form.Control
              type="number"
              placeholder="Amount"
              value={coinData.amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </Form.Group>
          <Form.Group controlId="rate" className="mt-4">
            <Form.Label>Coin Rate: {coinData.rate}</Form.Label>
          </Form.Group>
          <Button type="submit" className="mt-2">
            Update
          </Button>
        </Form>
        </div>
      </div>
    </div>
  );
}

export default UpdateCoins;