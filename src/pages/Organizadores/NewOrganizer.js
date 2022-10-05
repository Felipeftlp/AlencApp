import React, { useState, useEffect } from "react";
import { View, Text, FlatList, SafeAreaView, Dimensions, TouchableWithoutFeedback, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { Input } from 'native-base';
import { Ionicons, AntDesign, FontAwesome, MaterialIcons } from '@expo/vector-icons';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, doc, updateDoc } from 'firebase/firestore'

const { width } = Dimensions.get('screen')

export default function NewOrganizer() {

    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore(app);
  
    const q = query(collection(firestore, "membros"), where ("type", "==", "Jogador"));
  
    const [DATA, setData] = useState([]);  

    const addOrganizer = () => {
        const myDoc = doc(firestore, "membros", "Felipe Freitas Lopes")

        updateDoc(myDoc, {
            Organizador: true
        });
    }

    const Item = ({ name, user, email, telefone }) => (
        <TouchableWithoutFeedback onPress={() => Alert.alert("Deseja tornar " + name + " (" + user + ") um organizador?")}>
            <View style={{ backgroundColor: '#FFFFFF', padding: 24, borderRadius: 8, marginBottom: 16, elevation: 5, shadowColor: '#505050' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={{ marginRight: 12 }}>
                        <FontAwesome name="user" size={22} color="#C0212E" />
                    </View>
                    <View>
                        <Text style={styles.span}>Nome</Text>
                        <Text style={styles.info}>{name}</Text>
                    </View>
                </View>
                <View style={{ borderBottomWidth: 1, borderColor: '#DDDDDD', width: width / 1.37, marginVertical: 8 }} />
                <View style={{ marginTop: 8 }}>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={styles.span}>Usuário</Text>
                        <Text style={styles.info}>{user}</Text>
                    </View>
                    <View style={{ marginBottom: 4 }}>
                        <Text style={styles.span}>Email</Text>
                        <Text style={styles.info}>{email}</Text>
                    </View>
                    <View>
                        <Text style={styles.span}>Telefone</Text>
                        <Text style={styles.info}>{telefone}</Text>
                    </View>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );

    const CardHeader = () => (
        <View>
            <View style={{ elevation: 5, shadowColor: '#505050', backgroundColor: '#8C1F28', height: 48, alignItems: 'center', justifyContent: 'space-between', borderTopLeftRadius: 8, borderTopRightRadius: 8, marginTop: 24, paddingHorizontal: 16, flexDirection: 'row' }}>
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <Ionicons name="filter" size={20} color="#FFFFFF" style={{ marginRight: 4 }} />
                    <Text style={{ color: '#FFFFFF', fontSize: 18 }}>Lista</Text>
                </View>
                <View style={{ backgroundColor: '#FFFFFF', borderRadius: 50, width: 25, height: 25, alignItems: 'center', justifyContent: 'center' }}>
                    <Text>{DATA.length}</Text>
                </View>
            </View>
            <View style={{ borderBottomLeftRadius: 8, borderBottomRightRadius: 8, elevation: 5, shadowColor: '#505050', backgroundColor: '#FFFFFF', paddingHorizontal: 16, alignItems: 'center', paddingVertical: 12 }}>
                <Text style={{ color: '#505050', fontSize: 12, marginBottom: 16 }}>Busque os jogadores pelo usuário, nome, email ou telefone para adicioná-lo aos organizadores.</Text>
                <InputSearch />
            </View>
        </View>
    );

    const InputSearch = () => (
        <Input
            placeholder="Buscar..."
            fontSize={15}
            variant="outline"
            backgroundColor={'#F2F2F2'}
            placeholderTextColor={'#888888'}
            height={10}
            value={searchPlayer}
            onChangeText={(t) => setSearchPlayer(t)}
            InputLeftElement={<AntDesign name="search1" size={18} color="#585858" style={{ marginLeft: 8 }} />}
            InputRightElement={
                <TouchableOpacity onPress={() => setSearchPlayer('')}>
                    <MaterialIcons name="highlight-remove" size={20} color="#585858" style={{ marginRight: 8 }} />
                </TouchableOpacity>
            }
        />
    );

    const [searchPlayer, setSearchPlayer] = useState('');
    const [list, setList] = useState(DATA);

    useEffect(() => {
        onSnapshot(q, (querySnapshot) => {
            const members = [];
            querySnapshot.forEach((doc) => {
              members.push({ ...doc.data(), id: doc.id });
            })
            
            setData(members);
        });
        
        if (searchPlayer === "") {
            setList(DATA);
        } else {
            setList(
                DATA.filter(item => {
                    if (item.name.toLowerCase().indexOf(searchPlayer.toLowerCase()) > -1) {
                        return true;
                    } else {
                        return false;
                    }
                })
            );
        }
    }, [searchPlayer]);

    return (
        <SafeAreaView style={{ backgroundColor: '#F1F1F1' }}>
            <FlatList
                showsVerticalScrollIndicator={false}
                style={{paddingHorizontal: 24}}
                ListHeaderComponent={
                    <View style={{ marginBottom: 16 }}>
                        <CardHeader />
                    </View>
                }
                data={list}
                renderItem={({ item }) => <Item name={item.name} user={item.user} email={item.email} telefone={item.telefone} />}
                keyExtractor={item => item.id}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    span: {
        fontSize: 15,
        fontWeight: 'bold',
        color: '#C0212E'
    },
    info: {
        fontSize: 15,
        color: '#505050'
    }
});