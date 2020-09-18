import React, { useEffect, useState } from 'react'
import './dictionary.css'
import SearchIcon from '@material-ui/icons/Search';
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
    const [addWordModal, setAddWordModalState] = useState(false)
    const [showWordModal, setShowWordModal] = useState(false)
    const [filterWord, setFilterWord] = useState('')
    const [indexSelected, setIndexSelected] = useState()
    // if(words) {
    //     filteredWord = words.filter(word => {
    //         word.toLowerCase().includes(filterWord)
    //     })
    // }
    if(!words) {
        return (
            <>
                <CircularProgress className="loader" color="secondary" />
            </>
        )
    } else {
        return (
            <>
                <Modal contentClassName="show-word-modal-style" style={{
                    overlay: {
                        backgroundColor: 'grey'
                    }
                }} isOpen={showWordModal} onRequestClose={() => { setShowWordModal(false) }}>
                    <h4>{words[indexSelected] ? words[indexSelected].word : ""}</h4>
                    <p><strong>Definition: </strong>{words[indexSelected] ? words[indexSelected].definitions[0] : ""}</p>
                    <p><strong>Example: </strong>{words[indexSelected] ? words[indexSelected].examples[0].text : ""}</p>
                </Modal>
                <div className="column">
                    <Modal style={{
                        overlay: {
                            backgroundColor: 'grey'
                        }
                    }} isOpen={addWordModal} onRequestClose={() => { setAddWordModalState(false) }}>
                        <TextField onChange={(e) => { setSearchWord(e.target.value) }} id="filled-size-normal" placeholder="Search" size="normal" />
                        <SearchIcon style={{ cursor: "pointer" }} onClick={() => { handleClick() }} />
                        {/* <Button onClick={() => { handleClick() }} color="primary">Search</Button> */}
                        <Paper variant="">
                            <p>{newMeaning ? newMeaning.word : ""}</p>
                            <p>{newMeaning ? newMeaning.definitions : ""}</p>
                        </Paper>
                        <Button onClick={() => { addWord() }} style={{ visibility: "visible" }}>ADD</Button>
                    </Modal>
                    <div className="row">
                        <Fab style={{
                            bottom: 40,
                            right: 80,
                            position: 'fixed'
                        }} onClick={() => setAddWordModalState(true)} color="primary" aria-label="add">
                            <AddIcon />
                        </Fab>
                    </div>
                    <div className="row">
                        <Paper style={{ padding: "5%" }} variant="outlined">
                            <div>
                                <TextField onChange={(e) => { setFilterWord(e.target.value) }} id="filled-size-normal" placeholder="Search" size="small" />
                                <SearchIcon style={{ cursor: "pointer" }} />
                            </div>
                            <h4>Total Words:{words.length}</h4>
                            {
                                words.map((word, index) => (
                                    <div onClick={() => { setShowWordModal(true); setIndexSelected(index) }} className="wordTile" >
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
                setAddWordModalState(false);
            }).catch((e) => {
                console.log("Error:", e)
            })
        }
    }
}


export default Dictionary
{/* word.toLowerCase().includes(filterWord) */ }