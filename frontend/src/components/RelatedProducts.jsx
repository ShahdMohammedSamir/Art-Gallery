import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Title from '../components/Title';
import ProductItem from './ProductItem';

const API_BASE_URL = "https://diagonalley.runasp.net/api/products"; // Backend API URL

const RelatedProducts = ({ category, subCategory, currentProductId }) => {
    const [related, setRelated] = useState([]);
    const navigate = useNavigate();

    // Fetch related products from the API
    const fetchRelatedProducts = async () => {
        try {
            const response = await fetch(
                `${API_BASE_URL}/related?category=${category}&subCategory=${subCategory}&exclude=${currentProductId}`
            );
            if (!response.ok) {
                throw new Error(`Failed to fetch related products. Status: ${response.status}`);
            }
            const data = await response.json();
            setRelated(data.slice(0, 5)); // Limit to 5 related products
        } catch (error) {
            console.error('Error fetching related products:', error.message);
        }
    };

    useEffect(() => {
        if (category && subCategory) {
            fetchRelatedProducts();
        }
    }, [category, subCategory, currentProductId]); // Fetch related products when these change

    const handleProductClick = (id) => {
        navigate(`/product/${id}`); // Navigate to the clicked product's page
        window.scrollTo(0, 0); // Scroll to the top of the page

        // Remove clicked product and update related products
        setRelated((prevRelated) => {
            const updatedRelated = prevRelated.filter(item => item.id !== id);

            // Fetch a new product if the list drops below 5 items
            if (updatedRelated.length < 5) {
                fetchRelatedProducts();
            }

            return updatedRelated;
        });
    };

    return (
        <div className="my-24">
            <div className="text-center text-3xl py-2">
                <Title text1={'Related'} text2={'Products'} />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 py-6">
                {related.map((item) => (
                    <div key={item.id} onClick={() => handleProductClick(item.id)}>
                        <ProductItem 
                            id={item.id} 
                            name={item.name} 
                            price={item.price} 
                            image={item.image} 
                        />
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;
