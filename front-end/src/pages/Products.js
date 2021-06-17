import React, { useContext, useMemo } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar, Loading, Button, ProductCard } from '../components';

import '../styles/Products.css';

export default function Products() {
  const {
    productsContext: { products },
    tokenContext: { token },
    cartContext: { cart, setCart },
  } = useContext(AppContext);

  const history = useHistory();

  const goCheckout = () => history.push('/checkout');

  const disabled = useMemo(() => (Object.keys(cart).length === 0), [cart]);

  if (!token) return <Redirect to="/login" />;

  return (
    <section>
      <Topbar />
      { (!products)
        ? <Loading />
        : (
          <>
            <section className="products-container">
              { (products.length === 0)
                ? 'Não há produtos no banco de dados.'
                : products.map((product, index) => (
                  <ProductCard
                    product={ product }
                    index={ index }
                    callback={ setCart }
                    cart={ cart }
                    key={ index }
                  />
                )) }
            </section>
            <Button
              cart={ cart }
              id="cart"
              callback={ goCheckout }
              disabled={ disabled }
            />
          </>
        ) }
    </section>
  );
}
