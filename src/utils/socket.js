import io from "socket.io-client"
import { BASE_URL } from "./constants.js"

export const createSocketConnection = () => {
    if(location.hostname === "localhost") {
        return io(BASE_URL)
    } else {
        return io("/", {path: "/api/socket.io"}) // Updated path for production deployment, this bacause in production it will map to /api/socket.io instead of just /socket.io, this is due to the way the server is set up to serve the frontend and backend from the same origin.
    }
}