import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, firebase_db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where, collectionGroup, FieldPath, orderBy, onSnapshot } from "firebase/firestore";
import { deleteImage, getImage, uploadImage } from "./ImageAPI";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { prepareData, splitToShortcutAndMainContent } from "../utils/Validations"

/*const createPartnersStatus = async (auth_uid, user_uid) => {

    try{

        let status = {}
        status[auth_uid] = 'CONFIRMED'
        status[user_uid] = 'UNCONFIRMED'

        let users =  [auth_uid, user_uid]

        let partnersStatus = {
            users: users,
            status: status
        }

        await setDoc(doc(firebase_db, "partners", auth_uid+'_'+user_uid), partnersStatus);
        partnersStatus['partners_id'] = auth_uid+'_'+user_uid

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(partnersStatus)
            }, 1)
        })

    }catch(error){
        alert('createPartnersStatus error '+error.message)
    }
}*/
const getPartnersListing = async (auth_uid) => {

    try{
        const partnersRef = collection(firebase_db, "partners");
        const q = query(partnersRef, where("users", "array-contains", auth_uid), 
            where('status', "in", [['CONFIRMED', 'CONFIRMED'], ['CONFIRMED', 'BLOCKED'], ['BLOCKED', 'CONFIRMED']])
        );

        let partners = []

        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            partners.push( doc.data().users.filter((element, key) => {
                return element !== auth.currentUser.uid
            })[0])
        });

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(partners)
            }, 1)
        })
    }catch(error){
        alert('partners listing error '+error.message)
    }
}

const getPartnersStatus = async (auth_id, user_id) => {

    try{

        const partnersRef = collection(firebase_db, "partners");
        const q = query(partnersRef, where('users', "in", [[auth_id, user_id], [user_id, auth_id]]));

        let partnersStatus = {}

        const querySnapshot = await getDocs(q);

        querySnapshot.forEach((doc) => {
            partnersStatus = {
                partners_id: doc.id,
                ...doc.data()
            }
        });

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(partnersStatus)
            }, 1)
        })

    }catch(error){
        alert('partners '+error.message)
    }

}

const updatePartnersStatus = async (partners_id, auth_id, user_id, auth_status, user_status) => {

    try{

        let partnersStatus = {
            users: [auth_id, user_id],
            status: [auth_status, user_status]
        }

        console.log(partners_id+' '+auth_id+' '+user_id+' '+auth_status+' '+user_status)

        await setDoc(doc(firebase_db, "partners", partners_id), partnersStatus);
        partnersStatus['partners_id'] = partners_id

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve(partnersStatus)
            }, 1)
        })

    }catch(error){
        alert('createPartnersStatus error '+error.message)
    }
}

const deletePartnersStatus = async (partners_id) => {

    try{
        await deleteDoc(doc(firebase_db, "partners", partners_id));

        return new Promise((resolve) => {
            setTimeout( () => {
                resolve({})
            }, 1)
        })
    }catch(error){
        alert(error.message)
    }
}

export { getPartnersStatus, updatePartnersStatus, deletePartnersStatus, getPartnersListing }