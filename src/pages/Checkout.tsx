import { useState } from "react";
import { Link } from "react-router-dom";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import { ArrowLeft, CreditCard, Truck, Shield, Check } from "lucide-react";

const orderItems = [
  { title: "Handcrafted Ceramic Vase", price: 89.99, quantity: 1 },
  { title: "Organic Lavender Candle Set", price: 34.99, quantity: 2 },
  { title: "Woven Cotton Throw Blanket", price: 124.99, quantity: 1 },
];

export default function Checkout() {
  const [step, setStep] = useState<"shipping" | "payment" | "confirmation">("shipping");
  const [paymentMethod, setPaymentMethod] = useState("card");

  const subtotal = orderItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = subtotal > 100 ? 0 : 9.99;
  const tax = subtotal * 0.08;
  const total = subtotal + shipping + tax;

  const handleContinue = () => {
    if (step === "shipping") setStep("payment");
    else if (step === "payment") setStep("confirmation");
  };

  if (step === "confirmation") {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="text-center py-16 px-4">
            <div className="w-20 h-20 bg-success rounded-full flex items-center justify-center mx-auto mb-6">
              <Check className="h-10 w-10 text-success-foreground" />
            </div>
            <h1 className="text-3xl font-bold mb-2">Order Confirmed!</h1>
            <p className="text-muted-foreground mb-2">
              Thank you for your purchase
            </p>
            <p className="text-sm text-muted-foreground mb-8">
              Order #MKT-{Math.random().toString(36).substring(2, 8).toUpperCase()}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild>
                <Link to="/shop">Continue Shopping</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link to="/">Back to Home</Link>
              </Button>
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1">
        <div className="container py-8 md:py-12">
          {/* Back Link */}
          <Link
            to="/cart"
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-6"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Cart
          </Link>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Checkout Form */}
            <div className="lg:col-span-2 space-y-8">
              {/* Progress Steps */}
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "shipping" ? "bg-primary text-primary-foreground" : "bg-success text-success-foreground"
                  }`}>
                    {step === "shipping" ? "1" : <Check className="h-4 w-4" />}
                  </div>
                  <span className="font-medium">Shipping</span>
                </div>
                <div className="flex-1 h-px bg-border" />
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                    step === "payment" ? "bg-primary text-primary-foreground" : "bg-secondary text-muted-foreground"
                  }`}>
                    2
                  </div>
                  <span className={step === "payment" ? "font-medium" : "text-muted-foreground"}>
                    Payment
                  </span>
                </div>
              </div>

              {step === "shipping" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <Truck className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Shipping Information</h2>
                  </div>

                  <div className="grid sm:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">First Name</Label>
                      <Input id="firstName" placeholder="John" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input id="lastName" placeholder="Doe" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="john@example.com" />
                    </div>
                    <div className="space-y-2 sm:col-span-2">
                      <Label htmlFor="address">Address</Label>
                      <Input id="address" placeholder="123 Main Street" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="city">City</Label>
                      <Input id="city" placeholder="New York" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="state">State</Label>
                      <Input id="state" placeholder="NY" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="zip">ZIP Code</Label>
                      <Input id="zip" placeholder="10001" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone</Label>
                      <Input id="phone" placeholder="(555) 123-4567" />
                    </div>
                  </div>

                  <Button onClick={handleContinue} className="w-full mt-6" size="lg">
                    Continue to Payment
                  </Button>
                </div>
              )}

              {step === "payment" && (
                <div className="bg-card border border-border rounded-xl p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <CreditCard className="h-5 w-5 text-primary" />
                    <h2 className="text-lg font-semibold">Payment Method</h2>
                  </div>

                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod} className="space-y-3 mb-6">
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="card" id="card" />
                      <Label htmlFor="card" className="flex-1 cursor-pointer">
                        Credit / Debit Card
                      </Label>
                    </div>
                    <div className="flex items-center space-x-3 p-4 border border-border rounded-lg cursor-pointer hover:border-primary/50 transition-colors">
                      <RadioGroupItem value="paypal" id="paypal" />
                      <Label htmlFor="paypal" className="flex-1 cursor-pointer">
                        PayPal
                      </Label>
                    </div>
                  </RadioGroup>

                  {paymentMethod === "card" && (
                    <div className="space-y-4 mb-6">
                      <div className="space-y-2">
                        <Label htmlFor="cardNumber">Card Number</Label>
                        <Input id="cardNumber" placeholder="1234 5678 9012 3456" />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="expiry">Expiry Date</Label>
                          <Input id="expiry" placeholder="MM/YY" />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="cvc">CVC</Label>
                          <Input id="cvc" placeholder="123" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="cardName">Name on Card</Label>
                        <Input id="cardName" placeholder="John Doe" />
                      </div>
                    </div>
                  )}

                  <div className="flex items-start space-x-3 mb-6">
                    <Checkbox id="saveCard" />
                    <Label htmlFor="saveCard" className="text-sm text-muted-foreground cursor-pointer">
                      Save this payment method for future purchases
                    </Label>
                  </div>

                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                    <Shield className="h-4 w-4" />
                    <span>Your payment information is encrypted and secure</span>
                  </div>

                  <div className="flex gap-4">
                    <Button variant="outline" onClick={() => setStep("shipping")} className="flex-1">
                      Back
                    </Button>
                    <Button onClick={handleContinue} className="flex-1" size="lg">
                      Place Order
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* Order Summary */}
            <div className="lg:col-span-1">
              <div className="bg-card border border-border rounded-xl p-6 sticky top-24">
                <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                
                <div className="space-y-3 mb-4">
                  {orderItems.map((item, index) => (
                    <div key={index} className="flex justify-between text-sm">
                      <span className="text-muted-foreground">
                        {item.title} × {item.quantity}
                      </span>
                      <span>${(item.price * item.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                </div>

                <div className="border-t border-border pt-4 space-y-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span>${subtotal.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Shipping</span>
                    <span>
                      {shipping === 0 ? (
                        <span className="text-success">Free</span>
                      ) : (
                        `$${shipping.toFixed(2)}`
                      )}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Tax</span>
                    <span>${tax.toFixed(2)}</span>
                  </div>
                  <div className="border-t border-border pt-3 mt-3">
                    <div className="flex justify-between text-base font-semibold">
                      <span>Total</span>
                      <span>${total.toFixed(2)}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
