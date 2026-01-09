const Student1=require("./students1")
const Identitycard=require("./identityCard")
const courses=require("./courses")
const studentCourses=require("./studentCourses")

Student1.belongsToMany(courses,{
    through:studentCourses
})
courses.belongsToMany(Student1,{
    through:studentCourses
})
// //one to one
// Student1.hasOne(Identitycard)
// Identitycard.belongsTo(Student1)
// //one to many
// Student1.hasMany(Identitycard,{
//     foreignKey:"Students1Id"
// })
// Identitycard.belongsTo(Student1,{
//     foreignKey:"Students1Id"
// })
//many to many
module.exports={
    Student1,Identitycard,courses,studentCourses
}