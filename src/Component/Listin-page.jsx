import { useEffect, useState } from "react";
import "../App.css";
export const Home = () => {
  const [img, setImg] = useState([]);
  const [fetching, setFetching] = useState(false);
  const [page, setPage] = useState(2);
  // const [sort, setSort] = useState("");
  useEffect(() => {
    fetch("https://outscal.herokuapp.com/product", {
      method: "GET",
      headers: {
        "Contenet-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setImg(res.product))
      .catch((er) => console.log(er, "im er"));
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handlescroll);
    return () => window.removeEventListener("scroll", handlescroll);
  }, []);

  useEffect(() => {
    if (!fetching) return;
    fetchmore();
    // console.log("third useff");
  }, [fetching]);

  const handlescroll = () => {
    if (
      window.innerHeight + document.documentElement.scrollTop !==
      document.documentElement.offsetHeight
    ) {
      setFetching(true);
    } else {
      return;
    }
  };

  const fetchmore = () => {
    setTimeout(() => {
      fetch(`https://outscal.herokuapp.com/product?page=${page}&size=15`, {
        method: "GET",
        headers: {
          "Contenet-Type": "application/json",
        },
      })
        .then((res) => res.json())
        .then((res) => {
          if (res.product.length !== 0) {
            res.product.map((el) => setImg((pre) => [...pre, el]));
          } else {
            return;
          }
        })
        .catch((er) => console.log(er, "im er"));
      setFetching(false);
      setPage(page + 1);
    }, 1000);
  };

  const handlechnage = (e) => {
    const sortby = +e.target.value;
    fetch(`https://outscal.herokuapp.com/product/sort?sort=${sortby}`, {
      method: "GET",
      headers: {
        "Contenet-Type": "application/json",
      },
    })
      .then((res) => res.json())
      .then((res) => setImg(res.product))
      .catch((er) => console.log(er, "im er"));
    // console.log(typeof sortby);
  };
  const handlechnagefilter = (e) => {
    const split = e.target.value.split("-").map(Number);
    fetch(
      `https://outscal.herokuapp.com/product/filter?base=${split[0]}&top=${split[1]}`,
      {
        method: "GET",
        headers: {
          "Contenet-Type": "application/json",
        },
      }
    )
      .then((res) => res.json())
      .then((res) => setImg(res.product))
      .catch((er) => console.log(er));
  };
  console.log(img);

  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>home</h1>

        {/* sort by price */}

        <label htmlFor="sort">Sort BY Price</label>
        <select id="sort" onChange={handlechnage}>
          <option value="1">Sort by price</option>
          <option value="1"> low to High</option>
          <option value="-1">High to low</option>
        </select>

        {/* filter by price */}

        <label htmlFor="filter">Filter BY Price</label>
        <select id="filter" onChange={handlechnagefilter}>
          <option value="100-200">Filter by price</option>
          <option value="100-200">100-400</option>
          <option value="401-800">401-800</option>
          <option value="801-1200">801-1200</option>
          <option value="1201-2000">1201-2000</option>
        </select>
      </div>
      <div className="min_div">
        {img.map((el) => (
          <div className="subdiv">
            <img src={el.image} width={"100%"} height={"400px"} alt="" />
            <p>{`RS ₹${el.price}`}</p>
            <p>{el.title}</p>
          </div>
        ))}
      </div>
    </>
  );
};
