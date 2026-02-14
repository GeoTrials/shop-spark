import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Shield, FileText, Cookie, Scale } from "lucide-react";

const lastUpdated = "February 14, 2026";

function SectionBlock({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold text-foreground">{title}</h3>
      <div className="text-muted-foreground leading-relaxed space-y-2">{children}</div>
    </div>
  );
}

export default function Legal() {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />

      <main className="flex-1">
        {/* Hero */}
        <section className="bg-gradient-hero py-16 md:py-24">
          <div className="container text-center space-y-4">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium">
              <Scale className="h-4 w-4" />
              Legal Information
            </div>
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
              Legal & Policies
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Transparency is important to us. Review our policies to understand how we protect your rights and data.
            </p>
            <p className="text-sm text-muted-foreground">Last updated: {lastUpdated}</p>
          </div>
        </section>

        {/* Tabs Content */}
        <section className="container py-12 md:py-16">
          <Tabs defaultValue="privacy" className="space-y-8">
            <TabsList className="w-full max-w-2xl mx-auto grid grid-cols-2 md:grid-cols-4 h-auto gap-1 bg-secondary/50 p-1.5 rounded-xl">
              <TabsTrigger value="privacy" className="flex items-center gap-2 rounded-lg py-2.5 text-xs md:text-sm data-[state=active]:bg-background data-[state=active]:shadow-md">
                <Shield className="h-4 w-4" />
                Privacy
              </TabsTrigger>
              <TabsTrigger value="terms" className="flex items-center gap-2 rounded-lg py-2.5 text-xs md:text-sm data-[state=active]:bg-background data-[state=active]:shadow-md">
                <FileText className="h-4 w-4" />
                Terms
              </TabsTrigger>
              <TabsTrigger value="cookies" className="flex items-center gap-2 rounded-lg py-2.5 text-xs md:text-sm data-[state=active]:bg-background data-[state=active]:shadow-md">
                <Cookie className="h-4 w-4" />
                Cookies
              </TabsTrigger>
              <TabsTrigger value="refund" className="flex items-center gap-2 rounded-lg py-2.5 text-xs md:text-sm data-[state=active]:bg-background data-[state=active]:shadow-md">
                <Scale className="h-4 w-4" />
                Refund
              </TabsTrigger>
            </TabsList>

            {/* Privacy Policy */}
            <TabsContent value="privacy">
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Privacy Policy</h2>
                    <p className="text-sm text-muted-foreground">How we collect, use, and protect your data</p>
                  </div>
                </div>

                <SectionBlock title="1. Information We Collect">
                  <p>We collect information you provide directly, such as your name, email address, shipping address, and payment details when you create an account or make a purchase.</p>
                  <p>We also automatically collect usage data including IP address, browser type, device information, and browsing patterns to improve our services.</p>
                </SectionBlock>

                <SectionBlock title="2. How We Use Your Information">
                  <p>Your information is used to process transactions, personalize your experience, communicate updates, and improve our marketplace platform. We never sell your personal data to third parties.</p>
                </SectionBlock>

                <SectionBlock title="3. Data Security">
                  <p>We implement industry-standard encryption and security measures to protect your personal information. All payment processing is handled through PCI-compliant payment processors.</p>
                </SectionBlock>

                <SectionBlock title="4. Your Rights">
                  <p>You have the right to access, correct, or delete your personal data. You may also opt out of marketing communications at any time. Contact our privacy team for any data-related requests.</p>
                </SectionBlock>

                <SectionBlock title="5. Third-Party Services">
                  <p>We may share limited data with trusted third-party services for analytics, payment processing, and shipping. Each partner is bound by strict data protection agreements.</p>
                </SectionBlock>
              </div>
            </TabsContent>

            {/* Terms of Service */}
            <TabsContent value="terms">
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <FileText className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Terms of Service</h2>
                    <p className="text-sm text-muted-foreground">Rules and conditions for using our platform</p>
                  </div>
                </div>

                <SectionBlock title="1. Acceptance of Terms">
                  <p>By accessing or using iMall, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>
                </SectionBlock>

                <SectionBlock title="2. User Accounts">
                  <p>You are responsible for maintaining the confidentiality of your account credentials. You must be at least 18 years old to create an account and make purchases on our platform.</p>
                </SectionBlock>

                <SectionBlock title="3. Marketplace Conduct">
                  <p>Users must not engage in fraudulent activities, misrepresent products, or violate intellectual property rights. We reserve the right to suspend accounts that violate these guidelines.</p>
                </SectionBlock>

                <SectionBlock title="4. Vendor Responsibilities">
                  <p>Vendors are responsible for accurate product listings, timely shipping, and responsive customer service. All products must comply with applicable laws and regulations.</p>
                </SectionBlock>

                <SectionBlock title="5. Limitation of Liability">
                  <p>iMall acts as a marketplace facilitator and is not liable for disputes between buyers and vendors. We provide tools for resolution but ultimate responsibility lies with the transacting parties.</p>
                </SectionBlock>
              </div>
            </TabsContent>

            {/* Cookie Policy */}
            <TabsContent value="cookies">
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Cookie className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Cookie Policy</h2>
                    <p className="text-sm text-muted-foreground">How we use cookies and similar technologies</p>
                  </div>
                </div>

                <SectionBlock title="1. What Are Cookies">
                  <p>Cookies are small text files stored on your device when you visit our website. They help us remember your preferences and improve your browsing experience.</p>
                </SectionBlock>

                <SectionBlock title="2. Types of Cookies We Use">
                  <p><strong>Essential Cookies:</strong> Required for basic functionality like authentication and cart management.</p>
                  <p><strong>Analytics Cookies:</strong> Help us understand how visitors interact with our platform to improve performance.</p>
                  <p><strong>Preference Cookies:</strong> Remember your settings and personalization choices.</p>
                </SectionBlock>

                <SectionBlock title="3. Managing Cookies">
                  <p>You can control cookies through your browser settings. Disabling certain cookies may affect the functionality of our platform. Essential cookies cannot be disabled.</p>
                </SectionBlock>
              </div>
            </TabsContent>

            {/* Refund Policy */}
            <TabsContent value="refund">
              <div className="max-w-3xl mx-auto space-y-8 animate-fade-in">
                <div className="flex items-center gap-3 pb-4 border-b border-border">
                  <div className="p-2.5 rounded-xl bg-primary/10">
                    <Scale className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <h2 className="text-2xl font-bold text-foreground">Refund Policy</h2>
                    <p className="text-sm text-muted-foreground">Our commitment to fair returns and refunds</p>
                  </div>
                </div>

                <SectionBlock title="1. Return Window">
                  <p>Most items can be returned within 30 days of delivery. Products must be in original condition with all tags and packaging intact.</p>
                </SectionBlock>

                <SectionBlock title="2. Refund Process">
                  <p>Once we receive your returned item, refunds are processed within 5–10 business days to your original payment method. You will receive an email confirmation when the refund is issued.</p>
                </SectionBlock>

                <SectionBlock title="3. Non-Returnable Items">
                  <p>Certain items such as personalized products, perishable goods, and digital downloads are not eligible for returns unless they arrive damaged or defective.</p>
                </SectionBlock>

                <SectionBlock title="4. Dispute Resolution">
                  <p>If you have a dispute with a vendor, contact our support team. We will mediate and work to reach a fair resolution for both parties within 14 business days.</p>
                </SectionBlock>
              </div>
            </TabsContent>
          </Tabs>
        </section>
      </main>

      <Footer />
    </div>
  );
}
