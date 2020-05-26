/**
 * @author Nicolas  BOULOGNE-CURRIEZ <nicolas.boulogne-curriez@epitech.eu>
 * @file Description
 * @desc Created on 2019-12-08 2:23:11 am
 * @copyright GearStocks
 */

import React from 'react';
import { View, ScrollView, SafeAreaView } from 'react-native';
import { Text, Button, Icon, Input } from 'react-native-elements';

import styles from './Profil.component.style';
import { strings, errors } from '../../../config/strings';
import colors from '../../../config/colors';
import LoginComponent from '../Connection/Login/Login.component';
import { user } from '../../services/User'

export default class ProfilComponent extends React.Component {
  constructor(props) {
    super(props);
    this.updateState();
  }

  updateState = () => {
    this.state = {
      username: user.username,
      firstname: user.firstname,
      lastname: user.lastname,
      email: user.email,
      password: '',
      newPassword: '',
      confirmPassword: '',
      birthday: user.birthday,
      errorUsername: '',
      errorFirstname: '',
      errorLastname: '',
      errorEmail: '',
      errorPassword: '',
      errorNewPassword: '',
      errorConfirmPassword: '',
    };
  }

  checkError = () => {

    const { username, firstname, lastname, email, password, newPassword, confirmPassword, birthday } = this.state;
    // eslint-disable-next-line no-useless-escape
    let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

    if (`${username}` === '')
      this.setState({ errorUsername: errors.ERR_USERNAME });
    if (`${firstname}` === '')
      this.setState({ errorFirstname: errors.ERR_FIRSTNAME });
    if (`${lastname}` === '')
      this.setState({ errorLastname: errors.ERR_LASTNAME });
    if (`${email}` === '')
      this.setState({ errorEmail: errors.ERR_EMAIL });
    if (reg.test(`${email}`) === false)
      this.setState({ errorEmail: errors.ERR_INVALID_EMAIL });
    if (`${password}` === '')
      this.setState({ errorPassword: errors.ERR_PASSWORD });
    if (`${newPassword}` != `${confirmPassword}`)
      this.setState({ errorPassword: errors.ERR_MATCH_PASSWORD });
    else
      this.updateInfoUser();
  }

  updateInfoUser = () => {
    const JSONObj = JSON.stringify({
      userToken: user.token,
      mail: (this.state.email != user.email ? this.state.email : ""),
      userName: (this.state.username != user.username ? this.state.username : ""),
      password: (this.state.newPassword != this.state.password ? this.state.newPassword : ""),
      firstName: (this.state.firstname != user.firstname ? this.state.firstname : ""),
      lastName: (this.state.lastname != user.lastname ? this.state.lastname : ""),
    });
    user.updateUserInfo(JSONObj);
    this.updateState();
  }

  render() {
    if (!user.isConnected()) {
      <LoginComponent />
    }
    return (
      <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
        <ScrollView>
          <Text style={{ fontSize: 30, top: 35, textAlign: 'center' }}>GearStocks</Text>
          <Icon name='format-align-justify' size={30} color='black'
            containerStyle={{ right: 170, top: 2 }} onPress={() => { this.props.navigation.openDrawer(); }} />
          <Input
            defaultValue={user.username}
            autoCapitalize='none'
            autoCorrect={false}
            label='Username'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorUsername}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.firstname.focus()}
            ref={(input) => { this.username = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.USERNAME}
            onChangeText={(username = this.state.username) => this.setState({ username })}
          />
          <Input
            defaultValue={user.email}
            autoCapitalize='none'
            autoCorrect={false}
            label='Email'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorEmail}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.firstname.focus()}
            ref={(input) => { this.email = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.EMAIL}
            onChangeText={(email = this.state.email) => this.setState({ email })}
          />
          <Input
            defaultValue={user.firstname}
            autoCapitalize='none'
            autoCorrect={false}
            label='Firstname'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorFirstname}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.firstname.focus()}
            ref={(input) => { this.firstname = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.FIRSTNAME}
            onChangeText={(firstname = this.state.firstname) => this.setState({ firstname })}
          />
          <Input
            defaultValue={user.lastname}
            autoCapitalize='none'
            autoCorrect={false}
            label='Lastname'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorLastname}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.lastname.focus()}
            ref={(input) => { this.lastname = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.LASTNAME}
            onChangeText={(lastname = this.state.lastname) => this.setState({ lastname })}
          />

          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label='Password'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorPassword}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.password.focus()}
            ref={(input) => { this.password = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder={strings.PASSWORD}
            onChangeText={(password = this.state.password) => this.setState({ password })}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label='New Password'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorNewPassword}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.newPassword.focus()}
            ref={(input) => { this.newPassword = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder='New Password'
            onChangeText={(newPassword = this.state.newPassword) => this.setState({ newPassword })}
          />
          <Input
            autoCapitalize='none'
            autoCorrect={false}
            label='Confirm Password'
            labelStyle={{ bottom: 5, left: 10 }}
            returnKeyType='next'
            errorMessage={this.state.errorConfirmPassword}
            errorStyle={{ fontSize: 13 }}
            inputContainerStyle={{
              borderColor: colors.PRIMARY_COLOR, borderTopWidth: 2,
              borderRightWidth: 2, borderLeftWidth: 2, borderBottomWidth: 2
            }}
            onSubmitEditing={() => this.confirmPassword.focus()}
            ref={(input) => { this.confirmPassword = input; }}
            leftIcon={<Icon name='person' size={24} color='black' />}
            placeholder='Confirm Password'
            onChangeText={(confirmPassword = this.state.confirmPassword) => this.setState({ confirmPassword })}
          />
          <Button title="Update informations" buttonStyle={styles.button} type="outline" onPress={() => this.checkError()} />
          <Button title={strings.DISCONNECT} buttonStyle={styles.button} type="outline" onPress={() => user.disconnect()} />
        </ScrollView>
      </SafeAreaView>
    );
  }
}