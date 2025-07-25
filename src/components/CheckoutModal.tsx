import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { X, MessageCircle, Package, CreditCard, MapPin } from 'lucide-react';
import { useCart } from '@/contexts/CartContext';
import { useAuth } from '@/contexts/AuthContext';
import { Address } from '@/types';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  onOrderComplete: () => void;
}

const CheckoutModal = ({ isOpen, onClose, onOrderComplete }: CheckoutModalProps) => {
  const { cart, clearCart } = useCart();
  const { user, addOrder } = useAuth();
  const [isLoading, setIsLoading] = useState(false);
  const [orderNotes, setOrderNotes] = useState('');
  const [shippingAddress, setShippingAddress] = useState<Address>(
    user?.address || {
      street: '',
      city: '',
      state: '',
      postalCode: '',
      country: ''
    }
  );

  const handlePlaceOrder = async () => {
    if (!user) return;

    setIsLoading(true);

    try {
      // Create order
      const orderId = addOrder({
        userId: user.id,
        items: cart.items,
        totalAmount: cart.totalAmount,
        status: 'pending',
        paymentStatus: 'pending',
        shippingAddress,
        notes: orderNotes
      });

      // Generate WhatsApp message
      const orderDetails = cart.items.map(item => 
        `${item.quantity}x ${item.name}${item.color ? ` (${item.color})` : ''} - ${item.price}`
      ).join('\n');

      const whatsappMessage = encodeURIComponent(
        `🛍️ *New Order from Aura Bags*\n\n` +
        `*Order ID:* ${orderId}\n` +
        `*Customer:* ${user.firstName} ${user.lastName}\n` +
        `*Email:* ${user.email}\n` +
        `*Phone:* ${user.phone}\n\n` +
        `*Order Details:*\n${orderDetails}\n\n` +
        `*Total Amount:* $${cart.totalAmount.toFixed(2)}\n\n` +
        `*Shipping Address:*\n${shippingAddress.street}\n${shippingAddress.city}, ${shippingAddress.state} ${shippingAddress.postalCode}\n${shippingAddress.country}\n\n` +
        `${orderNotes ? `*Notes:* ${orderNotes}\n\n` : ''}` +
        `Please confirm this order and provide payment instructions. Thank you!`
      );

      // Clear cart and close modal
      clearCart();
      onOrderComplete();

      // Open WhatsApp
      window.open(`https://wa.me/1234567890?text=${whatsappMessage}`, '_blank');

    } catch (error) {
      console.error('Error placing order:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold flex items-center">
              <Package className="h-6 w-6 mr-2" />
              Complete Your Order
            </h2>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          <div className="space-y-6">
            {/* Order Summary */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <Package className="h-5 w-5 mr-2" />
                Order Summary
              </h3>
              <div className="space-y-3">
                {cart.items.map((item) => (
                  <div key={`${item.productId}-${item.color}`} className="flex items-center justify-between py-2 border-b">
                    <div className="flex items-center space-x-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-12 h-12 object-cover rounded"
                      />
                      <div>
                        <p className="font-medium text-sm">{item.name}</p>
                        {item.color && <p className="text-xs text-muted-foreground">Color: {item.color}</p>}
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                    </div>
                    <p className="font-semibold">{item.price}</p>
                  </div>
                ))}
                <div className="flex justify-between items-center pt-3 text-lg font-bold">
                  <span>Total:</span>
                  <span className="text-primary">${cart.totalAmount.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div>
              <h3 className="text-lg font-semibold mb-4 flex items-center">
                <MapPin className="h-5 w-5 mr-2" />
                Shipping Address
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="street">Street Address</Label>
                  <Input
                    id="street"
                    value={shippingAddress.street}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, street: e.target.value }))}
                    placeholder="123 Main Street"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="city">City</Label>
                  <Input
                    id="city"
                    value={shippingAddress.city}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, city: e.target.value }))}
                    placeholder="New York"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="state">State/Province</Label>
                  <Input
                    id="state"
                    value={shippingAddress.state}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, state: e.target.value }))}
                    placeholder="NY"
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="postalCode">Postal Code</Label>
                  <Input
                    id="postalCode"
                    value={shippingAddress.postalCode}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, postalCode: e.target.value }))}
                    placeholder="10001"
                    required
                  />
                </div>
                <div className="md:col-span-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={shippingAddress.country}
                    onChange={(e) => setShippingAddress(prev => ({ ...prev, country: e.target.value }))}
                    placeholder="United States"
                    required
                  />
                </div>
              </div>
            </div>

            {/* Order Notes */}
            <div>
              <Label htmlFor="notes">Order Notes (Optional)</Label>
              <Textarea
                id="notes"
                value={orderNotes}
                onChange={(e) => setOrderNotes(e.target.value)}
                placeholder="Any special instructions or preferences..."
                rows={3}
              />
            </div>

            {/* Payment Info */}
            <div className="bg-muted/30 p-4 rounded-lg">
              <h4 className="font-semibold mb-2 flex items-center">
                <CreditCard className="h-4 w-4 mr-2" />
                Payment Process
              </h4>
              <p className="text-sm text-muted-foreground mb-3">
                After placing your order, you'll be connected to our WhatsApp for payment processing. 
                We accept various payment methods and will provide secure payment instructions.
              </p>
              <div className="flex items-center space-x-2 text-sm">
                <MessageCircle className="h-4 w-4 text-[#25D366]" />
                <span>Secure payment via WhatsApp</span>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex space-x-4 pt-4">
              <Button variant="outline" onClick={onClose} className="flex-1">
                Continue Shopping
              </Button>
              <Button 
                onClick={handlePlaceOrder} 
                disabled={isLoading || !shippingAddress.street || !shippingAddress.city}
                className="flex-1 bg-[#25D366] hover:bg-[#20c55a] text-white"
              >
                {isLoading ? 'Processing...' : (
                  <>
                    <MessageCircle className="h-4 w-4 mr-2" />
                    Place Order via WhatsApp
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default CheckoutModal;
