import React, { useState, useEffect, Component } from "react";
import { Alert, Dimensions, StatusBar, Animated, SafeAreaView, Text, View, TouchableOpacity, Image, FlatList, TouchableWithoutFeedback } from 'react-native';
import { TabView, SceneMap } from 'react-native-tab-view';
import { Box, useColorModeValue } from 'native-base';
import { MaterialCommunityIcons, AntDesign, Entypo, FontAwesome5 } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native'
import styles from "./styles";

// Importações do FireBase
import { initializeApp } from 'firebase/app';
import { firebaseConfig } from '../../../firebase-config';
import { getFirestore, collection, query, onSnapshot, where, serverTimestamp, orderBy, setDoc, doc, addDoc, deleteDoc } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

export default function Presenca() {

  //
  // Inicialização do FireBase 
  //
  const app = initializeApp(firebaseConfig);
  const firestore = getFirestore(app);
  const auth = getAuth(app);
  const q = query(collection(firestore, "membros"), where("email", "==", auth.currentUser.email));
  const p = query(collection(firestore, "presence"), orderBy("created_at", "asc"));

  //
  // Constantes
  //
  const navigation = useNavigation(); // Navegação entre telas
  const [acess, setAcess] = useState(true); // Variável que determina tipo de acesso
  const [usuario, setUser] = useState([]); // Recebe informações do banco referentes ao usuário
  const [ORDER, setOrder] = useState([]) // Array que recebe a ordem de chegada
  const [times, setTimes] = useState([])
  const [ESPERA, setEspera] = useState([])

  const initialLayout = { // Configura dimensões de largura
    width: Dimensions.get('window').width
  };

  //
  // Funções
  //
  function formarTimes() {
    const TIMES = [ //Array que recebe os dois times montados
      {
        id: 1,
        player1: null,
        tampa1: null,
        player2: null,
        tampa2: null,
        player3: null,
        tampa3: null,
        player4: null,
        tampa4: null,
        player5: null,
        tampa5: null,
        player6: null,
        tampa6: null
      },
      {
        id: 2,
        player1: null,
        tampa1: null,
        player2: null,
        tampa2: null,
        player3: null,
        tampa3: null,
        player4: null,
        tampa4: null,
        player5: null,
        tampa5: null,
        player6: null,
        tampa6: null
      }
    ]

    const espera = []

    for (var i = 0; i < ORDER.length; i++) {
      if (TIMES[0].player1 === null) {
        TIMES[0].player1 = ORDER[i].name
        TIMES[0].tampa1 = ORDER[i].tampa
      } else {
        if (TIMES[0].player2 === null) {
          if (TIMES[1].player1 === null) {
            if (TIMES[0].tampa1 === ORDER[i].tampa) {
              TIMES[1].player1 = ORDER[i].name
              TIMES[1].tampa1 = ORDER[i].tampa
            } else {
              TIMES[0].player2 = ORDER[i].name
              TIMES[0].tampa2 = ORDER[i].tampa
            }
          } else {
            if (TIMES[0].tampa1 === ORDER[i].tampa) {
              espera.push(ORDER[i])
            } else {
              TIMES[0].player2 = ORDER[i].name
              TIMES[0].tampa2 = ORDER[i].tampa
            }
          }
        } else {
          if (TIMES[0].player3 === null) {
            if (TIMES[1].player1 === null) {
              if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa) {
                TIMES[1].player1 = ORDER[i].name
                TIMES[1].tampa1 = ORDER[i].tampa
              } else {
                TIMES[0].player3 = ORDER[i].name
                TIMES[0].tampa3 = ORDER[i].tampa
              }
            } else {
              if (TIMES[1].player2 === null) {
                if (TIMES[1].tampa1 === ORDER[i].tampa) {
                  espera.push(ORDER[i])
                } else {
                  if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa) {
                    TIMES[1].player2 = ORDER[i].name
                    TIMES[1].tampa2 = ORDER[i].tampa
                  } else {
                    TIMES[0].player3 = ORDER[i].name
                    TIMES[0].tampa3 = ORDER[i].tampa
                  }
                }
              } else {
                if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa) {
                  espera.push(ORDER[i])
                } else {
                  TIMES[0].player3 = ORDER[i].name
                  TIMES[0].tampa3 = ORDER[i].tampa
                }
              }
            }
          } else {
            if (TIMES[0].player4 === null) {
              if (TIMES[1].player1 === null) {
                if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa) {
                  TIMES[1].player1 = ORDER[i].name
                  TIMES[1].tampa1 = ORDER[i].tampa
                } else {
                  TIMES[0].player4 = ORDER[i].name
                  TIMES[0].tampa4 = ORDER[i].tampa
                }
              } else {
                if (TIMES[1].player2 === null) {
                  if (TIMES[1].tampa1 === ORDER[i].tampa) {
                    espera.push(ORDER[i])
                  } else {
                    if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa) {
                      TIMES[1].player2 = ORDER[i].name
                      TIMES[1].tampa2 = ORDER[i].tampa
                    } else {
                      TIMES[0].player4 = ORDER[i].name
                      TIMES[0].tampa4 = ORDER[i].tampa
                    }
                  }
                } else {
                  if (TIMES[1].player3 === null) {
                    if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa) {
                      espera.push(ORDER[i])
                    } else {
                      if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa) {
                        TIMES[1].player3 = ORDER[i].name
                        TIMES[1].tampa3 = ORDER[i].tampa
                      } else {
                        TIMES[0].player4 = ORDER[i].name
                        TIMES[0].tampa4 = ORDER[i].tampa
                      }
                    }
                  } else {
                    if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa) {
                      espera.push(ORDER[i])
                    } else {
                      TIMES[0].player4 = ORDER[i].name
                      TIMES[0].tampa4 = ORDER[i].tampa
                    }
                  }
                }
              }
            } else {
              if (TIMES[0].player5 === null) {
                if (TIMES[1].player1 === null) {
                  if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa) {
                    TIMES[1].player1 = ORDER[i].name
                    TIMES[1].tampa1 = ORDER[i].tampa
                  } else {
                    TIMES[0].player5 = ORDER[i].name
                    TIMES[0].tampa5 = ORDER[i].tampa
                  }
                } else {
                  if (TIMES[1].player2 === null) {
                    if (TIMES[1].tampa1 === ORDER[i].tampa) {
                      espera.push(ORDER[i])
                    } else {
                      if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa) {
                        TIMES[1].player2 = ORDER[i].name
                        TIMES[1].tampa2 = ORDER[i].tampa
                      } else {
                        TIMES[0].player5 = ORDER[i].name
                        TIMES[0].tampa5 = ORDER[i].tampa
                      }
                    }
                  } else {
                    if (TIMES[1].player3 === null) {
                      if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa) {
                        espera.push(ORDER[i])
                      } else {
                        if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa) {
                          TIMES[1].player3 = ORDER[i].name
                          TIMES[1].tampa3 = ORDER[i].tampa
                        } else {
                          TIMES[0].player5 = ORDER[i].name
                          TIMES[0].tampa5 = ORDER[i].tampa
                        }
                      }
                    } else {
                      if (TIMES[1].player4 === null) {
                        if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa || TIMES[1].tampa3 === ORDER[i].tampa) {
                          espera.push(ORDER[i])
                        } else {
                          if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa) {
                            TIMES[1].player4 = ORDER[i].name
                            TIMES[1].tampa4 = ORDER[i].tampa
                          } else {
                            TIMES[0].player5 = ORDER[i].name
                            TIMES[0].tampa5 = ORDER[i].tampa
                          }
                        }
                      } else {
                        if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa) {
                          espera.push(ORDER[i])
                        } else {
                          TIMES[0].player5 = ORDER[i].name
                          TIMES[0].tampa5 = ORDER[i].tampa
                        }
                      }
                    }
                  }
                }
              } else {
                if (TIMES[0].player6 === null) {
                  if (TIMES[1].player1 === null) {
                    if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa) {
                      TIMES[1].player1 = ORDER[i].name
                      TIMES[1].tampa1 = ORDER[i].tampa
                    } else {
                      TIMES[0].player6 = ORDER[i].name
                      TIMES[0].tampa6 = ORDER[i].tampa
                    }
                  } else {
                    if (TIMES[1].player2 === null) {
                      if (TIMES[1].tampa1 === ORDER[i].tampa) {
                        espera.push(ORDER[i])
                      } else {
                        if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa) {
                          TIMES[1].player2 = ORDER[i].name
                          TIMES[1].tampa2 = ORDER[i].tampa
                        } else {
                          TIMES[0].player6 = ORDER[i].name
                          TIMES[0].tampa6 = ORDER[i].tampa
                        }
                      }
                    } else {
                      if (TIMES[1].player3 === null) {
                        if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa) {
                          espera.push(ORDER[i])
                        } else {
                          if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa) {
                            TIMES[1].player3 = ORDER[i].name
                            TIMES[1].tampa3 = ORDER[i].tampa
                          } else {
                            TIMES[0].player6 = ORDER[i].name
                            TIMES[0].tampa6 = ORDER[i].tampa
                          }
                        }
                      } else {
                        if (TIMES[1].player4 === null) {
                          if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa || TIMES[1].tampa3 === ORDER[i].tampa) {
                            espera.push(ORDER[i])
                          } else {
                            if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa) {
                              TIMES[1].player4 = ORDER[i].name
                              TIMES[1].tampa4 = ORDER[i].tampa
                            } else {
                              TIMES[0].player6 = ORDER[i].name
                              TIMES[0].tampa6 = ORDER[i].tampa
                            }
                          }
                        } else {
                          if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa) {
                            espera.push(ORDER[i])
                          } else {
                            TIMES[0].player6 = ORDER[i].name
                            TIMES[0].tampa6 = ORDER[i].tampa
                          }
                        }
                      }
                    }
                  }
                } else {
                  if (TIMES[1].player1 === null) {
                    if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa || TIMES[0].tampa6 === ORDER[i].tampa) {
                      TIMES[1].player1 = ORDER[i].name
                      TIMES[1].tampa1 = ORDER[i].tampa
                    } else {
                      espera.push(ORDER[i])
                    }
                  } else {
                    if (TIMES[1].player2 === null) {
                      if (TIMES[1].tampa1 === ORDER[i].tampa) {
                        espera.push(ORDER[i])
                      } else {
                        if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa || TIMES[0].tampa6 === ORDER[i].tampa) {
                          TIMES[1].player2 = ORDER[i].name
                          TIMES[1].tampa2 = ORDER[i].tampa
                        } else {
                          espera.push(ORDER[i])
                        }
                      }
                    } else {
                      if (TIMES[1].player3 === null) {
                        if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa) {
                          espera.push(ORDER[i])
                        } else {
                          if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa || TIMES[0].tampa6 === ORDER[i].tampa) {
                            TIMES[1].player3 = ORDER[i].name
                            TIMES[1].tampa3 = ORDER[i].tampa
                          } else {
                            espera.push(ORDER[i])
                          }
                        }
                      } else {
                        if (TIMES[1].player4 === null) {
                          if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa || TIMES[1].tampa3 === ORDER[i].tampa) {
                            espera.push(ORDER[i])
                          } else {
                            if (TIMES[0].tampa1 === ORDER[i].tampa || TIMES[0].tampa2 === ORDER[i].tampa || TIMES[0].tampa3 === ORDER[i].tampa || TIMES[0].tampa4 === ORDER[i].tampa || TIMES[0].tampa5 === ORDER[i].tampa || TIMES[0].tampa6 === ORDER[i].tampa) {
                              TIMES[1].player4 = ORDER[i].name
                              TIMES[1].tampa4 = ORDER[i].tampa
                            } else {
                              espera.push(ORDER[i])
                            }
                          }
                        } else {
                          if (TIMES[1].player5 === null) {
                            if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa || TIMES[1].tampa3 === ORDER[i].tampa || TIMES[1].tampa4 === ORDER[i].tampa) {
                              espera.push(ORDER[i])
    
                            } else {
                              TIMES[1].player5 = ORDER[i].name
                              TIMES[1].tampa5 = ORDER[i].tampa
                            }
                          } else {
                            if (TIMES[1].player6 === null) {
                              if (TIMES[1].tampa1 === ORDER[i].tampa || TIMES[1].tampa2 === ORDER[i].tampa || TIMES[1].tampa3 === ORDER[i].tampa || TIMES[1].tampa4 === ORDER[i].tampa || TIMES[1].tampa5 === ORDER[i].tampa || TIMES[0].tampa6 === ORDER[i].tampa) {
                                espera.push(ORDER[i])
    
                              } else {
                                TIMES[1].player6 = ORDER[i].name
                                TIMES[1].tampa6 = ORDER[i].tampa
                              }
                            } else {
                              espera.push(ORDER[i])
                            }
                          }
                        }
                      }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }

    return (
      setTimes(TIMES),
      setEspera(espera)
    )
  }

  function limparPresenca() {
    for (var i = 0; i < ORDER.length; i++) {
      deleteDoc(doc(firestore, "presence", ORDER[i].name))
    }

    return (
      setOrder([]),
      setTimes([]),
      setEspera([])
    )
  }

  function Tab() { // Componente da TabView
    const [index, setIndex] = React.useState(0);
    const [routes] = React.useState([{
      key: 'first',
      title: 'CHEGADA'
    }, {
      key: 'second',
      title: 'TIMES'
    },
    {
      key: 'third',
      title: 'ESPERA'
    }]);

    TouchableOpacity.defaultProps = { activeOpacity: 0.9 };

    const renderTabBar = props => {

      const inputRange = props.navigationState.routes.map((x, i) => i);

      return <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map(inputIndex => inputIndex === i ? 1 : 0.5)
          });
          const color = index === i ? useColorModeValue('#C0212E', '#C0212E') : useColorModeValue('#C0212E', '#C0212E');
          const borderColor = index === i ? '#C0212E' : useColorModeValue('coolGray.200', 'gray.400');
          return <Box borderBottomWidth="3" borderColor={borderColor} flex={1} alignItems="center" p="3" cursor="pointer" backgroundColor={"#FFFFFF"} style={{ borderTopColor: "#DBDBDB", borderTopWidth: 0.25 }}>
            <TouchableOpacity onPress={() => { setIndex(i); }}>
              <Animated.Text style={{ color }}>{route.title}</Animated.Text>
            </TouchableOpacity>
          </Box>;
        })}
      </Box>;
    };

    return <TabView navigationState={{ index, routes }} renderScene={renderScene} renderTabBar={renderTabBar} onIndexChange={setIndex} initialLayout={initialLayout} style={{ marginTop: StatusBar.currentHeight }} />;
  }
  //
  // Classes
  //
  class FabPresence extends Component { // Componente FAB
    animation = new Animated.Value(0)

    toggleOptions = () => {
      const toValue = this.open ? 0 : 1

      Animated.spring(this.animation, {
        toValue,
        friction: 7,
        useNativeDriver: true,
      }).start();

      this.open = !this.open;
    }

    render() {

      const firstSubmenu = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -55]
            })
          }
        ]
      }

      const secondSubmenu = {
        transform: [
          { scale: this.animation },
          {
            translateY: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: [0, -110]
            })
          }
        ]
      }

      const rotation = {
        transform: [
          {
            rotate: this.animation.interpolate({
              inputRange: [0, 1],
              outputRange: ["0deg", "135deg"]
            })
          }
        ]
      }

      return (
        <View style={[styles.fabContent, this.props.style]}>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleOptions();
              limparPresenca();
            }}
          >
            <Animated.View style={[styles.fabButton, styles.submenu, styles.align, secondSubmenu]}>
              <Text style={styles.fabText}> Limpar presença </Text>
              <FontAwesome5 name="users-slash" size={16} color="#FFFFFF" style={styles.submenuIcon} />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback
            onPress={() => {
              this.toggleOptions();
              formarTimes();
            }}
          >
            <Animated.View style={[styles.fabButton, styles.submenu, styles.align, firstSubmenu]}>
              <Text style={styles.fabText}> Formar times </Text>
              <FontAwesome5 name="users" size={16} color="#FFFFFF" style={styles.submenuIcon} />
            </Animated.View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={this.toggleOptions}>
            <Animated.View style={[styles.fabButton, styles.menu, rotation]}>
              <Entypo name="plus" size={24} color="#FFFFFF" />
            </Animated.View>
          </TouchableWithoutFeedback>
        </View>
      );
    }
  }

  //
  // COMPONENTES
  //
  // 1° Rota da TabView
  const ItemOrder = ({ username, tampa }) => (  // Componente Item para CHEGADA
    <View style={styles.boxOrder}>
      <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
      <View style={styles.orderInfo}>
        <Text style={styles.players}>{username}</Text>
        <Text style={styles.tampa}>Tampa {tampa}</Text>
      </View>
    </View>
  );

  const FirstRoute = () => <FlatList // Componente FlatList para CHEGADA
    flex={1}
    my="4"
    showsVerticalScrollIndicator={false}
    data={ORDER}
    renderItem={({ item }) => <ItemOrder username={item.user} tampa={item.tampa} number={item.number} />}
    keyExtractor={item => item.id}
  />;

  // 2° Rota da TabView
  const ItemTimes = ({ player1, player2, player3, player4, player5, player6, tampa1, tampa2, tampa3, tampa4, tampa5, tampa6, id },) => ( // Componente Item para TIMES
    <View>
      <View style={styles.boxTeam}>
        <Text style={styles.teamNumber}>Time {id}</Text>
      </View>
      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player1}</Text>
          <Text style={styles.tampa}>Tampa {tampa1}</Text>
        </View>
      </View>

      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player2}</Text>
          <Text style={styles.tampa}>Tampa {tampa2}</Text>
        </View>
      </View>

      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player3}</Text>
          <Text style={styles.tampa}>Tampa {tampa3}</Text>
        </View>
      </View>

      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player4}</Text>
          <Text style={styles.tampa}>Tampa {tampa4}</Text>
        </View>
      </View>

      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player5}</Text>
          <Text style={styles.tampa}>Tampa {tampa5}</Text>
        </View>
      </View>

      <View style={styles.boxPlayer}>
        <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
        <View style={styles.infoPlayer}>
          <Text style={styles.players}>{player6}</Text>
          <Text style={styles.tampa}>Tampa {tampa6}</Text>
        </View>
      </View>
    </View>
  );

  const SecondRoute = () => <FlatList // Componente FlatList para TIMES
    flex={1}
    my="4"
    showsVerticalScrollIndicator={false}
    data={times}
    renderItem={({ item }) => <ItemTimes player1={item.player1} tampa1={item.tampa1} player2={item.player2} tampa2={item.tampa2} player3={item.player3} tampa3={item.tampa3} player4={item.player4} tampa4={item.tampa4} player5={item.player5} tampa5={item.tampa5} player6={item.player6} tampa6={item.tampa6} id={item.id} />}
    keyExtractor={item => item.id}
  />;

  // 3° Rota da TabView
  const ItemWait = ({ username, tampa }) => ( // Componente Item para ESPERA
    <View style={styles.boxOrder}>
      <Image style={styles.user} source={require('../../assets/img/user.png')} resizeMode="contain" />
      <View style={styles.orderInfo}>
        <Text style={styles.players}>{username}</Text>
        <Text style={styles.tampa}>Tampa {tampa}</Text>
      </View>
    </View>
  );

  const ThirdRoute = () => <FlatList //Componente FlatList para ESPERA
    flex={1}
    my="4"
    showsVerticalScrollIndicator={false}
    data={ESPERA}
    renderItem={({ item }) => <ItemWait username={item.user} tampa={item.tampa} number={item.number} />}
    keyExtractor={item => item.id}
  />;

  // Renderiza as rotas
  const renderScene = SceneMap({ // Renderiza todas as rotas na TabView
    first: FirstRoute,
    second: SecondRoute,
    third: ThirdRoute
  });

  //
  // Monitorando estados
  //
  useFocusEffect(
    React.useCallback(() => {
      const unsubcribe = onSnapshot(p, (querySnapshot) => {
        const presents = [];
        querySnapshot.forEach((doc) => {
          presents.push({ ...doc.data(), id: doc.id });
        })
  
        setOrder(presents);
      });

      return () => {
        unsubcribe();
      }
    },[])
  );

  useEffect(() => { // Novos dados no banco
    onSnapshot(q, (querySnapshot) => {
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().user);
        members.push(doc.data().tampa);
        members.push(doc.data().camisa);
        members.push(doc.data().name);
      })

      setUser(members);
    });
  }, []);

  useEffect(() => {
    const TIMES = [ //Array que recebe os dois times montados
      {
        id: 1,
        player1: null,
        tampa1: null,
        player2: null,
        tampa2: null,
        player3: null,
        tampa3: null,
        player4: null,
        tampa4: null,
        player5: null,
        tampa5: null,
        player6: null,
        tampa6: null
      },
      {
        id: 2,
        player1: null,
        tampa1: null,
        player2: null,
        tampa2: null,
        player3: null,
        tampa3: null,
        player4: null,
        tampa4: null,
        player5: null,
        tampa5: null,
        player6: null,
        tampa6: null
      },
    ]

    const espera = []

    setTimes(TIMES)
    setEspera(espera)
  }, [])

  // Coração do Projeto

  useEffect(() => {
    onSnapshot(q, (querySnapshot) => { // Verifica o tipo do usuário logado
      const members = [];
      querySnapshot.forEach((doc) => {
        members.push(doc.data().type);
      })
      if (members[0] === 'Organizador') {
        setAcess(true);
        console.log('organizador ein pae')
      } else {
        if (members[0] === 'Jogador') {
          setAcess(false);
          console.log('maloca')
        }
      }
    })
  }, []);

  if (acess === false) {
    return (
      <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
        <StatusBar />
        <View style={styles.boxHeader}>

          <Image style={styles.userPhoto} source={require('../../assets/img/userBig.png')} resizeMode="contain" />
          <View style={styles.infoUsers}>
            <Text style={styles.username}>{usuario[0]}</Text>
            <View style={styles.infoUsersAux}>
              <View style={styles.boxCamisa}>
                <Text>CAMISA</Text>
                <Text>{usuario[2]}</Text>
              </View>
              <View style={styles.boxTampa}>
                <Text>TAMPA</Text>
                <Text>{usuario[1]}</Text>
              </View>
            </View>
          </View>

          <View style={{ marginLeft: 24, justifyContent: "center", flexDirection: 'column' }}>
            <TouchableOpacity
              style={{ backgroundColor: '#ED4654', paddingVertical: 10, paddingHorizontal: 16, alignItems: "center", borderRadius: 8 }}
              onPress={() => navigation.navigate('Scanner')}>
              <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FFFFFF" />
              <Text style={{ color: '#FFFFFF', marginTop: 8 }}>Check-in</Text>
            </TouchableOpacity>
          </View>
        </View>
        <Tab />
      </SafeAreaView >
    );
  }

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: "#FAFAFA" }}>
      <StatusBar />
      <View style={styles.boxHeader}>

        <Image style={styles.userPhoto} source={require('../../assets/img/userBig.png')} resizeMode="contain" />
        <View style={styles.infoUsers}>
          <Text style={styles.username}>{usuario[0]}</Text>
          <View style={styles.infoUsersAux}>
            <View style={styles.boxCamisa}>
              <Text>CAMISA</Text>
              <Text>{usuario[2]}</Text>
            </View>
            <View style={styles.boxTampa}>
              <Text>TAMPA</Text>
              <Text>{usuario[1]}</Text>
            </View>
          </View>
        </View>

        <View style={{ marginLeft: 24, justifyContent: "center", flexDirection: 'column' }}>
          <TouchableOpacity
            style={{ backgroundColor: '#ED4654', paddingVertical: 10, paddingHorizontal: 16, alignItems: "center", borderRadius: 8 }}
            onPress={() => navigation.navigate('Scanner')}>
            <MaterialCommunityIcons name="qrcode-scan" size={24} color="#FFFFFF" />
            <Text style={{ color: '#FFFFFF', marginTop: 8 }}>Check-in</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Tab />
      <FabPresence />
    </SafeAreaView >
  );
}

