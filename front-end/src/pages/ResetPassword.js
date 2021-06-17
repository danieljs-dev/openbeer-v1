import React, { useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';

export default function Reset() {
  const history = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { token } = useParams();

  const request = async () => {
    const url = 'http://localhost:3001/user/reset_password';

    await axios.post(url, {
      email,
      token,
      password,
    })
    .then((res) => {
      if (res.data.message) {
        const message = document.getElementById('message');
        message.innerHTML = res.data.message;
        setTimeout(() => history.push('/login'), 5000);
      };
    })
    .catch((err) => ( console.error(err)));
  };

  return (
    <div>
      <form onSubmit={ (e) => e.preventDefault() }>
        <fieldset className="checkout-form">
          <legend>Resetar senha</legend>
          <div>
          <input
              type="text"
              name="email"
              placeholder="email"
              value={ email }
              onChange={ (e) =>setEmail(e.target.value) }
            />
            <input
              type="password"
              name="password"
              placeholder="password"
              value={ password }
              onChange={ (e) => setPassword(e.target.value) }
            />
          </div>
          <div>
            <button onClick={ request }>
               Confirmar
            </button>
          </div>
        </fieldset>
      </form>
      <div id="message" />
    </div>
  );
};
