import React, { useState } from "react";
import axios from "axios";

const MyButton = () => {
	const [myTable, setMyTable] = useState([]);
  const [fields, setFields] = useState([]);

	const getFromCosmos = async () => {
		const url = "http://localhost:7071/api/HttpTrigger03";
		axios.get(url).then((res) => {
			if (res.data && res.data.items && res.data.items.length)
				setMyTable([...res.data.items]);
		});
	};

	const renderRows = (val, i) => {
    let list = []
		for (const x in val) {
			if (!fields.includes(x)) {
				let temp = [...fields];
        temp.push(x);
        setFields([...temp])
      }
      list.push(val[x])
    }
    return (
      <tr key={i}>
        {list.map((value, k) => <td key={k}>{value}</td>)}
      </tr>
    )
	};

	return (
		<div>
			<button onClick={() => getFromCosmos()}>My Trigger</button>

			{myTable.length ? (
				<table>
					<tr>
						{fields.length &&
							fields.map((val, i) => {
								return <td key={i}>{val}</td>;
							})}
					</tr>
					{myTable.map((val, i) => renderRows(val, i))}
				</table>
			) : (
				<></>
			)}
		</div>
	);
};

export default MyButton;
