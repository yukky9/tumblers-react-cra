import React, { useEffect, useState } from 'react';
import { api } from '../api/api';

interface Product {
  id: number;
  name: string;
  description: string;
  image_url: string;
  category: string;
  price: number;
}

const CatalogPage: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    api.getProducts()
        .then(data => {
          setProducts(data);
          setLoading(false);
        })
        .catch(err => {
          console.error(err);
          setError('Не удалось загрузить каталог');
          setLoading(false);
        });
  }, []);

  if (loading) return <div className="text-center py-10 text-gray-600">Загрузка каталога...</div>;
  if (error) return <div className="text-center py-10 text-red-600">{error}</div>;

  return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-4xl font-bold mb-8 text-gray-800">Каталог продукции</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {products.map(product => (
              <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition duration-300">
                <img
                    src={product.image_url || 'https://via.placeholder.com/300x200?text=Нет+изображения'}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="text-xl font-semibold text-gray-800">{product.name}</h3>
                  <p className="text-gray-600 text-sm mt-1">{product.description}</p>
                  <div className="mt-3 flex justify-between items-center">
                    <span className="text-lg font-bold text-green-600">{product.price} ₽</span>
                    <span className="text-xs bg-gray-200 px-2 py-1 rounded">{product.category}</span>
                  </div>
                </div>
              </div>
          ))}
        </div>
      </div>
  );
};

export default CatalogPage;