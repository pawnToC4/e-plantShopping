import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { removeItem, updateQuantity } from './CartSlice';
import './CartItem.css';

const CartItem = ({ onContinueShopping }) => {
  const cart = useSelector(state => state.cart.items);
  const dispatch = useDispatch();

  // Calculate total amount for all products in the cart
  //Task 3.1
  const calculateTotalAmount = () => {
    let ret = cart.reduce((accumulator, curr) => 
                {accumulator + parseFloat(curr.cost.substring(1)) * curr.quantity}, 0);
    return ret;
  };

  //Task 3.2
  const handleContinueShopping = (e) => {
   onContinueShopping(e);
  };

  //Task 3.3
  const handleCheckoutShopping = (e) => {
    alert('Functionality to be added for future reference');
  };
  //Task 3.4
  const handleIncrement = (item) => {
    dispatch(updateQuantity({ name: item.name, quantity: item.quantity + 1 }));
  };

  const handleDecrement = (item) => {
   let amount = item.quantity - 1;
   if(amount > 0){
    dispatch(updateQuantity({name: item.name, quantity:amount}));
   }else {
    handleRemove(item);
   }
  };
  //Task 3.5
  const handleRemove = (item) => {
    dispatch(removeItem({name:item.name}));
  };

  //Task 3.6
  // Calculate total cost based on quantity for an item
  const calculateTotalCost = (item) => {
    return parseFloat(item.cost.substring(1)) * item.quantity;
  };

  return (
    <div className="cart-container">
      <h2 style={{ color: 'black' }}>Total Cart Amount: ${calculateTotalAmount()}</h2>
      <div>
        {cart.map(item => (
          <div className="cart-item" key={item.name}>
            <img className="cart-item-image" src={item.image} alt={item.name} />
            <div className="cart-item-details">
              <div className="cart-item-name">{item.name}</div>
              <div className="cart-item-cost">{item.cost}</div>
              <div className="cart-item-quantity">
                <button className="cart-item-button cart-item-button-dec" onClick={() => handleDecrement(item)}>-</button>
                <span className="cart-item-quantity-value">{item.quantity}</span>
                <button className="cart-item-button cart-item-button-inc" onClick={() => handleIncrement(item)}>+</button>
              </div>
              <div className="cart-item-total">Total: ${calculateTotalCost(item)}</div>
              <button className="cart-item-delete" onClick={() => handleRemove(item)}>Delete</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '20px', color: 'black' }} className='total_cart_amount'></div>
      <div className="continue_shopping_btn">
        <button className="get-started-button" onClick={(e) => handleContinueShopping(e)}>Continue Shopping</button>
        <br />
        <button className="get-started-button1" onClick={(e) => handleCheckoutShopping(e)}>Checkout</button>
      </div>
    </div>
  );
};

export default CartItem;


