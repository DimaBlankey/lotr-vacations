import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import ItemModel from "../../../Models/ItemModel";
import dataService from "../../../Services/DataService";
import notifyService from "../../../Services/NotifyService";
import "./Update.css";

function Update(): JSX.Element {
  const params = useParams();
  const { register, handleSubmit, setValue } = useForm<ItemModel>();
  const navigate = useNavigate();
  const [item, setItem] = useState<ItemModel>();

  useEffect(() => {
    const id = +params.itemId;
    dataService
      .getOneItem(id)
      .then((responseItem) => {
        setValue("itemId", responseItem.itemId);
        setValue("name", responseItem.name);
        setValue("something", responseItem.something);
        setItem(responseItem);
      })
      .catch((err) => notifyService.error(err));
  }, []);

  async function send(item: ItemModel) {
    try {
      await dataService.updateItem(item);
      notifyService.success("Item has been updated");
      navigate("/list");
    } catch (err: any) {
      notifyService.error(err);
    }
  }

  return (
    <div className="Update">
      <h2>Update Movie</h2>
      <form onSubmit={handleSubmit(send)}>
        <input type="hidden" {...register("itemId")} />
        <br />
        <label>Name: </label>
        <input type="text" {...register("name")} />
        <br />
        <label>Something: </label>
        <input type="text" {...register("something")} />
        <br />
        <br />
        <button>Update</button>
      </form>
    </div>
  );
}

export default Update;
