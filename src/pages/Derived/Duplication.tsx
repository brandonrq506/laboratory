import { useState } from "react";
import { Button } from "@/components/core";

const initialItems = [
  { title: "pretzels", id: 0 },
  { title: "crispy seaweed", id: 1 },
  { title: "granola bar", id: 2 },
];

export const Duplication = () => {
  const [items, setItems] = useState(initialItems);
  const [selectedItem, setSelectedItem] = useState(items[0]);

  function handleItemChange(
    id: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) {
    setItems(
      items.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            title: e.target.value,
          };
        } else {
          return item;
        }
      }),
    );
  }

  return (
    <div className="mt-16 text-center">
      <h2>Cuál es su Snack favorita?</h2>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <input
              className="rounded-md border border-gray-300 p-1 my-1"
              value={item.title}
              onChange={(e) => {
                handleItemChange(item.id, e);
              }}
            />{" "}
            <Button
              onClick={() => {
                setSelectedItem(item);
              }}>
              Choose
            </Button>
          </li>
        ))}
      </ul>
      <p>Usted elegió: {selectedItem.title}.</p>
    </div>
  );
};
