import {
    useCallback,
    useState
} from "react";


export const useHttp = () => {
    const [process, setProcess] = useState('waiting');

    const request = useCallback(async (url, method = 'GET', body = null, headers = {
        'Content-Type': 'application/json'
    }) => {
        setProcess('loading');
        try {
            const responce = await fetch(url, {
                method,
                body,
                headers
            });
            if (!responce.ok) {
                throw new Error(`Could not fetch ${url}, status ${responce.status}`);
            }
            const data = await responce.json();
            setProcess('confirmed');
            return data;

        } catch (e) {
            setProcess('error');
            throw e;
        }

    }, []);

    const clearError = useCallback(() => {
        setProcess('confirmed');
    }, []);

    return {
        request,
        clearError,
        process,
        setProcess
    }
}