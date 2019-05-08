
//export const HOST = '192.168.1.190';
export const HOST = 'localhost';

export const PORT = '2604';


export const PAGE_LENGTH = 10;
export const getEndpoint = (isHttps) => {
return `${isHttps ? 'https' : 'http'}://${HOST}:${PORT}/Api/`;
};

