
const reducer = (state, action) => {
    if (action.type === 'CLEAR_CART') {
        return { ...state, cart: []} ;
    }
    if (action.type === 'REMOVE') {
        const newCart = state.cart.filter((cartItem) => cartItem.id !== action.payload);

        return { ...state, cart: newCart };
    }
    if (action.type === 'INCREASE') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
               return { ...cartItem, amount: cartItem.amount + 1 };
            }

            return cartItem;
        });

        return {...state, cart: tempCart }
    }
    if (action.type === 'DECREASE') {
        let tempCart = state.cart.map((cartItem) => {
            if (cartItem.id === action.payload) {
                return { ...cartItem, amount: cartItem.amount - 1 };
            }

            return cartItem;
        })
        .filter((cartItem) => cartItem.amount !== 0);

        return {...state, cart: tempCart }
    }
    /* 
        VEJA: que temos duas variáveis 'amount', uma geral controlada pelo estado do app e outra presente em cada cartItem dentro do array de cart.
    */
    if (action.type === 'GET_TOTAL') {
        let { total, amount } = state.cart.reduce((cartTotal, cartItem) => {
            const { price, amount } = cartItem;
            //console.log(price, amount);

            const itemTotal = price * amount;

            cartTotal.total += itemTotal;
            cartTotal.amount += amount;

            return cartTotal;
        }, {
            total: 0,
            amount: 0
        });
        /* 
            CUIDADO, porque toFixed() converte para string enquanto faz o arredondamento.....
        */
        total = parseFloat(total.toFixed(2));

        return { ...state, total, amount };
    }
    if (action.type === 'LOADING') {
        return { ...state, loading: true };
    }
    if (action.type === 'DISPLAY_ITEMS') {
        return { ...state, cart: action.payload, loading: false };
    }
    if (action.type === 'TOGGLE_AMOUNT') {
       let tempCart = state.cart.map((cartItem) => {
           if (cartItem.id === action.payload.id) {
               if (action.payload.type === 'increase') {
                    return { ...cartItem, amount: cartItem.amount + 1 };
               }
               if (action.payload.type === 'decrease') {
                   return { ...cartItem, amount: cartItem.amount - 1 };
               }
           } 

           return cartItem;
       })
       .filter((cartItem) => cartItem.amount !== 0);

       return { ...state, cart: tempCart };
    }
    
    throw new Error('no matching action type');
};



export default reducer


