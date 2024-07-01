import { BiEdit,BiTrash } from "react-icons/bi";

const List = ({id,title,titlemoney,titles,removeItem,editItem}) => {
  return (
    <div className="list-item">
      <p>{titles}</p>
        <p>ชื่อรายการ:{title}</p>
        <p>จำนวนเงิน:{titlemoney}</p>
        <div className="button">
            <BiEdit onClick={()=>editItem(id)} className="btn"/>
            <BiTrash onClick={()=>removeItem(id)} className="btn"/>
        </div>
    </div>
  )
}

export default List