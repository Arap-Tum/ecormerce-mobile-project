import {View, Text, FlatList} from 'react-native';
import products from '../assets/products.json'

import ProductListItem from '../components/Product_listItem';
import {Button, ButtonText} from '../components/ui/button';
export default function HomeScreen() {
    return(
        <Button variant="solid" >
            <ButtonText>
                View All Products
            </ButtonText>
        </Button>
    //  <FlatList data={products} 
    //    renderItem={({item}) => <ProductListItem product={item} />}
    //  />

    )
}