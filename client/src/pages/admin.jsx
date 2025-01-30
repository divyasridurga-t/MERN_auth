import { useContext, useState } from "react";
import Navbar from "../components/Navbar";
import { v4 as uuidv4 } from "uuid";
import { AppContext } from "../context/userContext";
import { toast } from "react-toastify";
import ShowProductsAdmin from "../components/showProductsAdmin";

const Admin = () => {
  let [inputValue, setInputValue] = useState("");
  let [data, setData] = useState({ size: [], color: [], offer: [] });
  let [inputFields, setInputFields] = useState({
    title: "",
    description: "",
    image: "",
    price: "",
    category: "",
    searchCategory: "",
    productDetail: "",
  });

  let [productData, setProductData] = useState(null);

  console.log(productData);

  let { backenUrl } = useContext(AppContext);

  function handleSizeChange(e) {
    setInputValue(e.target.value);
  }

  function handleSizeClick(prop) {
    setData((prev) => ({
      ...prev,
      [prop]: [
        ...prev[prop],
        {
          ...data[prop],
          id: uuidv4(),
          inputValue,
        },
      ],
    }));
  }

  function handleRemoveDataClick(id, prop) {
    let filteredData = data[prop].filter((key) => {
      return key.id !== id;
    });

    setData((prev) => ({
      ...prev,
      [prop]: filteredData,
    }));
  }

  function handleInputChange(e) {
    setInputFields({
      ...inputFields,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit() {
    try {
      let api = await fetch(backenUrl + "/products", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: inputFields.title,
          description: inputFields.description,
          price: inputFields.price,
          category: inputFields.category,
          searchCategory: inputFields.category,
          image: inputFields.image,
          sizes: data.size,
          colors: data.color,
          offers: data.offer,
          productDetail: inputFields.productDetail,
        }),
      });

      let resData = await api.json();
      if (resData.status) {
        toast.success(resData.message);
        setProductData(resData);
      }
    } catch (error) {
      toast.error(error.message);
    }
  }

  return (
    <div className="">
      <Navbar />
      <div className="flex">
        {/* 1 */}
        <div className="w-[20%] min-h-screen flex items-center justify-center border border-r-black">
          <div className="bg-slate-400 p-4 m-2 rounded-md shadow-2xl">
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="text"
              placeholder="Title"
              required
              name="title"
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="text"
              placeholder="Description"
              required
              name="description"
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="number"
              placeholder="Price"
              required
              name="price"
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="text"
              placeholder="category"
              required
              name="category"
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="text"
              placeholder="search category"
              required
              name="searchCategory"
              onChange={handleInputChange}
            />
            <input
              className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-full"
              type="text"
              placeholder="Paste the image url"
              required
              name="image"
              onChange={handleInputChange}
            />
            {/* sizes */}
            <div>
              <div className="flex mb-2">
                <input
                  className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-[80%]"
                  type="text"
                  placeholder="Add sizes"
                  name="size"
                  onChange={handleSizeChange}
                  required
                />
                <button
                  className="bg-slate-700 text-slate-400 w-1/4 rounded-md text-sm p-0"
                  onClick={() => handleSizeClick("size")}
                >
                  add
                </button>
              </div>
              {/* added data sizes */}
              <div className="flex gap-2 justify-center flex-wrap mb-2">
                {data.size.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-500 w-2/12 text-center text-sm flex justify-between px-1 py-2 rounded-md"
                    >
                      {item.inputValue}{" "}
                      <span
                        className="text-slate-400 cursor-pointer"
                        onClick={() => handleRemoveDataClick(item.id, "size")}
                      >
                        X
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* color */}

            <div>
              <div className="flex mb-2">
                <input
                  className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-[80%]"
                  type="text"
                  placeholder="Add colors"
                  required
                  onChange={handleSizeChange}
                />
                <button
                  className="bg-slate-700 text-slate-400 w-1/4 rounded-md text-sm p-0"
                  onClick={() => handleSizeClick("color")}
                >
                  add
                </button>
              </div>
              <div className="flex gap-2 justify-center flex-wrap mb-2">
                {data.color.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-500 w-3/12 text-center text-sm flex justify-between px-1 py-2 rounded-md"
                    >
                      {item.inputValue}{" "}
                      <span
                        className="text-slate-400 cursor-pointer"
                        onClick={() => handleRemoveDataClick(item.id, "color")}
                      >
                        X
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* offer */}
            <div>
              <div className="flex mb-2">
                <input
                  className="bg-transparent border border-t-transparent border-r-transparent border-s-transparent border-b-black placeholder-slate-600 focus:outline-none p-1 mb-4 text-sm w-[80%]"
                  type="text"
                  placeholder="Add offers"
                  required
                  onChange={handleSizeChange}
                />
                <button
                  className="bg-slate-700 text-slate-400 w-1/4 rounded-md text-sm p-0"
                  onClick={() => handleSizeClick("offer")}
                >
                  add
                </button>
              </div>
              <div className="flex gap-2 justify-center flex-wrap mb-4">
                {data.offer.map((item, index) => {
                  return (
                    <div
                      key={item.id}
                      className="bg-slate-500 w-5/12 text-center text-sm flex justify-between px-1 py-2 rounded-md"
                    >
                      {item.inputValue}{" "}
                      <span
                        className="text-slate-400 cursor-pointer"
                        onClick={() => handleRemoveDataClick(item.id, "offer")}
                      >
                        X
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
            <textarea
              className="w-full rounded-md bg-transparent border border-black text-slate-700 focus:outline-none p-1"
              rows={5}
              onChange={handleInputChange}
              name="productDetail"
            ></textarea>
            <button
              className="w-full bg-slate-700 py-2 text-slate-400 rounded-md"
              onClick={handleSubmit}
            >
              add product
            </button>
          </div>
        </div>
        {/* 2 */}
        {/* display prducts */}
        <ShowProductsAdmin />
      </div>
    </div>
  );
};

export default Admin;
