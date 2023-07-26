import './category-item.styles.scss'

export interface Item {
    id: number
    imageUrl: string
    title: string
}

interface Props {
    item: Item
}

const CategoryItem = ({ item }: Props) => {
    const { id, imageUrl, title } = item
    return (
      <div key={id} className='category-container'>
        <div className="background-image" style={{
          backgroundImage: `url(${imageUrl})`
        }} />
        <div className='category-body-container'>
          <h2>{title}</h2>
          <p>Shop Now</p>
        </div>
      </div>
    )
}

export default CategoryItem