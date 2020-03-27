import React, { useState } from 'react'
import styled from 'styled-components'

import logoImg from '../assets/logo.svg'
import { FiArrowLeft } from 'react-icons/fi'
import { Link, useHistory } from 'react-router-dom'
import api from '../services/api'

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [whatsapp, setWhatsapp] = useState('')
    const [city, setCity] = useState('')
    const [uf, setUf] = useState('')

    const history = useHistory();
    
    async function handleRegister(e) {
        e.preventDefault()

        const data = {
            name,
            email,
            whatsapp,
            city,
            uf
        }

        try {
            const response = await api.post('ongs', data)

            alert(`Seu ID de acesso: ${response.data.id}`)

            history.push("/")
        } catch(err){
            alert('Erro no cadastro da ONG, tente novamente')
        }
    }


    return (
        <Container>
            <Content>
                <section>
                    <img src={logoImg} alt="Be The Hero" />

                    <h1>Cadastro</h1>
                    <p>Faça seu cadastro, entre na plataforma e ajude pessoas a encontrarem os cassos da sua ONG.</p>
                    <Link to="/"><FiArrowLeft size={16} color="e02041" /> Voltar para o Logon</Link>
                </section>
                <Form onSubmit={handleRegister}>
                    <input placeholder="Nome da ONG"
                        value={name}
                        onChange={e => setName(e.target.value)} />
                    <input type="email" placeholder="E-mail"
                        value={email}
                        onChange={e => setEmail(e.target.value)} />
                    <input placeholder="Whatsapp"
                        value={whatsapp}
                        onChange={e => setWhatsapp(e.target.value)} />

                    <div>
                        <input placeholder="Cidade"
                            value={city}
                            onChange={e => setCity(e.target.value)} />
                        <input placeholder="UF"
                            value={uf}
                            onChange={e => setUf(e.target.value)} />
                    </div>
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

    div{
        display: flex;

        input + input{
            margin-left: 9px;
            width: 80
        }
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
