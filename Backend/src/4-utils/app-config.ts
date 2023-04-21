// class AppConfig {

//     // Server Port:
//     public port = 4000;

//     // Server Url:
//     public serverUrl = "http://localhost:" + this.port;

//     // Images Url:
//     public imagesUrl = this.serverUrl + "/api/vacations/images/"

//     // Database Host (on which computer the database exists):
//     public mySqlHost = "localhost";

//     // Database User
//     public mySqlUser = "root";

//     // Database Password: 
//     public mySqlPassword = "";

//     // Database Name: 
//     public mySqlDatabase = "lotr-vacations"; // Fill in database name
// }

// const appConfig = new AppConfig();

// export default appConfig;

class AppConfig {

    // Server Port:
    public port = process.env.PORT || 4000;

    // Server Url:
    public serverUrl = "http://localhost:" + this.port;

    // Images Url:
    public imagesUrl = this.serverUrl + "/api/vacations/images/"

    // Database Host (on which computer the database exists):
    public mySqlHost = process.env.MYSQL_HOST || "localhost";

    // Database User
    public mySqlUser = process.env.MYSQL_USER || "root";

    // Database Password: 
    public mySqlPassword = process.env.MYSQL_PASSWORD || "";

    // Database Name: 
    public mySqlDatabase = process.env.MYSQL_DATABASE || "lotr-vacations";
}

const appConfig = new AppConfig();

export default appConfig;
