const TodoItem = (props) => <li onClick={props.onClick}>{props.item.text}</li>;

const TodoList = ({ onListClick, onItemClick }) => {

    const items = [
        { text: 'Buy grocery', done: true },
        { text: 'Play guitar', done: false },
        { text: 'Romantic dinner', done: false },
    ];

    const handleItemClick = (item, event) => {
        if (item.done) {
            event.stopPropagation();
        } else {
            onItemClick(item, event);
        }
    };

    return (
        <ul onClick={onListClick}>
            {items.map((item, index) => (
                <TodoItem
                    item={item}
                    key={index}
                    onClick={(event) => handleItemClick(item, event)}
                />
            ))}
        </ul>
    );
};

export default TodoList;