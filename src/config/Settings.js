let settings = {
  test:{
    apiUrl: "http://staging-move1t.herokuapp.com/"
  },
  production:{
    apiUrl: "http://move1t.herokuapp.com/"
  }
};

export function getBaseUrlFor(setting){
  var storedSettings = JSON.parse(localStorage.getItem("settings")) || {};
  var instance = storedSettings.instance || "production";
  return settings[instance][setting];
}
