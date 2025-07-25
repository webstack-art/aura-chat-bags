import { useState } from 'react';
import { X, Plus, Minus, ShoppingBag, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import AuthModal from '@/components/AuthModal';
import CheckoutModal from '@/components/CheckoutModal';

interface CartDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

const CartDrawer = ({ isOpen, onClose }: CartDrawerProps) => {
  const { cart, updateQuantity, removeFromCart } = useCart();
  const { isAuthenticated } = useAuth();
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);

  const handleCheckout = () => {
    if (!isAuthenticated) {
      setShowAuthModal(true);
    } else {
      setShowCheckoutModal(true);
    }
  };

  const handleAuthSuccess = () => {
    setShowAuthModal(false);
    setShowCheckoutModal(true);
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300" 
        onClick={onClose} 
      />
      
      {/* Cart Drawer */}
      <div className={`fixed right-0 top-0 h-screen w-full sm:w-96 bg-background shadow-xl z-50 transform transition-transform duration-300 ${isOpen ? 'translate-x-0' : 'translate-x-full'}`}>
        <div className="flex flex-col h-screen">
          {/* Header */}
          <div className="flex items-center justify-between p-3 border-b bg-white flex-shrink-0">
            <h2 className="text-lg font-bold flex items-center">
              <ShoppingBag className="h-5 w-5 mr-2" />
              Cart ({cart.totalItems})
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Cart Items */}
          <div className="flex-1 overflow-y-auto p-3 min-h-0">
            {cart.items.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingBag className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-lg font-semibold mb-2">Your cart is empty</h3>
                <p className="text-muted-foreground">Add some items to get started!</p>
              </div>
            ) : (
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div key={`${item.productId}-${item.color}`} className="bg-white border rounded-lg p-3">
                    <div className="flex space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 mb-1 leading-tight">
                          {item.name}
                        </h4>
                        <p className="text-primary font-bold text-base mb-1">{item.price}</p>
                        {item.color && (
                          <p className="text-xs text-gray-500 mb-2">Color: {item.color}</p>
                        )}
                        
                        {/* Quantity Controls */}
                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-1">
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.productId, item.quantity - 1, item.color)}
                            >
                              <Minus className="h-3 w-3" />
                            </Button>
                            <span className="text-sm font-medium px-2 min-w-[2rem] text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="icon"
                              className="h-7 w-7"
                              onClick={() => updateQuantity(item.productId, item.quantity + 1, item.color)}
                            >
                              <Plus className="h-3 w-3" />
                            </Button>
                          </div>
                          
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-7 w-7 text-red-500 hover:text-red-600"
                            onClick={() => removeFromCart(item.productId, item.color)}
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Footer */}
          {cart.items.length > 0 && (
            <div className="p-3 border-t bg-white flex-shrink-0">
              <div className="flex justify-between items-center mb-3">
                <span className="text-base font-semibold">Total:</span>
                <span className="text-xl font-bold text-primary">
                  ${cart.totalAmount.toFixed(2)}
                </span>
              </div>
              <Button 
                className="w-full h-10" 
                onClick={handleCheckout}
                disabled={cart.items.length === 0}
              >
                Proceed to Checkout
              </Button>
            </div>
          )}
        </div>
      </div>

      {/* Auth Modal */}
      <AuthModal
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onSuccess={handleAuthSuccess}
      />

      {/* Checkout Modal */}
      <CheckoutModal
        isOpen={showCheckoutModal}
        onClose={() => setShowCheckoutModal(false)}
        onOrderComplete={() => {
          setShowCheckoutModal(false);
          onClose();
        }}
      />
    </>
  );
};

export default CartDrawer;
