/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";

import { styles } from "../styles/styles";
import List from "../components/Tours/List";
import { useSearchParams } from "react-router-dom";
import homeApi from "../apis/homeApi";

import { getProvinceName } from "../utils/index";

const Tours = () => {
  const params = useSearchParams();
  const [data, setData] = useState({});

  useEffect(() => {
    let param = {};
    if (params[0].get("keyword")) param.keyword = params[0].get("keyword");
    if (params[0].get("destination"))
      param.destination = params[0].get("destination");
    if (params[0].get("departure_day"))
      param.departure_day = params[0].get("departure_day");

    homeApi
      .getSearchData(param)
      .then((rs) => {
        setData(rs);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [
    params[0].get("keyword"),
    params[0].get("destination"),
    params[0].get("departure_day"),
  ]);

  const parts = params[0].get("departure_day")?.split("-");

  return (
    <div className="flex flex-col gap-y-10">
      <div className={`w-full overflow-hidden ${styles.horizontalPadding}`}>
        <div className="w-full flex items-center justify-center mt-4">
          {params[0].get("departure_day") && params[0].get("destination") && (
            <h2 className={`${styles.headingSize}`}>
              {getProvinceName(params[0].get("destination"))}, Ngày {parts[2]}/
              {parts[1]}/{parts[0]}
            </h2>
          )}
          {params[0].get("keyword") && (
            <h2 className={`${styles.headingSize}`}>
              {params[0].get("keyword") == "popular"
                ? "Tour phổ biến"
                : "Tour thịnh hành"}
            </h2>
          )}
        </div>
        <List rs={data} />
      </div>
    </div>
  );
};

export default Tours;
