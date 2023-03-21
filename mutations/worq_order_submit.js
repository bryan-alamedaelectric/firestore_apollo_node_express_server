const db = admin.firestore();
db.settings({ ignoreUndefinedProperties: true })

exports.resolver = async ({
  jobId,
  bill_to,
  ship_to,
  customer_po,
  sales_source = "WOE",
  order_source = "WOE",
  internal_notes,
  ordered_by,
  address_street_1,
  address_street_2,
  address_city,
  address_state = "CA",
  address_postal_code,
  address_country = "US",
  ship_via_id = "OT OUR TRUCK",
  shipping_branch,
  shipping_branch_name,
  telephone_number,
  release_number,
  shipping_instructions,
  fulfillment,
  customBranchID,
  points,
}) => {
  const worqOrder = {
    jobId:'12311',
    bill_to,
    ship_to,
    customer_po,
    sales_source: "WOE",
    order_source: "WOE",
    internal_notes,
    ordered_by:'bryan',
    address_street_1,
    address_street_2,
    address_city,
    address_state: "CA",
    address_postal_code,
    address_country: "US",
    ship_via_id: "OT OUR TRUCK",
    shipping_branch,
    shipping_branch_name,
    telephone_number,
    release_number,
    shipping_instructions,
    fulfillment,
    customBranchID,
    points,
  };

  const orderDocRef = db.doc(`orders/1234/worq_orders/4567`);
  try {
    if (typeof orderDocRef !== undefined) {
      orderDocRef.set(worqOrder, { merge: true });
    }
  } catch (e) {
    console.log("error saving worq order: " + JSON.stringify(e.message));
  }
};
