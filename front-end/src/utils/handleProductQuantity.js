export default ({ action, id, data = {}, cart }) => {
  const currQuantity = (cart[id]) ? cart[id].quantity : 0;
  const newCart = { ...cart };
  if (action === 'add' && currQuantity === 0) {
    newCart[id] = { ...data, quantity: currQuantity + 1 };
  }
  if (action === 'add' && currQuantity !== 0) newCart[id].quantity = currQuantity + 1;
  if (action === 'del' || (action === 'sub' && currQuantity === 1)) delete newCart[id];
  if (action === 'sub' && currQuantity > 1) newCart[id].quantity -= 1;

  return newCart;
};
