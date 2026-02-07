import express from "express";
import { home, student_new_record, add_student , edit_student_record,update_record ,delete_student} from "../Controllers/home.js";

const route = express.Router(); 

route.get("/", home);
route.get("/new_record", student_new_record);
route.post("/new_record", add_student);
route.get('/edit/:id',edit_student_record);
route.post('/update_record/:id',update_record);
route.post('/delete/:id',delete_student);

export default route;
