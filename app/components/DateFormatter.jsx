import React, { useMemo } from "react";

const DateFormatter = ({ timestamp }) => {
	const formattedDate = useMemo(() => {
		const date = new Date(timestamp);

		const year = date.getFullYear();
		const month = date.getMonth() + 1;
		const day = date.getDate();
		const hours = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const formattedDate = `${year}-${month < 10 ? "0" + month : month}-${
			day < 10 ? "0" + day : day
		}`;
		const formattedTime = `${hours < 10 ? "0" + hours : hours}:${
			minutes < 10 ? "0" + minutes : minutes
		}:${seconds < 10 ? "0" + seconds : seconds}`;
		const fullFormattedDate = `${formattedDate} ${formattedTime}`;

		return fullFormattedDate;
	}, [timestamp]);

	return <p className='text-xs font-normal text-gray-600'>{formattedDate}</p>;
};


export default DateFormatter;

