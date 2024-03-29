import React from 'react';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { Text, View, TouchableWithoutFeedback } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import { CustomDrawer } from '../components/customDrawer/index';

import Home from '../pages/Home'
import Sobre from '../pages/Sobre'
import Presenca from '../pages/Presenca'
import Perfil from '../pages/Perfil'
import Avisos from '../pages/Avisos'
import Estatuto from '../pages/Estatuto'
import Jogadores from '../pages/Jogadores'
import Solicitacoes from '../pages/Solicitacoes'
import Organizadores from '../pages/Organizadores'
import QRcode from '../pages/Presenca/QRcode'
import NewSoccerCard from '../pages/Cartoes/NewSoccerCard';
import SoccerCards from '../pages/Cartoes/SoccerCards';

const { Screen, Navigator } = createDrawerNavigator();

export default function AdminRoutes() {

  const navigation = useNavigation();

  return (
    <Navigator drawerContent={props => <CustomDrawer {...props} />}>
      <Screen
        name="AlencApp"
        component={Home}
        options={
          () => ({ //Esse navigation está sendo usado?
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
              <View style={{ marginRight: 16 }}>
                <TouchableWithoutFeedback onPress={() => navigation.navigate('Notifications')}>
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
        name="Jogadores"
        component={Jogadores}
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
        name="Solicitações"
        component={Solicitacoes}
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
        name="Avisos"
        component={Avisos}
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
        name="Organizadores"
        component={Organizadores}
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

      <Screen
        name="QR Code"
        component={QRcode}
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
        name="Cartões"
        component={SoccerCards}
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