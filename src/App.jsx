import { useState } from "react";
import { Card, CardContent, CardTitle } from "@/components/ui/card.jsx";
import { Button } from "@/components/ui/button.jsx";
import { Badge } from "@/components/ui/badge.jsx";
import "./App.css";

// Sample product data
const products = [
  { id: 1, name: "T-Shirt", price: 19.99, image: "tshirt.jpg" },
  { id: 2, name: "Jeans", price: 39.99, image: "jeans.jpg" },
  { id: 3, name: "Cap", price: 12.99, image: "cap.jpg" },
];

function App() {
  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const itemExists = prevCart.find((item) => item.id === product.id);
      if (itemExists) {
        return prevCart.map((item) => (item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item));
      }
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  const removeFromCart = (productId) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            acc.push({ ...item, quantity: item.quantity - 1 });
          }
        } else {
          acc.push(item);
        }
        return acc;
      }, [])
    );
  };

  const cartTotal = cart.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-4xl font-bold mb-8">Clothing Store</h1>
      <div className="grid grid-cols-3 gap-4 mb-8">
        {products.map((product) => (
          <Card key={product.id}>
            <CardContent>
              <CardTitle>{product.name}</CardTitle>
              <img src={product.image} alt={product.name} className="mb-4" />
              <p>${product.price.toFixed(2)}</p>
              <Button onClick={() => addToCart(product)}>Add to Cart</Button>
            </CardContent>
          </Card>
        ))}
      </div>
      <div className="fixed bottom-4 right-4">
        <Button variant="secondary">
          Cart <Badge>{cart.length}</Badge>
        </Button>
        {cart.length > 0 && (
          <div className="mt-4 p-4 bg-white rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Shopping Cart</h2>
            <ul>
              {cart.map((item) => (
                <li key={item.id} className="mb-2">
                  {item.name} - ${item.price.toFixed(2)} x {item.quantity}
                  <Button size="sm" onClick={() => removeFromCart(item.id)}>
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
            <p className="font-bold">Total: ${cartTotal.toFixed(2)}</p>
            <Button variant="primary">Checkout</Button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
