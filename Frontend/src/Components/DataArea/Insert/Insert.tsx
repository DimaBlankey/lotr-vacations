import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import ItemModel from "../../../Models/ItemModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Insert.css";

function Insert(): JSX.Element {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  useEffect(() => {
    dataService
      .getAllCategories()
      .then((responseCategories) => setCategories(responseCategories))
      .catch((err) => notifyService.error(err));
  }, []);

  const { register, handleSubmit } = useForm<ItemModel>();

  const navigate = useNavigate();

  async function send(item: ItemModel) {
    try {
      await dataService.addItem(item);
      notifyService.success("item has been added");
      navigate("/list");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Insert">
      <h2>Add a Movie</h2>
      <form onSubmit={handleSubmit(send)}>
        <label>Choose Category</label>
        <select defaultValue="" {...register("categoryId")} required>
          <option value="" disabled>
            Choose...
          </option>
          {categories.map((category) => (
            <option key={category.categoryId} value={category.categoryId}>
              {category.categoryName}
            </option>
          ))}
        </select>
        <label>Name:</label>
        <input type="text" {...register("name")} required />
        <label>Something: </label>
        <input type="text" {...register("something")} required />
        <button>Add Item</button>
      </form>
    </div>
  );
}

export default Insert;
