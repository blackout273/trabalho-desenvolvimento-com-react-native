import React, { useEffect, useState } from 'react'
import { Text, View, Modal, TextInput, Pressable, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import { remove, update } from '../../functions/database/usuarios'

const SingleItem = ({ navigation, route }) => {
    const [modalVisible, setModalVisible] = useState(false);
    const [email, setEmail] = useState()
    const [usuario, setUsuario] = useState()
    const [senha1, setSenha1] = useState()
    const [senha2, setSenha2] = useState()

    async function chamadoParaOVasco(userID) {
        await remove(userID).then(result => {
            Alert.alert('Usuário Excluído com sucesso.')
            navigation.navigate("Login")
        }).catch(err => {
            Alert.alert('Erro ao tentar remover usuario.')
            navigation.navigate("SingleItem")
        })
    }

    function sanitizeStrings(string) {
        let n = string.search(/^[\w\.]+@([\w-]+\.)+[\w-]{2,4}$/);
        if (n == 0) return string
        return undefined
    }
    
    async function atualizar(userID) {

        try {
            if (usuario && senha1 && senha2) {
                if (sanitizeStrings(email)) {
                    if (senha1 != senha2) {
                        Alert.alert('Senhas diferentes')
                    } else {
                        let obj = { email: email, senha: senha1, usuario: usuario }

                        await update(userID, obj).then(result => {
                            alert('Usuario Atualizado com sucesso')
                            navigation.navigate("MainPage")

                        }).catch(err => {
                            alert("E-mail já utilizado")
                            navigation.navigate("MainPage")

                        })
                    }
                } else {
                    Alert.alert('Insira um e-mail válido')
                }
            } else {
                Alert.alert('Preencher todos os campos')
            }

        } catch (error) {
            throw new Error(`Erro: ${error}`)
        }

    }


    return (
        <View>
            <View>
                <Text style={styles.textStyle}>Alterar ou Remover Usuário {route.params.usuario} ?</Text>
            </View>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(!modalVisible);
                }}
            >
                <View style={styles.centeredView}>
                    <View style={styles.modalView}>
                        <Text>E-mail</Text>
                        <TextInput style={styles.input} onChangeText={setEmail} placeholder={route.params.email} ></TextInput>
                        <Text>Usuário</Text>
                        <TextInput style={styles.input} onChangeText={setUsuario} placeholder={route.params.usuario} ></TextInput>
                        <Text>Senha</Text>
                        <TextInput secureTextEntry={true} style={styles.input} onChangeText={setSenha1}></TextInput>
                        <Text>Senha</Text>
                        <TextInput secureTextEntry={true} style={styles.input} onChangeText={setSenha2}></TextInput>
                        <TouchableOpacity onPress={() => atualizar(route.params.id)} ><Text style={styles.btn2}>Atualizar</Text></TouchableOpacity>
                        <Pressable
                            style={[styles.button, styles.buttonClose]}
                            onPress={() => setModalVisible(!modalVisible)}
                        >
                            <Text style={styles.buttonTextStyle}>Fechar</Text>
                        </Pressable>
                    </View>
                </View>
            </Modal>
            <Pressable
                style={[styles.button, styles.buttonOpen]}
                onPress={() => setModalVisible(true)}
            >
                <Text style={styles.textStyle}>Atualizar</Text>
            </Pressable>

            <View style={[styles.button2, styles.buttonOpen2]}>
                <TouchableOpacity onPress={() => chamadoParaOVasco(route.params.id)} ><Text style={styles.textStyle}>Excluir Usuário</Text></TouchableOpacity>
                {/* <TouchableOpacity onPress={() => atualizar(route.params.id)} ><Text style={styles.btn2}>Atualizar</Text></TouchableOpacity> */}
            </View>
        </View >

    )
}

const styles = StyleSheet.create({
    input: {
        textAlign: "center",
        width: 100,
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black",
        borderRadius: "5%",
        borderRadius: 10
    },
    btn1: {
        color: "red",
        borderWidth: 1,
        borderStyle: "solid",
        borderColor: "black"
    },
    btn2: {
        margin:10,
        borderWidth:1,
        padding:10,
        borderRadius:10,
        color: "black",
        borderStyle: "solid",
        borderColor: "red"
    },
    btns: {
        display: "flex",
        justifyContent: "center",
        flexDirection: "row"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "white",
        borderRadius: 20,
        padding: 35,
        alignItems: "center",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    button: {
        borderRadius:10,
        padding: 10,
        borderWidth: 1,
        borderStyle: "solid",
        border: "black",
        elevation: 2
    },
    button2: {
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#FCDDBC",
    },
    buttonOpen2: {
        backgroundColor: "#D9DBBC",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    buttonTextStyle:{
        color:"white",
        fontWeight: "bold",
        textAlign: "center"
    },
    textStyle: {
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    }
})

export default SingleItem