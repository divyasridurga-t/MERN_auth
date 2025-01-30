import { useContext, useEffect, useState } from "react";
import { AppContext } from "../context/userContext";
import { toast } from "react-toastify";

export const ShowProductsAdmin = () => {
  let { backenUrl } = useContext(AppContext);
  let [data, setData] = useState(null);
  useEffect(() => {
    (async function () {
      try {
        let api = await fetch(backenUrl + "/products");
        let json = await api.json();
        if (json.status) {
          setData(json.data);
        } else {
          toast.error("error in fetching data");
        }
      } catch (error) {
        toast.error(error.message);
      }
    })();
  }, []);

  return (
    <div className="w-[80%] min-h-screen flex flex-col justify-center items-center">
      <table className="border border-black w-full">
        <thead>
          <tr>
            <th>id</th>
            <th>title</th>
            <th>description</th>
            <th>price</th>
            <th>category</th>
            <th>search category</th>
            <th>image</th>
            <th>size</th>
            <th>colors</th>
            <th>offers</th>
            <th>product detail</th>
          </tr>
        </thead>
        <tbody>
          {data?.length
            ? data?.map((item) => {
                return (
                  <tr key={item._id}>
                    <td>{item.title}</td>
                    <td>{item.description}</td>
                    <td>{item.price}</td>
                    <td>{item.category}</td>
                    <td>{item.searchCategory}</td>
                    <td>{item.image}</td>
                    <td>{item.productDetail}</td>
                  </tr>
                );
              })
            : ""}
        </tbody>
      </table>
    </div>
  );
};

export default ShowProductsAdmin;
