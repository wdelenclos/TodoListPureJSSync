import { checkConnectivity } from '/js/services/connectivity.js';
import {localGet, distantAdd,distantGet} from "../core/data.js";

function dbSync(){
    // To start the loop
    let syncLoop = setInterval(function(){
        // Do your update stuff...
        console.log('#--- Syncronisation ---#');
        checkConnectivity(function(status){
            if(status === true)
            {
                localGet(function(res){
                    distantGet(function(data){
                        for(let i = 0; i < data.length; i++){
                            fetch( "http://localhost:3000/tasks/" + data[i].id, {
                                method: 'DELETE'
                            }).then(
                                response => response.json()
                            )
                        }
                    });
                    for(let i = 0; i < res.length; i++){
                        distantAdd(res[i].doc, function(el){
                            console.log(el)
                        })
                    }

                })
            }
        });

    }, 10000);
}

export {dbSync}