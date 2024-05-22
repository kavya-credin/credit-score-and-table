import React from "react";
import { SlArrowLeft } from "react-icons/sl";
import { SlArrowRight } from "react-icons/sl";
import { useEffect, useState } from "react";
// import toast from "react-hot-toast";
import { toast } from "react-toastify";
import "../styles/Table.css";
import axios from "axios";
import Cookies from "js-cookie";
const Table = () => {
  const token = Cookies.get("Token");
  const [page, setPage] = useState(1);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [data, setData] = useState([]);
  const [totalPages, setTotalPages] = useState(0);
  const [totalItems, setTotalItems] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const fetchInitialData = async (pge, lmt) => {
    try {
      const res = await axios.get(
        `http://staging.console.api.credin.in/credin/view/equifax/items?page=${pge}&limit=${lmt}`,
        {
          headers: {
            token: token,
            email: "darshan.patel@credin.in",
          },
        }
      );
      // console.log(res);
      if (res.status === 200) {
        // console.log(res.data);
        setData(res.data.equifaxData);
        setTotalPages(res.data.totalPages);
        setTotalItems(res.data.totalItems);
      } else {
        console.log("error");
      }
    } catch (err) {
      console.log(err);
    }
  };

  const getPdf = async (pdfKey) => {
    if (!pdfKey) {
      toast.error("PDF key not found");
      return;
    }
    try {
      toast.success("Downloading pdf");
      const res = await axios.post(
        "http://staging.console.api.credin.in/credin/equifax/fetch/document",
        {
          token: token,
          email: "darshan.patel@credin.in",
          key: pdfKey,
        }
      );
      if (res.status === 200) {
        //  console.log(res)
        const url = window.URL.createObjectURL(new Blob([res.data]));
        var link = document.createElement("a");
        link.href = url;
        link.download = `${pdfKey}.pdf`;
        link.click();
        toast.success("Pdf Downloaded successfully");
      }
    } catch (err) {
      toast.error("Failed to download PDF: " + err.message);
      console.log(err);
    }
  };
  useEffect(() => {
    fetchInitialData(page, rowsPerPage);
  }, [page, rowsPerPage]);

  const handlePageChange = (direction) => {
    if (direction === "prev" && page > 1) {
      setPage(page - 1);
    } else if (direction === "next" && page < totalPages) {
      setPage(page + 1);
    }
  };
  const handleUserSearchMobileNumber = async () => {
    if (!mobileNumber) {
      toast.error("Enter Mobile Number");
      return;
    }
    if (mobileNumber.length < 10) {
      toast.error("Invalid Mobile Number");
      return;

    }
    try {
      const res = await axios.get(
        `http://staging.console.api.credin.in/credin/search/equifax?mobileNumber=${mobileNumber}`,
        {
          headers: {
            token: token,
            email: "darshan.patel@credin.in",
          },
        }
      );
      console.log(res);
      if (res.status === 200) {
        console.log(res.data);
        setData(res.data.equifaxData);
        setTotalPages(0);
        setTotalItems(data.length);
        setMobileNumber("");
      }
    } catch (err) {
      toast.error(err.message);
      console.log(err);
    }
  };
  return (
    <div className="table-main-div">
      <div className="search-from-table">
        <input
          placeholder="Mobile Number"
          className="input-table"
          type="number"
          value={mobileNumber}
          onChange={(e) => setMobileNumber(e.target.value)}
        ></input>
        <button
          className="button"
          type="button"
          onClick={handleUserSearchMobileNumber}
        >
          Search
        </button>
      </div>
      <div className="table-div">
        <div className="table-box">
          <table>
            <thead>
              <tr>
                <th>Full Name</th>
                <th>Fetch Timing</th>
                <th>Credit Score</th>
                <th>Mobile Number</th>
                {/* <th>Breau Key</th> */}
                <th>PDF</th>
              </tr>
            </thead>
            <tbody>
              {data.map((item) => (
                <tr key={item?._id}>
                  <td>{item?.firstName}</td>
                  <td>
                    {new Date(item?.apiCallTime).toLocaleString("en-IN", {
                      timeZone: "Asia/Kolkata", // Adjust for specific IST location if needed
                      year: "numeric",
                      month: "2-digit",
                      day: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td>{item?.creditScore}</td>
                  <td>{item?.mobileNumber}</td>
                  <td>
                    <button
                      className="table-btn"
                      type="button"
                      onClick={() => getPdf(item.bureauPdfKey)}
                    >
                      download
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="table-footer">
            <div>
              <span>
                Page {page} of {totalPages}
              </span>
            </div>
            <div>
              <button
                onClick={() => handlePageChange("prev")}
                disabled={page === 1}
              >
                <SlArrowLeft />
              </button>
              <button
                onClick={() => handlePageChange("next")}
                disabled={page === totalPages}
              >
                <SlArrowRight />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Table;
