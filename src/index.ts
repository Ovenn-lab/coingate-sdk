import { Client } from './Client';
import { CurrencyKind } from './Modules/Public/types';

// const client = new BaseClient('P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_', true);
const client = new Client();
const test = async () => {
  client.setAppInfo({ name: 'test' });
  try {
    // const test = await client.refunds.createOrderRefund(32820, {
    //   amount: 50,
    //   address: '2MxRdYGDdyFiqkMUUksTJ3Qey8sTQPfTii9',
    //   currency_id: 1,
    //   platform_id: 2,
    //   reason: 'for test purposes',
    //   email: 'testDrive@gmail.com',
    //   ledger_account_id: 'random'
    // });
    // const test = await client.public.test(
    //   'P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_'
    // );
    // console.log({ test });
    client.setEnviroment('sandbox');
    client.setApiKey('P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_');
    const test = await client.public.getMerchantPayoutCurrencies(
      'fiat' as CurrencyKind
    );
    console.log(test);
  } catch (e) {
    console.log(e);
  }
};
test();
