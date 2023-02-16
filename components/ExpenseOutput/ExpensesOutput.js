import { View, StyleSheet, Text } from "react-native";

import ExpenseSummary from "./ExpensesSummary";
import ExpensesList from "./ExpensesList";
import { GlobalStyles } from "../../contants/styles";



function ExpensesOutput({ expenses, expensesPeriod, fallbackText }) {

  let content = <Text style={styles.infoText}>{fallbackText}</Text>

  if (expenses.length > 0){
    content = <ExpensesList expenses={expenses} />
  }

  return (
    <View style={styles.container}>
      <ExpenseSummary expenses={expenses} periodName={expensesPeriod} />
      {content}
    </View>
  );
}

export default ExpensesOutput;


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: GlobalStyles.colors.primary700,
  },
  infoText:{
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
    marginTop: 32
  }
});
