import { RefundsClient } from '../src/Modules';
import { mockOrderRefundData, mockRefundsData } from './Mocks';

describe('RefundsClient', () => {
  let refundsClient: RefundsClient;
  let getSpy;
  let postSpy;

  beforeEach(() => {
    refundsClient = new RefundsClient();
    getSpy = jest.spyOn(refundsClient, 'get');
    postSpy = jest.spyOn(refundsClient, 'post');
  });

  describe('createOrderRefund method', () => {
    test('should build path and call post with it', () => {
      const { order_id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsClient, 'buildPath');
      const result = refundsClient.createOrderRefund(
        order_id,
        mockOrderRefundData
      );

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id }
      });
      expect(postSpy).toBeCalledTimes(1);
      expect(postSpy).toBeCalledWith(
        `/v2/orders/${order_id}/refunds`,
        mockOrderRefundData
      );
    });
  });

  describe('getOrderRefund method', () => {
    test('should build patg and call get method with it', () => {
      const { order_id, id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsClient, 'buildPath');
      const result = refundsClient.getOrderRefund(order_id, id);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds/:id',
        params: { order_id, id }
      });
    });
  });

  describe('getOrderRefunds method', () => {
    test('should build path and call get method', () => {
      const { order_id } = mockRefundsData;
      const buildPathSpy = jest.spyOn(refundsClient, 'buildPath');
      const result = refundsClient.getOrderRefunds(order_id);

      expect(result).toBeDefined();
      expect(buildPathSpy).toBeCalledTimes(1);
      expect(buildPathSpy).toBeCalledWith({
        path: '/v2/orders/:order_id/refunds',
        params: { order_id }
      });
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: `/v2/orders/${order_id}/refunds` });
    });
  });

  describe('getRefunds method', () => {
    test('should call get method with path /v2/refunds', () => {
      const result = refundsClient.getRefunds();

      expect(result).toBeDefined();
      expect(getSpy).toBeCalledTimes(1);
      expect(getSpy).toBeCalledWith({ path: '/v2/refunds' });
    });
  });
});
