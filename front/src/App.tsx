import { useState } from 'react'
import './App.css'
import UserList from "./components/userList"
import CreateButton from "./components/buttons/createButton"
import Modal from "./components/modals/default"
import AddUserForm from './components/forms/createUserForm'
import { Toaster } from 'react-hot-toast';

function App() {

  const [createModal, setCreateModal] = useState(false)


  return (
    <>
        <h2>Lista de Usuários</h2>
        <Toaster/>
        <UserList />

        <CreateButton onClick={() => setCreateModal(!createModal)} />
        <Modal
          title='Criar Novo Usuário'
          isOpen={createModal}
          onClose={() => setCreateModal(false)}
        >
          <AddUserForm onClose={() => setCreateModal(false)}/>
       
        </Modal>
    </>
  )
}

export default App
