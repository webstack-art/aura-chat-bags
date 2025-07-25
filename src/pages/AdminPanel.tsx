import { useState, useEffect } from 'react';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Shield, Package, CreditCard, User, Search } from 'lucide-react';
import { Order, OrderStatus, PaymentStatus } from '@/types';

const AdminPanel = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [adminCode, setAdminCode] = useState('');
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Load all orders from localStorage
  useEffect(() => {
    const savedOrders = localStorage.getItem('aurabags_orders');
    if (savedOrders) {
      try {
        const allOrders = JSON.parse(savedOrders) as Order[];
        setOrders(allOrders.sort((a, b) => new Date(b.orderDate).getTime() - new Date(a.orderDate).getTime()));
      } catch (error) {
        console.error('Error loading orders:', error);
      }
    }
  }, []);

  const handleAdminLogin = () => {
    // Simple admin authentication - in real app, this would be more secure
    if (adminCode === 'aurabags2025') {
      setIsAuthenticated(true);
    } else {
      alert('Invalid admin code');
    }
  };

  const updateOrderStatus = (orderId: string, newStatus: OrderStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('aurabags_orders', JSON.stringify(updatedOrders));
  };

  const updatePaymentStatus = (orderId: string, newPaymentStatus: PaymentStatus) => {
    const updatedOrders = orders.map(order =>
      order.id === orderId ? { ...order, paymentStatus: newPaymentStatus } : order
    );
    setOrders(updatedOrders);
    localStorage.setItem('aurabags_orders', JSON.stringify(updatedOrders));
  };

  const getStatusColor = (status: OrderStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'confirmed': return 'bg-blue-100 text-blue-800';
      case 'processing': return 'bg-purple-100 text-purple-800';
      case 'shipped': return 'bg-indigo-100 text-indigo-800';
      case 'delivered': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPaymentStatusColor = (status: PaymentStatus) => {
    switch (status) {
      case 'pending': return 'bg-yellow-100 text-yellow-800';
      case 'paid': return 'bg-green-100 text-green-800';
      case 'failed': return 'bg-red-100 text-red-800';
      case 'refunded': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.items.some(item => item.name.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesStatus = statusFilter === 'all' || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <Card className="max-w-md mx-auto p-8">
            <div className="text-center mb-6">
              <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
              <h2 className="text-2xl font-bold">Admin Access</h2>
              <p className="text-muted-foreground">Enter admin code to continue</p>
            </div>
            <div className="space-y-4">
              <div>
                <Label htmlFor="adminCode">Admin Code</Label>
                <Input
                  id="adminCode"
                  type="password"
                  value={adminCode}
                  onChange={(e) => setAdminCode(e.target.value)}
                  placeholder="Enter admin code"
                />
              </div>
              <Button onClick={handleAdminLogin} className="w-full">
                Access Admin Panel
              </Button>
            </div>
          </Card>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Header */}
      <section className="bg-gradient-subtle py-16">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Shield className="h-16 w-16 text-primary mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
              Admin Panel
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Manage orders and update statuses
            </p>
          </div>
        </div>
      </section>

      {/* Admin Dashboard */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="max-w-7xl mx-auto">
            
            {/* Filters */}
            <Card className="p-6 mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-center">
                <div className="flex-1">
                  <Label htmlFor="search">Search Orders</Label>
                  <div className="flex items-center space-x-2">
                    <Search className="h-4 w-4 text-muted-foreground" />
                    <Input
                      id="search"
                      placeholder="Search by order ID or product name..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
                <div>
                  <Label>Filter by Status</Label>
                  <Select value={statusFilter} onValueChange={setStatusFilter}>
                    <SelectTrigger className="w-48">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Statuses</SelectItem>
                      <SelectItem value="pending">Pending</SelectItem>
                      <SelectItem value="confirmed">Confirmed</SelectItem>
                      <SelectItem value="processing">Processing</SelectItem>
                      <SelectItem value="shipped">Shipped</SelectItem>
                      <SelectItem value="delivered">Delivered</SelectItem>
                      <SelectItem value="cancelled">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </Card>

            {/* Orders List */}
            <div className="space-y-6">
              {filteredOrders.length === 0 ? (
                <Card className="p-12 text-center">
                  <Package className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-4">No orders found</h3>
                  <p className="text-muted-foreground">
                    {orders.length === 0 ? 'No orders have been placed yet.' : 'Try adjusting your search criteria.'}
                  </p>
                </Card>
              ) : (
                filteredOrders.map((order) => (
                  <Card key={order.id} className="p-6">
                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                      
                      {/* Order Info */}
                      <div className="lg:col-span-2">
                        <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4">
                          <div>
                            <h3 className="text-xl font-bold">{order.id}</h3>
                            <p className="text-muted-foreground">
                              {new Date(order.orderDate).toLocaleDateString('en-US', {
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                              })}
                            </p>
                          </div>
                          <div className="flex gap-2 mt-2 sm:mt-0">
                            <Badge className={getStatusColor(order.status)}>
                              {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                            </Badge>
                            <Badge className={getPaymentStatusColor(order.paymentStatus)}>
                              {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                            </Badge>
                          </div>
                        </div>

                        {/* Customer Info */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 p-4 bg-muted/30 rounded-lg">
                          <div>
                            <div className="flex items-center mb-2">
                              <User className="h-4 w-4 mr-2" />
                              <span className="font-semibold">Customer ID: {order.userId}</span>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              {order.shippingAddress.street}<br />
                              {order.shippingAddress.city}, {order.shippingAddress.state} {order.shippingAddress.postalCode}<br />
                              {order.shippingAddress.country}
                            </p>
                          </div>
                          <div>
                            <p className="font-semibold text-primary text-lg">
                              Total: ${order.totalAmount.toFixed(2)}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {order.items.length} item(s)
                            </p>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div className="space-y-2">
                          {order.items.map((item, index) => (
                            <div key={index} className="flex items-center justify-between p-2 border rounded">
                              <div className="flex items-center space-x-3">
                                <img
                                  src={item.image}
                                  alt={item.name}
                                  className="w-10 h-10 object-cover rounded"
                                />
                                <div>
                                  <p className="font-medium text-sm">{item.name}</p>
                                  <p className="text-xs text-muted-foreground">
                                    Qty: {item.quantity} {item.color && `• Color: ${item.color}`}
                                  </p>
                                </div>
                              </div>
                              <p className="font-semibold text-sm">{item.price}</p>
                            </div>
                          ))}
                        </div>

                        {order.notes && (
                          <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded">
                            <p className="text-sm"><strong>Notes:</strong> {order.notes}</p>
                          </div>
                        )}
                      </div>

                      {/* Status Updates */}
                      <div className="space-y-4">
                        <div>
                          <Label className="flex items-center mb-2">
                            <Package className="h-4 w-4 mr-2" />
                            Order Status
                          </Label>
                          <Select
                            value={order.status}
                            onValueChange={(value: OrderStatus) => updateOrderStatus(order.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="confirmed">Confirmed</SelectItem>
                              <SelectItem value="processing">Processing</SelectItem>
                              <SelectItem value="shipped">Shipped</SelectItem>
                              <SelectItem value="delivered">Delivered</SelectItem>
                              <SelectItem value="cancelled">Cancelled</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div>
                          <Label className="flex items-center mb-2">
                            <CreditCard className="h-4 w-4 mr-2" />
                            Payment Status
                          </Label>
                          <Select
                            value={order.paymentStatus}
                            onValueChange={(value: PaymentStatus) => updatePaymentStatus(order.id, value)}
                          >
                            <SelectTrigger>
                              <SelectValue />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="pending">Pending</SelectItem>
                              <SelectItem value="paid">Paid</SelectItem>
                              <SelectItem value="failed">Failed</SelectItem>
                              <SelectItem value="refunded">Refunded</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <Button
                          variant="outline"
                          className="w-full"
                          onClick={() => {
                            const message = `Order Update: ${order.id}\nStatus: ${order.status}\nPayment: ${order.paymentStatus}`;
                            navigator.clipboard.writeText(message);
                            alert('Order details copied to clipboard');
                          }}
                        >
                          Copy Order Details
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))
              )}
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default AdminPanel;
