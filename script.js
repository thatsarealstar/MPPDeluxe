let changedname = ""
let changedcolor = ""

function init() {
  // First step: Check name and color!
  let defaultname = localStorage.getItem("defname")
  let defaultcolor = localStorage.getItem("defcolor")
  if (!defaultname) {
    console.log("No default name found! Not changing..")
    changedname = false
  }
  if (!defaultcolor) {
    console.log("No default color found! Not changing...")
    changedcolor = false
  }
  if (MPP.client.user.name !== defaultname) {
    if (changedname === false) {
      // Do absolutely nothing!
    } else {
    console.log("Fixing your name, hold on...")
    MPP.client.sendArray([{m: "userset", set: {name: defaultname}}])
    }
  }
  if (MPP.client.user.color !== defaultcolor) {
    if (changedcolor === false) {
      // Do absolutely nothing!
    } else {
    console.log("Fixing your color, hold on...")
    MPP.client.sendArray([{m: "userset", set: {color: defaultcolor}}])
    }
  }
  console.log("By the way, use !defname 'name' or !defcolor 'hex code' to set a default name or color!")
}

init()

MPP.client.on("a", msg => {
  let args = msg.a.split(" ");
  let command = args[0];
  let tokenNames = JSON.parse(localStorage.getItem("tokenNames")); // Parse the string into an array
  
  if (command === "!switchtoken") {
    if (tokenNames && tokenNames.length > 0) {
      MPP.client.sendArray([{ m: "a", message: "List of tokens: " + tokenNames.join(", "), reply_to: msg.id }]);
    } else {
      MPP.client.sendArray([{ m: "a", message: "Oops! No tokens avaliable.", reply_to: msg.id }]);
    }
  }
});
