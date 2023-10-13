import React, { useEffect, useState } from 'react'
import CreateNote from './CreateNote'
import { v4 as uuid } from 'uuid'
import Note from './Note'
const Notes = () => {
    const [inputText, setInputText] = useState("")
    const [notes, setNotes] = useState([])
    const [editToggle, setEditToggle] = useState(null)

    const editHandler = (id, text) => {
        setEditToggle(id)
        setInputText(text)
        console.log(id, text)
    }

    const deleteHandler = (id) => {
        const newNote = notes.filter(n => n.id !== id)
        setNotes(newNote)
    }

    const saveHandler = () => {
        if (editToggle) {
            setNotes(notes.map((note) => (
                note.id === editToggle ?
                    {
                        ...note, text: inputText
                    }
                    :
                    note
            )))
        }
        else
            setNotes((prevNotes) => [
                ...prevNotes, {
                    id: uuid(),
                    text: inputText
                }
            ])
        setInputText('')
        setEditToggle(null)
    }
    useEffect(() => {
        const data = JSON.parse(localStorage.getItem('Notes'))
        console.log("data -> ", data)
        if (data) {
            setNotes(data)
        }
        else {
            alert("Nothing till now")
        }
    }, [])
    useEffect(() => {
        console.log(notes)
        window.localStorage.setItem("Notes", JSON.stringify(notes))
    }, [notes])
    // Here if we don't write the name of the updating component then this useEffect render only when the page gets refresh hence we use the notes so that when ever the data saves in the notes it will automatically call useEffect rather then render it only at start or on refresh, this also helps to optimise the CPU
    return (
        <div className='notes'>
            {
                notes.map((note) => (
                    editToggle === note.id ?
                        <CreateNote
                            inputText={inputText}
                            setInputText={setInputText}
                            saveHandler={saveHandler} />
                        :
                        <Note
                            key={note.id}
                            id={note.id}
                            text={note.text}
                            editHandler={editHandler}
                            deleteHandler={deleteHandler}
                        >
                        </Note>

                ))
            }
            {
                editToggle ? <></> : <CreateNote
                    inputText={inputText}
                    setInputText={setInputText}
                    saveHandler={saveHandler} />
            }

        </div>
    )
}

export default Notes