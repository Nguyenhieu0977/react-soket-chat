class Config {
    //BASE_URL = "https://medicalstoreapi.herokuapp.com/";
    
    static homeUrl = "/home";
    static logoutPageUrl = "/logout";
  
    static sidebarItem = [
      { index: "0", title: "Home", url: "/home", icons: "home" },
      { index: "1", title: "Company", url: "/company", icons: "assessment" },
    ];
  }
  
  export default Config;