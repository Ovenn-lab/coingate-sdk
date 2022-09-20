import { Client } from '../../src';

const apiKey = '5fjBmoB-5zsNg6dzphye7k3_sUhr7vH-RYyXFn4u'; // Your sandbox api key

const client = new Client(apiKey, true); // When second parameter is true, you'll get to play in sandbox mode

const createOrder = async () => {
  try {
    const { id } = await client.paymentGateway.createOrder({
      price_amount: 1,
      price_currency: 'USD',
      receive_currency: 'ETH',
      description: '1x Apple iPhone 22 Pro, 2x Balenciaga backpacks'
    });

    return id;
  } catch (e) {
    console.log(e);
  }
};

const checkout = async (orderId: number) => {
  try {
    const checkout = await client.paymentGateway.checkout(orderId, {
      pay_currency: 'ETH'
    });
  } catch (e) {
    console.log(e);
  }
};

const trackStatus = async (orderId: number) => {
  const interval = setInterval(async () => {
    const { status } = await client.paymentGateway.getOrder(orderId);

    if (
      ['expired', 'invalid', 'paid', 'canceled', 'refunded'].includes(status)
    ) {
      console.log(`Order ${orderId} status has changed to: ${status}`);
    }

    console.log(`Your order ${orderId} status is ${status}`);
  }, 2000);
};

const init = async () => {
  const orderId = await createOrder();

  await checkout(orderId);
  trackStatus(orderId);
};

init();
