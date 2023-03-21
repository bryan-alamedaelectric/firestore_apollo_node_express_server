const fs = admin.firestore();

exports.resolver = async () => {
  console.log("resolving omitted users");
  const userRef = fs.doc(`users/hk8ZyGAOdjR18LI2fJ8RrfNF3FA3`);
  let omittedUsers = {};
  omittedUsers = await userRef.get().then((doc) => {
    return doc.data().omitted_users_from_notification_email;
  });

  let data = {
    omitted_users_from_notification_email: omittedUsers,
  };

  const arr1 = {
    123:'bnrios08@gmail.com'
  }
  
  const arr2 = [{id: 123, email:bnrios08@gmail.com}, {id:456, email:bryanrios1931@gmail.com}, {id:789, email:altobeatsinfo@gmail.com}]

  return data;
};
