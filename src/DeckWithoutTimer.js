import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Card from "./Card";

const BASE_URL = "https://deckofcardsapi.com/api/deck"

const DeckWithoutTimer = () => {
    const [deck, setDeck] = useState(null)
    const [cards, setCards] = useState([])
    // const [req, setReq] = useState(0)


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

    // // getting a card from deck
    // useEffect(() => {
    //     async function getACard() {
    //         const { deck_id } = deck
    //         try {
    //             const draw = await axios.get(`${BASE_URL}/${deck_id}/draw`)
                
    //             if (draw.data.remaining === 0) {
    //                 throw new Error("No cards left")
    //             }

    //             const card = draw.data.cards[0]

    //             setCards(c => [
    //                 ...c, 
    //                 {
    //                     id: card.code, 
    //                     image: card.image, 
    //                     name: card.suit + " " + card.value,
    //                 }])

    //         } catch(e) {
    //             alert(e)
    //         }
    //     }
    //     if(req > 0) {
    //         getACard()
    //     }
    // }, [deck, req])

    const getCard = () => {
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
        getACard()
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

// Here are some common scenarios where you might use the useEffect hook:

// Fetching Data from an API:
// This is one of the most common use cases. You can use useEffect to initiate API requests and update your component's state with the received data. useEffect to fetch data from an API when the component mounts or when specific dependencies change.

// Updating the DOM:
// When you need to interact with the DOM directly or make updates to the DOM based on component state changes, useEffect can be used for this purpose.

// Managing Subscriptions:
// If your component needs to establish and clean up subscriptions to data sources, such as web sockets or event emitters, useEffect is suitable for handling the subscription logic and cleanup.

// Performing Timed Actions:
// You can use useEffect to set up timers, intervals, or delays to perform specific actions after a given time or at regular intervals.

// Managing Side Effects:
// Any other side effects, like logging, analytics, or side effects that occur when the component mounts and unmounts, can be handled with useEffect.