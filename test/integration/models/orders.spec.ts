import { OrdersStore } from "../../../src/models/order.model";
import { ORDER_STATUS } from "../../../src/utils/Constants";

const store = new OrdersStore()

describe("Order Model", function () {

        it("Create new order", (done) => {
            (async function () {
                expect(store.create).toBeDefined();
                const order = await store.create(ORDER_STATUS.ACTIVE, 50);
                expect(order).toBeDefined;
                done();
            })();   
        });

        it("Add product to order", (done) => {
            (async function () {
                expect(store.addProductToOrder).toBeDefined();
                const res = await store.addProductToOrder(5, 50, 50)
                expect(res).toEqual(true);
                done();
            })();   
        });


        it("Show order by id", (done) => {
            (async function () {
                expect(store.show).toBeDefined();
                const order = await store.show(50, 50)
                expect(order?.id).toEqual(50);
                done();
            })();   
        });

        it("List user orders", (done) => {
            (async function () {
                expect(store.index).toBeDefined();
                const orders = await store.index(50)
                expect(orders.length).toEqual(2);
                done();
            })();   
        });
    });

  