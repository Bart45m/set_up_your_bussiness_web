import { signInWithEmailAndPassword, signOut } from "firebase/auth";
import { ref, getDownloadURL, uploadBytes, deleteObject, } from "firebase/storage";
import { auth, firebase_storage, firebase_db } from "../firebase";
import { doc, getDoc } from "firebase/firestore";
import { refFromURL } from "firebase/database";

const getImage = async (url) => {

    const starsRef = ref(firebase_storage, url);
// Get the download URL
    try{
        return await getDownloadURL(starsRef)
    }catch(error){
        alert('Fetching user avatar error '+error.message)
    }

}

const uploadImage = async (file, url) => {

    const fileRef = ref(firebase_storage, url);

    try{
        
        const result = await uploadBytes(fileRef, file);
        return await getDownloadURL(fileRef);
    }catch(error){
        alert(error.message)
    }
}

const deleteImage = async (url) => {

    const desertRef = ref(firebase_storage, url) //refFromURL(firebase_storage, url)

    try{
        await deleteObject(desertRef);
    }catch(error){
        alert(error.message+' tu jest problem')
    }
}

export { getImage, uploadImage, deleteImage }