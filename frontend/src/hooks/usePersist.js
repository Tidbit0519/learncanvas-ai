import { useState, useEffect } from "react";

const usePersist = () => {
	const [persist, setPersist] = useState(false);

	useEffect(() => {
		localStorage.setItem("persist", persist);
	}, [persist]);

	return [persist, setPersist];
};
export default usePersist;
