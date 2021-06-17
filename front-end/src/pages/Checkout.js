import React, { useContext, useState, useMemo, useEffect, useCallback } from 'react';
import { Redirect, useHistory } from 'react-router-dom';

import AppContext from '../context/app.context';
import { Topbar, Button, TextInput } from '../components';
import salesApi from '../services/api.sales';
import { handleProductQuantity } from '../utils';

import '../styles/Checkout.css';

export default function Checkout() {
  const {
    tokenContext: { token },
    cartContext: { cart, setCart } } = useContext(AppContext);
  const [address, setAddress] = useState({ street: '', number: undefined });
  const [success, setSuccess] = useState(false);

  const history = useHistory();

  const cartTotal = useMemo(() => Object.keys(cart).reduce(
    (sum, curr) => (
      sum + (cart[curr].price * cart[curr].quantity)
    ), 0,
  ).toFixed(2).replace('.', ','), [cart]);

  const removeItem = useCallback((id) => {
    const newCart = handleProductQuantity({
      action: 'del',
      id,
      cart });
    setCart(newCart);
  }, [cart, setCart]);

  const updateAddress = (target) => {
    if (target.name === 'house-number') {
      return setAddress({ ...address, number: target.value });
    }
    setAddress({ ...address, [target.name]: target.value });
  };

  const checkout = async () => {
    const sale = Object.keys(cart).map((curr) => (
      { productId: parseInt(curr, 10), quantity: parseInt(cart[curr].quantity, 10) }
    ));
    const delivery = {
      address: address.street,
      number: address.number,
    };
    const order = {
      sale,
      delivery,
      salePrice: cartTotal.replace(',', '.'),
    };

    await salesApi({ ...token, order })
      .then(() => {
        setSuccess(true);
        setCart({});
      })
      .catch(
        (error) => history.push({ pathname: '/error', state: { error } }),
      );
  };

  const disabled = useMemo(() => {
    if (address.street.length === 0
      || !address.number
      || Object.keys(cart) < 1) return true;
    return false;
  }, [address, cart]);

  useEffect(() => {
    let timeOut;
    if (success) {
      const magicTime = 2000;
      timeOut = setTimeout(() => history.push('/products'), magicTime);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [history, success]);

  if (!token) return <Redirect to="/login" />;

  return (
    <section>
      <Topbar title="Finalizar Pedido" />
      { (success)
        ? <section>Compra realizada com sucesso!</section>
        : (
          <section className="checkout-container">
            { (Object.keys(cart) < 1)
              ? <h3>Não há produtos no carrinho.</h3>
              : (
                Object.keys(cart).map((id, index) => (
                  <section className="product-row" key={ `${id}-{index}` }>
                    <section data-testid={ `${index}-product-qtd-input` }>
                      { cart[id].quantity }
                    </section>
                    <section className="name" data-testid={ `${index}-product-name` }>
                      { cart[id].name }
                    </section>
                    <section>
                      <span data-testid={ `${index}-product-total-value` }>
                        { `R$ ${(cart[id].price * cart[id].quantity)
                          .toFixed(2).replace('.', ',')}` }
                      </span>
                    </section>
                    <section>
                      <span data-testid={ `${index}-product-unit-price` }>
                        { `(R$ ${cart[id].price.replace('.', ',')} un)` }
                      </span>
                    </section>
                    <section>
                      <button
                        type="button"
                        onClick={ () => removeItem(id) }
                        data-testid={ `${index}-removal-button` }
                        className="alert"
                      >
                        Remover
                      </button>
                    </section>
                  </section>
                ))
              ) }

            <section data-testid="order-total-value"
            className="checkout-total">
              { `Total: R$ ${cartTotal.replace('.', ',')}` }
            </section>
            <form>
              <fieldset className="checkout-form">
                <legend>Endereço de entrega</legend>
                <TextInput
                  name="street"
                  testId="checkout"
                  value={ address.street }
                  callback={ updateAddress }
                />
                <TextInput
                  name="house-number"
                  testId="checkout"
                  value={ address.number }
                  callback={ updateAddress }
                />
              </fieldset>
            </form>
            <Button
              cart={ cart }
              id="checkout"
              disabled={ disabled }
              callback={ checkout }
              className="checkout-finish-btn"
            />
          </section>
        ) }
    </section>
  );
}
