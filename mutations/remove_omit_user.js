const db = admin.firestore();

exports.resolver = async (parent, { omitUserIDs }, { app, user, customer }) => {
  const userRef = db.doc(`users/hk8ZyGAOdjR18LI2fJ8RrfNF3FA3`);
  let errors = [];
  let counter = 0;
  userRef.get().then((doc) => {
    try {
      let userData = doc.data().omitted_users_from_notification_email;
      omitUserIDs.forEach((omitUserID) => {
        delete userData[`${omitUserID}`];
      });
      counter++;
      return userRef.update({
        omitted_users_from_notification_email: userData,
      });
    } catch (e) {
      errors.push(e);
    }
  });
  if (counter === omitUserIDs.length) {
    if (errors.length > 0) {
      return errors;
    }
    return "success";
  }
};
