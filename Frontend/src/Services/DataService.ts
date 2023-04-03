import axios from "axios";
import appConfig from "../Utils/AppConfig";
import CategoryModel from "../Models/CategoryModel";
import ItemModel from "../Models/ItemModel";

class DataService {
  public async getAllCategories(): Promise<CategoryModel[]> {
    const response = await axios.get<CategoryModel[]>(appConfig.categoriesUrl);
    const categories = response.data;
    return categories;
  }

  public async getItemsByCategory(categoryId: number): Promise<ItemModel[]> {
    const response = await axios.get<ItemModel[]>(
      appConfig.itemsByCategoriesUrl + categoryId
    );
    const items = response.data;
    return items;
  }

  public async addItem(item: ItemModel): Promise<void> {
    const response = await axios.post<ItemModel>(appConfig.itemsUrl, item);
    const addedItem = response.data;
  }

  public async deleteItem(itemId: number): Promise<void> {
    await axios.delete(appConfig.itemsUrl + itemId);
  }

  public async updateItem(item: ItemModel): Promise<void> {
    const response = await axios.put<ItemModel>(
      appConfig.itemsUrl + item.itemId,
      item
    );
    const updatedItem = response.data;
  }

  public async getOneItem(itemId: number): Promise<ItemModel> {
    const response = await axios.get<ItemModel>(appConfig.itemsUrl + itemId);
    const item = response.data;
    return item;
  }
}

const dataService = new DataService();

export default dataService;
