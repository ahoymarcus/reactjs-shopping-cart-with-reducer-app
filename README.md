# React-JS Shopping Cart App

<br />

O projeto cria uma aplicação de Carrinho de Compras, em que o componente inicial renderiza dois componentes, sendo um deles o Navbar que rederiza elementos como Logo e Title, além de renderizar o ícone da bolsa/carrinho com o número de ítens selecionados.
O outro componente é o CartContainer responsável por englobar uma série funcionalidades como renderizar imagens e preços dos ítens, além de permitir aumentar ou diminuir seu número e até remover o item do carrinho.

<br />

**Em termos da funcionalidade mais avançada do app** temos todo um sistema criado encima dos conceitos dos React Hooks **UseContext** e **UseReducer** controlar a passagem de valores e de funções entre os diversos componentes, que serão justamente os valores que estarão sendo renderizados de forma condicionada e pelas funções que precisam definir a lógica das funcionalidades operadas pelos componentes como remover ítens do carrinho, por exemplo.

<br />

Finalmente, o app Cart pode ainda fazer requisições HTTP para receber dados de APIs da web.

<br />

#### React Project (the 15 Projects) - Freecodecamp.org

Conjunto de projetos de frontend inspirados na apresentação do professor **Johm Smilga** para aprofundar no conhecimento do framework React-JS e JavaScript. [^1]

<br />

[]()

<br />

### Imagem do app Cart mostrando as funcionalidades de aumentar e diminuir seleção do carrinho de compra e totalização dos valores dos produtos:

![Imagem do app Cart mostrando as funcionalidades](/public/images/reactjs-shopping-cart-with-usereducer-app-01.png)

<br />

### Imagem do app Cart mostrando o carrinho de compra esvaziado dos itens:

![Imagem do app Cart mostrando o carrinho de compra esvaziado dos itens](/public/images/reactjs-shopping-cart-with-usereducer-app-02.png)

<br />

Abaixo temos o código de exemplo de **context.js** responsável por gerir os estados globais da aplicação e também disparar as ações para serem recebidas por **reducer.js**.

<br />

```
const clearCart = () => {
    dispatch({ type: 'CLEAR_CART' });
  };

  const remove = (id) => {
    dispatch({ type: 'REMOVE', payload: id });
  };

  const increase = (id) => {
    dispatch({ type: 'INCREASE', payload: id })
  };

  const decrease = (id) => {
    dispatch({ type: 'DECREASE', payload: id });
  };

  const toggleAmount = (id, type) => {
    dispatch({ type: 'TOGGLE_AMOUNT', payload: { id, type }});
  };

  const fetchData = async () => {
    try {
      dispatch({ type: 'LOADING' });
      const response = await fetch(url);
      const cart = await response.json();
      dispatch({ type: 'DISPLAY_ITEMS', payload: cart });
    } catch (error) {
      console.log(error);
    }
  };


  useEffect(() => {
    fetchData();
  }, []);


  useEffect(() => {
    //console.log('hello');

    dispatch({ type: 'GET_TOTAL' });
  }, [state.cart]);


  return (
    <AppContext.Provider
      value={{
        ...state,
        clearCart,
        remove,
        increase,
        decrease,
        toggleAmount
      }}
    >
```

<br />

Já aqui, temos um exemplo de como trabalha o **reducer.js** para tratar das ações disparadas pelo app:

<br />

```
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
```

<br />
<br />

[^1] John Smilga - Freecodecamp.org.
