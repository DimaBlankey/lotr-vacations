class AppConfig {

    // Server Port:
    public port = 4000;

    // Server Url:
    public serverUrl = "http://localhost:" + this.port;

    // Images Url:
    public imagesUrl = this.serverUrl + "/api/vacations/images/"

    // Database Host (on which computer the database exists):
    public mySqlHost = "localhost";

    // Database User
    public mySqlUser = "root";

    // Database Password: 
    public mySqlPassword = "";

    // Database Name: 
    public mySqlDatabase = "lotr-vacations"; // Fill in database name
}

const appConfig = new AppConfig();

export default appConfig;
