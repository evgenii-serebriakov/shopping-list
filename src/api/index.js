import * as fb from 'firebase/app';
import 'firebase/database';
import 'firebase/storage';

import Product from './product';

const config = {
    apiKey: 'AIzaSyCOPT9RI8DNgnHgO_TivL_GOlaRKDRn3mE',
    authDomain: 'shopping-list-7f199.firebaseapp.com',
    databaseURL: 'https://shopping-list-7f199.firebaseio.com',
    projectId: 'shopping-list-7f199',
    storageBucket: 'shopping-list-7f199.appspot.com',
    messagingSenderId: '907725645898',
    appId: '1:907725645898:web:ec7beff8bb7c75a4f5deb3'
};

export default class ProductService {
    constructor() {
        fb.initializeApp(config);
        this.db = fb.database();
        this.storage = fb.storage();
    }

    async productCreate(product) {
        const image = product.picture;
        const imageExt = image.name.slice(image.name.lastIndexOf('.') + 1);

        try {
            const response = await this.db
                .ref('products')
                .push(product);

            const fileData = await this.storage
                .ref(`products/${response.key}.${imageExt}`)
                .put(image);

            const imageSrc = await fileData.ref.getDownloadURL();

            await this.db
                .ref('products')
                .child(response.key)
                .update({ imageSrc });

            return new Product({
                ...product,
                id: response.key,
                imageSrc
            });
        } catch (err) {
            throw new Error(err);
        }
    }

    async fetchProducts() {
        const resultProducts = [];
        try {
            const dataSnapshot = await this.db
                .ref('products')
                .once('value');

            const products = dataSnapshot.val();

            Object.keys(products).forEach((key) => {
                const product = products[key];

                resultProducts.push(
                    new Product({ ...product, id: key })
                );
            });

            return resultProducts;
        } catch (err) {
            throw new Error(err);
        }
    }
}
