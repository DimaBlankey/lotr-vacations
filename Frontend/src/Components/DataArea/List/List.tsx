import { ChangeEvent, useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import CategoryModel from "../../../Models/CategoryModel";
import ItemModel from "../../../Models/ItemModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./List.css";

function List(): JSX.Element {
  const [categories, setCategories] = useState<CategoryModel[]>([]);
  const [items, setItems] = useState<ItemModel[]>([]);

  useEffect(() => {
    dataService
      .getAllCategories()
      .then((responseCategories) => setCategories(responseCategories))
      .catch((err) => notifyService.error(err));
  }, []);

  function getItems(args: ChangeEvent<HTMLSelectElement>): void {
    const categoryId = +args.target.value;
    dataService
      .getItemsByCategory(categoryId)
      .then((dbItems) => setItems(dbItems))
      .catch((err) => notifyService.error(err));
  }

  async function deleteMe(itemId: number): Promise<void> {
    try {
      const ok = window.confirm("Are you sure?");
      if (!ok) return;
      await dataService.deleteItem(itemId);
      notifyService.success("Item has been deleted");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="List">
      <h2>List Of Items</h2>
      <select defaultValue="" onChange={getItems}>
        <option value="" disabled>
          Choose...
        </option>
        {categories.map((category) => (
          <option key={category.categoryId} value={category.categoryId}>
            {category.categoryName}
          </option>
        ))}
      </select>
      <br />
      <br />

      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Something</th>
            <th>Delete</th>
            <th>Update</th>
          </tr>
        </thead>
        <tbody>
          {items.map((i) => (
            <tr>
              <td>{i.name}</td>
              <td>{i.something}</td>
              <td>
                <NavLink to="/home" onClick={() => deleteMe(i.itemId)}>
                  X
                </NavLink>
              </td>
              <td>
                <NavLink to={"/update/" + i.itemId}>Update</NavLink>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default List;
