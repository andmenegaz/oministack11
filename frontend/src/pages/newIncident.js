import React, { useState } from 'react'
import styled from 'styled-components'

import logoImg from '../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'

import api from '../services/api'

export function NewIncident() {
    const ongId = localStorage.getItem('ongId')
    const ongName = localStorage.getItem('ongName')    
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [value, setValue] = useState('')
    
    const history = useHistory();

    async function handleCreate(e) {
        e.preventDefault()

        const data = {
            title,
            description,
            value
        }

        try {
            await api.post('incidents', data, {
                headers: {
                    Authorization: ongId
                }
            })

            history.push("/profile")
        } catch(err){
            alert('Erro no cadastro da ONG, tente novamente')
        }
    }

    return (
        <Container>
            <Content>
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastrar Novo Caso</h1>
                    <p>Descreva o caso detalhadamente para encontrar um heróis para resolver isso.</p>
                    <Link to="/profile"><FiArrowLeft size={16} color="e02041" /> Voltar para o Profile</Link>
                </section>
                <Form onSubmit={handleCreate}>
                    <input placeholder="Título do Caso"
                        value={title}
                        onChange={e => setTitle(e.target.value)} />
                    <textarea placeholder="Descrição"
                        value={description}
                        onChange={e => setDescription(e.target.value)} />
                    <input placeholder="Valor em Reais"
                        value={value}
                        onChange={e => setValue(e.target.value)} />
                    <Submit>Cadastrar</Submit>
                </Form>
            </Content>
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
    justify-content: center;
`

const Content = styled.div`
    width: 100%;
    padding: 96px;
    background: #f0f0f5;
    box-shadow: 0 0 100px rgba(0, 0, 0, 0.1);
    border-radius: 8px;

    display: flex;
    justify-content: space-between;
    align-items: center;

    section{
        width: 100%;
        max-width:380px;
    }

    section h1{
        font-size: 32px;
        margin: 64px 0 32px;
    }

    section p{
        font-size: 18px;
        color: #737380;
        line-height: 32px;
    }

    section a{
        display: flex;
        align-items: center;
        margin-top: 40px;
        color: #41414d;
        font-size: 18px;
        text-decoration: none;
        font-weight: bold;
        transition: opacity 0.2s;

    }
    section a:hover{
        opacity: 0.8;
    }
`

const Form = styled.form`
    width: 100%;
    max-width: 400px;
    margin-right: 30px;
    margin-top: 100px;

    input{
        margin-top: 8px;
    }

    textarea{
        margin-top: 8px;
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
