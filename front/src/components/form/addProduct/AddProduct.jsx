import './AddProduct.css';
import axios from 'axios';
import { useState } from 'react';

export default function AddProduct() {
    const token = String(localStorage.getItem('token'));

    const [tenis, setTenis] = useState({
        model: '',
        brand: '',
        imageUrl: ''
    });

    const handleInputChange = (event) => {
        const { id, value } = event.target;
        setTenis((prevTenis) => ({
            ...prevTenis,
            [id]: value
        }));
    };

    const handleAddProduct = async (event) => {
        event.preventDefault();
        console.log(tenis);
        const response = await axios.post('http://localhost:3004/tenis', {
            name: tenis.model,
            brand: tenis.brand,
            img: tenis.imageUrl
        }, {
            headers: {
                Authorization: `${token}`
            }
        });

        console.log(response.data);

        if(response.data.success) {
            alert('Producto agregado correctamente');
        }
    };

    return (
        <form className="tennis-form" onSubmit={handleAddProduct}>
            <div className="form-group">
                <label htmlFor="model">Modelo de Tenis:</label>
                <input
                    type="text"
                    id="model"
                    value={tenis.model}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="brand">Marca de Tenis:</label>
                <input
                    type="text"
                    id="brand"
                    value={tenis.brand}
                    onChange={handleInputChange}
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">URL de la Imagen:</label>
                <input
                    type="url"
                    id="imageUrl"
                    value={tenis.imageUrl}
                    onChange={handleInputChange}
                />
            </div>
            <button type="submit">Agregar</button>
        </form>
    );
}