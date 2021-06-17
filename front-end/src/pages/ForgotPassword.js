import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

export default function Forgot() {
  const history = useHistory();
  const [email, setEmail] = useState('');

  const request = async () => {
    const url = 'http://localhost:3001/user/forgot_password';

    await axios.post(url, {
      email,
    })
    .then((res) => {
      if (res.data.message) {
        const message = document.getElementById('message');
        message.innerHTML = res.data.message;
        setTimeout(() => history.push('/login'), 10000);
      };
    })
    .catch((err) => ( console.log(err)));
  };

  return (
    <div>
      <form onSubmit={ (e) => e.preventDefault() }>
        <fieldset className="checkout-form">
          <legend>Esqueci minha senha</legend>
          <div>
            <input
              type="text"
              name="email"
              placeholder="email"
              value={ email }
              onChange={ (e) =>setEmail(e.target.value) }
            />
          </div>
          <div>
            <button onClick={ request }>
               Resetar senha
            </button>
          </div>
        </fieldset>
      </form>
      <div id="message" />
    </div>
  );
};
