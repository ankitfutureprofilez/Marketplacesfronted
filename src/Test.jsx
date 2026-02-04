import React from "react";
import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { MdDelete } from "react-icons/md";

const data = ["Apple", "Banana", "Mango", "Orange", "Grapes"];

function SearchFilter() {
  const [search, setSearch] = useState("");

  const filteredData = data.filter(item =>
    item.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <h2>Search Filter</h2>

      <input
        placeholder="Search..."
        value={search}
        onChange={e => setSearch(e.target.value)}
      />

      <ul>
        {filteredData.map((item, index) => (
          <li key={index}>{item}</li>
        ))}
      </ul>
    </div>
  );
}

export default function Test() {
  const [items, setItems] = useState([]);
  const [currentItem, setCurrentItem] = useState("");
  const [record, setRecord] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Value submitted: ", currentItem);
    if (currentItem?.trim() == "") {
      toast.error("Please enter a value!");
      return;
    }
    const currentData = {
      completed: true,
      value: currentItem,
    };
    setItems((prevItems) => [...prevItems, currentData]);
    toast.success("Item added successfully");
    setCurrentItem("");
  };

  const MarkAsDone = (index) => {
    const nextCompleted = !items[index].completed;
    setItems((prevItems) => {
      return prevItems?.map((item, i) => {
        if (i === index) {
          return {
            value: item.value,
            completed: !item.completed,
          };
        } else {
          return item;
        }
      });
    });
    toast.success(
      `Item marked as ${nextCompleted ? "done" : "not done"} successfully`,
    );
  };

  const deleteItem = (index) => {
    setItems((prevItems) => {
      return prevItems?.filter((item, i) => (i !== index));
    });
    toast.success(
      `Item deleted successfully`,
    );
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get("https://jsonplaceholder.typicode.com/posts",);
        if (resp?.data) {
          setRecord(resp.data);
        } else {
          setRecord([]);
        }
      } catch (error) {
        console.log("Api fetch error", error);
        toast.error(error?.response?.data?.message || "Error in fetching data");
        setRecord([]);
      }
    };

    fetchData();
  }, []);

  // console.log("record", record);

  return (
    <div>
      <form onSubmit={handleSubmit} className="flex gap-3 items-end">
        <div className="flex flex-col gap-1">
          <label className="text-gray-600">Add your item here</label>
          <input
            type="text"
            value={currentItem}
            onChange={(e) => {
              setCurrentItem(e.target.value);
            }}
          />
        </div>
        <button
          type="submit"
          className={`bg-red-500 rounded-full px-2 py-2 text-white`}
        >
          Add Item
        </button>
      </form>
      <h2 className="font-medium text-black text-xl my-4">Added items</h2>
      {items &&
        items?.map((data, index) => (
          <div className="flex gap-2 items-center" key={index}>
            <input
              type="checkbox"
              checked={data?.completed}
              onChange={() => {
                MarkAsDone(index);
              }}
            />
            <p
              className={`${data?.completed ? "text-black" : "line-through text-gray-500"} capitalize`}
            >
              {data?.value}
            </p>
            <MdDelete size={20} onClick={()=>{deleteItem(index)}} className="cursor-pointer"/>
          </div>
        ))}

      <SearchFilter />
    </div>
  );
}
