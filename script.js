function init() {
  // First step: Check name and color!
  let defaultname = localStorage.getItem("defname")
  let defaultcolor = localStorage.getItem("defcolor")
  if (!defaultname) {
    console.log("No default name found! Not changing..")
    let changedname = false
  }
  if (!defaultcolor) {
    console.log("No default color found! Not changing...")
    let changedcolor = false
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
}

init()
