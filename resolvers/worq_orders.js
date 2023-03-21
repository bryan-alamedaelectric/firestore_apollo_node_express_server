const db = admin.firestore();

exports.resolver = async ({}) => {
  let customerId = "1234";
  const worqOrders = await db
    .doc(`orders/${customerId}`)
    .collection("worq_orders")
    .get()
    .then((result) => {
      return formatAllWorqOrders(result);
    })
    .catch((error) => {
      console.log({ error });
    });

  return worqOrders;
};

const formatAllWorqOrders = (worqOrders) => {
  let allWorqOrders = [];
  let worqOrder = {};
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
