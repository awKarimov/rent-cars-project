import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useNavigate, useParams } from "react-router-dom";

import { Button, notification } from "antd";
import { PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

export default function Edit() {
  const [api, contextHolder] = notification.useNotification();
  const openNotificationWithIcon = (type, { description }) => {
    api[type]({ description });
  };

  const { id } = useParams();
  const [car, setCar] = useState(null);
  const axios = useAxios();
  const navigate = useNavigate();
  const [gallery, setGallery] = useState([]);
  const [drive, setDrive] = useState(null);
  const [gearbox, setGearbox] = useState(null);

  const getSingleCar = async (id) => {
    let data = await axios({ url: `cars/${id}` });
    if (data && data.data) {
      setCar(data.data);
      setGallery(data.data.gallery);
      setDrive(data.data.drive);
      setGearbox(data.data.gearbox);
    }
  };

  async function editCar(car) {
    await axios({
      url: `cars/${id}`,
      method: "PATCH",
      body: car,
    });

    openNotificationWithIcon("success", {
      description: "Cars' data changed successfully",
    });

    setTimeout(() => navigate(-1), 1500);
  }

  function addImage() {
    const img = prompt("Rasm linkini kiriting");
    try {
      new URL(img);
      setGallery((prev) => [...prev, img]);
    } catch (error) {
      alert("Rasm topilmadi");
    }
  }

  function handleGallery(url) {
    setGallery(gallery.filter((el) => el !== url));
  }

  function handleSubmit(evt) {
    evt.preventDefault();
    const formData = new FormData(evt.target);
    const result = { gearbox, drive, gallery };

    formData.forEach((value, key) => {
      result[key] = value;
    });

    editCar(result);
  }

  useEffect(() => {
    getSingleCar(id);
  }, []);

  return (
    car && (
      <div className="py-10 bg-gray-50 min-h-screen">
        {contextHolder}
        <div className="mx-auto px-5 container">
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-800 text-white font-medium py-2 px-5 rounded-md border border-gray-700 hover:bg-gray-700 hover:border-gray-600 mb-6">
            Back
          </button>

          <form
            onSubmit={handleSubmit}
            className="space-y-6 bg-white p-8 rounded-lg shadow-md">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="flex flex-col">
                <label htmlFor="name" className="font-medium mb-1">
                  Mashina nomi
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  defaultValue={car.name}
                  placeholder="Mashina nomi"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="pricePerDay" className="font-medium mb-1">
                  Kunlik ijara narxi ($)
                </label>
                <input
                  type="number"
                  name="pricePerDay"
                  id="pricePerDay"
                  defaultValue={car.pricePerDay}
                  min={1}
                  max={100}
                  placeholder="Narxi"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="fuel" className="font-medium mb-1">
                  Yonilg`i turi
                </label>
                <input
                  type="text"
                  name="fuel"
                  id="fuel"
                  defaultValue={car.fuel}
                  placeholder="Yonilg`i turini yozin"
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs"
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="drive" className="font-medium mb-1">
                  Type of Drive
                </label>
                <select
                  name="drive"
                  id="drive"
                  value={drive}
                  onChange={(e) => setDrive(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs">
                  <option value="AWD">AWD</option>
                  <option value="RWD">RWD</option>
                  <option value="FWD">FWD</option>
                </select>
              </div>

              <div className="flex flex-col">
                <label htmlFor="gearbox" className="font-medium mb-1">
                  Gearbox Type
                </label>
                <select
                  name="gearbox"
                  id="gearbox"
                  value={gearbox}
                  onChange={(e) => setGearbox(e.target.value)}
                  className="border border-gray-300 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-blue-400 w-full max-w-xs">
                  <option value="Manual">Manual</option>
                  <option value="Automatic">Automatic</option>
                </select>
              </div>
            </div>

            <div className="flex gap-4 mt-4 flex-wrap">
              {gallery.map((el, index) => (
                <div
                  key={index}
                  className="relative w-20 h-20 rounded-md overflow-hidden shadow-md group">
                  <img
                    src={el}
                    alt={`Rasm ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                  <button
                    type="button"
                    onClick={() => handleGallery(el)}
                    className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 flex items-center justify-center transition">
                    <TrashIcon className="w-5 h-5 text-white" />
                  </button>
                </div>
              ))}
              <button
                type="button"
                onClick={addImage}
                className="w-20 h-20 border-2 border-dashed border-gray-300 rounded-md flex items-center justify-center text-gray-400 hover:border-blue-500 hover:text-blue-500 transition">
                <PlusCircledIcon className="w-6 h-6" />
              </button>
            </div>

            <div className="mt-6">
              <Button
                htmlType="submit"
                type="primary"
                className="w-full max-w-xs flex justify-center">
                Save
              </Button>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
