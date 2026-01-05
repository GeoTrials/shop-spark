import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Mail } from "lucide-react";

const faqs = [
  {
    category: "Buying",
    questions: [
      {
        q: "How do I purchase a product?",
        a: "Simply browse our shop, click on a product you like, and click 'Buy Now' to proceed to checkout. For auction items, place your bid and if you're the highest bidder when the auction ends, you win!",
      },
      {
        q: "What payment methods do you accept?",
        a: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, and Apple Pay. All payments are processed securely.",
      },
      {
        q: "What is your return policy?",
        a: "Most vendors offer a 30-day return policy for unused items in original packaging. Check each product listing for specific return terms.",
      },
      {
        q: "How long does shipping take?",
        a: "Shipping times vary by vendor and location. Most orders are delivered within 5-7 business days. International orders may take 2-3 weeks.",
      },
    ],
  },
  {
    category: "Auctions",
    questions: [
      {
        q: "How do auctions work?",
        a: "Place a bid on any auction item. If you're the highest bidder when the timer ends, you win! You'll receive a notification and can proceed to payment.",
      },
      {
        q: "What is anti-snipe protection?",
        a: "Anti-snipe protection prevents last-second bidding from stealing auctions. If a bid is placed in the final 5 minutes, the auction extends by 5 more minutes, giving everyone a fair chance.",
      },
      {
        q: "What happens if I win an auction?",
        a: "You'll receive an email with payment instructions. Complete your payment within 48 hours to finalize the purchase. Failure to pay may result in account restrictions.",
      },
      {
        q: "Can I cancel a bid?",
        a: "Bids are binding commitments. In rare cases, contact support within 1 hour of placing a bid if you made a genuine error.",
      },
    ],
  },
  {
    category: "Selling",
    questions: [
      {
        q: "How do I become a vendor?",
        a: "Click 'Start Selling' and complete our vendor application. We review applications within 2-3 business days. Once approved, you can list products immediately.",
      },
      {
        q: "What are the fees?",
        a: "We charge a simple 10% commission on successful sales. No listing fees, no monthly subscriptions. You only pay when you sell.",
      },
      {
        q: "How do I get paid?",
        a: "Payments are processed weekly via direct deposit or PayPal. Funds are held for 7 days after delivery confirmation for buyer protection.",
      },
      {
        q: "Can I run auctions for my products?",
        a: "Yes! Any verified vendor can list items as auctions. Set your starting price, duration, and enable anti-snipe protection if desired.",
      },
    ],
  },
  {
    category: "Account & Security",
    questions: [
      {
        q: "How do I reset my password?",
        a: "Click 'Sign In', then 'Forgot Password'. Enter your email and we'll send you a reset link. Links expire after 24 hours.",
      },
      {
        q: "Is my payment information secure?",
        a: "Absolutely. We use industry-standard encryption and never store your full card details. Payments are processed through trusted providers like Stripe.",
      },
      {
        q: "How do I delete my account?",
        a: "Contact support to request account deletion. Note that you must complete any pending orders or auctions first.",
      },
    ],
  },
];

export default function FAQ() {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-12 md:py-16">
          <div className="container">
            <div className="max-w-2xl mx-auto text-center">
              <h1 className="text-3xl md:text-4xl font-bold mb-4">
                Frequently Asked <span className="text-gradient">Questions</span>
              </h1>
              <p className="text-muted-foreground">
                Everything you need to know about buying, selling, and auctions on MarketHub
              </p>
            </div>
          </div>
        </section>

        {/* FAQs */}
        <section className="py-12 md:py-16">
          <div className="container max-w-3xl">
            {faqs.map((category) => (
              <div key={category.category} className="mb-10">
                <h2 className="text-xl font-bold mb-4 pb-2 border-b border-border">
                  {category.category}
                </h2>
                <Accordion type="single" collapsible className="space-y-2">
                  {category.questions.map((faq, index) => (
                    <AccordionItem
                      key={index}
                      value={`${category.category}-${index}`}
                      className="border border-border/50 rounded-xl px-4 data-[state=open]:bg-secondary/30"
                    >
                      <AccordionTrigger className="text-left font-medium hover:no-underline py-4">
                        {faq.q}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground pb-4">
                        {faq.a}
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            ))}
          </div>
        </section>

        {/* Contact CTA */}
        <section className="py-12 md:py-16 bg-secondary/30">
          <div className="container">
            <div className="max-w-xl mx-auto text-center">
              <h2 className="text-2xl font-bold mb-4">Still have questions?</h2>
              <p className="text-muted-foreground mb-6">
                Our support team is here to help you 24/7
              </p>
              <Button variant="hero" size="lg" className="gap-2">
                <Mail className="h-5 w-5" />
                Contact Support
              </Button>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
