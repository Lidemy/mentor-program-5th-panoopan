import { useState, useEffect, useCallback, useContext } from "react";
import { countTotalPosts } from "../WebAPI";
import { PageContext } from "../context";

function usePaginate() {
  const [totalPage, setTotalPage] = useState();
  const { page, setPage } = useContext(PageContext);

  useEffect(() => {
    countTotalPosts().then((res) => {
      const totalPost = Number(res.length);
      setTotalPage(Math.ceil(totalPost / 5));
    });
  }, [totalPage]);

  const handleButtonClick = useCallback(
    (button) => {
      if (button === "First") {
        return setPage(1);
      }

      if (button === "Prev" && page > 1) {
        return setPage(page - 1);
      }

      if (button === "Next" && page < totalPage) {
        return setPage(page + 1);
      }

      if (button === "Last") {
        return setPage(totalPage);
      }
    },
    [page, setPage, totalPage]
  );

  return {
    handleButtonClick,
  };
}

export default usePaginate;
