import { FiX } from 'react-icons/fi';
import css from './IngredientCard.module.css';

function IngredientCard({ ingredient, onRemove }) {
    return (
        <div className={css.card}>
            <img src={ingredient.img} alt={ingredient.name} className={css.image} />
            <div className={css.info}>
                <span className={css.name}>{ingredient.name}</span>
                <span className={css.measure}>{ingredient.measure}</span>
            </div>
            <button
                type="button"
                className={css.removeBtn}
                onClick={() => onRemove(ingredient.id)}
                aria-label={`Remove ${ingredient.name}`}
            >
                <FiX size={14} />
            </button>
        </div>
    );
}

export default IngredientCard;
