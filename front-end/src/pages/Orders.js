import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar, Loading } from '../components';
import salesApi from '../services/api.sales';
import adminApi from '../services/api.admin';

import '../styles/Orders.css';
import OrdersContainer from '../components/OrdersContainer';

export default function Orders() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [orders, setOrders] = useState();

  const history = useHistory();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        let ordersArray;
        if (token.role === 'administrator') ordersArray = await adminApi(token);
        if (token.role === 'client') ordersArray = await salesApi(token);
        setOrders(ordersArray);
      } catch (error) {
        console.log(error);
      //   history.push({
      //     pathname: '/error',
      //     state: { ...error } });
      }
    };
    fetchOrders();
  }, [setOrders, token, history]);

  const title = (token && token.role === 'administrator') ? 'Pedidos' : 'Meus Pedidos';

  if (!token) return <Redirect to="/login" />;

  return (
    <section>
      <Topbar title={ title } />
      { (!orders)
        ? <Loading />
        : <OrdersContainer orders={ orders } /> }
    </section>
  );
}
