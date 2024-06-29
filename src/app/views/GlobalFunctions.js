import { React , useState} from "react";
import { Widgets } from "@mui/icons-material";
import useNotification from "antd/es/notification/useNotification";
import axios from "axios";
import { NotificationDB } from "fake-db/db/notification";
import { esES } from "@mui/x-date-pickers";



export const  Name = "Ronaldo Haddad";
export const endpoint = "http://api.softstate.online";

// export const [logged , setLogged] = useState(false)
// const url = window.location.pathname
// if(url!="/session/signin" && logged!=true){
//     window.location.href='/session/signin'
// }


export const checkRequests=()=>{
    return axios.get(`${endpoint}/api/requestlookup`)
    .then(response => {
        console.log("Client requests:", response.data);
        const req = response.data
  
        if(req.length > 0){
            for( let i=0 ; i<req.length ; i++){
                console.log(i)
                const newNotification = {
                    id: `ClientRequest_${i}`,
                    heading: "Client Request Match",
                    icon: { name: "chat", color: "primary" },
                    timestamp: 1570702802573,
                    title: req[i].clientrequest_owner,
                    subtitle: "",
                    path: "chat"
                  };
            
                  NotificationDB.list.push(newNotification);
            }
        }else{
            console.log("No requests")
        }
        console.log(NotificationDB.list)
        return response.data; // Return data if needed for further processing


    })
    .catch(error => {
        console.error('Error fetching client requests:', error);
        throw error; // Throw error for handling in the calling function
    });


}