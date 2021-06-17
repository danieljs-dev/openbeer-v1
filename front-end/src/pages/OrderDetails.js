import React, { useContext, useState, useEffect } from 'react';
import { Redirect, useParams, useHistory } from 'react-router-dom';
import AppContext from '../context/app.context';

import { Topbar, Loading, OrderDetails as OrderDetailComponent } from '../components';
import salesApi from '../services/api.sales';
import adminApi from '../services/api.admin';

import '../styles/OrderDetails.css';

export default function OrderDetails() {
  const { tokenContext: { token } } = useContext(AppContext);
  const [order, setOrder] = useState();
  const params = useParams();

  const history = useHistory();

  const title = (token && token.role === 'administrator')
    ? 'Detalhes de Pedido'
    : 'Meu Pedido';

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const currOrder = (token.role === 'administrator')
          ? await adminApi({ ...token, saleId: params.id })
          : await salesApi({ ...token, saleId: params.id });
        if (currOrder.code) {
          history.push({
            pathname: '/error',
            state: { ...currOrder } });
        }
        setOrder(currOrder);
      } catch (error) {
        console.log(error);
      }
    };
    fetchOrder();
  }, [setOrder, params, token, history]);

  if (!token) return <Redirect to="/login" />;

  return (
    <section>
      <Topbar title={ title } />
      { (!order)
        ? <Loading />
        : <OrderDetailComponent order={ order } callback={ setOrder } /> }
    </section>
  );
}
