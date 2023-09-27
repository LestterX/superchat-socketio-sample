import { serverHTTP } from "./server/server";

const PORT = process.env.SERVER_PORT || 3030

serverHTTP.listen(PORT, () => { console.log(`Server is running on: http://localhost:${PORT}`); })