import VueSocketIO from "vue-socket.io";

const debug = process.env.NODE_ENV !== "production";

const socket = new VueSocketIO({
  debug: debug,
  connection: process.env.NODE_ENV === "production"
    ? window.location.origin
    : "192.168.2.50:2021",
})

export default socket;