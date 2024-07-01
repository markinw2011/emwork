import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import List from "./components/List";
import Alert from "./components/Alert";
import "./index.css";

function App() {
  const [name, setName] = useState("");
  const [money, setMoney] = useState("");
  const [names, setNames] = useState("");
  const [list, setList] = useState([]);
  const [alert, setAlert] = useState({ show: false, msg: "", type: "" });
  const [checkEditItem, setCheckEditItem] = useState(false);
  const [editid, setEditId] = useState(null);
  const submitData = (e) => {
    e.preventDefault();
    if (!name) {
      setAlert({ show: true, msg: "กรุณาใส่ข้อมูล", type: "error" });
    } else if (checkEditItem && name) {
      const result = list.map((item) => {
        if (item.id === editid) {
          return {
            ...item,
            title: name,
            titlemoney: money,
            titles:names

          };
        }
        return item;
      });
      setList(result);
      setName("");
      setMoney("");
      setNames("")
 
      setCheckEditItem(false);
      setEditId(null);
      setAlert({ show: true, msg: "แก้ไขข้อมูลเรียบร้อย", type: "success" });
    } else {
      const newItem = {
        id: uuidv4(),
        title: name,
        titlemoney: money,
        titles:names
      };
      setList([...list, newItem]);
      setName("");
      setMoney("");
      setNames("")
;
      setAlert({ show: true, msg: "บันทึกข้อมูลเรียบร้อย", type: "success" });
    }
  };

  const removeItem = (id) => {
    const result = list.filter((item) => item.id !== id);
    setList(result);
    setAlert({ show: true, msg: "ลบข้อมูลเรียบร้อย", type: "error" });
  };
  const editItem = (id) => {
    setCheckEditItem(true);
    setEditId(id);
    const searchItem = list.find((item) => item.id === id);
    setName(searchItem.title);
    setMoney(searchItem.titlemoney);
  };

  return (
    <section className="container">
      <h1>รายรับรายจ่าย</h1>
      {alert.show && <Alert {...alert} setAlert={setAlert} list={list} />}
      <form className="" onSubmit={submitData}>
        <div className="">
          <div>
          ระบุรายรับหรือรายจ่าย
        <input
            typr="text"
            className=""
            onChange={(e) => setNames(e.target.value)}
            value={names}
          />
          </div>
            ชื่อรายการ
          <input
            typr="text"
            className=""
            onChange={(e) => setName(e.target.value)}
            value={name}
          />
          <p>จำนวนเงิน</p>
          <input
            itypr="text"
            className=""
            onChange={(e) => setMoney(e.target.value)}
            value={money}
            placeholder="กรอกจำนวนเงิน"
          />
          <button type="submit" className="submit-btn">
            {checkEditItem ? "แก้ไขข้อมูล" : "เพิ่มข้อมูล"}
          </button>
        </div>
      </form>
      <section className="">
        {list.map((data, index) => {
          return (
            <List
              key={index}
              {...data}
              removeItem={removeItem}
              editItem={editItem}
            />
          );
        })}
      </section>
      
    </section>
  );
}

export default App;
