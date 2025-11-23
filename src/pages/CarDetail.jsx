import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Image, Button } from "antd";
import useAxios from "../hooks/useAxios";
import Header from "../components/header/Header";

const CarDetail = () => {
  const { id } = useParams();
  const [car, setCar] = useState(null);
  const axios = useAxios();
  const navigate = useNavigate();

  const getSingleCar = async (id) => {
    let data = await axios({ url: `cars/${id}` });
    if (data && data.data) {
      setCar(data.data);
    }
  };

  useEffect(() => {
    getSingleCar(id);
  }, []);

  if (!car) return null;

  return (
    <>
      <Header />
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-2">
                  {car.name}
                </h1>
                <div className="flex items-center gap-4 mb-6">
                  <span className="text-4xl md:text-5xl font-bold text-indigo-500">
                    ${car.pricePerDay}
                  </span>
                  <span className="text-gray-500 text-4xl">/ day</span>
                  <Button
                    onClick={() => {
                      navigate(`/edit/${id}`);
                    }}>
                    Edit
                  </Button>
                </div>

                <div className="relative from-gray-100 to-gray-200 rounded-xl overflow-hidden mb-6">
                  <img
                    src={car.image}
                    alt={car.name}
                    className="w-full h-64 md:h-80 object-cover"
                  />
                </div>

                <div className="grid grid-cols-3 gap-4">
                  <Image.PreviewGroup>
                    {car.gallery
                      ?.filter((img) => img)
                      .map((img, index) => (
                        <div
                          key={index}
                          className="rounded-lg overflow-hidden shadow-md">
                          <Image
                            src={img}
                            alt="#"
                            className="w-full h-24 md:h-32 object-cover"
                          />
                        </div>
                      ))}
                  </Image.PreviewGroup>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Technical Specification
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">Gear Box</p>
                    <p className="text-gray-600 text-sm">
                      {car.details?.gearbox}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">Fuel</p>
                    <p className="text-gray-600 text-sm">{car.details?.fuel}</p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">Doors</p>
                    <p className="text-gray-600 text-sm">
                      {car.details?.doors}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">
                      Air Conditioner
                    </p>
                    <p className="text-gray-600 text-sm">
                      {car.details?.airConditioner}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">Seats</p>
                    <p className="text-gray-600 text-sm">
                      {car.details?.seats}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-xl p-4 text-center">
                    <p className="font-semibold text-gray-900">Distance</p>
                    <p className="text-gray-600 text-sm">
                      {car.details?.distance}
                    </p>
                  </div>
                </div>

                <button className="w-[300px] mt-6 bg-indigo-600 text-white font-semibold py-4 rounded-xl hover:bg-indigo-600 transition text-lg">
                  Rent a car
                </button>
              </div>

              <div className="bg-white rounded-2xl p-6 shadow-lg">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">
                  Car Equipment
                </h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {car.equipment?.safety?.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      ✅<span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                  {car.equipment?.comfort.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      ✅<span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarDetail;
