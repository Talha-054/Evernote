import { db } from './config'
import { collection, setDoc, doc, where, getDoc } from 'firebase/firestore'
import { addDays } from '../Utils/updateDate'






export const addVisitor = async ()=>{
      console.log('visitor ...')

      let date = new Date(Date.now())
      date.setHours(0,0,0,0)
      let dateString = addDays(date.toISOString().split('T')[0],1)
      
      

      let docRef = doc(db, 'visitors', 'count')
      let docRef2 = doc(db, 'visitors', dateString)
      

      try {
            const res = await getDoc(docRef)
            let total = (res.data()?.total || 0) +1;

            const response = await getDoc(docRef2)
            let totalPerDay = (response.data()?.total || 0) +1 ;
            
            
            const res2 = await setDoc(docRef,{
                  total:total
            })

            const response2 = await setDoc(docRef2,{
                  total: totalPerDay,
            })
      } catch (error) {
        console.log('some error occured while dealing with visitor count, error is : ', error)    
      }
      
}





export const createUser = async (userData)=>{
      console.log('creating ...')

      let caseNo = userData.caseNo;
      let caseName = userData.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'users', uniqueId)


      try {
            let existing = await verifyUser(userData)
            if(existing){
                  console.log('user already exists')
                  return false
            } 
            await setDoc(docRef,userData)
            console.log('sucess')
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}



export const verifyUser = async (userData)=>{
      console.log('verifying ...')

      let caseNo = userData.caseNo;
      let caseName = userData.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'users', uniqueId)

      try {
            const res = await getDoc(docRef)

            if(res.exists()){
                  console.log('user exist')
                  return true
            }else{
                  console.log('does not exist')
                  return false
            }    
      } catch (error) {
            console.log('some error occured. error is: ', error)
            return false
      }
}



export const storeFTC = async (ftc)=>{
      console.log('storing FTC ...')

      let caseNo = ftc.caseNo;
      let caseName = ftc.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'FTC', uniqueId)


      try {
            let res = await setDoc(docRef,ftc)
            console.log(res)
            console.log('sucess')
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}



export const getFTC = async (userData)=>{
      console.log('fetching FTC ...')

      let caseNo = userData.caseNo;
      let caseName = userData.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'FTC', uniqueId)

      try {
            const ftc = await getDoc(docRef)
            console.log(ftc.data())
            
            return ftc.data()
            
      } catch (error) {
            console.log('some error occured while fetching ftc error is: ', error)
            return false
      }
}



export const storeSPC = async (spc)=>{
      console.log('storing SPC ...')

      let caseNo = spc.caseNo;
      let caseName = spc.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'SPC', uniqueId)


      try {
            let res = await setDoc(docRef,spc)
            console.log(res.data())
            console.log(res)
            console.log('sucess')
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}



export const getSPC = async (userData)=>{
      console.log('fetching SPC ...')

      let caseNo = userData.caseNo;
      let caseName = userData.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'SPC', uniqueId)

      try {
            const spc = await getDoc(docRef)

            
            return spc.data()
            
      } catch (error) {
            console.log('some error occured while fetching spc error is: ', error)
            return false
      }
}



export const storePSPC = async (pspc)=>{
      console.log('storing PSPC ...')

      let caseNo = pspc.caseNo;
      let caseName = pspc.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'PSPC', uniqueId)


      try {
            await setDoc(docRef,pspc)
            console.log('sucess', pspc)
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}



export const storeTask = async (task)=>{
      console.log('storing Task ...')

      let caseNo = task.caseNo;
      let caseName = task.caseName;

      let uniqueId = caseNo.trim() + caseName.trim()
      let docRef = doc(db, 'TASKs', uniqueId)


      try {
            await setDoc(docRef,task)
            console.log('sucess', task)
            return true;
      } catch (error) {
            console.log('some error occured while saving data. error is: ', error) 
            return false    
      }
}