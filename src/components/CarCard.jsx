import { Car, Fuel, Settings, Snowflake } from "lucide-react";
import { Link } from "react-router-dom";

export const CarCard = ({ car }) => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden">
      <div className="relative  from-gray-50 to-gray-100 h-48 flex items-center justify-center overflow-hidden">
        {car.image ? (
          <img
            src={car.image}
            alt={car.name}
            className="w-full h-full object-cover"
          />
        ) : (
          <Car className="w-32 h-32 text-gray-300" />
        )}
      </div>

      <div className="p-5">
        <div className="flex items-start justify-between mb-4">
          <div>
            <h3 className="text-xl font-bold text-gray-900 mb-1">{car.name}</h3>
            <p className="text-sm text-gray-500">{car.type}</p>
          </div>
          <div className="text-right">
            <span className="text-3xl font-bold text-indigo-600">
              ${car.pricePerDay}
            </span>
            <p className="text-sm text-gray-500">per day</p>
          </div>
        </div>

        <Link to={`/car/${car.id}`}>
          <button className="w-full bg-indigo-600 text-white font-semibold py-3 px-4 rounded-lg hover:bg-indigo-700 transition">
            View Details
          </button>
        </Link>
      </div>
    </div>
  );
};
