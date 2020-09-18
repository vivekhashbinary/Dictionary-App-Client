import React, { useEffect, useState } from 'react'
import './dictionary.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSearch } from '@fortawesome/free-solid-svg-icons'
import { useDispatch, useSelector } from 'react-redux';
import { getwords } from '../../actions';
import Button from '@material-ui/core/Button';
import { CircularProgress, Paper } from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Fab from '@material-ui/core/Fab';
import AddIcon from '@material-ui/icons/Add';
import Modal from 'react-modal'
import Axios from 'axios';

export const Dictionary = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(getwords());
    }, [])
    const words = useSelector(state => state.Dictionary.data.data)
    const [searchWord, setSearchWord] = useState('')
    const [newMeaning, setNewMeaning] = useState()
    const [openModal, setModalState] = useState(false)
    const [filterWord, setFilterWord] = useState('')
    // if(words) {
    //     filteredWord = words.filter(word => {
    //         word.toLowerCase().includes(filterWord)
    //     })
    // }
    if(!words) {
        return (
            <>
                <CircularProgress color="secondary" />
            </>
        )
    } else {
        return (
            <>
                <Modal isOpen={openModal}>
                    <TextField onChange={(e) => { setSearchWord(e.target.value) }} id="outlined-basic" label="Enter the Word" variant="outlined" />
                    <Button onClick={() => { handleClick() }} color="secondary">Search</Button>
                    <Paper variant="outlined">
                        <p>{newMeaning ? newMeaning.word : "NA"}</p>
                        <p>{newMeaning ? newMeaning.definitions : "NA"}</p>
                        <Button onClick={() => { addWord() }}>ADD</Button>
                        <button onClick={() => setModalState(false)}>Cancel</button>
                    </Paper>
                </Modal>
                <div className="column">

                    <div className="row">
                        <Fab style={{
                            bottom: 40,
                            right: 80,
                            position: 'fixed'
                        }} onClick={() => setModalState(true)} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </div>
                    <div className="row">
                        <TextField onChange={(e) => { setFilterWord(e.target.value) }} id="outlined-basic" label="Search" variant="outlined" />
                        <Paper style={{ padding: "5%" }} variant="outlined">
                            <h4>Total Words:{words.length}</h4>
                            {
                                words.map((word) => (
                                    <div className="wordTile" >
                                        <h4 className="listWord">{word.word}</h4>
                                        <p>{word.definitions ? word.definitions[0] : "NA"}</p>
                                        <hr></hr>
                                    </div>
                                ))
                            }
                        </Paper>
                    </div>
                </div>
            </>
        );
    }
    async function handleClick() {
        await Axios.get('http://localhost:8000/dictionary/getword/' + searchWord).then((data) => {
            console.log("DATA:", data.data)
            setNewMeaning(data.data)

        }).catch((e) => {
            console.log("Error:", e)
        })
    }
    async function addWord() {
        if(newMeaning) {
            await Axios.post('http://localhost:8000/dictionary/post', {
                word: newMeaning.word.toUpperCase(),
                definitions: newMeaning.definitions,
                examples: newMeaning.examples

            }).then((data) => {
                console.log("Meaning Added:", data.data)
                dispatch(getwords());
                setNewMeaning(undefined);
                setModalState(false);
            }).catch((e) => {
                console.log("Error:", e)
            })
        }
    }
}


export default Dictionary
{/* word.toLowerCase().includes(filterWord) */ }