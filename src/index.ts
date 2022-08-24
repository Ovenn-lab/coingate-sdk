import { Client } from "./Clients";

const client = new Client("P_gkiNVtFZkNy1kCekx6fdwsfCT-dWL21tsxrHh_", true);

const test = async () => {
  try {
    const test = await client.refunds.createOrderRefund(32820, {
      amount: 50,
      address: "2MxRdYGDdyFiqkMUUksTJ3Qey8sTQPfTii9",
      currency_id: 1,
      platform_id: 2,
      reason: "for test purposes",
      email: "testDrive@gmail.com",
      ledger_account_id: "random",
    });
    // const test = await client.public.test(
    //   "P_gkiNVtFZkNy1kCekx6f dwsfCT-dWL21tsxrHh_"
    // );
    console.log({ test });
  } catch (e) {
    // console.log(e);
  }
};
test();