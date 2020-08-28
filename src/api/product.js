export default class Product {
    constructor({
        title,
        description,
        category,
        price = 0,
        id = null,
        imageSrc = ''
    }) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.category = category;
        this.id = id;
        this.imageSrc = imageSrc;
    }
}
