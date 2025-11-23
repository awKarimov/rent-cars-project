import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";

const SelectCategory = ({ onCategoryChange }) => {
  const [categories, setCategories] = useState([]);
  const [activeCategory, setActiveCategory] = useState("All vehicles");
  const axios = useAxios();

  useEffect(() => {
    const getCategories = async () => {
      try {
        const response = await axios({ url: "cars" });
        const allTypes = response.data.data.map((car) => car.type);
        const uniqueTypes = ["All vehicles", ...new Set(allTypes)];
        setCategories(uniqueTypes);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    getCategories();
  }, []);

  const handleCategoryClick = (category) => {
    setActiveCategory(category);
    onCategoryChange(category);
  };

  return (
    <section className="category">
      <div className="mycon flex flex-col gap-2 sm:gap-4 md:gap-6 xl:gap-8 py-8">
        <h5 className="text-center text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl">
          Select a vehicle group
        </h5>

        <div className="w-full md:w-[80%] m-auto flex flex-wrap items-center justify-center gap-3 md:gap-5">
          {categories.map((category, idx) => (
            <button
              key={idx}
              onClick={() => handleCategoryClick(category)}
              className={`px-6 py-3 rounded-3xl font-semibold transition ${
                activeCategory === category
                  ? "bg-[#5937e0] text-white"
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"
              }`}>
              {category}
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SelectCategory;
