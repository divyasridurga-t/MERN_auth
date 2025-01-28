import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/userContext";

const ComponentPage = () => {
  const { backenUrl } = useContext(AppContext);
  let [productData, setProductData] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        let api = await fetch(backenUrl + "/products");
        let data = await api.json();
        if (data.status) {
          setProductData(data);
        } else {
          console.log("api failed", data.message);
        }
      } catch (error) {
        console.log("error==>>", error.message);
      }
    })();
  }, []);

  return (
    <div className="flex justify-center items-center">
      {productData?.data?.length
        ? productData?.data?.map((item, index) => {
            return (
              <div
                key={item?._id}
                className="w-[260px] h-[310px] border border-gray-200 m-3 p-2 rounded-lg bg-white shadow-xl flex flex-col cursor-pointer"
              >
                <div className="flex justify-center h-[60%]">
                  <img
                    className="rounded-t-lg"
                    src={item?.image || ""}
                    width={150}
                  />
                </div>
                <div className="px-1.5 h-[40%]">
                  <h1 className="text-xl capitalize font-semibold">
                    {item?.title || ""}
                  </h1>
                  <p className="text-sm">{item?.description}</p>
                  <p className="font-semibold text-md">₹ {item?.price}/- </p>
                </div>
              </div>
            );
          })
        : ""}
    </div>
  );
};

export default ComponentPage;
