import bcrypt from "bcryptjs";

const users = [
  {
    name: "Admin User",
    email: "admin@admin.com",
    password: bcrypt.hashSync("11223344", 10),
    isAdmin: true,
  },
  {
    name: "Ahmet Göze",
    email: "ahmet@gmail.com",
    password: bcrypt.hashSync("11223344", 10),
  },
  {
    name: "Bianca Stan",
    email: "bianca@gmail.com",
    password: bcrypt.hashSync("11223344", 10),
  },
];

export default users;
