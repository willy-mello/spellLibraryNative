import React from "react";
import {
  Image,
  StyleSheet,
  Text,
  View,
  Modal,
  TextInput,
  TouchableOpacity,
  AsyncStorage,
  Button
} from "react-native";
import {
  convertCurrencyToDenominations,
  convertDenominationstoCurrency,
  calculateNewBalance
} from "../assets/utilityFunctions";
import OneItem from "./OneItem";
import t from "tcomb-form-native";

const Form = t.form.Form;
const Bank = t.struct({
  gold: t.Number,
  silver: t.Number,
  copper: t.Number
});

export default class UserWallet extends React.Component {
  constructor() {
    super();
    this.state = {
      funds: 0,
      modalOpen: false,
      balAlert: "",
      newWithdrawal: false,
      newDeposit: false
    };
  }
  _toggleModal = () => {
    this.setState({
      modalOpen: !this.state.modalOpen,
      balAlert: ""
    });
  };
  _toggleWithdrawal = () => {
    this.setState({
      newWithdrawal: !this.state.newWithdrawal
    });
  };
  _toggleDeposit = () => {
    this.setState({
      newDeposit: !this.state.newDeposit
    });
  };
  _handleBankWithdrawal = () => {
    const value = this._form.getValue();
    const newBal = calculateNewBalance(
      this.state.funds,
      [value.gold, value.silver, value.copper],
      "w"
    );
    if (typeof newBal === "string") {
      this.setState({
        newDeposit: false,
        newWithdrawal: false,
        modalOpen: true,
        balAlert: newBal
      });
      return null;
    }

    this._setFunds(newBal);
    this._toggleWithdrawal();

    console.log("handlBalance called", value);
  };
  _handleBankDeposit = () => {
    const value = this._form.getValue();
    console.log("value.gold", value);
    const newBal = calculateNewBalance(
      this.state.funds,
      [value.gold, value.silver, value.copper],
      "d"
    );
    this._setFunds(newBal);
    this._toggleDeposit();
  };
  _resetFunds = async () => {
    await AsyncStorage.setItem("funds", JSON.stringify(0));
    this.setState({ funds: 0 });
  };

  _getFunds = async () => {
    let req = await AsyncStorage.getItem("funds");
    this.setState({ funds: JSON.parse(req) });
  };
  _setFunds = async newBal => {
    try {
      await AsyncStorage.setItem("funds", JSON.stringify(newBal));
      this.setState({ funds: newBal });
    } catch (error) {
      console.error(error);
    }
  };
  componentDidMount() {
    this._getFunds();
  }
  render() {
    if (this.state.newDeposit) {
      return (
        <View style={styles.form}>
          <Text style={styles.totalCash}>
            {" "}
            Total Cash: {this.state.funds} cp
          </Text>

          <Form
            ref={c => (this._form = c)}
            value={{ gold: 0, silver: 0, copper: 0 }}
            type={Bank}
          />
          <Button title={"make deposit"} onPress={this._handleBankDeposit} />
        </View>
      );
    }
    if (this.state.newWithdrawal) {
      return (
        <View style={styles.form}>
          <Text style={styles.totalCash}>
            {" "}
            Total Cash: {this.state.funds} cp
          </Text>
          <Form
            ref={c => (this._form = c)}
            value={{ gold: 0, silver: 0, copper: 0 }}
            type={Bank}
          />
          <Button
            title={"make withdrawal"}
            onPress={this._handleBankWithdrawal}
          />
        </View>
      );
    }
    return (
      <View style={styles.form}>
        <Text style={styles.totalCash}> Total Cash: {this.state.funds} cp</Text>
        <Modal
          animationType="none"
          transparent={false}
          visible={this.state.modalOpen}
        >
          <TouchableOpacity style={{ justifyContent: "flex-start" }}>
            <Image
              resizeMethod={"scale"}
              source={require("../assets/images/sadCat.png")}
              style={{ padding: 0 }}
            />
            <Text>{this.state.balAlert}</Text>
            <Button title={"okay :("} onPress={this._toggleModal} />
          </TouchableOpacity>
        </Modal>
        <Button title={"withdraw"} onPress={this._toggleWithdrawal} />
        <Button title={"deposit"} onPress={this._toggleDeposit} />
        <Button title={"reset funds"} onPress={this._resetFunds} />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#DEB887",
    alignItems: "center"
  },
  form: {
    justifyContent: "center",
    marginTop: 50,
    padding: 20,
    backgroundColor: "#ffffff"
  },
  totalCash: {
    alignSelf: "center",
    fontSize: 22
  }
});
