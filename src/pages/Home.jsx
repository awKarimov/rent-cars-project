import { useEffect, useState } from "react";
import Header from "../components/header/Header";
import SelectCategory from "../components/home-components/SelectCategory";
import useAxios from "../hooks/useAxios";
import { useDispatch, useSelector } from "react-redux";
import { setData } from "../redux/cars-data-slice";
import { CarCard } from "../components/CarCard";

const Home = () => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.carsdata);
  const [filteredData, setFilteredData] = useState([]);
  const axios = useAxios();

  const getCars = async () => {
    try {
      let response = await axios({ url: "cars" });
      dispatch(setData(response.data.data));
      setFilteredData(response.data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
    }
  };

  useEffect(() => {
    getCars();
  }, []);

  const handleCategoryChange = (category) => {
    if (category === "All vehicles") {
      setFilteredData(data);
    } else {
      const filtered = data.filter((car) => car.type === category);
      setFilteredData(filtered);
    }
  };

  return (
    <>
      <Header />
      <SelectCategory onCategoryChange={handleCategoryChange} />

      <section className="all-cars">
        <div className="max-w-7xl mx-auto px-4 pb-12">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredData?.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
