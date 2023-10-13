import React from 'react'

const CreateNote = ({ inputText, setInputText, saveHandler }) => {
    const char = 250
    const charLimit = char - inputText.length
    return (
        <div className='note'>
            <textarea
                cols={10}
                rows={3}
                placeholder='Type . . .'
                maxLength={250}
                value={inputText}
                onChange={e => setInputText(e.target.value)}
            />
            <div className='note_footer'>
                <span className='label'> {charLimit} Left </span>
                <button className='note_save' onClick={saveHandler}>Save</button>
            </div>
        </div>
    )
}

export default CreateNote