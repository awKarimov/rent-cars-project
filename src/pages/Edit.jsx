import { useState, useEffect } from "react";
import useAxios from "../hooks/useAxios";
import { useParams } from "react-router-dom";
import Input from "antd/es/input/Input";
import { InputNumber, Select } from "antd";

export default function Edit() {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const axios = useAxios();

  const getSingleCar = async (id) => {
    let data = await axios({ url: `cars/${id}` });
    if (data && data.data) {
      setCar(data.data);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, []);

  return (
    car && (
      <div>
        <div className="mx-auto px-5 container">
          <h2 className="text-3xl mb-5 font-bold">{car.id}</h2>
          <form action="" className="px-10">
            <div className="grid grid-cols-2 gap-5">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-medium">
                  Mashina nomi
                </label>
                <Input
                  placeholder="Mashina nomi"
                  name="name"
                  id="name"
                  defaultValue={car.name}
                />
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="pricePerDay" className="font-medium">
                  Kunlik ijara narxi ($)
                </label>
                <InputNumber
                  placeholder="Mashina nomi"
                  name="pricePerDay"
                  id="pricePerDay"
                  min={1}
                  max={100}
                  defaultValue={car.pricePerDay}
                />
              </div>

              <div>
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-medium">
                    Yonilg`i turi
                  </label>
                  <Input
                    placeholder="Yonilg`i turini yozin"
                    name="fuel"
                    id="fuel"
                    defaultValue={car.fuel}
                  />
                </div>
              </div>

              <div className="flex flex-col gap-2">
                <label htmlFor="drive " className="font-medium">
                  Type of Drive
                </label>
                <Select
                  name="drive"
                  defaultValue={car.drive}
                  options={[
                    { value: "AWD", label: <span>AWD</span> },
                    { value: "RWD", label: <span>RWD</span> },
                    { value: "FWD", label: <span>FWD</span> },
                  ]}
                />
              </div>
            </div>
          </form>
        </div>
      </div>
    )
  );
}
