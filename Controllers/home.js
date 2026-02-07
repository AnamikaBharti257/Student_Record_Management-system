import student from "../Models/StudentSchema.js"

const add_student = async (req, res) => {
  try {
    const newStudent = new student({
      name: req.body.name,
      email: req.body.email,
      city: req.body.city,
      contact: req.body.contact
    });

    await newStudent.save();
    res.redirect('/'); // go back to home
  } catch (error) {
    console.log(error.message);
  }
};
const home = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    const search = req.query.search || "";

    const query = {
      $or: [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { city: { $regex: search, $options: "i" } }
      ]
    };

    const totalRecords = await student.countDocuments(query);
    const records = await student
      .find(query)
      .skip(skip)
      .limit(limit);

    const totalPages = Math.ceil(totalRecords / limit);

    res.render("index", {
      records,
      currentPage: page,
      totalPages,
      search
    });
  } catch (error) {
    console.log(error.message);
  }
};



const student_new_record = async (req, res) => {
  try {
    res.render('student_new_record')
  } catch (error) {
    console.log(error.message)
  }
}

const edit_student_record = async (req, res) => {
  try {
    const record = await student.findById(req.params.id);
    res.render('update_record', { record })
  } catch (error) {
    console.log(error.message)
  }
}

const update_record = async (req, res) => {
  try {
     await student.findByIdAndUpdate(req.params.id, req.body, { 'new': true });
    res.redirect('/')
  } catch (error) {
    console.log(error.message)
  }
}
const delete_student = async(req,res)=>{
  await student.findByIdAndDelete(req.params.id);
  res.redirect('/')
}

export { home, student_new_record, add_student, edit_student_record, update_record,delete_student };




