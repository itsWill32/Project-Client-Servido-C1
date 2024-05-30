import './AddProduct.css';


export default function AddProduct() {
  return (
    <>
               <form className="tennis-form">
            <div className="form-group">
                <label htmlFor="model">Modelo de Tenis:</label>
                <input
                    type="text"
                    id="model"
                    
                />
            </div>
            <div className="form-group">
                <label htmlFor="brand">Marca de Tenis:</label>
                <input
                    type="text"
                    id="brand"
                    
                />
            </div>
            <div className="form-group">
                <label htmlFor="imageUrl">URL de la Imagen:</label>
                <input
                    type="url"
                    id="imageUrl"
                />
            </div>
            <button type="submit">Agregar</button>
        </form>
    </>
  )
}
