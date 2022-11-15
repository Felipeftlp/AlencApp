import React, { useRef, useState } from 'react';
import { View, Image, SafeAreaView, TouchableOpacity, Text, ScrollView, Alert } from 'react-native';
import { Input, StatusBar, FormControl, Select, CheckIcon } from 'native-base';
import { Ionicons, AntDesign } from '@expo/vector-icons';
import { TextInputMask } from 'react-native-masked-text';

import { getAuth, createUserWithEmailAndPassword } from 'firebase/auth';
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, setDoc, doc } from 'firebase/firestore'

import { color, max } from 'react-native-reanimated';
import styles from './styles';
import { KeyboardAvoidingView } from 'react-native';
import { useNavigation } from '@react-navigation/native';

export default function Register() {

  const navigation = useNavigation();
  const [service, setService] = React.useState("");

  const usarnameRef = useRef();
  const emailRef = useRef();
  const phoneRef = useRef();
  const shirtNumberRef = useRef();

  const [name, setName] = React.useState('');
  const [username, setUsername] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [shirtnum, setShirtnum] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [hidePassword, setHidePassword] = useState(true);

  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app)

  const handleCreateAccount = () => {
    createUserWithEmailAndPassword(auth, email, password)
    .then(() => {
      setDoc(doc(firestore, "membros", name), {
        name: name,
        user: username,
        email: email,
        telefone: phone,
        camisa: shirtnum,
        tampa: tampaSelected,
        situacao: "Pendente",
        type: "membro",
        status: "Ativo",
        day: daySelected
      })
        .then(() => {
          Alert.alert(
            "Sucesso!",
            "Seu cadastro foi enviado para a análise da comissão.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          )
          navigation.navigate('Login')
        })
        .catch(error => {
          Alert.alert(
            "Erro!",
            "Algo deu errado no seu cadastro.",
            [{ text: "OK", onPress: () => console.log("OK Pressed") }]
          )
        })
    })
  }

  const [tampa] = React.useState(['1', '2', '3', '4', '5', '6'])
  const [tampaSelected, setTampaSelected] = React.useState([])

  const [day] = React.useState(['Seg, Qua', 'Seg, Sex', 'Qua, Sex', 'Seg, Qua, Sex'])
  const [daySelected, setDaySelected] = React.useState([])

  const [focus, setFocus] = useState(false);
  const customInputTextMask = focus ? styles.textInputFocus : styles.textInput

  const inputUsername = useRef();
  const inputEmail = useRef();
  const inputTnumber = useRef();
  const inputPassword = useRef();
  const inputConfirmPassword = useRef();
  const inputPhone = useRef();

  return (
    <SafeAreaView style={styles.back}>
      <StatusBar />

      <KeyboardAvoidingView behavior='height' keyboardVerticalOffset={30}>
        <ScrollView showsVerticalScrollIndicator={false} showsHorizontalScrollIndicator={false}>
          <View style={styles.logoPosition}>
            <Image style={styles.img} source={require('../../assets/img/logo_afc.png')} resizeMode="contain" />
          </View>

          <View style={styles.form}>
            <View style={styles.formFields}>
              <FormControl.Label>Nome completo</FormControl.Label>
              <Input
                placeholder="Seu nome completo"
                onChangeText={(text) => setName(text)}
                fontSize={15}
                variant="outline"
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                onSubmitEditing={() => { inputUsername.current.focus(); }}
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Nome de usuário</FormControl.Label>
              <Input
                placeholder="Seu nome de usuário"
                onChangeText={(text) => setUsername(text)}
                ref={inputUsername}
                fontSize={15}
                variant="outline"
                autoCapitalize='none'
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                onSubmitEditing={() => { inputEmail.current.focus(); }}
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Endereço de email</FormControl.Label>
              <Input
                placeholder="Seu email"
                onChangeText={(text) => setEmail(text)}
                ref={inputEmail}
                fontSize={15}
                variant="outline"
                autoCapitalize='none'
                keyboardType='email-address'
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                returnKeyType="next"
                onSubmitEditing={() => { inputPhone.current.focus(); }}
                blurOnSubmit={false}
              />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Telefone</FormControl.Label>
              <TextInputMask
                placeholder="Seu telefone"
                onChangeText={(text) => setPhone(text)}
                fontSize={15}
                variant="outline"
                keyboardType='phone-pad'
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                type={'cel-phone'}
                ref={inputPhone}
                value={phone}
                style={customInputTextMask}
                onFocus={() => setFocus(true)}
                onBlur={() => setFocus(false)}
                onSubmitEditing={() => { inputTnumber.current.focus(); }}
                blurOnSubmit={false}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Número da camisa</FormControl.Label>
              <Input
                placeholder="O número de sua camisa"
                onChangeText={(text) => setShirtnum(text)}
                ref={inputTnumber}
                fontSize={15}
                variant="outline"
                keyboardType='numeric'
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                returnKeyType="next"
              />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Tampa</FormControl.Label>
              <Select
                placeholder="Selecione a sua tampa"
                fontSize={15}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                selectedValue={tampaSelected}
                _selectedItem={{
                  background: 'red.100',
                  endIcon: <CheckIcon size="5" color="#C0212E" />
                }}
                onValueChange={(itemValue) => setTampaSelected(itemValue)}
              >
                {
                  tampa.map(cr => {
                    return <Select.Item label={cr} value={cr} />
                  })
                }
              </Select>
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Dias de presença</FormControl.Label>
              <Select
                placeholder="Selecione os dias de presença"
                fontSize={15}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                selectedValue={daySelected}
                _selectedItem={{
                  background: 'red.100',
                  endIcon: <CheckIcon size="5" color="#C0212E" />
                }}
                onValueChange={(itemValue) => setDaySelected(itemValue)}
              >
                {
                  day.map(cr => {
                    return <Select.Item label={cr} value={cr} />
                  })
                }
              </Select>
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Senha</FormControl.Label>
              <Input
                placeholder="Sua senha"
                onChangeText={(text) => setPassword(text)}
                ref={inputPassword}
                onSubmitEditing={() => { inputConfirmPassword.current.focus(); }}
                blurOnSubmit={false}
                returnKeyType="next"
                fontSize={15}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                variant="outline"
                autoCapitalize='none'
                secureTextEntry={hidePassword}
                InputRightElement={
                  <TouchableOpacity
                    style={styles.buttonEye}
                    onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ?
                      <Ionicons name='eye' color={'#505050'} size={25} />
                      :
                      <Ionicons name='eye-off' color={'#505050'} size={25} />
                    }
                  </TouchableOpacity>
                } />
            </View>

            <View style={styles.formFields}>
              <FormControl.Label>Confirmar senha</FormControl.Label>
              <Input
                placeholder="Sua senha novamente"
                onChangeText={(text) => setPassword(text)}
                ref={inputConfirmPassword}
                returnKeyType='done'
                fontSize={15}
                backgroundColor={'#F2F2F2'}
                placeholderTextColor={'#888888'}
                variant="outline"
                autoCapitalize='none'
                secureTextEntry={hidePassword}
                InputRightElement={
                  <TouchableOpacity
                    style={styles.buttonEye}
                    onPress={() => setHidePassword(!hidePassword)}>
                    {hidePassword ?
                      <Ionicons name='eye' color={'#505050'} size={25} />
                      :
                      <Ionicons name='eye-off' color={'#505050'} size={25} />
                    }
                  </TouchableOpacity>
                } />
            </View>

            <View style={styles.actionsBottom}>
              <TouchableOpacity
                style={styles.buttonRegister}
                onPress={handleCreateAccount}>
                <AntDesign name="check" size={18} style={styles.buttonIconRegister} />
                <Text style={styles.register}>Cadastrar</Text>
              </TouchableOpacity>

              <View style={styles.line} />

              <View style={styles.boxSignup}>
                <Text style={styles.textSignup}>Já tem uma conta?</Text>
                <TouchableOpacity>
                  <Text style={styles.buttonSignup} onPress={() => navigation.navigate('Login')}>Faça login</Text>
                </TouchableOpacity>
              </View>

            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView >
  );
}
