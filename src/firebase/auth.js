import { db } from './config'
import { collection, getDocs, doc, setDoc, updateDoc } from 'firebase/firestore'





export const getTasks = async ()=>{
      console.log('fetching Tasks ...')

      try {
           const res = await getDocs(collection(db,'TASKs'))
           const documents = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            bg: 50
          }));
          console.log('sucess')
           return documents
      } catch (error) {
            console.log('some error occured while fetching tasks error is: ', error)
            return false
      }
}


export const getFTC = async ()=>{
      console.log('fetching ftc ...')

      try {
           const res = await getDocs(collection(db,'FTC'))
           const documents = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('sucess')
           return documents
      } catch (error) {
            console.log('some error occured while fetching tasks error is: ', error)
            return false
      }
}


export const getSPC = async ()=>{
      console.log('fetching spc ...')

      try {
           const res = await getDocs(collection(db,'SPC'))
           const documents = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('sucess')
           return documents
      } catch (error) {
            console.log('some error occured while fetching tasks error is: ', error)
            return false
      }
}


export const getPspc = async ()=>{
      console.log('fetching pspc data ...')

      try {
           const res = await getDocs(collection(db,'PSPC'))
           const documents = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),

          }));
          console.log('sucess')
           return documents
      } catch (error) {
            console.log('some error occured while fetching tasks error is: ', error)
            return false
      }
}



export const getAnalytics = async ()=>{
      console.log('feteching website traffic data ...')

      try {
            const res = await getDocs(collection(db,'visitors'))
            const documents = res.docs.map((doc)=>{
                  return {
                        id: doc.id,
                        ...doc.data()
                  }  
            })
            console.log('sucess gettin traffic data')
            return documents
      } catch (error) {
            console.log('some error occured while getting traffic data Error is: ', error)
      }
}


export const getAnalytics2 = async()=>{
      console.log('fetching analytics data');


      try {
            const res = await getDocs(collection(db,'users'))
            const documents = res.docs.map((doc)=>{
                  return {
                        id: doc.id,
                        ...doc.data()
                  }  
            })
            return documents
      } catch (error) {
            console.log('analytics 2 fetch failed. error is: ', error)
      } 
}



export const addAdmin = async (userData)=>{
      console.log('initializing admin ...')

      let id = userData.id

      let docRef = doc(db, 'admins', id)


      try { 
            await setDoc(docRef,userData)
            console.log('sucess')
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}


export const updateLastLogin = async (uid)=>{
      console.log('updating last login ...')
      let date = new Date();
      let hr = date.getHours();
      let min = date.getMinutes();
      let sec = date.getSeconds();
      let time = hr + ":" + min + ":" + sec;
      let lastLogin = date.toISOString().split("T")[0] + " " + time;

      let docRef = doc(db, 'admins', uid)

      try { 
            await updateDoc(docRef,{
                  'lastLogin': lastLogin
            })
            console.log('sucess')
            return true;
      } catch (error) {
            console.log('some error occured while updating last login. error is: ', error) 
            return false    
      }
}



export const getAllAdmins = async()=>{
      console.log('fetching admins ...')

      try {
           const res = await getDocs(collection(db,'admins'))
           const documents = res.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          console.log('sucess')
           return documents
      } catch (error) {
            console.log('some error occured while fetching tasks error is: ', error)
            return false
      }
}







