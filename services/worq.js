const admin = require("firebase-admin");
const credentials = require("./credentials.json");
// admin.initializeApp({
//   credential: admin.credential.cert(credentials),
//   databaseURL: "http://localhost:9000",
// });

const db = admin.firestore();

// const saveWorqOrder = () => {
//   const orderDocRef = db.doc(`orders/1234/worq_orders/4568`);
//   try {
//     typeof orderDocRef !== undefined ? orderDocRef.set({ newData: "3" }) : null;
//     if (typeof orderDocRef !== undefined) {
//       orderDocRef.set({ newData: "4" });
//     }
//   } catch (e) {
//     console.log("error saving worq order: " + JSON.stringify(e.message));
//   }
// };

// saveWorqOrder();

const readAllWorqOrders = async (customerId) => {
  const worqOrders = await db
    .doc(`orders/${customerId}`)
    .collection("worq")
    .get()
    .then((result) => {
      return formatAllWorqOrders(result);
    })
    .catch((error) => {
      console.log({ error });
    });

  console.log(worqOrders);

  return worqOrders;
};

const formatAllWorqOrders = (worqOrders) => {
  let allWorqOrders = [];
  let worqOrder;
  let counter = 0;
  worqOrders.forEach((doc, index) => {
    worqOrder = doc.data();
    allWorqOrders.push(worqOrder);
    counter++;
  });
  if (counter == worqOrders.size) {
    return allWorqOrders;
  }
};

