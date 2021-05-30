import { useState } from 'react';

const useFetchBlockHash = () => {
    const host = 'https://blockchain.info/rawblock';
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const onSearch = (value) => {
        setLoading(true);
        fetch(`${host}/${value}`)
            .then((response) => response.json())
            .then(json => {
                setLoading(false);
                setData(json)
            });
    }
    return [data, loading, onSearch];
}

export default useFetchBlockHash;