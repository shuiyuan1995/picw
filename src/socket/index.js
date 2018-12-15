import VueSocketIO from "vue-socket.io";

const debug = process.env.NODE_ENV !== "production";

const socket = new VueSocketIO({
  debug: debug,
  connection: "http://pickown.test:6001"
})

export default socket;