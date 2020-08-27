import mysql2 from 'mysql2';

const addCartQuery = (userId, productId, count) => {
  const addCartFormat = `insert into cart(user_id, product_id, count) values(?,?,?)`;
  const addCart = mysql2.format(addCartFormat, [userId, productId, count]);
  return addCart;
};

const getCartQuery = (userId) => {
  const getCartFormat = `
  select p.id id, name, price, registered_date, remain, saled_count, category_id, img_url, user_id, count
  from product p
  left join cart c 
  on p.id = c.product_id 
  where c.user_id = ?;`;
  const getCart = mysql2.format(getCartFormat, [userId]);
  return getCart;
};

const removeCartQuery = (userId, productId) => {
  const removeCartFormat = `
        delete from cart where user_id=? and product_id=?;
    `;
  const removeCart = mysql2.format(removeCartFormat, [userId, productId]);
  return removeCart;
};

const updateCartQuery = (userId, productId, count) => {
  const updateCartFormat = `
        update cart set count=? where user_id=? and product_id=?;
    `;
  const updateCart = mysql2.format(updateCartFormat, [count, userId, productId]);
  return updateCart;
};

export { addCartQuery, getCartQuery, removeCartQuery, updateCartQuery };
