const data = [
  {
    id: 1,
    exchange: "Binance",
    username: "Dr1lm",
    currency: "CZK",
    price: 22.4,
    direction: "BUY",
    isOutbided: false,
    topOrder: null,
    notifications: true,
    paymentMethods: [
      {
        name: "ZEN",
        topOrder: 
        {
          price: 0.95, 
          name: "John Doe",
          quantity: 100,
          min: 50,
          max: 100,
        }
      },
      {
        name: "Paypal",
        topOrder: null, 
      },
      {
        name: "Bank transfer",
        topOrder: null, 
      },
      {
        name: "Wise",
        topOrder: null, 
      }
    ],
  },
  {
    id: 2,
    exchange: "Bybit",
    currency: "EUR",
    direction: "SELL",
    isOutbided: false,
    price: 0.96,
    notifications: true,
    paymentMethods: [
    {
      name: "ZEN",
      topOrder: 
      {
        price: 0.95, 
        name: "John Doe",
        quantity: 100,
        min: 50,
        max: 100,
      }
    }
    ],
  },
  {
    id: 3,
    exchange: "Bybit",
    currency: "EUR",
    direction: "SELL",
    isOutbided: false,
    price: 0.96,
    notifications: true,
    paymentMethods: [
    {
      name: "ZEN",
      topOrder: 
      {
        price: 0.95, 
        name: "John Doe",
        quantity: 100,
        min: 50,
        max: 100,
      }
    }
    ],
  }
]

export const links = [
  {
    name: "Home",
    url: "/"
  },
  {
    name: "Trackers",
    url: "/trackers"
  },
  {
    name: "Currency list",
    url: "/currency-list"
  }
]

export default data;
