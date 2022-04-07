import axios from "axios";


export const getData = async (entriesPerPage, pageNo) => {
    try {

        const response = await axios.get('https://jsonkeeper.com/b/P2VO');

        console.log(response);

        return Promise.resolve({data: response.data, status: response.status});
    } catch (ex) {
        
        console.log("Error admin", ex);
        return Promise.reject(new Error("Server Error"));
    }
  
}
