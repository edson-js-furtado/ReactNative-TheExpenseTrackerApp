import { useState, useContext, useEffect } from "react";

import ExpensesOutput from "../components/ExpenseOutput/ExpensesOutput";
// import ErrorOverlay from "../components/UI/ErrorOverlay";
import LoadingOverlay from "../components/UI/LoadingOverlay";
import { ExpenseContext } from "../store/expense-context";
import { getDateMinusDays } from "../util/date";
import { fetchExpense } from "../util/http";

function RecentExpense() {
  const expensesCtx = useContext(ExpenseContext);
  const [isFetching, setIsFetching] = useState(true);
  // const [error, setError] = useState();

  useEffect(() => {
    async function getExpenses() {
      setIsFetching(true);
      const expenses = await fetchExpense();
      expensesCtx.setExpenses(expenses);
      setIsFetching(false);
    }
    getExpenses();
  }, []);

  // function errorHandler() {
  //   setError(null);
  // }

  // if (error && !isFetching) {
  //   return <ErrorOverlay message={error} onConfirm={errorHandler} />;
  // }

  if (isFetching) {
    return <LoadingOverlay />;
  }

  const recentExpenses = expensesCtx.expenses.filter((expenses) => {
    const today = new Date();
    const date7DaysAgo = getDateMinusDays(today, 7);

    return expenses.date >= date7DaysAgo && expenses.date <= today;
  });
  return (
    <ExpensesOutput
      expenses={recentExpenses}
      expensesPeriod="Last 7 Days"
      fallbackText="No expenses registered for the last 7 days"
    />
  );
}

export default RecentExpense;

// const styles = StyleSheet.create({

// })
