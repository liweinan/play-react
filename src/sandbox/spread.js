const menu = [
    {
        name: "Cabbage",
        color: "Green"
    }
];

console.log(menu);

console.log([...menu,
    {name: "Carrot", color: "Orange"},
    {name: "Cabbage", color: "Purple"}]);


const replace = menu.map(item => {
    return item.name === "Cabbage"
        ? {...item, color: "Purple"}
        : item
}); // 如果要隐式返回，需要不带大括号.

console.log(replace);


menu.map((item, idx) => {
    console.log("menu.map");

    console.log("item: ", item, " idx", idx);
});