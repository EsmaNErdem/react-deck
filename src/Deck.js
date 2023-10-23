import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck"

const Deck = () => {
    const [deck, setDeck] = useState(null)
    const [cards, setCards] = useState([])
    const [autoDraw, setAutoDraw] = useState(false)
    const timerId = useRef();


    // getting a new deck
    useEffect(() => {
        async function getDeck() {
            try {
                const data = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
                setDeck( () => data.data.deck_id)
                console.log("after setdeck", deck, data.data.deck_id)
            } catch (e) {
                alert(e);
            }
        }
        getDeck();
    }, []);

    // getting a card from deck
    useEffect(() => {
        async function getACard() {
            console.log(deck)
            try {
                const draw = await axios.get(`${BASE_URL}/${deck}/draw`)
                
                if (draw.data.remaining === 0) {
                    throw new Error("No cards left")
                }

                const card = draw.data.cards[0]

                setCards(c => [
                    ...c, 
                    {
                        id: card.code, 
                        image: card.image, 
                        name: card.suit + " " + card.value,
                    }])

            } catch(e) {
                alert(e)
            }
        }

        if(autoDraw && !timerId.current) {
            timerId.current = setInterval(() => {
                getACard()
            }, 1000);
        }

        return function cleanUpClearTimer() {
            clearInterval(timerId.current);
            timerId.current = null
        };
    }, [deck, autoDraw])

    const toggleAutoDraw = () => {
        setAutoDraw(d => !d)
    }

    return (
        <div>
            <button onClick={toggleAutoDraw}>
                {autoDraw ? "Stop Drawing" : "Draw for me"}
            </button>
            <div className="Deck-cards">
                {cards.map(({id, image, name}) =>
                    <Card key={id} image={image} name={name} />
                    )
                }
            </div>
        </div>
    )
}

export default Deck;