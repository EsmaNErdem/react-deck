import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck"

const DeckWithoutTimer = () => {
    const [deck, setDeck] = useState(null)
    const [cards, setCards] = useState([])
    const [req, setReq] = useState(0)


    // getting a new deck
    useEffect(() => {
        async function getDeck() {
            try {
                const data = await axios.get(`${BASE_URL}/new/shuffle/?deck_count=1`)
                setDeck( () => data.data)
            } catch (e) {
                alert(e);
            }
        }
        getDeck();
    }, [setDeck]);

    // getting a card from deck
    useEffect(() => {
        async function getACard() {
            const { deck_id } = deck
            try {
                const draw = await axios.get(`${BASE_URL}/${deck_id}/draw`)
                
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
        if(req > 0) {
            getACard()
        }
    }, [deck, req])

    const getCard = () => {
        setReq(r => r + 1)
    }

    return (
        <div>
            <button onClick={getCard}>Get a Card</button>
            <div className="Deck-cards">
                {cards.map(({id, image, name}) =>
                <Card key={id} image={image} name={name} />
                )}
            </div>
        </div>
    )
}

export default DeckWithoutTimer;