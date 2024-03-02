import { useContext, useEffect, useState } from 'react'
import { UsersContext } from '../hooks/context'
import UpdateUserForm from "./forms/updateUserForm"
import styled from 'styled-components'
import Modal from './modals/default'

type Props = {}

const Div = styled.div({
  width: "82vw"
})

const Button = styled.button({
  margin: 0,
})

const FooterCardDiv = styled.div({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  gap: "20px",
  position: "relative",
  bottom: "-10px"
});

const ItemList = styled.li({
  background: "rgba(245,250,255,1)",
  height: "30vw",
  minHeight: "380px",
  minWidth: "250px",
  width: "25vw",
  color: 'grey',
  listStyle: "none",
  padding: 0,
  margin: 0,
  borderRadius: "10px",
  boxShadow: "1px 1px 4px white",
})

const List = styled.ul({
  display: "flex",
  flexWrap: "wrap",
  gap: "1vw"
})

const UserList = (props: Props) => {
  const [updateModal, setUpdateModal] = useState(false)
  const [updateUser, setUpdateUser] = useState({
    id: '',
    name: '',
    age: 0,
    email: '',
    avatar: ''
  })

  const { actions, state } = useContext(UsersContext)

  useEffect(() => {
    actions?.LIST_USERS()
  }, []);

  return (
    <Div>
    
      <List>
        {state.map(user => (
          <ItemList key={user._id}>
            <h2>{user.name}</h2>

            <div>
              <img src={user.avatar} alt={user.name} />
              <p><strong>Age:</strong> {user.age}</p>
              <p><strong>Email:</strong> {user.email}</p>
            </div>


            <FooterCardDiv>
              <Button onClick={() => {
                setUpdateModal(true)
                setUpdateUser({
                  age: user.age,
                  avatar: user.avatar,
                  email: user.email,
                  id: user._id,
                  name: user.name
                })
              
              }}>Atualizar</Button>
              <Button onClick={() => actions?.REMOVE_USER(user._id)}>Deletar</Button>
            </FooterCardDiv>



          </ItemList>
        ))}

        <Modal
          title="Atualizar Usuário"
          onClose={() => setUpdateModal(false)}
          isOpen={updateModal}
        >
          <UpdateUserForm
            user={updateUser}
            onClose={() => setUpdateModal(false)}
          />
        </Modal>
      </List>
    </Div>
  )
}

export default UserList