import { useState } from "react";
import { View, StyleSheet, Text, Alert } from "react-native";
import { GlobalStyles } from "../../contants/styles";
import { getFormattedDate } from "../../util/date";

import Button from "../UI/Button";
import Input from "./Input";

function ExpenseForm({ submitButtonLabel, onCancel, onSubmit, defaultValue }) {
  //This approach is more scalable, because we use that stat in different input
  const [inputValues, setInputValues] = useState({
    amount: {
      value: defaultValue ? defaultValue.amount.toString() : "",
      isValid: true, //convert into true or false
    },
    date: {
      value: defaultValue ? getFormattedDate(defaultValue.date) : "",
      isValid: true,
    },
    descripton: {
      value: defaultValue ? defaultValue.descripton.toString() : "",
      isValid: true,
    },
  });

  function inputChangeHandler(inputIndentifier, enteredValue) {
    setInputValues((curInputValues) => {
      return {
        ...curInputValues,
        [inputIndentifier]: { value: enteredValue, isValid: true },
      };
    });
  }

  function submitHandler() {
    const expenseData = {
      amount: +inputValues.amount.value, // + convert the string to a number
      date: new Date(inputValues.date.value),
      descripton: inputValues.descripton.value,
    };
    const amountIsValid = !isNaN(expenseData.amount) && expenseData.amount > 0;
    const dateIsValid = expenseData.date.toString() !== "Invalid Date";
    const descriptionIsValid = expenseData.descripton.trim().length > 0;

    if (!amountIsValid || !dateIsValid || !descriptionIsValid) {
      // Alert.alert("Invalid Input", "Please check your input value");
      setInputValues((curInputs) => {
        return {
          amount: { value: curInputs.amount.value, isValid: amountIsValid },
          date: { value: curInputs.date.value, isValid: dateIsValid },
          descripton: {
            value: curInputs.descripton.value,
            isValid: descriptionIsValid,
          },
        };
      });
      return;
    }
    onSubmit(expenseData);
  }

  const formIsInvalid =
    !inputValues.amount.isValid ||
    !inputValues.date.isValid ||
    !inputValues.descripton.isValid;

  return (
    <View style={styles.form}>
      <Text style={styles.title}>Your Expense</Text>
      <View style={styles.inputsRow}>
        <Input
          style={styles.rowInput}
          label="Amount"
          invalid={!inputValues.amount.isValid}
          textInputConfig={{
            keyboardType: "decimal-pad",
            onChangeText: inputChangeHandler.bind(this, "amount"),
            value: inputValues.amount.value,
          }}
        />
        <Input
          style={styles.rowInput}
          label="Date"
          invalid={!inputValues.date.isValid} 
          textInputConfig={{
            placeholder: "YYYY-MM-DD",
            maxLength: 10,
            onChangeText: inputChangeHandler.bind(this, "date"),
            value: inputValues.date.value,
          }}
        />
      </View>

      <Input
        label="Description"
        invalid={!inputValues.descripton.isValid}
        textInputConfig={{
          multiline: true,
          //autoCorrect: false //default is true
          onChangeText: inputChangeHandler.bind(this, "descripton"),
          value: inputValues.descripton.value,
        }}
      />
      {formIsInvalid && (
        <Text style={styles.errorText}>Invalid Input values - please check your entered data</Text>
      )}
      <View style={styles.buttons}>
        <Button style={styles.button} mode="flat" pressed={onCancel}>
          Cancel
        </Button>
        <Button style={styles.button} pressed={submitHandler}>
          {submitButtonLabel}
        </Button>
      </View>
    </View>
  );
}

export default ExpenseForm;

const styles = StyleSheet.create({
  form: {
    marginTop: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
    marginVertical: 24,
    textAlign: "center",
  },
  inputsRow: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  rowInput: {
    flex: 1,
  },
  buttons: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  button: {
    minWidth: 120,
    marginHorizontal: 8,
  },
  errorText:{
    textAlign: 'center',
    color: GlobalStyles.colors.error500,
    margin: 8
  }
});
