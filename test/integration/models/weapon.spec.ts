// import { WeaponStore } from "../../../src/models/user.model";

// const store = new WeaponStore()

// describe("Weapon Model", function () {
  
//     it("it shoud have an index method", () => {
//        expect(store.index).toBeDefined();
//     });
  
//     it("index method should return list of weapons", async() => {
//        const results = await store.index()
//        console.log(results)
//        expect(results).toEqual([]);

//      });

//      it('should have a show method', () => {
//       expect(store.show).toBeDefined();
//     });
  
//     it('should have a create method', () => {
//       expect(store.create).toBeDefined();
//     });
  
//     it('should have a delete method', () => {
//       expect(store.index).toBeDefined();
//     });
  
//     it('create method should add a weapon', async () => {
//       const result = await store.create({
//         name: 'Bridge to Terabithia',
//         weight: 250,
//         type: 'Childrens'
//       });
//       expect(result).toEqual({
//          id: 1,
//          name: 'Bridge to Terabithia',
//          weight: 250,
//          type: 'Childrens'
//       });
//     });
  
//     it('index method should return a list of weapons', async () => {
//       const result = await store.index();
//       expect(result).toEqual([{
//         id: 1,
//         name: 'Bridge to Terabithia',
//         weight: 250,
//         type: 'Childrens'
//       }]);
//     });
  
//     it('show method should return the correct weapon', async () => {
//       const result = await store.show("1");
//       expect(result).toEqual({
//         id: 1,
//         name: 'Bridge to Terabithia',
//         weight: 250,
//         type: 'Childrens'
//       });
//     });
  
//     it('delete method should remove the weapon', async () => {
//       store.delete("1");
//       const result = await store.index()
  
//       expect(result).toEqual([]);
//     });

//     });

  