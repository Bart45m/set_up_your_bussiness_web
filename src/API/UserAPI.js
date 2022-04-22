import { signInWithEmailAndPassword, signOut, createUserWithEmailAndPassword } from "firebase/auth";
import { ref, getDownloadURL } from "firebase/storage";
import { auth, firebase_db } from "../firebase";
import { doc, getDoc, setDoc, updateDoc, deleteDoc, collection, getDocs, query, where, collectionGroup, FieldPath, orderBy } from "firebase/firestore";
import { deleteImage, getImage, uploadImage } from "./ImageAPI";
import { updateEmail, updatePassword, deleteUser } from "firebase/auth";
import { prepareData, splitToShortcutAndMainContent } from "../utils/Validations"

const mapFiltersValuesToConditions = (filters) => {

    let conditions = {}

        conditions = Object.keys(filters).map(function(key) {
            if(key === 'specialisation' || key === 'skills' || key === 'competentions'){
                return where(key, 'array-contains-any', filters[key].split(','))
            }else if(key === 'partners'){
                return where('user_id', 'in', filters[key])
            }else if(key === 'stars'){
                return orderBy('stars')
            }else{
                return where(key, '==', filters[key]) 
            }
        })

    return conditions
}

const getUsersListing = async (conditions) => {

    try{

        const q = query(collection(firebase_db, "users_shortcuts"), ...conditions);
        const querySnapshot = await getDocs(q);

        let users = {}
        querySnapshot.forEach((doc) => {
            users[doc.id] = doc.data()
        });

        return new Promise((resolve, reject) => {
            if((users)){
                setTimeout( () => {
                    resolve(users)
                }, 1)
            }else{
                reject(new Error('user data not found'))
            }
        })

    }catch(error){
        alert('Fetching users listing '+error.message)
    }
}

const getUserData = async (user_id) => {

    try{
        const docSnapMain = await getDoc(doc(firebase_db, "users", user_id));
        const docSnapShortcut = await getDoc(doc(firebase_db, "users_shortcuts", user_id));

        return new Promise((resolve, reject) => {
            if((docSnapMain.exists() && docSnapShortcut.exists())){
                setTimeout( () => {
                    resolve({
                        ...docSnapMain.data(),
                        ...docSnapShortcut.data()
                    })
                }, 1)
            }else{
                reject(new Error('user data not found'))
            }
        })

    }catch(error){
        alert('Fetching user description error '+error.message)
    }
}

const uploadUserData = async (user_id, userData) => {

    try{
        
        userData['user_id'] = user_id
        await setDoc(doc(firebase_db, "users", user_id), userData);

        let order
        if(userData['typeOfAccount'] === 'person'){
            order = ['user_id', 'name', 'surname', 'stars', 'specialisation', 'skills']
        }else{
            order = ['user_id', 'name', 'stars', 'specialisation', 'competentions']
        }

        let data = JSON.stringify(userData)
        data = splitToShortcutAndMainContent(userData, order)

        await setDoc(doc(firebase_db, "users_shortcuts", user_id), data['shortcut']);
        await setDoc(doc(firebase_db, "users", user_id), data['main']);

    }catch(error){
        alert(error.message)
    }
}

const updateUserData = async (user_id, userData) => {

    try{
        
        userData['user_id'] = user_id
        await setDoc(doc(firebase_db, "users", user_id), userData);

        let order
        if(userData['typeOfAccount'] === 'person'){
            order = ['user_id', 'name', 'surname', 'stars', 'specialisation', 'skills']
        }else{
            order = ['user_id', 'name', 'stars', 'specialisation', 'competentions']
        }

        let data = splitToShortcutAndMainContent(userData, order)

        await updateDoc(doc(firebase_db, "users_shortcuts", user_id), data['shortcut']);
        await updateDoc(doc(firebase_db, "users", user_id), data['main']);

    }catch(error){
        alert(error.message)
    }
}

const updateUserAccount = async (userData, oldAvatarURL) => {

    let finalUserData = prepareData(userData)

    try{
        const user = auth.currentUser;
        await updateEmail(user, userData['email'])
        await updatePassword(user, userData['password'])

        if(userData['avatar'] instanceof File){ 
            
            if(oldAvatarURL){
                await deleteImage(oldAvatarURL)
            }
            
            finalUserData['avatar'] = await uploadImage(
                userData['avatar'], 
                user.uid+'_avatar_'+userData['avatar'].name
            )
        }

        let givenFinalUserData = JSON.parse(JSON.stringify(finalUserData))
        await updateUserData(user.uid, givenFinalUserData)

        return new Promise((resolve, reject) => {
            if(finalUserData){
                setTimeout(() => {
                    resolve(JSON.stringify(finalUserData))
                }, 1)
            }else{
                reject(new Error('user data not found'))
            }
        })
    }catch(error){
        alert(error.message)
    }
}
/*
const splitToShortcutAndMainContent = (input, order) => {

    let shortcut = {}
    let main = {}
    
    if(input['avatar']){
        shortcut['avatar'] = input['avatar']
        delete input['avatar']
    }

    for(let i of order){
        shortcut[i] = input[i]
        delete input[i]
    }
    main = JSON.parse(JSON.stringify(input))

    return {
        shortcut: shortcut,
        main: main
    }
}*/
/*
const prepareData = (userData) => {

    let finalUserData = JSON.parse(JSON.stringify(userData))

    delete finalUserData['password']

    if(userData['avatar']){ 
        finalUserData['avatar'] = userData['avatar'] 
    }

    finalUserData['goals'] = userData['goals'].split(',')
    finalUserData['specialisation'] = userData['specialisation'].split(',')

    if(userData['typeOfAccount'] === 'person'){
       finalUserData['skills'] = userData['skills'].split(',')
       finalUserData['interests'] = userData['interests'].split(',')
    }else{
        finalUserData['competentions'] = userData['competentions'].split(',')
    }    

    finalUserData['stars'] = 0
    finalUserData['rates_amount'] = 0

    return finalUserData
}
*/
const deleteUserAccount = async (user) => {

    try{
        //delete image
        if(user['avatar']){
            await deleteImage(user['avatar'])
        }
        //delete data
        await deleteDoc(doc(firebase_db, "users", auth.currentUser.uid));
        await deleteDoc(doc(firebase_db, "users_shortcuts", auth.currentUser.uid));
        //delete auth
        await deleteUser(auth.currentUser)

    }catch(error){
        alert(error.message)
    }
}

const signUpUser = async (userData) => {

    let finalUserData = prepareData(userData)

    try{
        
        await createUserWithEmailAndPassword(auth, userData['email'], userData['password'])
        
        if(userData['avatar']){
            finalUserData['avatar'] = await uploadImage(
                userData['avatar'], 
                auth.currentUser.uid+'_avatar_'+userData['avatar'].name
            )
        }

        let givenFinalUserData = JSON.parse(JSON.stringify(finalUserData))
        await uploadUserData(auth.currentUser.uid, givenFinalUserData)

        return new Promise((resolve, reject) => {
            if(finalUserData){
                setTimeout(() => {
                    resolve(JSON.stringify(finalUserData))
                }, 1)
            }else{
                reject(new Error('user data not found'))
            }
        })
    }catch(error){
        alert(error.message)
    }
}

const signInUser = async (email, password) => {

    try{
        await signInWithEmailAndPassword(auth, email, password)
        return await getUserData(auth.currentUser.uid)

    }catch(error){
        alert('Login Error '+error.message)
    }
}

const signOutUser = async () => {

    try{
        await signOut(auth)
    }catch(error){
        alert('Logout Error '+error.message)
    }
    
}

export { signInUser, signOutUser, signUpUser, getUserData, updateUserAccount, deleteUserAccount, getUsersListing, mapFiltersValuesToConditions }