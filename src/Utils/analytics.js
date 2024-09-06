

export const trafficParser =  (traffic)=>{
      let filteredTraffic = traffic?.filter((item)=> item.id != 'count')
      filteredTraffic = filteredTraffic?.map((item,index)=> {
            if (!(index < filteredTraffic.length && index >= (filteredTraffic.length - 5)))return;
            return {
                  ...item,
                  id: new Date(item.id).getDate()
            }
      })
      filteredTraffic = filteredTraffic?.filter((item)=> item != undefined)
      return filteredTraffic
}


export const analyticsParser = (data)=>{

      let output = []
      const months = {
            January:0  ,
            Feburary:0  ,
            March:0  ,
            April :0  ,
            May:0  ,
            June:0  ,
            July :0  ,
            August:0 ,
            September:0  ,
            October:0 ,
            November:0  ,
            December:0  ,
      };

      
      if (data){
            for (let item of data){
                  console.log(item.month)
                  months[item.month] = months[item.month] + 1
;            }
      }
      
      console.log(months)
      for (let key in months){
            if (months[key] == 0)continue
            output.push({id:key, total: months[key]})
      }
      
      return output
      
}