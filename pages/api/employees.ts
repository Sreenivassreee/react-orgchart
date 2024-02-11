import type { NextApiRequest, NextApiResponse } from "next";
import Employee, { IEmployee } from "../../models/Employee";
import connectDB from "@/utils/db";
// import connectDB from "../../utils/db";

connectDB();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  switch (req.method) {
    case "GET":
      try {
        const employees = await Employee.find();
        console.log(employees, "---employees");
        res.status(200).json(employees);
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
      break;
    case "POST":
      try {
        const employee: IEmployee = req.body;
        const newEmployee = new Employee(employee);
        await newEmployee.save();
        res.status(201).json(newEmployee);
      } catch (error) {
        res.status(400).json({ message: error.message });
      }
      break;
    default:
      res.status(405).end(); // Method Not Allowed
  }
}
