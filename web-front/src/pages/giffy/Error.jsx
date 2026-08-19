import React from "react";
import FormSearch from "../../components/giffy/FormSearch"
import Button from "../../components/giffy/Button"



const gifsErrors = ['d2jjuAZzDSVLZ5kI', 'Bp3dFfoqpCKFyXuSzP', 'hv5AEBpH3ZyNoRnABG', 'hLwSzlKN8Fi6I']
/* 
const pageErrorStyles = css`
    display: flex;
    flex-direction: column;
    justify-content: center;
    aling-items: center;
    padding: 1rem;
    text-aling:center;
`

const codeErrorStyles = css`
    font-size: 1.5rem;
    font-weght: bold;
    font-style: italic;
`

const msgErrorStyle = css`
font-size: 1.5rem;
margin: 1rem auto
`

const SIZE = '350px'

const gifErrorStyle = css({
    margin: "1rem auto",
    width:SIZE,
    height: SIZE,
    objectFit: 'cover'
}) */

export default function Error(){
    const randomImage = () =>{
        return `https://media.giphy.com/media/${gifsErrors[Math.floor(Math.random() * gifsErrors.length) + 1 ]}/giphy.gif`
    }

    return(
        <>
        
            <title>Error 404 | Gifs</title>
       
        <FormSearch/>
        <div className="App-wrapper">
            <div /* css={pageErrorStyles} */>
                <span /* css={codeErrorStyles} */>404</span>
                <span /* css={msgErrorStyle} */>Sometimes gettings lost inst that bad</span>
                <img /* css={gifErrorStyle} */ src={randomImage()} alt="alt-page-404"></img>
                <Button href='/giffy'>Go back home</Button>
            </div>
        </div>
        </>
    )

    
}