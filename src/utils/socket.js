import { io } from "socket.io-client";
import { DEVTINDER_BASE_URL } from "./constants";

export const createSocketConnection = () => {
    return io(DEVTINDER_BASE_URL);
}