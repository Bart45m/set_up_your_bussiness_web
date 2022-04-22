import { collection, query, where, onSnapshot, doc, addDoc, serverTimestamp, orderBy } from "firebase/firestore";
import { firebase_db } from "../firebase";

const uploadMessage = async (message, chat_id, user_id) => {
    //console.log("message: "+message+" viewer: "+viewer+" viewed: "+viewed+" chat id "+chat_id)

    try{
        const docRef = await addDoc(collection(firebase_db, 'partners', chat_id, 'messages'), {
            user: user_id,
            message: message,
            time: serverTimestamp()
          });

    }catch(error){
        
        alert( 'Error '+error.message)
    }
}

const fetchMessages = (chat_id, status) => {
    //console.log(" viewer: "+viewer+" viewed: "+viewed+" chat id "+chat_id)

    const q = query(collection(firebase_db, 'partners', chat_id, 'messages'), orderBy('time'));

    let gottenMessages = {};
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
        querySnapshot.forEach((doc) => {
            gottenMessages[doc.id] = doc.data();
        });
    });

    if(status === 0) {
      unsubscribe();
    }

    return gottenMessages
}

export { uploadMessage, fetchMessages }
