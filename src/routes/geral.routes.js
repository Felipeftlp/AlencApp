import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, TouchableWithoutFeedback, Alert } from 'react-native';
import { MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons';

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Presenca from '../pages/Presenca'
import Perfil from '../pages/Perfil'
import Estatuto from '../pages/Estatuto'

import { GeralCustomDrawer } from '../components/geralCustomDrawer/index';

const { Screen, Navigator } = createDrawerNavigator();

export default function GeralRoutes() {
  return (
    <Navigator drawerContent={props => <GeralCustomDrawer {...props} />}>
      <Screen
        name="AlencApp"
        component={Home}
        options={
          ({ navigation }) => ({ //Esse navigation está sendo
            title: 'AlencApp',
            headerStyle: {
              backgroundColor: '#8C1F28',
            },
            headerTitleStyle: {
              color: '#FFFFFF',
              fontSize: 18
            },
            headerTitleAlign: "center",
            headerTintColor: '#FFFFFF',
            headerRight: () => (
              <View style={{marginRight: 16}}>
                <TouchableWithoutFeedback onPress={() => Alert.alert('Avisos')}>
                  <MaterialCommunityIcons name="bell" size={24} color="#FFFFFF" />
                </TouchableWithoutFeedback>
              </View>
            )
          })
        }
      />
      <Screen
        name="Perfil"
        component={Perfil}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })}
      />
      <Screen
        name="Presenças"
        component={Presenca}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })}
      />
      <Screen
        name="Estatuto"
        component={Estatuto}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })}
      />
      <Screen
        name="Sobre"
        component={Sobre}
        options={({ navigation }) => ({
          headerStyle: {
            backgroundColor: '#8C1F28',
          },
          headerTitleStyle: {
            color: '#FFFFFF',
            fontSize: 18
          },
          headerTintColor: '#FFFFFF'
        })}
      />
    </Navigator>
  );
}