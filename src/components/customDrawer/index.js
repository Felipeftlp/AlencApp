import React from "react";
import { Text, View, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItem } from '@react-navigation/drawer';
import { Drawer } from 'react-native-paper';
import { AntDesign, FontAwesome, MaterialIcons, Ionicons, FontAwesome5, Entypo, MaterialCommunityIcons } from '@expo/vector-icons';
import { useNavigation } from "@react-navigation/native";

import { getAuth, signOut } from "firebase/auth";
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { Alert } from "native-base";

export function CustomDrawer(props) {

    const [active, setActive] = React.useState('');
    const navigation = useNavigation()

    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app)

    const handleSignout = () => {
        signOut(auth).then(() => {
            navigation.navigate("Login")
        }).catch((error) => {
            Alert.alert(error)
        });
    }

    return (
        <View style={{ flex: 1 }}>
            <DrawerContentScrollView {...props} showsVerticalScrollIndicator={false} style={{ backgroundColor: '#8C1F28' }}>
                <View style={{ alignSelf: 'center', backgroundColor: '#8C1F28', paddingHorizontal: '100%' }}>
                    <Image
                        source={require('../../assets/img/logo_afc.png')}
                        style={{ width: 140, height: 160 }}
                        resizeMode="contain"
                    />
                </View>

                <View style={{ backgroundColor: '#FFFFFF' }}>
                    <View>
                        <Text style={{ backgroundColor: '#F2F2F2', paddingLeft: 16, paddingVertical: 12, fontSize: 12, color: '#505050' }}>MENU</Text>

                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('AlencApp')}
                            >
                                <FontAwesome name="home" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Início</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Perfil')}
                            >
                                <FontAwesome name="user-circle" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Perfil</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Presenças')}
                            >
                                <AntDesign name="checkcircle" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Presenças</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={{ backgroundColor: '#F2F2F2', paddingLeft: 16, paddingVertical: 12, fontSize: 12, color: '#505050' }}>MENU ADMINISTRATIVO</Text>

                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('QR Code')}
                            >
                                <FontAwesome5 name="qrcode" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>QR Code</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Cartões')}
                            >
                                <MaterialCommunityIcons name="cards" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Cartões</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Jogadores')}
                            >
                                <FontAwesome name="soccer-ball-o" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Jogadores</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Organizadores')}
                            >
                                <FontAwesome5 name="users-cog" size={18} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Organizadores</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Solicitações')}
                            >
                                <MaterialIcons name="new-releases" size={22} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Solicitações</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Avisos')}
                            >
                                <Ionicons name="alert-circle" size={22} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Avisos</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View>
                        <Text style={{ backgroundColor: '#F2F2F2', paddingLeft: 16, paddingVertical: 12, fontSize: 12, color: '#505050' }}>MENU INFORMATIVO</Text>

                        <View>
                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Estatuto')}
                            >
                                <Entypo name="book" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Estatuto</Text>
                            </TouchableOpacity>

                            <TouchableOpacity
                                style={{ flexDirection: 'row', alignItems: "center", paddingVertical: 16, paddingHorizontal: 16 }}
                                onPress={() => navigation.navigate('Sobre')}
                            >
                                <AntDesign name="questioncircle" size={20} color="#8C1F28" style={{ marginRight: 6 }} />
                                <Text style={{ fontSize: 16 }}>Sobre</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={{ marginTop: 40 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: '#C0212E', flexDirection: 'row', alignItems: "center", paddingVertical: 12, paddingHorizontal: 16 }}
                            onPress={handleSignout}
                        >
                            <AntDesign name="logout" size={20} color="#FFFFFF" style={{ marginRight: 6 }} />
                            <Text style={{ fontSize: 16, color: '#FFFFFF', fontWeight: '500' }}>Sair</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </DrawerContentScrollView >
        </View >
    );
}

