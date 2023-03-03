import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import firestore from '@react-native-firebase/firestore';


export default function Read() {


    const [state, setState] = useState([])

    const fetchDocuments = () => {
        firestore()
            .collection('todo')
            .get()
            .then(querySnapshot => {

                querySnapshot.forEach(documentSnapshot => {
                    let data = { id: documentSnapshot.id, ...documentSnapshot.data }
                    setState(data)
                });
            });
    }

    useEffect(() => {
        fetchDocuments()
    }, [])

    console.log(state);
    return (
        <View>
            {/* {state.map((data, i) => {
                return <Text>{i + 1}</Text>
            })} */}
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 22,
    },
    item: {
        padding: 10,
        fontSize: 18,
        height: 44,
    },
});