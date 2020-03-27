import React, { useState } from 'react'
import styled from 'styled-components'
import { FiLogIn } from 'react-icons/fi'

import api from '../services/api'

import heroesImg from '../assets/heroes.png'
import logoImg from '../assets/logo.svg'
import { Link, useHistory } from 'react-router-dom'

export function Logon() {
    const [id, setId] = useState('')
    const history = useHistory();

    async function handleLogin(e) {
        e.preventDefault()

        try {
            const response = await api.post('sessions', { id})

            localStorage.setItem('ongId', id)
            localStorage.setItem('ongName', response.data.name)

            history.push('/profile')

        } catch(err){
            alert('Falha no Login, tente novamente')
        }
    }

    return (
        <Container>
            <FormSection>
                <img src={logoImg} alt="Be The Hero" />

                <form onSubmit={handleLogin}> 
                    <h1>Faça seu Logon</h1>

                    <input placeholder="Sua ID"
                        value={id}
                        onChange={e => setId(e.target.value)}
                    />
                    <Submit>Entrar</Submit>
                    <Link to="/register"><FiLogIn size={16} color="e02041" /> Não Tenho Cadastro</Link>
                </form>
            </FormSection>
            <img src={heroesImg} alt="heroes" />
        </Container>
    )
}


const Container = styled.div`
    width: 100%;
    max-width: 1120px;
    height: 100vh;
    margin: 0 auto;

    display: flex;
    align-items: center;
    justify-content: space-between;
`

const FormSection = styled.section`
    width: 100%;
    max-width: 350px;
    margin-right: 30px;

    form{
        margin-top: 100px;
    }

    h1{
        font-size: 32px;
        margin-bottom: 32px;
    }

    a{
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: bold;
        transition: opacity 0.2s;

    }
    a:hover{
        opacity: 0.8;
    }

    form a{
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: bold;
        transition: opacity 0.2s;

    }

    a:hover{
        opacity: 0.8;
    }

    a svg{
        margin-right: 8px;
    }    
`

const Submit = styled.button.attrs({ type: 'submit' })`
    width: 100%;
    height: 60px;
    background: #e02041;
    border: 0;
    border-radius: 8px;
    color: #FFF;
    font-weight: 500;
    margin-top: 16px;
    display: inline-block;
    text-align: center;
    text-decoration: none;
    font-size: 18px;
    line-height: 60px;
    transition: filter 0.2s;

    &:hover{
        filter: brightness(90%)
    }

`

