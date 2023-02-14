//Client Stuffs
import Client from "socket.io-client";
//Server Stuffs
import { createServer } from "http";
import { Server } from "socket.io";
import {crypto} from "crypto"

import config from `./config.json` assert {type: `json`}

const httpServer = createServer()

var PORT = 13887
var PublicAccessPasswordHash = config.PublicServerHash


const clientIO = Client("http://mp_weatherstationvfpvhr6.morganpritchard.design:7676");
const serverIO = new Server(httpServer)



function sendMessageToServer(data) {
    var dataToSend = {
        hash: PublicAccessPasswordHash,
        data: data
    }

    clientIO.emit('publicping', dataToSend)
}

function receiveDataFromServer(args) {
    if(!data.hash == getHashOfWeatherServerPswd()) {
        console.log(`!!!!! Hashes do not match: Pswd Hash: ${getHashOfWeatherServerPswd()} || Hash Received: ${data.hash}`)
        return
    }
}

function getHashOfWeatherServerPswd() {
    //config.PiWeatherStation
    return crypto.createHash('SHA256').update(config.PiWeatherStation).digest("hex")

}

httpServer.listen(port)

