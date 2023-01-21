import React, { useState } from "react";
import axios from "axios";

function AddUsuario(props) {
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");


  //criação da requisição de criar usuario
  //nesse caso chamamos no onclick do botao, que ja esta com os inputs controlados. entao quando colocamso o email e nome e clicamos, ele chama a função createUser, o body esta recebendo os estados que capturaram o input como valor nas chaves name e mail (igual pede o endpoint)

  const createUser=()=>{

    const url="https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users"
    const body={
      name: nome,
      email: email
    }
    const config = {headers: { Authorization: "humberto-oliveira-turmaBarbosaB" } }

    axios.post(url, body, config)
    .then((response)=>{
      // nesse endpoint não tem output com resposta, entao colocamos um alert só pra ver se deu certo 
      alert("ususario foi criado com sucesso")

    })
    .catch((error)=>{
      console.log(error)

    })
  }

  return (
    <>
      <p>Adicionar novo usuario</p>
      <input
        placeholder={"nome"}
        value={nome}
        onChange={(e) => {
          setNome(e.target.value);
        }}
      />
      <input
        type="email"
        placeholder={"email"}
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <button onClick={createUser}>Enviar</button>
    </>
  );
}

export default AddUsuario;
