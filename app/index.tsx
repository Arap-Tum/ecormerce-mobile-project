import {View, Text, FlatList} from 'react-native';
import products from '../assets/products.json'

import ProductListItem from '../components/Product_listItem';

export default function HomeScrean() {
    return(
        
     <FlatList data={products} 
            renderItem={({item}) => <ProductListItem product={item} />
            } 
            />
       
    )
}