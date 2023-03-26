import axiosInstance from "../axiosInstance"


export  const getInvoices = (endpoint)=>{
    axiosInstance.get(endpoint)
        .then(
            respData =>{
                const response = respData.data;
                console.log('response', response);
                    const data = respData.data.results.map(ele =>({
                        id: ele.id,
                        title: ele.title,
                        date: ele.date
                    }))
                    return {
                        ...response,
                        results: data
                    }
                } 
              
            
        ).catch(error=>{
            return {
                error: error.body,
                results: []
            }
        })
}