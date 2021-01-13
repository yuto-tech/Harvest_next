import functions from 'firebase-functions';
import Filter from 'bad-words';
import admin from 'firebase-admin';

const db = admin.firestore();
//Cloud Functionsデータを読み取る
db.collection('users').get()
  .then((snapshot) => {
    snapshot.forEach((doc) => {
      console.log(doc.id, '=>', doc.data());
    });
  })
  .catch((err) => {
    console.log('Error getting documents', err);
  });

exports.detectEvilUsers = functions.firestore
        const filter = new Filter();
        const { text, uid } = doc.data(); 

        let docRef = db.collection('users').doc('alovelace');
        let setAda = docRef.set({
          first: 'Ada',
          last: 'Lovelace',
          born: 1815
        })
       .document('messages/{msgId}')
       .onCreate(async (doc, ctx) => {
       if (filter.isProfane(text)) {
          const cleaned = filter.clean(text);
          await doc.ref.update({text: `🤐 I got BANNED for life for saying... ${cleaned}`});

          await db.collection('banned').doc(uid).set({});
        } 

       const userRef = db.collection('users').doc(uid)

       const userData = (await userRef.get()).data();

       if (userData.msgCount >= 7) {
          await db.collection('banned').doc(uid).set({});
       } else {
          await userRef.set({ msgCount: (userData.msgCount || 0) + 1 })
       }
});
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });
