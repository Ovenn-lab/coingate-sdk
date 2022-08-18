import { AbstractService } from "../Abstract/Abstract.service";

export class BillingClient {
  private abstractService: AbstractService;

  public createSubscriber() {
    // POST
    // billing/subscribers
  }

  public getSubscriber() {
    // GET
    // billing/subscribers/:id
  }

  public getSubscribers() {
    // GET
    // billing/subscribers
  }

  public editSubscriber() {
    // PATCH
    // billing/subscribers/:id
  }

  public deleteSubscriber() {
    // DELETE
    // billing/subscribers/:id
  }

  public createSubscriptionDetails() {
    // POST
    // billing/details
  }

  public getSubscriptionDetail() {
    // GET
    // billing/details/:id
  }

  public getSubscriptionDetails() {
    // GET
    // billing/details
  }

  public editSubscriptionDetails() {
    // GET
    // billing/details/:id
  }

  public deleteSubscsriptionDetails() {
    // DELETE
    // billing/details/:id
  }

  public createSubscription() {
    // POST
    // billing/subscriptions
  }

  public getSubscription() {
    // GET
    // billing/subscriptions/:id
  }

  public getSubscriptions() {
    // GET
    // billing/subscriptions
  }

  public editSubscription() {
    // PATCH
    // billing/subscriptions/:id
  }

  public activateSubscription() {
    // PATCH
    // billing/subscriptions/:id/activate
  }

  public deleteSubscription() {
    // DELETE
    // billing/subscriptions/:id
  }

  public getPayment() {
    // GET
    // billing/payments/:id
  }

  public getPayments() {
    // GET
    // billing/payments
  }

  public getSubscriptionPayments() {
    // GET
    // billing/subscriptions/:id/payments
  }
}
