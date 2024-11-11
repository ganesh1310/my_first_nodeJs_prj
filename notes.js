console.log('Node file is created');

var age = 44;
const addNumber = (a,b) => a+b;
//exporting the variable to main file
module.exports = {
    age,
    addNumber
};