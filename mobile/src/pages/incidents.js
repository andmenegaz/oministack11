import React, { useEffect, useState } from 'react'
import { View, FlatList, StyleSheet, Image, Text, TouchableOpacity } from 'react-native'
import Constants from 'expo-constants'
import { useNavigation } from '@react-navigation/native'
import { Feather } from '@expo/vector-icons'

import logoImg from '../assets/logo.png'

import api from '../services/api'

export default function Incidents() {
    const navigation = useNavigation()
    const [incidents, setIncidents] = useState([])
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [loading, setLoading] = useState(false)

    function navigateToDetail(incident) {
        navigation.navigate('Detail', { incident })
    }

    async function loadIncidents() {
        if (loading) {
            return
        }

        if (total > 0 && incidents.length === total) {
            return
        }

        setLoading(true)

        const response = await api.get('incidents', {
            params: { page }
        })

        setIncidents([...incidents, ...response.data])
        setTotal(response.headers['x-total-count'])
        setPage(page + 1)
        setLoading(false)
    }

    useEffect(() => {
        loadIncidents();
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Image source={logoImg} />
                <Text style={styles.headerText}>
                    Total de <Text style={styles.headerTextBold}>{total} casos</Text>
                </Text>
            </View>

            <Text style={styles.title}>Bem-Vindo!</Text>
            <Text style={styles.description}>Escolha um dos casos abaixo e salve o dia.</Text>
            <FlatList style={styles.incidentList}
                //showsVerticalScrollIndicator={false}

                data={incidents}
                keyExtractor={incident => incident.id}
                onEndReached={loadIncidents}
                onEndReachedThreshold={0.2}
                renderItem={({ item: incident }) =>
                    (
                        <View style={styles.incident}>
                            <Text style={styles.incidentProperty}>ONG:</Text>
                            <Text style={styles.incidentValue}>{incident.name}</Text>

                            <Text style={styles.incidentProperty}>CASO:</Text>
                            <Text style={styles.incidentValue}>{incident.title}</Text>

                            <Text style={styles.incidentProperty}>VALOR:</Text>
                            <Text style={styles.incidentValue}>
                                {Intl.NumberFormat('pt-BR',
                                    { style: 'currency', currency: 'BRL' })
                                    .format(incident.value)}</Text>

                            <TouchableOpacity style={styles.detailsButton}
                                onPress={() => navigateToDetail(incident)}>
                                <Text style={styles.detailsButtonText}>Ver mais detalhes</Text>
                                <Feather name="arrow-right" size={16} color="#E02041" />
                            </TouchableOpacity>
                        </View>
                    )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingHorizontal: 24,
        paddingTop: Constants.statusBarHeight + 20,
    },

    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    headerText: {
        fontSize: 15,
        color: '#737380'
    },
    headerTextBold: {
        fontWeight: 'bold',
    },

    title: {
        fontSize: 30,
        marginBottom: 16,
        marginTop: 48,
        color: '#13131a',
        fontWeight: 'bold'
    },

    description: {
        fontSize: 16,
        lineHeight: 24,
        color: '#737380'
    },

    incidentList: {
        marginTop: 32,
    },

    incident: {
        padding: 24,
        borderRadius: 8,
        backgroundColor: '#FFF',
        marginBottom: 16,
    },

    incidentProperty: {
        fontSize: 14,
        color: '#41414d',
        fontWeight: 'bold'
    },

    incidentValue: {
        marginTop: 8,
        fontSize: 15,
        marginBottom: 24,
        color: '#737380'
    },

    detailsButton: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },

    detailsButtonText: {
        color: '#e02041',
        fontSize: 15,
        fontWeight: 'bold'
    }
})