import { addDays } from "./updateDate";
import { overDueChecker, createPSPC } from "./pspc";



export const nextOverdue =  (tasks = [], ftc = [], spc = [], pspc=[])=> {
      
      const notOverdue = []
      const overdueThisMonth = []
      const overdueNextMonth = []

      for (let record of tasks){
            if(record.overDue == 'YES')continue
            let info = {
                 caseNo: record.caseNo,
                 caseName: record.caseName 
            }
            notOverdue.push(info)
      }
      
      for (let record of notOverdue){
            for (let item of ftc){
                  if (record.caseNo!=item.caseNo)continue
                  record.mostRecentConference = item.mostRecentConference
                  break;
            }
      }


      for (let record of notOverdue){
            for (let item of spc){
                  if (record.caseNo!=item.caseNo)continue
                  record.lastSpcDate = item.lastSpcDate
                  break;
            }
      }


      for (let record of notOverdue){
            for (let item of pspc){
                  if (record.caseNo!=item.caseNo)continue
                  record.dueDate = item.dueDate
                  break;
            }
      }




      for (let record of notOverdue){
            let thisMonthCheck = addDays(record.lastSpcDate, (31- (new Date (record.lastSpcDate).getDate())))
            let nextMonthCheck = addDays(new Date(thisMonthCheck), 30)

            let res1 = overDueChecker(thisMonthCheck, record.mostRecentConference, record.dueDate)
            let res2 = overDueChecker(nextMonthCheck, record.mostRecentConference, record.dueDate)

            console.log(res1,res2)
            
            
      }

      console.log(notOverdue)
      // console.log(item.lastSpcDate,new Date(item.lastSpcDate).getDate(), addDays(item.lastSpcDate,(32-new Date(item.lastSpcDate).getDate())))
}