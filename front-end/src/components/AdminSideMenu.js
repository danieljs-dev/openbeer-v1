import React from 'react';
import { Link } from 'react-router-dom';
import { PropTypes } from 'prop-types';

export default function AdminMenu({ className, callback }) {
  return (
    <section className={ className }>
      <Link to="/admin/orders" data-testid="side-menu-item-orders">
        Pedidos
      </Link>
      <Link to="/admin/profile" data-testid="side-menu-item-profile">
        Perfil
      </Link>
      <button type="button" onClick={ callback } data-testid="side-menu-item-logout">
        Sair
      </button>
    </section>
  );
}

AdminMenu.propTypes = {
  callback: PropTypes.func.isRequired,
  className: PropTypes.string.isRequired,
};
