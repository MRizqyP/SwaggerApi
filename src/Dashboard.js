import React, { useEffect, useState } from "react";
import axios from "axios";
import { getUser, removeUserSession, getToken } from "./Utils/Common";
import { NavLink } from "react-router-dom";
import { unstable_batchedUpdates } from "react-dom";

function Dashboard(props) {
  const user = getUser();
  const token = getToken();
  const [data, setData] = useState([]);

  // handle click event of logout button
  const handleLogout = () => {
    removeUserSession();
    props.history.push("/login");
  };

  async function ubah(no) {
    const request = await axios.put(`/http://18.139.50.74:8080/item/${no}`);
  }

  useEffect(() => {
    async function FetchData() {
      const request = await axios.get(`http://18.139.50.74:8080/checklist`, {
        headers: { Authorization: "Bearer " + token },
      });
      setData(request.data.data[0].items);
      return request;
    }
    FetchData();
  }, []);

  console.log(data);

  return (
    <div>
      <NavLink to="/tambahchecklist">
        <p>Tambah Checklist</p>
      </NavLink>
      <p>Cheklist 1</p>
      <table>
        <tr>
          <th>Id</th>
          <th>Nama</th>
          <th>Status</th>
          <th>Edit</th>
        </tr>
        {data.map((x) => {
          return (
            <tr>
              <td>{x.id}</td>
              <td>{x.name}</td>
              {x.itemCompletionStatus === false ? (
                <td>Belum di Kerjakan</td>
              ) : (
                <td>Sudah Dikerjakan</td>
              )}
              <td>
                <a onClick={ubah(x.id)}>Edit</a>
              </td>
            </tr>
          );
        })}
      </table>

      <br />

      <input type="button" onClick={handleLogout} value="Logout" />
    </div>
  );
}

export default Dashboard;
