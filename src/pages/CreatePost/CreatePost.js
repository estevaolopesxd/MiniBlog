import styles from "./CreatePost.module.css"

import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { useAuthValue } from "../../context/AuthContext"
import { useInsertDocument } from "../../hooks/useInsertDocument"

const CreatePost = () => {
  const [title, setTitle] = useState("")
  const [image, setImage] = useState("")
  const [body, setBody] = useState("")
  const [tags, setTags] = useState([])
  const [formError, setFormError] = useState("")

  const { user } = useAuthValue()

  const navigate = useNavigate()

  const { insertDocument, response } = useInsertDocument("posts")



  const handleSubmit = (e) => {
    e.preventDefault();
    setFormError("")

    //validar url image

    try {
      new URL(image)
    } catch (error) {
      setFormError("A imagem precisa uma URL.")
    }
    //criar o array de tags
    const tagsArray = tags.split(",").map((tag) => tag.trim().toLowerCase());


    // checar todos os valores

    if (!title || !image || !tags || !body) {
      setFormError("Por favor, preencha todos os campos!")
    }

    console.log(tagsArray)

    if (formError) return;

    insertDocument({
      title,
      image,
      body,
      tagsArray,
      uid: user.uid,
      createdBy: user.displayName
    })

    // redirect to home page
    navigate("/")
  }

  return (
    <div className={styles.create_post}>
      <h2>Criar Post</h2>
      <p>Escreva sobre o que quiser e compartilhe o seu conhecimento!</p>
      <form onSubmit={handleSubmit}>

        <label>
          <span>Título:</span>
          <input type="text" name="title" required placeholder="Pense em um bom titulo" onChange={(e) => setTitle(e.target.value)} value={title} />
        </label>

        <label>
          <span>URL da Imagem:</span>
          <input type="text" name="image" required placeholder="Insira uma imagem que representa o seu post" onChange={(e) => setImage(e.target.value)} value={image} />
        </label>

        <label>
          <span>Conteúdo:</span>
          <textarea name="body" required placeholder="Insira o conteúdo do post" onChange={(e) => setBody(e.target.value)} value={body}></textarea>
        </label>


        <label>
          <span>Tags:</span>
          <input type="text" name="tags" required placeholder="Insira as tags separadas por vírgula" onChange={(e) => setTags(e.target.value)} value={tags} />
        </label>


        {!response.loading && <button className='btn'>Criar Post!</button>}
        {response.loading && (

          <button className='btn' disabled>Aguarde...</button>)}

        {(response.error || formError) && (
          <p className="error">{response.error || formError}</p>
        )}
      </form>
    </div>
  )
}

export default CreatePost