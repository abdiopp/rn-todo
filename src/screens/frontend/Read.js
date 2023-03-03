import { View, Text, StyleSheet, FlatList, ScrollView, Pressable } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';
import { Dimensions } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { AuthContext } from '../../contexts/AuthContext';
// import { Button } from 'react-native-paper';


const windowWidth = Dimensions.get('window').width;
export default function Read() {

    const { user } = useContext(AuthContext)


    const [todos, setTodo] = useState([])
    // const todoRef = firestore().collection('todo').get();

    const fetchDocuments = async () => {
        let array = []

        firestore()
            .collection('todo').where("createdBy.uid", "==", user.uid)
            .get()
            .then(querySnapshot => {
                // console.log('Total todo: ', querySnapshot.size);

                querySnapshot.forEach(documentSnapshot => {
                    documentSnapshot.id, documentSnapshot.data()
                    let data = documentSnapshot.data()
                    array.push(data)

                });
                setTodo(array);
            });
    }


    useEffect(() => {
        fetchDocuments()
    }, [])




    return (


        <SafeAreaView style={styles.container}>
            <Text style={styles.heading}>Your Todos</Text>

            <FlatList
                data={todos}
                renderItem={({ item }) => <View style={styles.todoContainer}>
                    <View>
                        <Text style={styles.todoTitle}>{item.title}</Text>
                        <Text style={styles.infoText}>Location:</Text>
                        <Text style={styles.message}>
                            {item.location}
                        </Text>
                        <Text style={styles.infoText}>Description:</Text>
                        <Text style={styles.message}>
                            {item.description}
                        </Text>
                    </View>
                </View>}
                keyExtractor={(item) => item.id}
            />
        </SafeAreaView>
    );


}


export const styles = StyleSheet.create({
    container: {
        padding: 15,
        margin: 15,
    },
    heading: {
        fontSize: 24,
        fontWeight: "bold",
        textAlign: "center",
        margin: 10,
    },
    todoContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        backgroundColor: "#CDF0EA",
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
        marginTop: 10,
    },
    todoTitle: {
        fontWeight: "bold",
        fontSize: 18,
        marginBottom: 8,
    },
    subTitle: {
        opacity: 1,
    },
    infoText: {
        fontWeight: "bold",
        fontSize: 14,
        marginBottom: 8,
        opacity: 0.9
    },
    message: {
        padding: 15,
        backgroundColor: "#CDF0EA",
        width: "80%",
        borderRadius: 10,
        justifyContent: "center",
        alignItems: "center",
    },
});