class AppConfig {
    public categoriesUrl = "http://localhost:4000/api/categories/";
    public itemsByCategoriesUrl = "http://localhost:4000/api/items-per-categories/";
    public itemsUrl = "http://localhost:4000/api/items/";
     
}

const appConfig = new AppConfig();

export default appConfig;
