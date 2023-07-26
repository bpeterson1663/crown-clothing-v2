import CategoryItem, { Item } from  '../category-item/category-item.component'
import './directory.styles.scss'

interface Props {
    categories: Item[]
}

const Directory = ({ categories }: Props) => {    
    return (
        <div className='directory-container'>
            {categories.map(item => (
            <CategoryItem item={item} />
            ))}
        </div>
    );
}

export default Directory