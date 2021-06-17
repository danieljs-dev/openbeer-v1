import React, { useContext } from 'react';
import { PropTypes } from 'prop-types';
import AppContext from '../context/app.context';

import OrderCard from './OrderCardDetail';
import Button from './Button';
import { convertDate } from '../utils';
import adminApi from '../services/api.admin';

export default function OrderDetails({ order, callback }) {
  const {
    tokenContext: { token },
    productsContext: { products } } = useContext(AppContext);

  const updateStatus = async () => {
    try {
      await adminApi({ ...token, saleId: order.id, delivered: true });
      callback({ ...order, status: 'Entregue' });
      return { status: 'OK', message: 'Sale status updated' };
    } catch (error) {
      return error;
    }
  };

  if (!order.sale || !products) return 'Loading order...';

  return (
    <section className="order-detail-wrapper">
      <h3 data-testid="order-number">{ `Pedido ${order.id}` }</h3>
      <p data-testid="order-date">{ convertDate(order.sale_date)[0] }</p>
      { (token.role === 'administrator')
        && (
          <section>
            <p>{ `Cliente: ${order.user_name}` }</p>
            <p data-testid="order-status">{ order.status }</p>
          </section>
        ) }
      { order.sale.map((curr, index) => (
        <OrderCard index={ index } order={ curr } key={ index } />
      )) }
      <p data-testid="order-total-value">
        { `Total: R$ ${order.total_price.replace('.', ',')}` }
      </p>
      { (token.role === 'administrator' && order.status === 'Pendente')
      && (<Button callback={ updateStatus } id="updateDeliver" />) }
    </section>
  );
}

OrderDetails.propTypes = {
  order: PropTypes.objectOf(PropTypes.any),
  callback: PropTypes.func,
};

OrderDetails.defaultProps = {
  order: {},
  callback: () => {},
};
