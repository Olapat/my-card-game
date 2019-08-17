const allCard = require('../CARD/card_functions/index');

const getAllCard = (req, res) => {
    let allC_arr = [];
    //หนึ่งสำรับมีการ์ดที่เหมื่อนกันอยู่ 4 ใบ
    for (let i = 0; i <= 3; i++) { 
        const AllC_arr = allCard ? Object.keys(allCard) : [];
        allC_arr = [...allC_arr, ...AllC_arr];
    }
    res.json(allC_arr);
};

module.exports = getAllCard;
