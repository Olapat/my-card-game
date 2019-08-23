function shuffleIndexCard(arrayIndexCard) {
    let IndexCard = arrayIndexCard.length,
        shuffleIndex = 0,
        valueTemporary;

    while (IndexCard--) {
        shuffleIndex = Math.floor(Math.random() * (IndexCard + 1));
        valueTemporary = arrayIndexCard[IndexCard];
        arrayIndexCard[IndexCard] = arrayIndexCard[shuffleIndex];
        arrayIndexCard[shuffleIndex] = valueTemporary;
    }
    return arrayIndexCard;
};
