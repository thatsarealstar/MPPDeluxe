let changedname = "";
let changedcolor = "";

function init() {
  // First step: Check name and color!
  let defaultname = localStorage.getItem("defname");
  let defaultcolor = localStorage.getItem("defcolor");

  if (!defaultname) {
    console.log("No default name found! Not changing..");
    changedname = false;
  } else {
    changedname = true;
  }

  if (!defaultcolor) {
    console.log("No default color found! Not changing...");
    changedcolor = false;
  } else {
    changedcolor = true;
  }

  if (MPP.client.user.name !== defaultname && changedname) {
    console.log("Fixing your name, hold on...");
    MPP.client.sendArray([{ m: "userset", set: { name: defaultname } }]);
  }

  if (MPP.client.user.color !== defaultcolor && changedcolor) {
    console.log("Fixing your color, hold on...");
    MPP.client.sendArray([{ m: "userset", set: { color: defaultcolor } }]);
  }

  console.log("By the way, use !defname 'name' or !defcolor 'hex code' to set a default name or color!");
}

init();

MPP.client.on("a", msg => {
  let args = msg.a.split(" ");
  let command = args[0];
  let tokenNames = JSON.parse(localStorage.getItem("tokenNames")); // Parse the string into an array
  let tokens = {  // Example tokens object, should come from somewhere like localStorage or an API
    "name1": { "token": "token_id_1" },
    "name2": { "token": "token_id_2" }
    // Add other tokens here
  };

  if (command === "!switchtoken") {
    let tokenName = args[1];  // Extract token name from args

    if (!tokenName) {
      if (tokenNames && tokenNames.length > 0) {
        MPP.client.sendArray([{ m: "a", message: "List of tokens: " + tokenNames.join(", "), reply_to: msg.id }]);
      } else {
        MPP.client.sendArray([{ m: "a", message: "Oops! No tokens available.", reply_to: msg.id }]);
      }
    } else {
      if (tokenNames.includes(tokenName)) {
        MPP.client.sendArray([{ m: "a", message: "Switching, please wait..." }]);

        // Check if the token exists in the 'tokens' object
        if (tokens[tokenName]) {
          let tokenId = tokens[tokenName].token;
          localStorage.setItem('token', tokenId);  // Set the token in localStorage
          MPP.client.sendArray([{ m: "a", message: "Successfully switched to token: " + tokenName }]);
        } else {
          MPP.client.sendArray([{ m: "a", message: "Token not found for: " + tokenName }]);
        }
      } else {
        MPP.client.sendArray([{ m: "a", message: "Token name not found in your list!" }]);
      }
    }
  }
});
