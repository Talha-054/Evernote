


export const createTask = (ftc, pspc)=>{

      const task = {
            caseNo : ftc.caseNo,
            caseName : ftc.caseName,
            task : 'SCP',
            dueDate : pspc.dueDate,
            overDue : pspc.overDue || '',
            bucket : pspc.overDue == 'YES'? 'Overdue': ''
      }

      return task
}