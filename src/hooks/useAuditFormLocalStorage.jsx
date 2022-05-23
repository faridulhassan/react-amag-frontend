import { useState, useEffect } from "react";

export default function useAuditFormLocalStorage() {
    const [data, _setData] = useState({}),
        [loading, setLoading] = useState(true),
        [error, setError] = useState(null);

    function setData(_data) {
        _setData(_data);
        localStorage.setItem("data", JSON.stringify(_data));
    }
    useEffect(() => {
        if (!Object.keys(data).length) {
            // fake api request
            const promise = new Promise((resolve) => {
                setTimeout(() => {
                    try {
                        const _data = JSON.parse(localStorage.getItem("data"));
                        resolve(_data);
                    } catch (e) {
                        throw { message: "no data found" };
                    }
                });
            }, 2000);
            promise
                .then((data) => {
                    setLoading(false);
                    setData(data);
                })
                .catch((error) => {
                    setLoading(false);
                    setError(error);
                });
        } else {
            setTimeout(() => setLoading(false), 1000);
        }
    }, []);
    return { data, loading, error, setData, setLoading };
}
