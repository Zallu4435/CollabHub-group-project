// market/src/app/terms/page.tsx
'use client';

import React from 'react';
import Link from 'next/link';
import { Card, CardContent } from '../components/ui/Card';

export default function TermsOfServicePage() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-4">Terms of Service</h1>
        <p className="text-lg text-gray-600">
          Last updated: March 15, 2024
        </p>
      </div>

      <Card>
        <CardContent className="p-8 prose prose-lg max-w-none">
          <div className="space-y-8">
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                By accessing and using DevMarket ("the Service"), you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">2. Description of Service</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                DevMarket is a digital marketplace that allows developers to buy and sell digital products including:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>Website templates and themes</li>
                <li>Mobile application templates</li>
                <li>Code libraries and components</li>
                <li>Design assets and UI kits</li>
                <li>Other digital development resources</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">3. User Accounts</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Registration</h3>
                  <p className="text-gray-700 leading-relaxed">
                    To use certain features of the Service, you must register for an account. You agree to provide accurate, current, and complete information during registration and to update such information to keep it accurate, current, and complete.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">Account Security</h3>
                  <p className="text-gray-700 leading-relaxed">
                    You are responsible for safeguarding the password and for maintaining the confidentiality of your account. You agree not to disclose your password to any third party and to notify us immediately if you suspect any unauthorized use of your account.
                  </p>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">4. Buying and Selling</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Buyers</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>All purchases are subject to the license terms specified for each product</li>
                    <li>Digital products are delivered via download links</li>
                    <li>Refunds are handled according to our Refund Policy</li>
                    <li>You may not redistribute or resell purchased items unless explicitly permitted by the license</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-2">For Sellers</h3>
                  <ul className="list-disc pl-6 text-gray-700 space-y-2">
                    <li>You must own all rights to the digital products you sell</li>
                    <li>Products must meet our quality guidelines</li>
                    <li>You are responsible for providing customer support for your products</li>
                    <li>DevMarket retains a commission from each sale as specified in our fee structure</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">5. Intellectual Property</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  The Service and its original content, features, and functionality are and will remain the exclusive property of DevMarket and its licensors. The Service is protected by copyright, trademark, and other laws.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Sellers retain ownership of their submitted content but grant DevMarket a license to display, distribute, and market their products through the Service.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">6. Prohibited Uses</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                You may not use the Service:
              </p>
              <ul className="list-disc pl-6 text-gray-700 space-y-2">
                <li>For any unlawful purpose or to solicit others to perform illegal acts</li>
                <li>To violate any international, federal, provincial, or state regulations, rules, laws, or local ordinances</li>
                <li>To infringe upon or violate our intellectual property rights or the intellectual property rights of others</li>
                <li>To harass, abuse, insult, harm, defame, slander, disparage, intimidate, or discriminate</li>
                <li>To submit false or misleading information</li>
                <li>To upload or transmit viruses or any other type of malicious code</li>
                <li>To spam, phish, pharm, pretext, spider, crawl, or scrape</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">7. Payment Terms</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  All purchases are processed securely through our payment partners. We accept major credit cards, PayPal, and other payment methods as displayed at checkout.
                </p>
                <p className="text-gray-700 leading-relaxed">
                  Prices are displayed in USD and include applicable taxes where required. Currency conversion rates may apply for international customers.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">8. Refund Policy</h2>
              <div className="space-y-4">
                <p className="text-gray-700 leading-relaxed">
                  Refunds may be granted within 30 days of purchase under the following conditions:
                </p>
                <ul className="list-disc pl-6 text-gray-700 space-y-2">
                  <li>The product does not work as described</li>
                  <li>The product contains significant bugs or errors</li>
                  <li>The product is missing essential files or documentation</li>
                  <li>Technical issues prevent proper use of the product</li>
                </ul>
                <p className="text-gray-700 leading-relaxed">
                  Refunds are not granted for change of mind, lack of technical skills, or compatibility issues with custom environments.
                </p>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">9. Privacy Policy</h2>
              <p className="text-gray-700 leading-relaxed">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the Service, to understand our practices. By using the Service, you agree to the collection and use of information in accordance with our{' '}
                <Link href="/privacy" className="text-blue-600 hover:underline">
                  Privacy Policy
                </Link>.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">10. Disclaimer</h2>
              <p className="text-gray-700 leading-relaxed">
                The information on this Service is provided on an "as is" basis. To the fullest extent permitted by law, DevMarket excludes all representations, warranties, conditions and terms whether express or implied.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">11. Limitation of Liability</h2>
              <p className="text-gray-700 leading-relaxed">
                In no event shall DevMarket, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential, or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">12. Termination</h2>
              <p className="text-gray-700 leading-relaxed">
                We may terminate or suspend your account and bar access to the Service immediately, without prior notice or liability, under our sole discretion, for any reason whatsoever including without limitation if you breach the Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">13. Governing Law</h2>
              <p className="text-gray-700 leading-relaxed">
                These Terms shall be interpreted and governed by the laws of the State of California, United States, without regard to conflict of law provisions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">14. Changes to Terms</h2>
              <p className="text-gray-700 leading-relaxed">
                We reserve the right, at our sole discretion, to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days notice prior to any new terms taking effect.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-4">15. Contact Information</h2>
              <p className="text-gray-700 leading-relaxed">
                If you have any questions about these Terms of Service, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                <p className="text-gray-700">
                  <strong>Email:</strong> legal@devmarket.com<br />
                  <strong>Address:</strong> 123 Developer Street, San Francisco, CA 94102<br />
                  <strong>Phone:</strong> +1 (555) 123-4567
                </p>
              </div>
            </section>
          </div>
        </CardContent>
      </Card>

      {/* Footer */}
      <div className="mt-8 text-center">
        <p className="text-sm text-gray-600">
          By using DevMarket, you agree to these terms of service.{' '}
          <Link href="/privacy" className="text-blue-600 hover:underline">
            Privacy Policy
          </Link>{' '}
          |{' '}
          <Link href="/help" className="text-blue-600 hover:underline">
            Help Center
          </Link>
        </p>
      </div>
    </div>
  );
}
