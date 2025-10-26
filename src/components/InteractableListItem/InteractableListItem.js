import styles from './InteractableListItem.module.css';

export default function InteractableListItem({recipe, handleClick, index, action}) {

    let styling;

    switch (action) {
        case "add": 
            styling = styles.addRecipeButton;
            break; 
        case "remove":
            styling = styles.removeRecipeButton;
            break;
        default:
            styling = "";
            break;
    }


    return (
        <li className={styles.interactableListItem} key={index}>
            <button className={styling} onClick={() => { handleClick(recipe)}}>
                {action}
            </button>
            {recipe.recipeName}
        </li>
    );
}