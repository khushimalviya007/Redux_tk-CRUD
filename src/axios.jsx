import axios from "axios";
const API= axios.create({
    basrURL:"http://localhost:8080/blogger",
});
export default API;