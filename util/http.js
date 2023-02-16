import axios from "axios"; // Sendding Http Request 'Axios'

const BACKEND_URL =
  "https://react-native-course-8a6cb-default-rtdb.firebaseio.com";

//ADDING DATA
export async function storeExpense(expenseData) {
  const response = await axios.post(
    BACKEND_URL + "/expenses.json",
    expenseData
  );
  const id = response.data.name;
  return id;
}

//FETCHING DATA - GETTING ALL DATA ON BACK-END 
export async function fetchExpense() {
  const response = await axios.get(BACKEND_URL + "/expenses.json");

  const expenses = [];

  for (const key in response.data) {
    const expenseObj = {
      id: key,
      amount: response.data[key].amount,
      date: new Date(response.data[key].date),
      descripton: response.data[key].descripton,
    };
    expenses.push(expenseObj);
  }
  return expenses;
}

//UPDATING DATA
export function updateExpense(id, expenseData) {
  return axios.put(BACKEND_URL + `/expenses/${id}.json`, expenseData);
}

//DELETING DATA
export async function deleteExpense(id) {
  return axios.delete(BACKEND_URL + `/expenses/${id}.json`);
}
