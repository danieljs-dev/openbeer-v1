import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function ClientMenu({ className, callback }) {
  return (
    <section className={ className }>
      <Link to="/products" data-testid="side-menu-item-products">
        Produtos
      </Link>
      <Link to="/orders" data-testid="side-menu-item-my-orders">
        Meus pedidos
      </Link>
      <Link to="/profile" data-testid="side-menu-item-my-profile">
        Meu perfil
      </Link>
      <button type="button" onClick={ callback } data-testid="side-menu-item-logout">
        Sair
      </button>
    </section>
  );
}

ClientMenu.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
