import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";
const User = styled.div`
  border: black 1px solid;
  margin-top: 10px;
  width: 350px;
`
function Usuario(props) {
  const [usuario, setUsuario] = useState(props.usuario);
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [editar, setEditar] = useState(false);

  
 
  //2.1 fazendo a requisição usando o endpóint que retorna o email (versao sem)
  const getUsersById = (id)=>{

    //mais facil fazer com varivel 
    //const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}` (OBS: url com template srting para receber o parametro id)
    //const config = {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}}
    //axios.get(url, config).then().catch()

    axios.get(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, {headers:{Authorization: "humberto-oliveira-turmaBarbosaB"}}
    )
    .then((response)=>{
      
      setUsuario(response.data)
    })
    .catch((error)=>{
      console.log(error)
    })

  }

  useEffect (()=>{

    getUsersById(props.usuario.id)

  },[])


  //fixação 1 modificar dados do usuario
  //criei a função, que recebe o id do usuario como parametro, o axios.put com as informções necessarias do endpoint (consegui mudar os dois nome e email, mas se quiser alterar so um paramtro, o outroa oives de retornar o dado anterior fica em branco. creio que tenha a ver no envio de informaççoes do boy, pq estou enviando os dois)(OBS: consegui fazer uma logica para só alterar o email, ou só o nome ou os dois, fazendo uma função que recebe os estados nome e email como parametro e retorna um body com só o name, só o email ou os dois dependendo se os estados estiverem preenchidos ou nao e fiz o botao de enviar modificações caso o nome ou email não tenham sido preenchidos)
  const editUser = (id)=>{

    const recebeNome = (nome, email)=>{
      let body=""
      if(nome.length>0 && email ===""){
        body = {
          name:nome
        }
      }else if(email.length>0 && nome===""){
        body = {
          email:email
        }
      }else if(nome.length>0 && email.length>0){
        body={
          name:nome,
          email:email
        }
      }
      return body
    }

    

    const url = `https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`
    const config = {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}}
    const body = recebeNome(nome, email)
    

    axios.put(url,body,config)
    .then((response)=>{
          alert("dados editados com sucesso")
      

    })
    .catch((error)=>{
      console.log(error)

    })

  }

  //fixação 2 deletar usuario
  //basicamente a mesma de modificar

  const deleteUser=(id)=>{

    axios.delete(`https://us-central1-labenu-apis.cloudfunctions.net/labenusers/users/${id}`, {headers:{Authorization:"humberto-oliveira-turmaBarbosaB"}})
    .then((response)=>{
      alert("usuario deletado")

    })
    .catch((error)=>{
      console.log(error)

    })
  }
  
  return (
    <User>
      {editar ? (
        <div>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
          <input value={nome} onChange={(e) => setNome(e.target.value)} />
          <input value={email} onChange={(e) => setEmail(e.target.value)} />
          <button disabled={nome==="" && email ===""} onClick={()=>editUser(props.usuario.id)}>Enviar alterações</button>
        </div>
      ) : (
        <>
          <p>Nome:{usuario.name}</p>
          <p>E-mail:{usuario.email}</p>
        </>
      )}
      <button onClick={() => setEditar(!editar)}>Editar</button>
      <button onClick={()=> deleteUser(props.usuario.id)}>Excluir</button>
    </User>
  );
}

export default Usuario;
