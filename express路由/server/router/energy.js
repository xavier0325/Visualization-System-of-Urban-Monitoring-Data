let express = require('express');
let router = express.Router();

router.get('/data', (req, res) => {
    res.send({
        energyData: [{
            name: '琴湖公寓',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '琴湖食堂',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '金翰林公寓',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '金翰林商业区',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '体育馆',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '联建商业区',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '计算中心',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '工科楼',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '图书馆',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '南苑公寓',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '逸夫楼',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }, {
            name: '北苑公寓',
            ratedPower: Math.ceil(Math.random() * 90 + 100),
            realPower: Math.ceil(Math.random() * 90 + 10),
            eyCollectionData: randomArr(12)
        }]
    })
})

function randomArr(dataSum = 12) {
    let arr = [];
    for (let i = 0; i < 3; i++) {
        let t = [];
        for (let j = 0; j < dataSum; j++) {
            t.push(Math.floor(Math.random() * 300));
        }
        arr.push(t);
    }
    return arr;
}

module.exports = router;