// 1. Update the interface to accept the second argument
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: any, quantityToAdd?: number) => void; // Updated this line
  removeFromCart: (name: string) => void;
  updateQuantity: (name: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

// ... inside the CartProvider function ...

// 2. Update the implementation
const addToCart = (item: any, quantityToAdd: number = 1) => {
  setCart(prevCart => {
    const existingItem = prevCart.find(i => i.name === item.name);
    
    if (existingItem) {
      // If item exists, add the new quantity to the existing quantity
      return prevCart.map(i =>
        i.name === item.name 
          ? { ...i, quantity: i.quantity + quantityToAdd } 
          : i
      );
    }
    
    // If it's a new item, add it with the specified quantity
    return [...prevCart, { ...item, quantity: quantityToAdd }];
  });
};
