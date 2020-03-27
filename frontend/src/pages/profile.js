import React, { useState, useEffect } from 'react'
import styled from 'styled-components'

import logoImg from '../assets/logo.svg'
import { FiPower, FiTrash } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../services/api'

export function Profile() {
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')
    const [incidents, setIncidents] = useState([])
    const history = useHistory();

    useEffect(() => {
        api.get('incidents', {
            headers: {
                Authorization: ongId
            }
        }).then(response => {
            setIncidents(response.data)
        })
    }, [ongId]);


    async function handleDeleteIncident(id){
        try{
            await api.delete(`incidents/${id}`, {
                headers: {
                    Authorization: ongId
                }
            })

            setIncidents(incidents.filter(incident => incident.id !== id))

        }catch(err){
            alert('Erro ao deletar caso, tente novamente')
        }
    }

    function handleLogout(){
        localStorage.clear();

        history.push('/')
    }

    return (
        <Container>
            <Header>
                <img src={logoImg} alt="Be The Hero" />
                <span>Bem Vinda, {ongName}</span>

                <Link to="/incidents/new">Cadastrar Novo Caso</Link>
                <button type="button" onClick={handleLogout}><FiPower size={20} color="e02041" /></button>
            </Header>
            <Content>
                <h1>Casos cadastrados</h1>

                <ul>
                    {incidents.map(incident => (
                        <li key={incident.id}>
                            <strong>CASO:</strong>
                            <p>{incident.title}</p>

                            <strong>DESCRIÇÃO:</strong>
                            <p>{incident.description}</p>

                            <strong>VALOR:</strong>
                            <p>{Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(incident.value)}</p>

                            <button type="button" onClick={() => handleDeleteIncident(incident.id)}>
                                <FiTrash size={20} color="#a8a8b3" />
                            </button>
                        </li>
                    ))}
                </ul>
            </Content>
        </Container>
    )
}

const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    padding: 0 30px;
    margin: 32px auto;
`

const Content = styled.div`

    h1{
        margin-top: 80px;
        margin-bottom: 24px;
    }

    ul{
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        grid-gap: 24px;
        list-style: none;

        li{
            background: #FFF;
            padding: 24px;
            border-radius: 8px;
            position: relative;

            button{
                position: absolute;
                right: 24px;
                top: 24px;
                border: 0px;
                background: #FFF;

                &:hover{
                    opacity: 0.8
                }
            }

            strong{
                display: block;
                margin-bottom: 16px;
                color: "#41414d"
            }

            p + strong{
                margin-top: 32px;
            }

            p{
                color: #737380;
                line-height: 21px;
                font-size: 16px;
            }
        }
    }
`

const Header = styled.header`
    display: flex;
    align-items: center;

    img{
        height: 64px;
    }
    
    span{
        font-size: 20px;
        margin-left: 24px;
    }

    a{
        width: 260px;
        height: 60px;
        background: #e02041;
        border: 0;
        border-radius: 8px;
        color: #FFF;
        font-weight: 500;

        display: inline-block;
        text-align: center;
        text-decoration: none;
        font-size: 18px;
        line-height: 60px;
        transition: filter 0.2s;
        margin-left: auto;
        margin-top: 0;

        &:hover{
            filter: brightness(90%)
        }
    }

    button{
        height: 60px;
        width: 60px;
        border-radius: 4px;
        border: 1px solid #dcdce6;
        background: transparent;
        margin-left: 16px;
        transition: border-color 0.2s;

        &:hover{
            border-color: #999;
        }
    }
`
