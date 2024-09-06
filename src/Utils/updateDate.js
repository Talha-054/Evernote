

export const addDays = (date, days)=>{
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate()+days)
      
      let day = newDate.getDate()
      let month = newDate.getMonth()
      let year = newDate.getFullYear()

      return year + '-' + (parseInt(month)+1) + '-' + day
}



export const subtractDays = (date, days)=>{
      let newDate = new Date(date);
      newDate.setDate(newDate.getDate()-days)
      
      let day = newDate.getDate()
      let month = newDate.getMonth()
      let year = newDate.getFullYear()

      return year + '-' + (parseInt(month)+1) + '-' + day
}