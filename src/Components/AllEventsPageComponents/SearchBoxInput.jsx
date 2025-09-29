import React, { useContext, useState } from "react";
import Input from "../AuthComponents/Input";
import { CiSearch } from "react-icons/ci";
import Button from "../Button";
import { motion } from "framer-motion";
import { EventContext } from "../../Context/EventContext";

export default function SearchBoxInput() {
  const { fetchAllEvents } = useContext(EventContext);

  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    location: "",
    category: "",
    tags: "",
    price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    fetchAllEvents(search, filters);
  };

  const handleChange = (e) => {
    setFilters((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleReset = () => {
    setSearch("");
    setFilters({ location: "", category: "", tags: "", price: "" });
    fetchAllEvents();
  };

  return (
    <div className="bg-[#0E021E] flex items-center py-4">
      <div className="container mx-auto">
        <motion.form
          onSubmit={handleSubmit}
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="flex-col mx-auto"
        >
          <div className="relative w-[300px] lg:w-2/3 h-[50px] mx-auto flex items-center">
            <Input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="bg-white text-lg font-semibold text-black w-full mx-auto lg:w-full h-full pl-10 pr-4 rounded"
              type="text"
              placeholder="Search events"
            />
            <CiSearch size={20} className="absolute top-4 left-3 text-gray-500" />
          </div>

          <div className="flex flex-wrap mx-auto px-3 lg:flex items-center justify-center gap-2 my-5">
            <select
              name="location"
              value={filters.location}
              onChange={handleChange}
              className="bg-white rounded-md h-[50px] py-2 px-2"
            >
              <option value="">Location</option>
              <option value="online">Online</option>
              <option value="lagos">Lagos</option>
              <option value="abuja">Abuja</option>
            </select>

            <select
              name="category"
              value={filters.category}
              onChange={handleChange}
              className="bg-white rounded-md h-[50px] py-2 px-2"
            >
              <option value="">Category</option>
              <option value="sports">Sports</option>
              <option value="party">Party</option>
              <option value="education">Education</option>
              <option value="tech">Tech</option>
              <option value="religion">Religion</option>
            </select>

            <select
              name="tags"
              value={filters.tags}
              onChange={handleChange}
              className="bg-white w-[80px] rounded-md h-[50px] py-2 px-2"
            >
              <option value="">Tags</option>
              <option value="sports">Sports</option>
              <option value="party">Party</option>
              <option value="education">Education</option>
              <option value="tech">Tech</option>
              <option value="concert">Concert</option>
              <option value="religion">Religion</option>
            </select>

            <select
              name="price"
              value={filters.price}
              onChange={handleChange}
              className="bg-white rounded-md h-[50px] py-2 px-2"
            >
              <option value="">Price</option>
              <option value="free">Free</option>
              <option value="paid">Paid</option>
            </select>

            <Button type="submit" className="px-4" content="Apply" />
            <button
              type="button"
              onClick={handleReset}
              className="px-4 py-2 text-purple-700 bg-transparent"
            >
              Reset Filter
            </button>
          </div>
        </motion.form>
      </div>
    </div>
  );
}
