import { addDays, subtractDays } from "./updateDate"


export const createPSPC = (ftc,spc)=>{
      let userFTC = ftc 
      let userSPC = spc 
      const pspc = {
            caseNo: userFTC.caseNo || '',
            caseName : userFTC.caseName || '',
            mostRecentConference : userFTC.mostRecentConference || '' ,
            requirement: 10,
            dueDate : addDays(userFTC.mostRecentConference, 10) || '',
            lastSpcDate : userSPC?.lastSpcDate || '',
            overDue : overDueChecker(userSPC?.lastSpcDate, userFTC.mostRecentConference, addDays(userFTC.mostRecentConference, 10)) || '',
            conferenceScheduledDate : userFTC.conferenceScheduledDate || ''
      }

      return pspc
}



export function overDueChecker(lastSpcDate, mostRecentConference,dueDate){

      try {
            let todayDate = new Date
            todayDate.setHours(0,0,0,0)
            todayDate = todayDate.toISOString().split('T')[0]

            console.log(todayDate)
            console.log(subtractDays(todayDate,182))
            
            if ((todayDate < dueDate && todayDate > mostRecentConference) && (lastSpcDate < todayDate && lastSpcDate > subtractDays(todayDate,182)) ) return 'NO'
            if ((todayDate < dueDate && todayDate > mostRecentConference) && (lastSpcDate < todayDate && lastSpcDate < subtractDays(todayDate,182)) ) return 'YES'
            if ((lastSpcDate < dueDate) && (lastSpcDate > mostRecentConference) ) return 'NO'
            if (lastSpcDate < mostRecentConference) return 'YES'
            if (lastSpcDate > dueDate) return 'NO'
      } catch (error) {
            console.log('overdue checker function... error is',error)
            return null
      }

      
}

